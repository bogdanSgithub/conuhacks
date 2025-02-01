import cv2
import uvicorn
import numpy as np
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

# Open the webcam (use 0 or adjust if needed)
import cv2
from fastapi import FastAPI
from fastapi.responses import StreamingResponse

app = FastAPI()

# Function to capture frames from the camera
def generate_frames():
    cap = cv2.VideoCapture(0)  # Open the default camera (use '0' for default webcam)

    if not cap.isOpened():
        print("Error: Could not access the camera")
        return

    while True:
        ret, frame = cap.read()  # Read a frame
        if not ret:
            print("Error: Failed to capture image")
            break

        # Encode the frame as JPEG
        _, jpeg_frame = cv2.imencode('.jpg', frame)

        # Yield the frame with the correct headers for streaming
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + jpeg_frame.tobytes() + b'\r\n')

    cap.release()

# Route to stream the video
@app.get("/video")
def video_feed():
    return StreamingResponse(generate_frames(), media_type="multipart/x-mixed-replace; boundary=frame")
@app.get("/test")
def test():
    return "hello world"

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
