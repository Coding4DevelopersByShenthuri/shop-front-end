import React, { useState } from 'react';
import { HiOutlineCloudUpload } from 'react-icons/hi';

const Uploads = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setUploadStatus('Please select a file first.');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      // Replace 'your-api-endpoint' with the actual API endpoint for file uploads.
      const response = await fetch('your-api-endpoint', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setUploadStatus('File uploaded successfully!');
      } else {
        setUploadStatus('Failed to upload file.');
      }
    } catch (error) {
      setUploadStatus('An error occurred during upload.');
    }
  };

  return (
    <div className="upload-container">
      <h2>Upload File</h2>
      <div className="upload-input">
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleUpload}>
          <HiOutlineCloudUpload size={24} />
          Upload
        </button>
      </div>
      {uploadStatus && <p>{uploadStatus}</p>}
    </div>
  );
};

export default Uploads;
