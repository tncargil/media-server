export const LandingPage = ({ setView }) => (
    <div>
        <h1>Media Manager</h1>
        <div className="landing-buttons">
            <button onClick={() => setView("upload")}>Upload</button>
            <button onClick={() => setView("download")}>Download</button>
            <button onClick={() => setView("player")}>Watch Videos</button>
        </div>
    </div>
);
