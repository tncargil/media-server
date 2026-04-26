import { useNavigate } from "react-router-dom";
import { FileSearch } from "../hooks/FileFilter";

export const PlayerPage = ({
    setView,
    files,
    selectedFile,
    setSelectedFile,
    URL,
}) => {
    const navigate = useNavigate();
    const { searchTerm, setSearchTerm, filteredFiles } = FileSearch(files);

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
                <div
                    style={{
                        width: "100%",
                        backgroundColor: "#000",
                        borderRadius: "8px",
                        overflow: "hidden",
                    }}
                >
                    {selectedFile ? (
                        <video
                            key={selectedFile}
                            controls
                            width="100%"
                            autoPlay
                            playsInline
                            style={{ display: "block" }}
                        >
                            <source
                                src={`${URL}/video?fileName=${encodeURIComponent(selectedFile)}`}
                                type="video/mp4"
                            />
                        </video>
                    ) : (
                        <div
                            style={{
                                color: "white",
                                padding: "60px",
                                textAlign: "center",
                            }}
                        >
                            <p>Select a video to start watching</p>
                        </div>
                    )}
                </div>

                <div style={{ width: "100%" }}>
                    <h2 style={{ fontSize: "1.2rem", marginBottom: "10px" }}>
                        Folder Files
                    </h2>
                    <ul style={{ listStyle: "none", padding: 0 }}>
                        {filteredFiles
                            .filter((file) =>
                                /\.(mp4|mov|webm|ogv|mkv)$/i.test(file),
                            )
                            .map((f, i) => (
                                <li
                                    key={i}
                                    onClick={() => setSelectedFile(f)}
                                    style={listStyle(selectedFile === f)}
                                >
                                    {f}
                                </li>
                            ))}
                    </ul>
                </div>
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
