import React, { useState } from 'react';
import axiosInstance from './axios'; // Adjust the path if needed

const UploadCSV = ({ onUploadSuccess }) => {
  const [file, setFile] = useState(null);

  const onFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const onFileUpload = () => {
    if (!file) {
      alert('Please select a file first.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    axiosInstance
      .post('/uploadCSV', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then((response) => {
        alert('File successfully uploaded');
        onUploadSuccess();
      })
      .catch((error) => {
        console.error('Upload error:', error);
        alert('Error uploading file');
      });
  };

  return (
    <div>
      <input type="file" onChange={onFileChange} />
      <button onClick={onFileUpload}>Upload!</button>
    </div>
  );
};

export default UploadCSV;
