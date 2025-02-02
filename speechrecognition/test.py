import speech_recognition as sr
#import espeakng

# Initialize recognizer
recognizer = sr.Recognizer()
word_list = []

#scout_variations = ["start", "scout", "scouts", "shout", "out", "south","without"]


def check_audio(self, framex):
    sample_rate = 16000
    frame_duration = 10

    frame = int(framex).to_bytes(2, "big") * int(sample_rate * frame_duration / 1000)

    return self.vad.is_speech(frame, sample_rate)

#def text_to_speech(text):
#    esng = espeakng.ESpeakNG()
#    esng.say(text)

def listen_and_add():
    with sr.Microphone() as source:
        #text_to_speech("Listening...")
        recognizer.adjust_for_ambient_noise(source)
        audio = recognizer.listen(source, timeout=5)

        try:
            text = recognizer.recognize_google(audio).lower().split()[-1]
            word_list.append(text)
            print(word_list)

        except sr.UnknownValueError:
            pass
            #text_to_speech("Couldn't understand the audio, please try again")
        except sr.RequestError:
            print("Could not request results. Check your internet connection.")


# Keep listening for commands
while True:
	listen_and_add()
	print(f"Current list: {word_list}")
