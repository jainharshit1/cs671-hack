import cv2
import json
from transformers import pipeline

# 1. Load Hugging Face emotion recognition model
emotion_classifier = pipeline("image-classification", model="dima806/facial_emotions_image_detection")

# 2. Initialize webcam
cap = cv2.VideoCapture(0)  # 0 = default webcam
if not cap.isOpened():
    print("Error: Could not open webcam")
    exit()

# 3. Load face detector (Haar Cascade from OpenCV)
face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + "haarcascade_frontalface_default.xml")

print("Press 'q' to quit")

while True:
    ret, frame = cap.read()
    if not ret:
        print("Failed to capture frame")
        break

    # Convert to grayscale (needed for face detection)
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

    # 4. Detect faces
    faces = face_cascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=5)

    for (x, y, w, h) in faces:
        # Crop face
        face_img = frame[y:y+h, x:x+w]

        # Save temporarily
        face_filename = "temp_face.jpg"
        cv2.imwrite(face_filename, face_img)

        # 5. Pass face to Hugging Face model
        results = emotion_classifier(face_filename)

        # Get top prediction
        top_emotion = max(results, key=lambda x: x['score'])

        # ---- 6. Save result into JSON file ----
        data = {
            "emotion": top_emotion["label"],
            "score": top_emotion["score"]
        }

        with open("emotion_result.json", "w") as f:
            json.dump(data, f, indent=4)

        print("Saved result:", data)

        # Optional: Show emotion on screen
        cv2.putText(frame, f"{top_emotion['label']} ({top_emotion['score']:.2f})",
                    (x, y-10), cv2.FONT_HERSHEY_SIMPLEX, 0.9, (0, 255, 0), 2)
        cv2.rectangle(frame, (x, y), (x+w, y+h), (255, 0, 0), 2)

    # Show the frame
    cv2.imshow("Emotion Detection", frame)

    # Quit on pressing 'q'
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
