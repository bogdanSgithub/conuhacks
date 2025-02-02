import speech_recognition as sr
from gtts import gTTS
import os

def text_to_speech(text):
    tts = gTTS(text, lang="en")
    tts.save("output.mp3")
    os.system("mpg321 output.mp3")

recognizer = sr.Recognizer()
word_list = []

#scout_variations = ["start", "scout", "scouts", "shout", "out", "south","without"]


def check_audio(self, framex):
    sample_rate = 16000
    frame_duration = 10

    frame = int(framex).to_bytes(2, "big") * int(sample_rate * frame_duration / 1000)

    return self.vad.is_speech(frame, sample_rate)

def listen_and_add():
    with sr.Microphone() as source:
        text_to_speech("Listening...")
        recognizer.adjust_for_ambient_noise(source)
        audio = recognizer.listen(source, timeout=10)

        try:
            item = recognizer.recognize_google(audio).lower().split()[-1]
            word_list.append(item)
            text_to_speech("successfully added " + item)
            print(word_list)

        except sr.UnknownValueError:
            pass
        except sr.RequestError:
            print("Could not request results. Check your internet connection.")


# Keep listening for commands
#while True:
#	listen_and_add()
#	print(f"Current list: {word_list}")
