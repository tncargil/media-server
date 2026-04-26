import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
        <Router>
            <div className="app-container">
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/upload" element={<UploadPage URL={URL} />} />
                    <Route
                        path="/player"
                        element={
                            <PlayerPage
                                selectedFile={selectedFile}
                                setSelectedFile={setSelectedFile}
                                files={files}
                                URL={URL}
                            />
                        }
                    />
                    <Route
                        path="/download"
                        element={<DownloadPage files={files} URL={URL} />}
                    />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
