import { useNavigate } from "react-router-dom";

export const LandingPage = () => {
    const navigate = useNavigate();

    return (
        <div>
            <h1>Media Manager</h1>
            <div className="landing-buttons">
                <button onClick={() => navigate("/upload")}>Upload</button>
                <button onClick={() => navigate("/download")}>Download</button>
                <button onClick={() => navigate("/player")}>
                    Watch Videos
                </button>
            </div>
        </div>
    );
};
