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
LOG_DIR = "../src/content/logs"
AUDIO_DIR = "../public/audio"
APP_TSX_PATH = "../src/App.tsx"
AUDIO_TMP_WAV = "temp_mission.wav"
SAMPLE_RATE = 44100
REPO_PATH = "../.."

def update_app_tsx(tag, filename):
    print(f"[SYSTEM] UPDATING FRONT-END REGISTRY (App.tsx)...")
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
            # Find the last import and insert after it
            last_import_idx = content.rfind("import ")
            end_of_last_import = content.find(";", last_import_idx) + 1
            content = content[:end_of_last_import] + f"\n{import_line}" + content[end_of_last_import:]
            
        # 2. Add to MOCK_MODULES
        mock_entry = f"  './content/logs/{filename}': {var_name},"
        if mock_entry not in content:
            # Find MOCK_MODULES opening and insert
            mock_start = content.find("const MOCK_MODULES: Record<string, string> = {")
            mock_insert_pos = content.find("{", mock_start) + 1
            content = content[:mock_insert_pos] + f"\n{mock_entry}" + content[mock_insert_pos:]
            
        with open(APP_TSX_PATH, "w") as f:
            f.write(content)
        print(f"[SYSTEM] FRONT-END REGISTRY UPDATED: {tag}")
        return True
    except Exception as e:
        print(f"[ERROR] FAILED TO UPDATE App.tsx: {e}")
        return False

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

    # Update Front-end registry
    app_updated = update_app_tsx(tag, filename)

    # Git Operations
    try:
        # Use the actual repository root (the folder containing the .git directory)
        repo = Repo(os.path.join(REPO_PATH))
        
        # Paths relative to the repository root
        rel_log_path = os.path.relpath(filepath, REPO_PATH)
        rel_audio_path = os.path.relpath(os.path.join(AUDIO_DIR, f"{tag.lower()}.mp3"), REPO_PATH)
        
        repo.git.add(rel_log_path)
        if audio_url:
            repo.git.add(rel_audio_path)
        
        if app_updated:
            rel_app_path = os.path.relpath(os.path.join(LOG_DIR, APP_TSX_PATH), REPO_PATH)
            # Actually use the correct path to App.tsx relative to repo root
            # Since APP_TSX_PATH is relative to tools/
            # and tools/ is jimwashkau-site/tools/
            # repo root is JimWas-dotComSite/
            # App.tsx is JimWas-dotComSite/jimwashkau-site/src/App.tsx
            rel_app_path = "jimwashkau-site/src/App.tsx"
            repo.git.add(rel_app_path)
            
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
