import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const UploadPage = ({ setView, URL }) => {
    const navigate = useNavigate();
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
            <button className="home-button" onClick={() => navigate("/")}>
                ← home
            </button>
            <h2>Upload File</h2>
            <input type="file" onChange={(e) => setFile(e.target.files[0])} />
            <button onClick={handleUploadClick}>Upload</button>
        </div>
    );
};
