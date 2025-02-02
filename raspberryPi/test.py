import speech_recognition as sr
import espeakng

# Initialize recognizer and text-to-speech engine
recognizer = sr.Recognizer()
esng = espeakng.ESpeakNG()

# Define variations for the keyword "scout"
scout_variations = ["scout", "scouts", "shout", "out", "south", "without"]

# Initialize an empty list to store words
word_list = []

def text_to_speech(text):
    esng.say(text)

def listen_and_add():
    try:
        with sr.Microphone() as source:
            text_to_speech("Listening...")
            recognizer.adjust_for_ambient_noise(source)
            print("Listening for commands...")

            # Capture audio
            audio = recognizer.listen(source, timeout=10)
            text = recognizer.recognize_google(audio).lower()
            print(f"You said: {text}")

            # Process the first word of the spoken text
            first_word = text.split(" ")[0]
            print("First word: " + first_word)

            if first_word in scout_variations:
                argument = ' '.join(text.split()[1:]).strip()
                print("Scout command detected")

                # Command: add
                if argument.startswith("add "):
                    word = argument.replace("add", "", 1).strip()
                    word_list.append(word)
                    text_to_speech(f"Successfully added: {word}")
                    print(f"Added: {word}")

                # Command: remove
                elif argument.startswith("remove "):
                    word = argument.replace("remove", "", 1).strip()
                    if word in word_list:
                        word_list.remove(word)
                        text_to_speech(f"Successfully removed: {word}")
                        print(f"Removed: {word}")
                    else:
                        text_to_speech(f"{word} not found in list")
                        print(f"{word} not found in list")

                # Command: clear
                elif argument == "clear":
                    word_list.clear()
                    text_to_speech("List cleared.")
                    print("List cleared.")

                # Command: list
                elif argument == "list":
                    list_contents = ", ".join(word_list) if word_list else "The list is empty."
                    text_to_speech(f"Current list: {list_contents}")
                    print(f"Current list: {list_contents}")

                else:
                    text_to_speech("Unknown command.")
                    print("Unknown command.")

    except sr.UnknownValueError:
        text_to_speech("Couldn't understand the audio, please try again.")
        print("Couldn't understand the audio.")
    except sr.RequestError:
        text_to_speech("Could not request results. Check your internet connection.")
        print("Could not request results. Check your internet connection.")
    except Exception as e:
        text_to_speech("An error occurred.")
        print(f"Error: {e}")

# Main loop to keep listening for commands
if __name__ == "__main__":
    print("Starting voice command listener...")
    while True:
        listen_and_add()
