export const PlayerPage = ({
    setView,
    files,
    selectedFile,
    setSelectedFile,
    URL,
}) => (
    <div
        style={{
            padding: "10px",
            maxwidth: "800px",
            margin: "0 auto",
            position: "fixed",
            top: "0",
        }}
    >
        <button
            onClick={() => setView("home")}
            style={{ marginbottom: "15px" }}
        >
            ← home
        </button>

        <div
            style={{
                display: "flex",
                flexDirection: "column",
                gap: "20px",
            }}
        >
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
                    {files.map((f, i) => (
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

const listStyle = (isActive) => ({
    cursor: "pointer",
    padding: "10px",
    margin: "5px 0",
    background: isActive ? "#e0e0e0" : "#f4f4f4",
    borderRadius: "4px",
    border: "1px solid #ddd",
});
