import { useState, useEffect } from "react";

function App() {
    // Navigation state: 'home', 'upload', or 'player'
    const [view, setView] = useState("home");
    const [files, setFiles] = useState([]);
    const [error, setError] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const URL = import.meta.env.VITE_API_BASE_URL;
    // Fetch files (Moved to a function so we can refresh after upload)
    const fetchFiles = () => {
        fetch(`${URL}/list`)
            .then((res) =>
                res.ok ? res.json() : Promise.reject("Backend error"),
            )
            .then((data) => setFiles(data))
            .catch((err) => setError(err.message));
    };

    useEffect(() => {
        fetchFiles();
    }, []);

    // --- SUB-COMPONENTS FOR DIFFERENT VIEWS ---

    const LandingPage = () => (
        <div style={{ textAlign: "center", marginTop: "100px" }}>
            <h1>Media Manager</h1>
            <div
                style={{
                    display: "flex",
                    gap: "20px",
                    justifyContent: "center",
                }}
            >
                <button onClick={() => setView("upload")} style={buttonStyle}>
                    Upload New Video
                </button>
                <button onClick={() => setView("player")} style={buttonStyle}>
                    Watch Videos
                </button>
            </div>
        </div>
    );

    const UploadPage = () => (
        <div style={{ position: "sticky", top: 0, padding: "20px" }}>
            <button onClick={() => setView("home")}>← Back</button>
            <h2>Upload Video</h2>
            <input type="file" accept="video/mp4" />
            <button
                onClick={() => alert("Logic for Springfield upload goes here!")}
            >
                Upload
            </button>
        </div>
    );

    const PlayerPage = () => (
        <div
            style={{
                padding: "10px",
                maxwidth: "800px",
                margin: "0 auto",
                position: "fixed",
                top: "0",
            }}
        >
            <button
                onClick={() => setView("home")}
                style={{ marginbottom: "15px" }}
            >
                ← home
            </button>

            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px",
                }}
            >
                <div
                    style={{
                        width: "100%",
                        backgroundColor: "#000",
                        borderRadius: "8px",
                        overflow: "hidden",
                    }}
                >
                    {selectedFile ? (
                        <video
                            key={selectedFile}
                            controls
                            width="100%"
                            autoPlay
                            playsInline
                            style={{ display: "block" }}
                        >
                            <source
                                src={`${URL}/video?fileName=${encodeURIComponent(selectedFile)}`}
                                type="video/mp4"
                            />
                        </video>
                    ) : (
                        <div
                            style={{
                                color: "white",
                                padding: "60px",
                                textAlign: "center",
                            }}
                        >
                            <p>Select a video to start watching</p>
                        </div>
                    )}
                </div>

                {/* 2. Folder Files now below */}
                <div style={{ width: "100%" }}>
                    <h2 style={{ fontSize: "1.2rem", marginBottom: "10px" }}>
                        Folder Files
                    </h2>
                    <ul style={{ listStyle: "none", padding: 0 }}>
                        {files.map((f, i) => (
                            <li
                                key={i}
                                onClick={() => setSelectedFile(f)}
                                style={listStyle(selectedFile === f)}
                            >
                                {f}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );

    // --- MAIN RENDER LOGIC ---
    return (
        <div>
            {view === "home" && <LandingPage />}
            {view === "upload" && <UploadPage />}
            {view === "player" && <PlayerPage />}
        </div>
    );
}

// Simple Styles
const buttonStyle = {
    padding: "15px 30px",
    fontSize: "18px",
    cursor: "pointer",
    borderRadius: "8px",
};
const listStyle = (isActive) => ({
    cursor: "pointer",
    padding: "10px",
    margin: "5px 0",
    background: isActive ? "#e0e0e0" : "#f4f4f4",
    borderRadius: "4px",
    border: "1px solid #ddd",
});

export default App;
