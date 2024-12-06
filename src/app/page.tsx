"use client"
import axios from "axios"

export default function Home() {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [caption, setCaption] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files && files.length > 0) {
      const selectedFile = files[0]
      setFile(selectedFile)

      // Create preview URL
      const previewUrl = URL.createObjectURL(selectedFile)
      setPreview(previewUrl)
    }
  }

  const handleCaptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCaption(event.target.value)
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (file) {
      const formData = new FormData()
      if (preview) {
        formData.append("file", preview)
      }
      formData.append("caption", caption)

      try {
        await axios.post("/api/postToInstagram", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        alert("Posted to Instagram successfully!")
        // Reset form after successful post
        setFile(null)
        setPreview(null)
        setCaption("")
      } catch (error) {
        console.error("Error posting to Instagram:", error)
        alert("Error posting to Instagram. Please try again.")
      }
    }
  }

  const clearFile = () => {
    setFile(null)
    setPreview(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold text-center mb-4">Post to Instagram</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="file" className="block text-sm font-medium text-gray-700">Upload Image or Video</label>
            <div className="flex items-center justify-center w-full">
              {!preview ? (
                <label
                  htmlFor="file"
                  className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <span className="text-gray-400">📷</span>
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-500">Image or Video</p>
                  </div>
                  <input
                    id="file"
                    type="file"
                    onChange={handleFileChange}
                    className="hidden"
                    accept="image/*,video/*"
                    required
                    ref={fileInputRef}
                  />
                </label>
              ) : (
                <div className="relative w-full">
                  {file?.type.startsWith('image/') ? (
                    <img src={preview} alt="Preview" className="w-full h-auto rounded-lg" />
                  ) : (
                    <video src={preview} className="w-full h-auto rounded-lg" controls>
                      Your browser does not support the video tag.
                    </video>
                  )}
                  <button
                    type="button"
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
                    onClick={clearFile}
                  >
                    ❌
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="space-y-2">
            <label htmlFor="caption" className="block text-sm font-medium text-gray-700">Caption</label>
            <textarea
              id="caption"
              value={caption}
              onChange={handleCaptionChange}
              placeholder="Enter your caption here..."
              className="min-h-[100px] w-full border border-gray-300 rounded-lg p-2"
              required
            />
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white rounded-lg p-2" disabled={!file}>
            Post to Instagram
          </button>
        </form>
      </div>
    </div>
  );
}
