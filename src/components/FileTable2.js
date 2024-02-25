import React, { useState, useEffect } from 'react';
import { Octokit } from '@octokit/rest';

function FileExplorer() {
  const [files, setFiles] = useState([]);
  const [currentPath, setCurrentPath] = useState("");
  
  const fetchFiles = (path = "") => {
    const octokit = new Octokit({
        auth: "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"
      });
    
      const owner = "artafps";
      const repo = "repository";
    octokit.paginate("GET /repos/artafps/artafps/contents/:path", {
      owner: owner,
      repo: repo,
      path: path
    }).then(files => {
      setFiles(files);
      setCurrentPath(path);
    }).catch(err => {
      console.error("Error getting file list:", err);
    });
  };
  useEffect(() => {
    

    // تابع برای دریافت فایل‌ها و پوشه‌ها از آدرس موردنظر
    

    // برای نمایش فایل‌ها و پوشه‌ها در ریشه مخزن
    fetchFiles();

  }, []);

  // تابع برای ورود به یک پوشه جدید
  const enterFolder = (folderName) => {
    const newPath = currentPath ? `${currentPath}/${folderName}` : folderName;
    fetchFiles(newPath);
  };

  return (
    <div>
      <h2>File Explorer</h2>
      <p>Current Path: {currentPath || "Root"}</p>
      <ul>
        {files.map(file => (
          <li key={file.path} onClick={() => file.type === "dir" && enterFolder(file.name)}>
            {file.type === "dir" ? (
              <strong>{file.name}</strong>
            ) : (
              <span>{file.name}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FileExplorer;