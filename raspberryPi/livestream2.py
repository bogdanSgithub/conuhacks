import cv2
import uvicorn
import numpy as np
import imutils
import threading
import time
from ultralytics import YOLO
from fastapi import FastAPI
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
from add_remove_item import text_to_speech

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load YOLOv8 model
model = YOLO("yolov8n.pt")

# Objects to detect (Modify based on your need)
objects_to_detect = {39:"water bottle", 46:"banana", 47:"apple"}  # List of object IDs to annotate

# Initialize camera capture
cap = cv2.VideoCapture(0)

# Ensure camera is opened
if not cap.isOpened():
    raise RuntimeError("Error: Could not access the camera")

# Thread-safe frame buffer
frame_buffer = None
frame_lock = threading.Lock()

# Keep track of previously detected objects
detected_objects_history = set()

def capture_frames():
    """Continuously captures frames from the camera in a separate thread."""
    global frame_buffer
    while True:
        ret, frame = cap.read()
        if ret:
            frame = imutils.resize(frame, width=320)
            with frame_lock:
                frame_buffer = frame
        time.sleep(0.01)  # Prevent CPU overload

# Start frame capture in a separate thread
threading.Thread(target=capture_frames, daemon=True).start()

def generate_frames():
    """Processes frames and runs YOLO detection."""
    frame_count = 0
    while True:
        with frame_lock:
            if frame_buffer is None:
                continue
            frame = frame_buffer.copy()

        frame_height, frame_width = frame.shape[:2]

        # Process every 3rd frame to improve speed
        if frame_count % 3 == 0:
            results = model.track(frame, persist=True)  # Use track() instead of predict()
            detected_objects = results[0].boxes.cls.tolist()
            object_found = any(obj_id in detected_objects for obj_id in objects_to_detect.keys())

            detection_messages = []  # Store messages to send to TTS once

            current_detected_objects = set()  # Keep track of objects detected in this frame

            if object_found:
                print(f"Detected object(s): {detected_objects}")

                # Annotate frame with detection results (only for specified IDs)
                annotated_frame = frame  # Start with the original frame

                # Bounding box processing
                bounding_boxes = results[0].boxes.xyxy.tolist()

                for i, box in enumerate(bounding_boxes):
                    cls_id = detected_objects[i]

                    # Only annotate if the class ID matches one of the desired ones
                    if cls_id in objects_to_detect.keys():
                        x_min, y_min, x_max, y_max = box  # Coordinates of the bounding box corners
                        center_x = (x_min + x_max) / 2
                        center_y = (y_min + y_max) / 2

                        region = "Top Left" if center_x < frame_width / 2 and center_y < frame_height / 2 else \
                                 "Top Right" if center_x >= frame_width / 2 and center_y < frame_height / 2 else \
                                 "Bottom Left" if center_x < frame_width / 2 and center_y >= frame_height / 2 else \
                                 "Bottom Right"

                        message = f"{objects_to_detect[cls_id]} was found in {region}"
                        detection_messages.append(message)

                        # Draw the bounding box around the detected object
                        cv2.rectangle(annotated_frame, (int(x_min), int(y_min)), (int(x_max), int(y_max)), (0, 255, 0), 2)
                        cv2.putText(annotated_frame, f"ID: {cls_id}", (int(x_min), int(y_min) - 10), 
                                    cv2.FONT_HERSHEY_SIMPLEX, 0.9, (0, 255, 0), 2)

                        # Add the object ID to the list of current detected objects
                        current_detected_objects.add(cls_id)

                # Trigger TTS only if there is a new object that hasn't been detected before
                new_objects = current_detected_objects - detected_objects_history
                if new_objects:
                    full_message = " ".join([f"{objects_to_detect[obj]} was found in {region}" for obj in new_objects])
                    print(full_message)

                    # Run text-to-speech in a separate thread to prevent blocking
                    threading.Thread(target=text_to_speech, args=(full_message,), daemon=True).start()

                    # Update history with newly detected objects
                    detected_objects_history.update(new_objects)

            else:
                annotated_frame = frame

            # Encode the frame as JPEG
            _, jpeg_frame = cv2.imencode('.jpg', annotated_frame)

            # Yield frame with correct headers for streaming
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + jpeg_frame.tobytes() + b'\r\n')

        frame_count += 1

# Route to stream the processed video
@app.get("/video")
def video_feed():
    return StreamingResponse(generate_frames(), media_type="multipart/x-mixed-replace; boundary=frame")

# Simple test route
@app.get("/test")
def test():
    return "hello world"

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
