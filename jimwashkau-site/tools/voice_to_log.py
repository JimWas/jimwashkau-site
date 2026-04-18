import os
import uuid
import datetime
import sounddevice as sd
import numpy as np
from scipy.io.wavfile import write
import whisper
from git import Repo

# Configuration
LOG_DIR = "src/content/logs"
AUDIO_TMP = "tools/temp_mission.wav"
SAMPLE_RATE = 44100
REPO_PATH = "."

# Load the local model (first time will download ~150MB)
print("[SYSTEM] INITIALIZING LOCAL AI (WHISPER BASE)...")
model = whisper.load_model("base")

def record_audio(duration=30):
    print(f"\n[SYSTEM] INITIATING RECORDING: {duration} SECONDS...")
    print("[SYSTEM] SPEAK MISSION BRIEFING NOW...")
    recording = sd.rec(int(duration * SAMPLE_RATE), samplerate=SAMPLE_RATE, channels=1)
    sd.wait()
    write(AUDIO_TMP, SAMPLE_RATE, recording)
    print("[SYSTEM] RECORDING COMPLETE.\n")

def transcribe_local():
    print("[SYSTEM] ANALYZING MISSION DATA (LOCAL AI)...")
    result = model.transcribe(AUDIO_TMP)
    return result["text"]

def save_and_push(title, tag, status, year, content):
    filename = f"{tag.lower()}.md"
    filepath = os.path.join(LOG_DIR, filename)

    # Format the Markdown
    markdown = f"""---
title: "{title}"
tag: "{tag}"
status: "{status}"
year: "{year}"
summary: "Mission Log transcribed via local secure voice-to-text."
---

# Mission Briefing
{content.strip()}
"""

    # Save locally
    with open(filepath, "w") as f:
        f.write(markdown)
    print(f"[SYSTEM] MISSION LOG GENERATED: {filepath}")

    # Git Operations
    try:
        repo = Repo(REPO_PATH)
        repo.git.add(filepath)
        repo.index.commit(f"Auto-mission log: {tag}")
        origin = repo.remote(name='origin')
        origin.push()
        print(f"[SYSTEM] MISSION LOG DEPLOYED TO SECTOR: GitHub")
    except Exception as e:
        print(f"[ERROR] DEPLOYMENT FAILED: {e} (Is your GitHub SSH/token setup?)")

def main():
    print("\n--- JIMWASHKAU.COM MISSION RECORDER (LOCAL & SECURE) ---")
    
    title = input("Enter Mission Title: ")
    if not title: title = "UNDESIGNATED MISSION"
    
    tag = input("Enter Mission Tag (e.g. OP-THUNDER): ")
    if not tag: tag = f"OP-{uuid.uuid4().hex[:6].upper()}"
    
    status = input("Enter Status (SUCCESS/ONGOING) [default SUCCESS]: ")
    status = status.upper() if status else "SUCCESS"
    
    year = str(datetime.datetime.now().year)
    
    duration = input("Enter recording duration in seconds (default 30): ")
    duration = int(duration) if duration else 30
    
    record_audio(duration)
    transcript = transcribe_local()
    save_and_push(title, tag, status, year, transcript)
    
    # Cleanup
    if os.path.exists(AUDIO_TMP):
        os.remove(AUDIO_TMP)
    
    print("\n[SYSTEM] MISSION COMPLETE. TERMINATING SESSION.")

if __name__ == "__main__":
    main()
