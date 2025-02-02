import pyttsx3

engine = pyttsx3.init()  # Initializes the TTS engine
engine = pyttsx3.init(driverName='espeak')
engine.say("Hello, I am speaking on Linux!")
engine.runAndWait()
