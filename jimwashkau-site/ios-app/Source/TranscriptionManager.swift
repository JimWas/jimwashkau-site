import Foundation
import Speech

class TranscriptionManager: ObservableObject {
    private let speechRecognizer = SFSpeechRecognizer(locale: Locale(identifier: "en-US"))
    @Published var transcription: String = ""
    @Published var isTranscribing: Bool = false

    func transcribeAudio(url: URL, completion: @escaping (String?) -> Void) {
        isTranscribing = true
        let request = SFSpeechURLRecognitionRequest(url: url)
        
        speechRecognizer?.recognitionTask(with: request) { (result, error) in
            if let error = error {
                print("Transcription error: \(error)")
                self.isTranscribing = false
                completion(nil)
                return
            }
            
            if let result = result {
                if result.isFinal {
                    self.transcription = result.bestTranscription.formattedString
                    self.isTranscribing = false
                    completion(self.transcription)
                }
            }
        }
    }
    
    func requestPermissions() {
        SFSpeechRecognizer.requestAuthorization { authStatus in
            switch authStatus {
            case .authorized:
                print("Speech recognition authorized")
            case .denied, .restricted, .notDetermined:
                print("Speech recognition not authorized")
            @unknown default:
                fatalError()
            }
        }
    }
}
