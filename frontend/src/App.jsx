import { useState, useEffect } from "react";
import "./App.css";
import { LandingPage } from "./components/LandingPage";
import { PlayerPage } from "./components/PlayerPage";
import { DownloadPage } from "./components/DownloadPage";
import { UploadPage } from "./components/UploadPage";

function App() {
    const [view, setView] = useState("home");
    const [files, setFiles] = useState([]);
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
        <div className="app-container">
            {view === "home" && <LandingPage setView={setView} />}
            {view === "upload" && <UploadPage setView={setView} URL={URL} />}
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

export default App;
