import os
import uuid
import datetime
import sounddevice as sd
import numpy as np
from scipy.io.wavfile import write
import whisper
from git import Repo
import subprocess

# Configuration
LOG_DIR = "src/content/logs"
AUDIO_DIR = "public/audio"
AUDIO_TMP_WAV = "tools/temp_mission.wav"
SAMPLE_RATE = 44100
REPO_PATH = "."

# Load the local model (first time will download ~75MB)
print("[SYSTEM] INITIALIZING LOCAL AI (WHISPER TINY - HIGH SPEED)...")
model = whisper.load_model("tiny")

def record_audio_manual():
    print(f"\n[SYSTEM] INITIATING RECORDING...")
    print("[SYSTEM] SPEAK MISSION BRIEFING NOW...")
    print("[SYSTEM] PRESS ENTER TO STOP RECORDING...")
    
    recording = []
    
    def callback(indata, frames, time, status):
        if status:
            print(status)
        recording.append(indata.copy())

    with sd.InputStream(samplerate=SAMPLE_RATE, channels=1, callback=callback):
        input()  # Wait for Enter to stop

    audio_data = np.concatenate(recording, axis=0)
    write(AUDIO_TMP_WAV, SAMPLE_RATE, audio_data)
    print("[SYSTEM] RECORDING COMPLETE.\n")

def save_as_mp3_direct(tag):
    mp3_filename = f"{tag.lower()}.mp3"
    mp3_path = os.path.join(AUDIO_DIR, mp3_filename)
    
    print(f"[SYSTEM] CONVERTING TO MP3 (via ffmpeg): {mp3_path}")
    
    # Direct ffmpeg call to avoid pydub/audioop dependencies in Python 3.13/3.14
    try:
        subprocess.run([
            'ffmpeg', '-y', '-i', AUDIO_TMP_WAV, 
            '-codec:a', 'libmp3lame', '-qscale:a', '2', 
            mp3_path
        ], check=True, capture_output=True)
        return f"/audio/{mp3_filename}"
    except subprocess.CalledProcessError as e:
        print(f"[ERROR] FFMPEG CONVERSION FAILED: {e.stderr.decode()}")
        return None

def transcribe_local():
    print("[SYSTEM] ANALYZING MISSION DATA (LOCAL AI)...")
    result = model.transcribe(AUDIO_TMP_WAV)
    return result["text"]

def save_and_push(title, tag, status, year, content, audio_url):
    filename = f"{tag.lower()}.md"
    filepath = os.path.join(LOG_DIR, filename)

    audio_frontmatter = f'audio: "{audio_url}"' if audio_url else ''

    # Format the Markdown
    markdown = f"""---
title: "{title}"
tag: "{tag}"
status: "{status}"
year: "{year}"
{audio_frontmatter}
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
        if audio_url:
            repo.git.add(os.path.join(AUDIO_DIR, f"{tag.lower()}.mp3"))
        repo.index.commit(f"Auto-mission log: {tag} (with audio)")
        origin = repo.remote(name='origin')
        origin.push()
        print(f"[SYSTEM] MISSION LOG & AUDIO DEPLOYED TO SECTOR: GitHub")
    except Exception as e:
        print(f"[ERROR] DEPLOYMENT FAILED: {e} (Is your GitHub SSH/token setup?)")

def main():
    print("\n--- JIMWASHKAU.COM MISSION RECORDER v2.1 (FIXED FOR PYTHON 3.14) ---")
    
    # Ensure ffmpeg is installed
    try:
        subprocess.run(['ffmpeg', '-version'], capture_output=True, check=True)
    except:
        print("[ERROR] FFMPEG NOT FOUND. PLEASE RUN: brew install ffmpeg")
        return

    title = input("Enter Mission Title: ")
    if not title: title = "UNDESIGNATED MISSION"
    
    tag = input("Enter Mission Tag (e.g. OP-THUNDER): ")
    if not tag: tag = f"OP-{uuid.uuid4().hex[:6].upper()}"
    
    status = input("Enter Status (SUCCESS/ONGOING) [default SUCCESS]: ")
    status = status.upper() if status else "SUCCESS"
    
    year = str(datetime.datetime.now().year)
    
    record_audio_manual()
    
    mp3_url = save_as_mp3_direct(tag)
    transcript = transcribe_local()
    save_and_push(title, tag, status, year, transcript, mp3_url)
    
    # Cleanup
    if os.path.exists(AUDIO_TMP_WAV):
        os.remove(AUDIO_TMP_WAV)
    
    print("\n[SYSTEM] MISSION COMPLETE. TERMINATING SESSION.")

if __name__ == "__main__":
    main()
