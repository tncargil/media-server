import React, { useState, useEffect } from 'react';

function App() {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8080/list')
      .then(response => {
        if(!response.ok) {
          throw new Error('Failed to recieve response from backend')
        }
        return response.json();
      })
      .then(data => setFiles(data))
      .catch(err => {
        console.error("error: ", err);
        setError(err.message);
      });
  
}, []);

  return (
        <div style={{ padding: '20px' }}>
            <h2>Folder Files</h2>
            {error && <p style={{ color: 'red' }}>Error: {error}</p>}
            <ul>
                {files.map((fileName, index) => (
                    <div key={index}>{fileName}</div>
                ))}
            </ul>
        </div>
    );

}
export default App;
