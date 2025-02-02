import cv2
import uvicorn
import threading
import time
import numpy as np
import imutils
from ultralytics import YOLO
from fastapi import FastAPI
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
from add_remove_item import text_to_speech
from openai import OpenAI
from dotenv import load_dotenv
import os
import base64
from io import BytesIO

load_dotenv()

api_key = os.getenv("OPENAI_API_KEY")
client = None

if api_key:
    client = OpenAI(api_key=api_key)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

model = YOLO("yolov8n.pt")
objects_to_detect = {39: "water bottle", 46: "banana", 47: "apple"}

def get_position_object(frame, information):
    """Sends the image and detected objects to ChatGPT for position analysis."""
    _, buffer = cv2.imencode(".jpg", frame)
    image_base64 = base64.b64encode(buffer).decode("utf-8")

    completion = client.chat.completions.create(
        model="gpt-4",
        store=True,
        messages=[
            {"role": "user", "content": f"Provide a useful message to a visually impaired user to help them find the product at the right position. The camera is pointing towards their left. Tell them that, make the message a little longer " + information},
        ]
    )

    return completion.choices[0].message.content

cap = cv2.VideoCapture(0)

if not cap.isOpened():
    raise RuntimeError("Error: Could not access the camera")

frame_buffer = None
frame_lock = threading.Lock()

detected_objects_history = set()

def capture_frames():
    """Continuously captures frames from the camera in a separate thread."""
    global frame_buffer
    while True:
        ret, frame = cap.read()
        if ret:
            frame = imutils.resize(frame, width=640)
            with frame_lock:
                frame_buffer = frame
        time.sleep(0.01)

threading.Thread(target=capture_frames, daemon=True).start()

def process_frame(frame):
    """Runs YOLO detection and updates frame with annotations."""
    frame_height, frame_width = frame.shape[:2]
    results = model.track(frame, persist=True)
    detected_objects = results[0].boxes.cls.tolist()
    object_found = any(obj_id in detected_objects for obj_id in objects_to_detect.keys())

    detection_messages = []
    current_detected_objects = set()

    if object_found:
        print(f"Detected object(s): {detected_objects}")
        annotated_frame = frame
        bounding_boxes = results[0].boxes.xyxy.tolist()

        for i, box in enumerate(bounding_boxes):
            cls_id = detected_objects[i]

            if cls_id in objects_to_detect.keys():
                x_min, y_min, x_max, y_max = box
                center_x = (x_min + x_max) / 2
                center_y = (y_min + y_max) / 2

                region = "Top Left" if center_x < frame_width / 2 and center_y < frame_height / 2 else \
                         "Top Right" if center_x >= frame_width / 2 and center_y < frame_height / 2 else \
                         "Bottom Left" if center_x < frame_width / 2 and center_y >= frame_height / 2 else \
                         "Bottom Right"

                message = get_position_object(frame, objects_to_detect[cls_id] + "was found in " + region)
                detection_messages.append(message)

                # Draw the bounding box around the detected object
                cv2.rectangle(annotated_frame, (int(x_min), int(y_min)), (int(x_max), int(y_max)), (0, 255, 0), 2)
                cv2.putText(annotated_frame, f"ID: {cls_id}", (int(x_min), int(y_min) - 10),
                            cv2.FONT_HERSHEY_SIMPLEX, 0.9, (0, 255, 0), 2)

                current_detected_objects.add(cls_id)

        new_objects = current_detected_objects - detected_objects_history
        if new_objects:
            full_message = " ".join([f"{objects_to_detect[obj]} was found in {region}" for obj in new_objects])
            print(full_message)

            threading.Thread(target=text_to_speech, args=(full_message,), daemon=True).start()
            detected_objects_history.update(new_objects)

        return annotated_frame
    else:
        return frame

def generate_frames():
    """Processes frames and runs YOLO detection."""
    frame_count = 0
    while True:
        with frame_lock:
            if frame_buffer is None:
                continue
            frame = frame_buffer.copy()

        # Process every 3rd frame to improve speed
        if frame_count % 3 == 0:
            annotated_frame = process_frame(frame)

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

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
