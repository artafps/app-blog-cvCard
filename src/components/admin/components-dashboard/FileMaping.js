import React, { useState, useEffect, Fragment } from 'react';
import { Octokit } from '@octokit/rest';
import axios from 'axios';
import { toast } from 'react-toastify';
import { getFileContent } from '../../../utils/getFileGit';

function FileMaping({ editFile }) {
  const [files, setFiles] = useState([]);
  const OwnerName = localStorage.getItem('Owner');
  const RepoName = localStorage.getItem('Repo');
  const accessToken = localStorage.getItem('AC');
  const [OpenFolder, setOpenFolder] = useState('');
  const [fileContent, setFileContent] = useState('');
  const [filePath, setfilePath] = useState('');
  const [Sha, setSha] = useState('');


  const handleContentChange = (event) => {
    setFileContent(event.target.value);
  };
  const handleGetFileData = (file) => {
    const filePath = `https://api.github.com/repos/${OwnerName}/${RepoName}/contents/${file.path}`;
    setfilePath(filePath)
    getFileContent(filePath).then((res) => {
      const binaryData = decodeURIComponent(escape(atob(res.content)));
      setFileContent(binaryData)
      setSha(res.sha)
      console.log('File content:', res);
    })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
  const getData = () => {
    const octokit = new Octokit({
      auth: accessToken
    });
    const owner = OwnerName;
    const repo = RepoName;

    octokit.paginate(`GET /repos/${OwnerName}/${RepoName}/contents${OpenFolder}`, {
      owner: owner,
      repo: repo,
      path: ""
    }).then(files => {
      console.log(files)
      setFiles(files);
    }).catch(err => {
      console.error("Error getting file list:", err);
    });
  }
  useEffect(() => {
    getData()
  }, [OpenFolder]);
  useEffect(() => {
    getData()
  }, []);
  const handleDelete = (path, sha) => {

    console.log(path, sha)
    const octokit = new Octokit({
      auth: accessToken
    });

    const owner = OwnerName;
    const repo = RepoName;


    octokit.repos.deleteFile({
      owner: owner,
      repo: repo,
      path: path,
      message: "Delete file",
      sha: sha
    }).then(response => {
      console.log("File deleted:", response.data);
      setFiles(prevFiles => prevFiles.filter(file => file.path !== path));
      if (files.length === 0) {
        setOpenFolder('')
      }
      toast.success('File Deleted Successfully!')
    }).catch(err => {
      console.error("Error deleting file:", err);
      toast.error('Error deleting file!')
    });
  };
  const formatFileSize = (size) => {
    if (size >= 1024 * 1024 * 1024) {
      return `${(size / (1024 * 1024 * 1024)).toFixed(2)} GB`;
    } else if (size >= 1024 * 1024) {
      return `${(size / (1024 * 1024)).toFixed(2)} MB`;
    } else if (size >= 1024) {
      return `${(size / 1024).toFixed(2)} KB`;
    } else {
      return `${size} bytes`;
    }
  };
  const handleEditeFile = () => {
    setfilePath('')
    setFileContent('')
    setSha('')
    setFiles([]);
    editFile(filePath, fileContent, Sha, accessToken).then(res => {
      getData()
    }).catch(err => {
      getData()
    })

  }
  return (
    <Fragment>
      <div class="card">
        <div class="card-body">
          <div className="row"><div className="col-sm-12"><table id="datatable4" className="display dataTable" style={{ width: '100%' }} role="grid" aria-describedby="datatable4_info">
            <thead>
              <tr role="row"><th className="" >Name File</th>
                <th>Format</th>
                <th>Size</th>
                <th>Edite File</th>
                <th>Delete File</th>
              </tr>
            </thead>
            <tbody>
              {files.map((file) => {
                return (
                  <tr key={file.path} role="row" className="odd">
                    <td className="_1">{file.name}</td>
                    <td>{file.name.split('.')[1] !== undefined ? <span class="badge rounded-pill badge-primary">{file.name.split('.')[1]}</span> : 'Folder'}</td>
                    <td> <span class="badge rounded-pill badge-secondary">{formatFileSize(file.size)}</span></td>
                    {file.name.split('.')[1] !== undefined ? <td><button onClick={() => handleGetFileData(file)} type="button" class="btn btn-secondary">Edite</button></td>
                      : <td colspan="2"><button type="button" class="btn btn-primary" onClick={() => { setOpenFolder(OpenFolder + "/" + file.name) }}>Open Folder</button></td>}
                    {file.name.split('.')[1] !== undefined ? <td><button onClick={() => { handleDelete(file.path, file.sha) }} type="button" class="btn btn-danger">Delete</button></td>
                      : null}
                  </tr>
                )
              })}

            </tbody>
            <tfoot>
              {console.log(OpenFolder)}
              <br />
              {OpenFolder !== "" ? <button type="button" class="btn btn-primary" onClick={() => { setOpenFolder(OpenFolder.substring(0, OpenFolder.lastIndexOf('/'))) }}>Previous Folder</button>
                : <button disabled type="button" class="btn btn-primary" onClick={() => { setOpenFolder(OpenFolder.substring(0, OpenFolder.lastIndexOf('/'))) }}>Previous Folder</button>}
            </tfoot>
          </table></div></div>
          {/* <div className="row"><div className="col-sm-12 col-md-5"><div className="dataTables_info" id="datatable4_info" role="status" aria-live="polite">Showing 1 to 2 of 2 entries (filtered from 57 total entries)</div></div><div className="col-sm-12 col-md-7"><div className="dataTables_paginate paging_simple_numbers" id="datatable4_paginate"><ul className="pagination"><li className="paginate_button page-item previous disabled" id="datatable4_previous"><a href="#" aria-controls="datatable4" data-dt-idx={0} tabIndex={0} className="page-link">Previous</a></li><li className="paginate_button page-item active"><a href="#" aria-controls="datatable4" data-dt-idx={1} tabIndex={0} className="page-link">1</a></li><li className="paginate_button page-item next disabled" id="datatable4_next"><a href="#" aria-controls="datatable4" data-dt-idx={2} tabIndex={0} className="page-link">Next</a></li></ul></div>
          </div></div> */}


        </div></div>
      {Sha !== '' && filePath !== '' ? (<div>
        <div class="row">
          <div class="col">
            <div class="card">
              <div class="card-body">
                <label htmlFor="fileName">File Content:</label>
                <textarea onChange={handleContentChange} id="fileName" value={fileContent} type="text" style={{ height: 300 }} class="form-control form-control-solid-bordered" aria-describedby="..." placeholder="if(TRUE){}" > </textarea>
                <br />
                <button onClick={handleEditeFile} type="button" class="btn btn-success">Edite File</button>
              </div>
            </div>
          </div>
        </div>
      </div >) : null}

    </Fragment>
  );
}

export default FileMaping;