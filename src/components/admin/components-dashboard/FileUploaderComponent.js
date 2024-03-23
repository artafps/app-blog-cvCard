import React, { useState } from 'react';
import axios from 'axios';

function FileUploaderComponent() {
  const [fileName, setFileName] = useState('');
  const [fileContent, setFileContent] = useState('');
  const accessToken = localStorage.getItem('AC');
  const handleNameChange = (event) => {
    setFileName(event.target.value);
  };


  const handleContentChange = (event) => {
    setFileContent(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (fileName.trim() !== '' && fileContent.trim() !== '' && fileName.trim().split('.')[1] !== undefined && fileName.trim().split('.')[1] !== null) {
        
        const data = {
          message: "Create new file",
          content: btoa(unescape(encodeURIComponent(fileContent)))
        };

        const response = await axios.put(`https://api.github.com/repos/artafps/artafps/contents/${fileName}`, data, {
          headers: {
            Authorization: `token ${accessToken}`
          }
        });

        console.log('File created:', response.data);
        alert('File created successfully!');
        setFileName('')
        setFileContent('')
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
      <div class="row">
        <div class="col">
          <div class="card">
            <div class="card-body">
              <div>
                <label htmlFor="fileName">File Name:</label>
                <input onChange={handleNameChange} id="fileName" value={fileName} type="text" class="form-control form-control-solid-bordered" aria-describedby="..." placeholder="artafps/index.js" />
              </div>
              <br />
              <label htmlFor="fileName">File Content:</label>
              <textarea onChange={handleContentChange} id="fileName" value={fileContent} type="text" style={{height:300}} class="form-control form-control-solid-bordered" aria-describedby="..." placeholder="if(TRUE){}" > </textarea>
              
              <br />
              <button onClick={handleSubmit} type="button" class="btn btn-success">Create File</button>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
}

export default FileUploaderComponent;
