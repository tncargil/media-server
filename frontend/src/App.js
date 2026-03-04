import React, { useState, useEffect } from "react";

function App() {
    const [files, setFiles] = useState([]);
    const [error, setError] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);

    useEffect(() => {
        fetch("http://localhost:8080/list")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to recieve response from backend");
                }
                return response.json();
            })
            .then((data) => setFiles(data))
            .catch((err) => {
                console.error("error: ", err);
                setError(err.message);
            });
    }, []);

    return (
        <div style={{ padding: "20px", display: "flex", gap: "40px" }}>
            <div style={{ flex: 1 }}>
                <h2>Folder Files</h2>
                {error && <p style={{ color: "red" }}>Error: {error}</p>}
                <ul style={{ listStyle: "none", padding: 0 }}>
                    {files.map((fileName, index) => (
                        <li
                            key={index}
                            onClick={() => setSelectedFile(fileName)} // Click handler
                            style={{
                                cursor: "pointer",
                                padding: "10px",
                                margin: "5px 0",
                                background:
                                    selectedFile === fileName
                                        ? "#e0e0e0"
                                        : "#f4f4f4",
                                borderRadius: "4px",
                                border: "1px solid #ddd",
                            }}
                        >
                            {fileName}
                        </li>
                    ))}
                </ul>
            </div>

            <div style={{ flex: 2 }}>
                <h2>Video Player</h2>
                {selectedFile ? (
                    <div>
                        <p>
                            Playing: <strong>{selectedFile}</strong>
                        </p>
                        {/* The 'src' points to your Spring Boot streaming endpoint */}
                        <video
                            key={selectedFile} // Re-renders the player when file changes
                            controls
                            width="100%"
                            autoPlay
                        >
                            <source
                                src={`http://localhost:8080/video?fileName=${encodeURIComponent(selectedFile)}`}
                                type="video/mp4"
                            />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                ) : (
                    <p>Click a file on the left to watch</p>
                )}
            </div>
        </div>
    );
}
export default App;
