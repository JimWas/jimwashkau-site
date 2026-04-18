# Mission Recorder iOS App

This is a native SwiftUI application that allows you to record mission briefings on your iPhone, transcribes them using Apple's on-device Speech framework, and automatically publishes them to your website via the GitHub API.

## Setup Instructions

1.  **Open in Xcode:**
    - Open Xcode on your Mac.
    - Choose **"Create a new Xcode project"**.
    - Select **iOS > App** and click Next.
    - Product Name: **MissionRecorder**
    - Interface: **SwiftUI**
    - Language: **Swift**
    - Click Next and save it anywhere.

2.  **Import Source Files:**
    - Drag all files from the `ios-app/Source` folder into your new Xcode project's file navigator.
    - When prompted, check **"Copy items if needed"** and ensure your target is selected.
    - You can delete the default `ContentView.swift` and `MissionRecorderApp.swift` created by Xcode.

3.  **Configure Permissions (Info.plist):**
    - Click on your project in the file navigator, go to the **Info** tab.
    - Add the following keys with descriptive strings:
        - `Privacy - Microphone Usage Description`: "Required to record your mission briefings."
        - `Privacy - Speech Recognition Usage Description`: "Required to transcribe your voice into text."

4.  **GitHub Personal Access Token (PAT):**
    - Go to **GitHub Settings > Developer Settings > Personal Access Tokens (classic)**.
    - Generate a new token with the `repo` scope.
    - Launch the app on your iPhone (or Simulator), tap the **Settings (Gear)** icon, and paste your token.

## How to Publish
1.  Enter a **Mission Title** and **Tag** (e.g., OP-THUNDER).
2.  Tap the **Blue Mic** button to start recording.
3.  Tap the **Red Stop** button to finish. The app will automatically transcribe your voice.
4.  Review the transcription and tap **TRANSMIT MISSION LOG**.
5.  Your website will automatically rebuild and publish the new log and audio file!
