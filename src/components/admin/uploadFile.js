import { useRef, useState } from "react";
import MainLayoutAdmin from "../layouts/MainLayoutAdmin";
import axios from "axios";
import { fileToBase64 } from "../../utils/fileToBase64";
import { toast } from "react-toastify";
import cfg from '../../Config.json'
import { useNavigate } from "react-router";


const UploadFile = () => {
    const navigate = useNavigate()

    const input = useRef(null)
    const [file, setFile] = useState(null);
    const OwnerName = localStorage.getItem('Owner');
    const RepoName = localStorage.getItem('Repo');
    const accessToken = localStorage.getItem('AC');
    const [fileName, setFileName] = useState('');
    const handleNameChange = (event) => {
        setFileName(event.target.value);
    };
    const handleChange = (event) => {
        console.log(event.target.files[0])
        setFile(event.target.files[0]);
    };
    
    
    const handleUpload = async () => {
        try {
            const formData = new FormData();
            formData.append('file', file);

            var uri = `https://api.github.com/repos/${OwnerName}/${RepoName}/contents/${file.name}`
            if (fileName.trim() !== '') {
                uri = `https://api.github.com/repos/${OwnerName}/${RepoName}/contents/${fileName}/${file.name}`
            }
            console.log(uri)
            const fileContentBase64 = await fileToBase64(file);
            const response = await axios.put(uri, {
                message: 'Upload file',
                content:fileContentBase64 ,
                branch: 'main', // Change the branch name if needed
            }, {
                headers: {
                    Authorization: `token ${accessToken}`,
                },
            });
            setFile(null)
            toast.success('File uploaded successfully!')
        } catch (error) {
            toast.error('Error uploading file! Check The Console')
            if(error.response.status===401){
                localStorage.clear()
                navigate(`${cfg.imgURI}/login`)
            }
            console.error('Error uploading file:', error);
        }
    };
    return (<MainLayoutAdmin title={'Upload File'}>
        <div className="card">
            <div className="card-body">
                {file !== null ? <div class="alert alert-custom" role="alert">
                    <div class="alert-content">
                        <div>
                            <label htmlFor="fileName">File Name:</label>
                            <input onChange={handleNameChange} id="fileName" value={fileName} type="text" class="form-control form-control-solid-bordered" aria-describedby="..." placeholder="artafps/index.js" />
                            <label htmlFor="fileName">{fileName.trim() !== '' ? `https://github.com/${OwnerName}/${RepoName}/${fileName}/${file.name}` : `https://github.com/${OwnerName}/${RepoName}/${file.name}`}</label>
                        </div>
                        <br />
                        <span class="alert-title">{file.name}</span>
                        <span class="alert-text">URL:<a target="_blank" href={URL.createObjectURL(file)}> {URL.createObjectURL(file)} </a></span>
                        <br />
                        <button onClick={handleUpload} type="button" className="btn btn-success">Upload File</button><br />
                    </div>
                </div> : null}

                <div id="dropzone">
                    <form className="dropzone needsclick dz-clickable" onClick={() => input.current.click()}>
                        <div className="dz-message needsclick" >
                            <button type="button" className="dz-button">Drop files here or click to upload.</button><br />
                            <span className="note needsclick">(This is just a demo dropzone. Selected files are <strong>not</strong> actually uploaded.)</span>
                        </div>
                        <input style={{ display: 'none' }} type="file" ref={input} onChange={handleChange} />
                    </form>
                </div>
            </div>
        </div>

    </MainLayoutAdmin>);
}

export default UploadFile;