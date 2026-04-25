import { useState, useEffect } from "react";

export const UploadPage = ({ setView, URL }) => {
    const [file, setFile] = useState(null);

    const handleUploadClick = async () => {
        if (!file) {
            alert("please select a file");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await fetch(`${URL}/upload`, {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                alert("successful upload");
            } else {
                alert("upload failed :'(");
            }
        } catch (error) {
            console.error("Error: ", error);
            alert("error on upload");
        }
    };

    return (
        <div style={{ position: "sticky", top: 0, padding: "20px" }}>
            <button className="home-button" onClick={() => setView("home")}>
                ← home
            </button>
            <h2>Upload Video</h2>
            <input
                type="file"
                accept="video/mp4"
                onChange={(e) => setFile(e.target.files[0])}
            />
            <button onClick={handleUploadClick}>Upload</button>
        </div>
    );
};
