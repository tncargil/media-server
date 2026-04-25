import { useState, useEffect } from "react";

export const DownloadPage = ({ setView, files, URL }) => {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleUploadClick = async (file) => {
        if (!file) {
            alert("please select a file");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await fetch(
                `${URL}/download?fileName=${encodeURIComponent(file)}`,
                { method: "GET" },
            );

            if (response.ok) {
                const blob = await response.blob();

                const downloadURL = window.URL.createObjectURL(blob);
                const link = document.createElement("a");
                link.href = downloadURL;
                link.setAttribute("download", file);
                document.body.appendChild(link);
                link.click();

                link.parentNode.removeChild(link);
                window.URL.revokeObjectURL(downloadURL);

                alert("successful upload");
            } else {
                alert(`upload failed for ${file} :'(`);
            }
        } catch (error) {
            console.error("Error: ", error);
            alert("error on download");
        }
    };

    return (
        <div>
            <button className="home-button" onClick={() => setView("home")}>
                ← home
            </button>

            <div style={{ width: "100%" }}>
                <h2 style={{ fontSize: "1.2rem", marginBottom: "10px" }}>
                    Folder Files
                </h2>
                <ul style={{ listStyle: "none", padding: 0 }}>
                    {files.map((f, i) => (
                        <li
                            key={i}
                            onClick={() => handleUploadClick(f)}
                            style={listStyle(selectedFile === f)}
                        >
                            {f}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

const listStyle = (isActive) => ({
    cursor: "pointer",
    padding: "10px",
    margin: "5px 0",
    background: isActive ? "#e0e0e0" : "#f4f4f4",
    borderRadius: "4px",
    border: "1px solid #ddd",
});
