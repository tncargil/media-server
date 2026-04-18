import { useState, useEffect } from "react";
import { LandingPage } from "./components/LandingPage";
import { PlayerPage } from "./components/PlayerPage";
import { DownloadPage } from "./components/DownloadPage";
import { UploadPage } from "./components/UploadPage";

function App() {
    const [view, setView] = useState("home");
    const [files, setFiles] = useState([]);
    const [error, setError] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const URL = import.meta.env.VITE_API_BASE_URL;

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

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                width: "100vw",
                margin: 0,
                padding: 0,
            }}
        >
            {view === "home" && <LandingPage setView={setView} />}
            {view === "upload" && <UploadPage setView={setView} />}
            {view === "player" && (
                <PlayerPage
                    setView={setView}
                    selectedFile={selectedFile}
                    setSelectedFile={setSelectedFile}
                    files={files}
                    URL={URL}
                />
            )}
            {view === "download" && <DownloadPage />}
        </div>
    );
}

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
