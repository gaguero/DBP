import os
from openai import OpenAI

api_key = os.getenv("OPENAI_API_KEY")
if not api_key:
    raise RuntimeError("Set OPENAI_API_KEY in your environment before running this script.")

client = OpenAI(api_key=api_key)

with open("track.mp3", "rb") as source_audio:
    transcript = client.audio.transcriptions.create(
        model="whisper-1",
        file=source_audio,
        response_format="srt",
    )

with open("track.srt", "w", encoding="utf-8") as target_file:
    target_file.write(transcript)

print("Transcript saved to track.srt")
