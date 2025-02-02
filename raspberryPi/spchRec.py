import speech_recognition as sr
import espeakng

# Initialize recognizer
recognizer = sr.Recognizer()
word_list = []

scout_variations = ["scout", "scouts", "shout", "out", "south","without"]


def check_audio(self, framex):
    sample_rate = 16000
    frame_duration = 10

    frame = int(framex).to_bytes(2, "big") * int(sample_rate * frame_duration / 1000)

    return self.vad.is_speech(frame, sample_rate)

def text_to_speech(text):
    esng = espeakng.ESpeakNG()
    esng.say(text)

def listen_and_add():
    with sr.Microphone() as source:
        text_to_speech("Listening...")
        recognizer.adjust_for_ambient_noise(source)
        audio = recognizer.listen(source, timeout=10)

        try:
            text = recognizer.recognize_google(audio).lower()
            print(f"You said: {text}")

            first_word = text.split(" ")[0]
            print("First word : " + first_word)

            if first_word in scout_variations:
                argument = ' '.join(text.split()[1:])
                print("Scout listening")

                if argument.startswith("add "):
                    word = argument.replace("add", "", 1).strip()
                    word_list.append(word)
                    text_to_speech(f"Successfully added: {word}")
                if argument.startswith("remove "):
                    word = argument.replace("remove", "", 1).strip()
                    print("Removed word: " + word)
                    word_list.remove(word)
                    word_list("Successfully removed" + word)
                    text_to_speech(word_list)
                if argument.startswith("clear"):
                    word_list.clear()
                    text_to_speech("List cleared.")
                    print(word_list)

                if argument.startswith("list"):
                    text_to_speech()
        except sr.UnknownValueError:
            text_to_speech("Couldn't understand the audio, please try again")
        except sr.RequestError:
            print("Could not request results. Check your internet connection.")


# Keep listening for commands
while True:
	listen_and_add()
	print(f"Current list: {word_list}")
