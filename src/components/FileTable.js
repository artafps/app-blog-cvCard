import React, { useState, useEffect } from 'react';
import { Octokit } from '@octokit/rest';

function FileTable() {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const octokit = new Octokit({
      auth: "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"
    });

    const owner = "owner";
    const repo = "repository";

    octokit.paginate("GET /repos/artafps/artafps/contents/:path", {
      owner: owner,
      repo: repo,
      path: ""
    }).then(files => {
      setFiles(files);
    }).catch(err => {
      console.error("Error getting file list:", err);
    });
  }, []);

  const handleDelete = (path, sha) => {
    const octokit = new Octokit({
      auth: "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"
    });

    const owner = "artafps";
    const repo = "artafps";

    octokit.repos.deleteFile({
      owner: owner,
      repo: repo,
      path: path,
      message: "Delete file",
      sha: sha
    }).then(response => {
      console.log("File deleted:", response.data);
      // Remove the deleted file from the state
      setFiles(prevFiles => prevFiles.filter(file => file.path !== path));
    }).catch(err => {
      console.error("Error deleting file:", err);
    });
  };

  return (
    <table>
      <thead>
        <tr>
          <th>File Name</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {files.map(file => (
          <tr key={file.path}>
            <td>{file.name}</td>
            <td><button onClick={() => handleDelete(file.path, file.sha)}>Delete</button></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default FileTable;