import Foundation

struct GitHubClient {
    let token: String
    let owner: String
    let repo: String

    func uploadFile(path: String, content: Data, message: String, completion: @escaping (Bool) -> Void) {
        let urlString = "https://api.github.com/repos/\(owner)/\(repo)/contents/\(path)"
        guard let url = URL(string: urlString) else { return }

        let base64Content = content.base64EncodedString()
        
        let body: [String: Any] = [
            "message": message,
            "content": base64Content,
            "branch": "main"
        ]

        var request = URLRequest(url: url)
        request.httpMethod = "PUT"
        request.setValue("token \(token)", forHTTPHeaderField: "Authorization")
        request.setValue("application/vnd.github+json", forHTTPHeaderField: "Accept")
        request.httpBody = try? JSONSerialization.data(withJSONObject: body)

        URLSession.shared.dataTask(with: request) { data, response, error in
            if let httpResponse = response as? HTTPURLResponse, (200...299).contains(httpResponse.statusCode) {
                completion(true)
            } else {
                if let data = data, let responseString = String(data: data, encoding: .utf8) {
                    print("GitHub API Error: \(responseString)")
                }
                completion(false)
            }
        }.resume()
    }
}
