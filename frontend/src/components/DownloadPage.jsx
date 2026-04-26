import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FileSearch } from "../hooks/FileFilter";

export const DownloadPage = ({ setView, files, URL }) => {
    const navigate = useNavigate();
    const [selectedFile, setSelectedFile] = useState(null);
    const { searchTerm, setSearchTerm, filteredFiles } = FileSearch(files);

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
            <button className="home-button" onClick={() => navigate("/")}>
                ←
            </button>

            <div>
                <input
                    className="search-bar"
                    type="text"
                    placeholder="Search files..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <ul style={{ listStyle: "none", padding: 0 }}>
                    {filteredFiles.map((f, i) => (
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
    background: isActive ? "#C0CADF" : "#232333",
    borderRadius: "4px",
    border: "1px solid #ddd",
});
