import SwiftUI

struct ContentView: View {
    @StateObject private var audioRecorder = AudioRecorder()
    @StateObject private var transcriptionManager = TranscriptionManager()
    
    @State private var title: String = ""
    @State private var tag: String = ""
    @State private var status: String = "SUCCESS"
    @State private var githubToken: String = ""
    @State private var isUploading: Bool = false
    @State private var showSettings: Bool = false
    
    let repoOwner = "JimWas"
    let repoName = "jimwashkau-site"

    var body: some View {
        NavigationView {
            ZStack {
                Color.black.edgesIgnoringSafeArea(.all)
                
                VStack(spacing: 30) {
                    // Mission Status Header
                    HStack {
                        Text("MISSION STATUS:")
                            .font(.system(size: 14, weight: .bold, design: .monospaced))
                            .foregroundColor(.gray)
                        Text(audioRecorder.isRecording ? "RECORDING..." : "READY")
                            .font(.system(size: 14, weight: .bold, design: .monospaced))
                            .foregroundColor(audioRecorder.isRecording ? .red : .green)
                        Spacer()
                    }
                    .padding(.horizontal)

                    // Title & Tag Fields
                    VStack(alignment: .leading, spacing: 10) {
                        TextField("MISSION TITLE", text: $title)
                            .padding()
                            .background(Color.white.opacity(0.1))
                            .foregroundColor(.white)
                            .cornerRadius(5)
                        
                        TextField("MISSION TAG (e.g. OP-THUNDER)", text: $tag)
                            .padding()
                            .background(Color.white.opacity(0.1))
                            .foregroundColor(.white)
                            .cornerRadius(5)
                    }
                    .padding(.horizontal)
                    
                    // Status Toggle
                    Picker("Status", selection: $status) {
                        Text("SUCCESS").tag("SUCCESS")
                        Text("ONGOING").tag("ONGOING")
                    }
                    .pickerStyle(SegmentedPickerStyle())
                    .padding(.horizontal)

                    // Record Button
                    Button(action: {
                        if audioRecorder.isRecording {
                            audioRecorder.stopRecording()
                            if let url = audioRecorder.audioURL {
                                transcriptionManager.transcribeAudio(url: url) { _ in }
                            }
                        } else {
                            audioRecorder.startRecording()
                        }
                    }) {
                        Circle()
                            .fill(audioRecorder.isRecording ? Color.red : Color.blue)
                            .frame(width: 100, height: 100)
                            .overlay(
                                Image(systemName: audioRecorder.isRecording ? "stop.fill" : "mic.fill")
                                    .foregroundColor(.white)
                                    .font(.system(size: 40))
                            )
                            .shadow(color: audioRecorder.isRecording ? .red.opacity(0.5) : .blue.opacity(0.5), radius: 20)
                    }
                    .padding()

                    // Transcription Preview
                    if !transcriptionManager.transcription.isEmpty {
                        ScrollView {
                            Text(transcriptionManager.transcription)
                                .foregroundColor(.white)
                                .font(.system(size: 16, design: .monospaced))
                                .padding()
                                .frame(maxWidth: .infinity, alignment: .leading)
                                .background(Color.white.opacity(0.05))
                        }
                        .frame(maxHeight: 150)
                        .padding(.horizontal)
                    }

                    // Upload Button
                    Button(action: uploadMission) {
                        HStack {
                            if isUploading {
                                ProgressView().progressViewStyle(CircularProgressViewStyle(color: .white))
                            } else {
                                Image(systemName: "paperplane.fill")
                                Text("TRANSMIT MISSION LOG")
                            }
                        }
                        .font(.system(size: 16, weight: .bold, design: .monospaced))
                        .foregroundColor(.white)
                        .frame(maxWidth: .infinity)
                        .padding()
                        .background(Color.blue)
                        .cornerRadius(5)
                    }
                    .disabled(isUploading || tag.isEmpty || transcriptionManager.transcription.isEmpty)
                    .padding(.horizontal)

                    Spacer()
                }
                .padding(.top)
            }
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .principal) {
                    Text("JIMWASHKAU.COM")
                        .font(.system(size: 18, weight: .black, design: .monospaced))
                        .foregroundColor(.white)
                }
                ToolbarItem(placement: .navigationBarTrailing) {
                    Button(action: { showSettings = true }) {
                        Image(systemName: "gearshape.fill")
                            .foregroundColor(.white)
                    }
                }
            }
            .sheet(isPresented: $showSettings) {
                SettingsView(token: $githubToken)
            }
        }
        .onAppear {
            transcriptionManager.requestPermissions()
        }
    }

    func uploadMission() {
        guard !githubToken.isEmpty else { return }
        isUploading = true
        
        let client = GitHubClient(token: githubToken, owner: repoOwner, repo: repoName)
        let year = String(Calendar.current.component(.year, from: Date()))
        let missionTag = tag.isEmpty ? "OP-\(UUID().uuidString.prefix(6).uppercased())" : tag
        
        // 1. Prepare Markdown
        let audioPath = "/audio/\(missionTag.lowercased()).m4a"
        let markdown = """
        ---
        title: "\(title.isEmpty ? "UNDESIGNATED MISSION" : title)"
        tag: "\(missionTag)"
        status: "\(status)"
        year: "\(year)"
        audio: "\(audioPath)"
        summary: "Mission Log transcribed via iOS Secure Voice-to-Text."
        ---

        # Mission Briefing
        \(transcriptionManager.transcription)
        """
        
        guard let mdData = markdown.data(using: .utf8),
              let audioURL = audioRecorder.audioURL,
              let audioData = try? Data(contentsOf: audioURL) else {
            isUploading = false
            return
        }

        // 2. Upload Markdown
        client.uploadFile(path: "src/content/logs/\(missionTag.lowercased()).md", content: mdData, message: "Auto-mission log: \(missionTag)") { success in
            if success {
                // 3. Upload Audio
                client.uploadFile(path: "public/audio/\(missionTag.lowercased()).m4a", content: audioData, message: "Auto-audio: \(missionTag)") { _ in
                    DispatchQueue.main.async {
                        isUploading = false
                        title = ""
                        tag = ""
                        transcriptionManager.transcription = ""
                    }
                }
            } else {
                DispatchQueue.main.async { isUploading = false }
            }
        }
    }
}

struct SettingsView: View {
    @Binding var token: String
    @Environment(\.presentationMode) var presentationMode

    var body: some View {
        NavigationView {
            Form {
                Section(header: Text("GITHUB AUTHENTICATION")) {
                    SecureField("Personal Access Token", text: $token)
                    Text("Requires 'repo' scope permissions.")
                        .font(.caption)
                }
            }
            .navigationTitle("SETTINGS")
            .toolbar {
                Button("DONE") { presentationMode.wrappedValue.dismiss() }
            }
        }
    }
}
