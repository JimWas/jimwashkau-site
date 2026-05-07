import os
import uuid
import datetime
import select
import sounddevice as sd
import sys
import termios
import tty
import numpy as np
from scipy.io.wavfile import write
import whisper
from git import Repo
import subprocess

# Configuration
LOG_DIR = "../src/content/logs"
AUDIO_DIR = "../public/audio"
APP_TSX_PATH = "../src/App.tsx"
AUDIO_TMP_WAV = "temp_mission.wav"
SAMPLE_RATE = 44100
REPO_PATH = "../.."

def wait_for_enter_to_stop():
    """Read a single Return keypress while audio capture is active."""
    if not sys.stdin.isatty():
        input()
        return

    fd = sys.stdin.fileno()
    old_settings = termios.tcgetattr(fd)

    try:
        tty.setcbreak(fd)
        while True:
            readable, _, _ = select.select([sys.stdin], [], [], 0.2)
            if not readable:
                continue

            key = sys.stdin.read(1)
            if key in ("\n", "\r"):
                print()
                return
            if key == "\x03":
                raise KeyboardInterrupt
    finally:
        termios.tcsetattr(fd, termios.TCSADRAIN, old_settings)

def update_app_tsx(tag, filename):
    print(f"[{datetime.datetime.now().strftime('%H:%M:%S')}] [SYSTEM] UPDATING FRONT-END REGISTRY (App.tsx)...")
    try:
        with open(APP_TSX_PATH, "r") as f:
            content = f.read()
        
        # Simple variable name from tag (e.g. OP-THUNDER -> opThunder)
        clean_tag = tag.replace("-", " ")
        parts = clean_tag.split()
        if not parts: return False
        
        var_name = parts[0].lower() + "".join(x.capitalize() for x in parts[1:])
        
        # 1. Add import
        import_line = f"import {var_name} from './content/logs/{filename}?raw';"
        if import_line not in content:
            print(f"[DEBUG] Adding import for {var_name}...")
            # Find the last import and insert after it
            last_import_idx = content.rfind("import ")
            end_of_last_import = content.find(";", last_import_idx) + 1
            content = content[:end_of_last_import] + f"\n{import_line}" + content[end_of_last_import:]
            
        # 2. Add to MOCK_MODULES
        mock_entry = f"  './content/logs/{filename}': {var_name},"
        if mock_entry not in content:
            print(f"[DEBUG] Adding {filename} to MOCK_MODULES...")
            # Find MOCK_MODULES opening and insert
            mock_start = content.find("const MOCK_MODULES: Record<string, string> = {")
            mock_insert_pos = content.find("{", mock_start) + 1
            content = content[:mock_insert_pos] + f"\n{mock_entry}" + content[mock_insert_pos:]
            
        with open(APP_TSX_PATH, "w") as f:
            f.write(content)
        print(f"[{datetime.datetime.now().strftime('%H:%M:%S')}] [SYSTEM] FRONT-END REGISTRY UPDATED: {tag}")
        return True
    except Exception as e:
        print(f"[ERROR] FAILED TO UPDATE App.tsx: {e}")
        return False

# Load the local model (first time will download ~75MB)
print(f"[{datetime.datetime.now().strftime('%H:%M:%S')}] [SYSTEM] INITIALIZING LOCAL AI (WHISPER TINY - HIGH SPEED)...")
model = whisper.load_model("tiny")
print(f"[{datetime.datetime.now().strftime('%H:%M:%S')}] [DEBUG] Whisper model loaded successfully.")

def record_audio_manual():
    print(f"\n[{datetime.datetime.now().strftime('%H:%M:%S')}] [SYSTEM] INITIATING RECORDING...")
    print("[SYSTEM] SPEAK MISSION BRIEFING NOW...")
    print("[SYSTEM] PRESS ENTER TO STOP RECORDING...")
    
    recording = []
    
    def callback(indata, frames, time, status):
        if status:
            print(f"[{datetime.datetime.now().strftime('%H:%M:%S')}] [AUDIO STATUS] {status}")
        recording.append(indata.copy())

    try:
        print(f"[{datetime.datetime.now().strftime('%H:%M:%S')}] [DEBUG] Opening audio input stream (Sample Rate: {SAMPLE_RATE})...")
        with sd.InputStream(samplerate=SAMPLE_RATE, channels=1, callback=callback):
            print(f"[{datetime.datetime.now().strftime('%H:%M:%S')}] [DEBUG] Stream active. Capturing audio...")
            wait_for_enter_to_stop()
        print(f"[{datetime.datetime.now().strftime('%H:%M:%S')}] [DEBUG] Stream closed by user.")

        if not recording:
            print(f"[{datetime.datetime.now().strftime('%H:%M:%S')}] [ERROR] NO AUDIO DATA CAPTURED. Check microphone permissions.")
            return False

        print(f"[{datetime.datetime.now().strftime('%H:%M:%S')}] [DEBUG] Concatenating {len(recording)} audio chunks...")
        audio_data = np.concatenate(recording, axis=0)
        print(f"[{datetime.datetime.now().strftime('%H:%M:%S')}] [DEBUG] Writing temporary WAV file: {AUDIO_TMP_WAV}")
        write(AUDIO_TMP_WAV, SAMPLE_RATE, audio_data)
        print(f"[{datetime.datetime.now().strftime('%H:%M:%S')}] [SYSTEM] RECORDING COMPLETE.\n")
        return True
    except Exception as e:
        print(f"[{datetime.datetime.now().strftime('%H:%M:%S')}] [ERROR] RECORDING FAILED: {e}")
        return False

def save_as_mp3_direct(tag):
    mp3_filename = f"{tag.lower()}.mp3"
    mp3_path = os.path.join(AUDIO_DIR, mp3_filename)
    
    print(f"[{datetime.datetime.now().strftime('%H:%M:%S')}] [SYSTEM] CONVERTING TO MP3 (via ffmpeg): {mp3_path}")
    
    try:
        print(f"[DEBUG] Executing ffmpeg command...")
        result = subprocess.run([
            'ffmpeg', '-y', '-i', AUDIO_TMP_WAV, 
            '-filter:a', 'volume=3.0', 
            '-codec:a', 'libmp3lame', '-qscale:a', '2', 
            mp3_path
        ], check=True, capture_output=True)
        print(f"[{datetime.datetime.now().strftime('%H:%M:%S')}] [DEBUG] ffmpeg conversion successful.")
        return f"/audio/{mp3_filename}"
    except subprocess.CalledProcessError as e:
        print(f"[{datetime.datetime.now().strftime('%H:%M:%S')}] [ERROR] FFMPEG CONVERSION FAILED: {e.stderr.decode()}")
        return None

def transcribe_local():
    print(f"[{datetime.datetime.now().strftime('%H:%M:%S')}] [SYSTEM] ANALYZING MISSION DATA (LOCAL AI)...")
    print(f"[DEBUG] Handing off {AUDIO_TMP_WAV} to Whisper...")
    result = model.transcribe(AUDIO_TMP_WAV)
    print(f"[{datetime.datetime.now().strftime('%H:%M:%S')}] [DEBUG] Transcription complete. Length: {len(result['text'])} chars.")
    return result["text"]

def save_and_push(title, tag, status, year, date_str, content, audio_url):
    filename = f"{tag.lower()}.md"
    filepath = os.path.join(LOG_DIR, filename)
    print(f"[{datetime.datetime.now().strftime('%H:%M:%S')}] [DEBUG] Preparing Markdown file: {filepath}")

    audio_frontmatter = f'audio: "{audio_url}"' if audio_url else ''

    # Format the Markdown
    markdown = f"""---
title: "{title}"
tag: "{tag}"
status: "{status}"
year: "{year}"
date: "{date_str}"
{audio_frontmatter}
summary: "Mission Log transcribed via local secure voice-to-text."
---

# Mission Briefing
{content.strip()}
"""

    # Save locally
    with open(filepath, "w") as f:
        f.write(markdown)
    print(f"[{datetime.datetime.now().strftime('%H:%M:%S')}] [SYSTEM] MISSION LOG GENERATED: {filepath}")

    # Update Front-end registry
    app_updated = update_app_tsx(tag, filename)

    # Git Operations
    try:
        print(f"[{datetime.datetime.now().strftime('%H:%M:%S')}] [DEBUG] Initializing Git Repo at {REPO_PATH}...")
        repo = Repo(os.path.join(REPO_PATH))
        
        # Paths relative to the repository root
        rel_log_path = os.path.relpath(filepath, REPO_PATH)
        rel_audio_path = os.path.relpath(os.path.join(AUDIO_DIR, f"{tag.lower()}.mp3"), REPO_PATH)
        
        print(f"[DEBUG] Staging files: {rel_log_path}")
        repo.git.add(rel_log_path, force=True)
        if audio_url:
            print(f"[DEBUG] Staging audio: {rel_audio_path}")
            repo.git.add(rel_audio_path, force=True)
        
        if app_updated:
            rel_app_path = "jimwashkau-site/src/App.tsx"
            print(f"[DEBUG] Staging App.tsx: {rel_app_path}")
            repo.git.add(rel_app_path, force=True)
            
        print(f"[DEBUG] Committing changes...")
        repo.index.commit(f"Auto-mission log: {tag} (with audio)")
        
        print(f"[{datetime.datetime.now().strftime('%H:%M:%S')}] [SYSTEM] PUSHING TO GITHUB (MAY HANG IF AUTH REQUIRED)...")
        origin = repo.remote(name='origin')
        origin.push()
        print(f"[{datetime.datetime.now().strftime('%H:%M:%S')}] [SYSTEM] MISSION LOG & AUDIO DEPLOYED TO SECTOR: GitHub")
    except Exception as e:
        print(f"[{datetime.datetime.now().strftime('%H:%M:%S')}] [ERROR] DEPLOYMENT FAILED: {e}")

def main():
    print("\n--- JIMWASHKAU.COM MISSION RECORDER v2.1 (FIXED FOR PYTHON 3.14) ---")
    
    # Ensure ffmpeg is installed
    try:
        subprocess.run(['ffmpeg', '-version'], capture_output=True, check=True)
    except:
        print("[ERROR] FFMPEG NOT FOUND. PLEASE RUN: brew install ffmpeg")
        return

    # Ensure a valid title is provided
    title = ""
    while not title.strip():
        title = input("Enter Mission Title: ")
        if not title.strip():
            print("[SYSTEM] TITLE IS REQUIRED. PLEASE ENTER A MISSION TITLE.")
    
    tag = input("Enter Mission Tag (e.g. OP-THUNDER, no spaces): ")
    # Simple sanitization to prevent long filenames
    tag = "".join([c if c.isalnum() else "-" for c in tag]).strip("-")
    if not tag or len(tag) > 20: 
        tag = f"OP-{uuid.uuid4().hex[:6].upper()}"
        print(f"[SYSTEM] GENERATED SAFE TAG: {tag}")
    
    status = input("Enter Status (SUCCESS/ONGOING) [default SUCCESS]: ")
    status = status.upper() if status else "SUCCESS"
    
    now = datetime.datetime.now()
    year = str(now.year)
    date_str = now.strftime("%Y-%m-%d %H:%M:%S")
    
    if not record_audio_manual():
        print("[SYSTEM] MISSION ABORTED DUE TO RECORDING ERROR.")
        return
    
    mp3_url = save_as_mp3_direct(tag)
    transcript = transcribe_local()
    save_and_push(title, tag, status, year, date_str, transcript, mp3_url)
    
    # Cleanup
    if os.path.exists(AUDIO_TMP_WAV):
        os.remove(AUDIO_TMP_WAV)
    
    print("\n[SYSTEM] MISSION COMPLETE. TERMINATING SESSION.")

if __name__ == "__main__":
    main()
