import React, { useState } from 'react';
import axios from 'axios';

function FileUploader() {
  const [fileName, setFileName] = useState('');
  const [fileContent, setFileContent] = useState('');

  const handleNameChange = (event) => {
    setFileName(event.target.value);
  };



  const handleContentChange = (event) => {
    setFileContent(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (fileName.trim() !== '' &&  fileContent.trim() !== '') {
        const data = {
          message: "Create new file",
          content: btoa(unescape(encodeURIComponent(fileContent)))
        };

        const response = await axios.put(`https://api.github.com/repos/artafps/artafps/contents/${fileName}`, data, {
          headers: {
            Authorization: `token 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`
          }
        });

        console.log('File created:', response.data);
        alert('File created successfully!');
      } else {
        alert('Please enter file name, file path, and file content.');
      }
    } catch (error) {
      console.error('Error creating file:', error);
      alert('An error occurred while creating the file.');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="fileName">File Name:</label>
          <input
            type="text"
            id="fileName"
            value={fileName}
            onChange={handleNameChange}
          />
        </div>
       
        <div>
          <label htmlFor="fileContent">File Content:</label>
          <textarea
            id="fileContent"
            value={fileContent}
            onChange={handleContentChange}
          />
        </div>
        <button type="submit">Create File</button>
      </form>
    </div>
  );
}

export default FileUploader;
