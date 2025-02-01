import cv2
import uvicorn
import numpy as np
from ultralytics import YOLO
from fastapi import FastAPI
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Allow all origins (or specify only your Windows PC's IP)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load YOLOv8 model
model = YOLO("yolov8n.pt")
objects_to_detect = [0, 73]  # Modify this list for specific object classes

# Function to capture and process frames from the camera
def generate_frames():
    cap = cv2.VideoCapture(0)  # Open the default camera

    if not cap.isOpened():
        print("Error: Could not access the camera")
        return

    while True:
        ret, frame = cap.read()
        if not ret:
            print("Error: Failed to capture image")
            break

        # Run YOLO model on the frame
        results = model(frame)
        
        detected_objects = results[0].boxes.cls.tolist()
        object_found = any(obj_id in detected_objects for obj_id in objects_to_detect)

        if object_found:
            print(f"Detected object(s): {detected_objects}")

        # Annotate frame with detection results
        annotated_frame = results[0].plot()

        # Get inference time and calculate FPS
        inference_time = results[0].speed['inference']
        fps = 1000 / inference_time  # Convert ms to FPS
        text = f'FPS: {fps:.1f}'

        # Draw FPS text on frame
        font = cv2.FONT_HERSHEY_SIMPLEX
        text_size = cv2.getTextSize(text, font, 1, 2)[0]
        text_x = annotated_frame.shape[1] - text_size[0] - 10
        text_y = text_size[1] + 10
        cv2.putText(annotated_frame, text, (text_x, text_y), font, 1, (255, 255, 255), 2, cv2.LINE_AA)

        # Encode the frame as JPEG
        _, jpeg_frame = cv2.imencode('.jpg', annotated_frame)

        # Yield the frame with the correct headers for streaming
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + jpeg_frame.tobytes() + b'\r\n')

    cap.release()

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
