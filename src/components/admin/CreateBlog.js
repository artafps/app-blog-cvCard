import MainLayoutAdmin from "../layouts/MainLayoutAdmin";
import axios from 'axios';
import { toast } from 'react-toastify';
import { Octokit } from "@octokit/rest";
import { useEffect, useRef, useState } from "react";
import { getFileContent } from "../../utils/getFileGit";
import { fileToBase64 } from "../../utils/fileToBase64";
import cfg from '../../Config.json'
import { useNavigate } from "react-router";

const AddBlog = () => {
    const navigate = useNavigate()

    const handleGetFileContent = async (fileUrl) => {
        try {
            const response = await axios.get(fileUrl);
            return response.data; // محتوای فایل در اینجا بازگردانده می‌شود
        } catch (error) {
            console.error('Error fetching file content:', error);
            throw error; // ارور ممکن است برای مدیریت خطاها بازگردانده شود
        }
    };

   


    const Lang = localStorage.getItem('selectLanguage');

    const configNameFile = `Config-Web-${Lang}.json`

    const accessToken = localStorage.getItem('AC');
    const OwnerName = localStorage.getItem('Owner');
    const RepoName = localStorage.getItem('Repo');

    const [ONCHANGESAVE, setONCHANGESAVE] = useState(false);
    const [Sha, setSha] = useState('');
    const [DATAGITARRY, setDATAGITARRY] = useState();


    const handleGetFileData = (file) => {
        const filePath = `https://api.github.com/repos/${OwnerName}/${RepoName}/contents/${file.path}`;
        handleGetFileContent(filePath).then((res) => {
            const binaryData = decodeURIComponent(escape(atob(res.content)));
            localStorage.setItem('DATAGITBACK', binaryData)
            const DATAGIT = JSON.parse(binaryData)
            setDATAGITARRY(DATAGIT)
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

        octokit.paginate(`GET /repos/${OwnerName}/${RepoName}/contents/configs`, {
            owner: owner,
            repo: repo,
            path: ""
        }).then(files => {
            console.log(files)
            files.map(item => {
                if (item.name === configNameFile) {
                    handleGetFileData(item)
                }
            })
        }).catch(err => {
            console.error("Error getting file list:", err);
            if(err.response.status===401){
                localStorage.clear()
                navigate(`${cfg.imgURI}/login`)
            }
        });
    }
    useEffect(() => {
        getData()
    }, []);



    const editFile = async (fileName, newContent, sha, token) => {
        try {
            const filePath = `https://api.github.com/repos/${OwnerName}/${RepoName}/contents/configs/${fileName}`
            const response = await axios.put(filePath, {
                message: 'Edit file',
                content: btoa(unescape(encodeURIComponent(newContent))),
                sha: sha
            }, {
                headers: {
                    Authorization: `token ${token}`
                }
            });
            toast.success('File edited successfully!')
            return response.data;
        } catch (error) {
            console.error('Error editing file:', error);
            toast.error('Error editing file!')
            if(error.response.status===401){
                localStorage.clear()
                navigate(`${cfg.imgURI}/login`)
            }
            throw error;
        }
    };
    const HANDLESAVE = async () => {
        await editFile(configNameFile, localStorage.getItem('DATAGITBACK'), Sha, accessToken)
        setONCHANGESAVE(false)
        await setTimeout(async () => {
            getData()
        }, 4000);
        setTimeout(async () => {
            const Data = localStorage.getItem('DATAGITBACK')
            if (JSON.stringify(DATAGITARRY) !== Data) {
                //bug is here 
                setONCHANGESAVE(false)
            } else {
                setONCHANGESAVE(false)
            }
        }, 5000);
    }



    const [h1, seth1] = useState("");
    const [Lable, setLable] = useState("");
    const [Category, setCategory] = useState("");
    const [fileContent, setfileContent] = useState("");

    const [Progress, setProgress] = useState(0);

    const input = useRef(null)
    const [File, setFile] = useState(null);


    const handleChangeTeamITEMS = async () => {
        if (!File || fileContent.trim() === '' || h1.trim() === '' || Lable.trim() === '' || Category.trim() === '') {
            // check Items get user
            toast.error('Hello, please fill in the link section and upload the icon file to complete the operation')
        } else {
            try {
                var events = `https://api.github.com/repos/${OwnerName}/${RepoName}/contents/blogs/blogs-f-${File.name}`
                var icon = `https://raw.githubusercontent.com/${OwnerName}/${RepoName}/main/blogs/blogs-f-${File.name}`
                var data = await getFileContent(events)
                //and uploaded file 
                if (!data) {
                    setProgress(10)
                    toast.info('The upload process may take up to a minute due to Github security reasons.\n  Please do not leave the page')
                    const fileContentBase64 = await fileToBase64(File);
                    await axios.put(events, {
                        message: 'Upload file' + File.name,
                        content: fileContentBase64,
                        branch: 'main', // Change the branch name if needed
                    }, {
                        headers: {
                            Authorization: `token ${accessToken}`,
                        },
                    }).then(res => {
                        setProgress(30)
                        toast.success('File Uploaded successfully!')
                        var d = localStorage.getItem('DATAGITBACK')
                        const item = {
                            "h1": h1,
                            "ImageURI": icon,
                            "Content": fileContent,
                            "Lable": Lable,
                            "Category": Category,

                        }
                        if (d === null) {
                            DATAGITARRY.Blog.Arr = [item]
                            localStorage.setItem('DATAGITBACK', JSON.stringify(DATAGITARRY))
                        } else {
                            let Data = JSON.parse(d)
                            const socialHeader = Data.Blog.Arr
                            socialHeader.push(item)
                            const newData = Data
                            newData.Blog.Arr = socialHeader
                            localStorage.setItem('DATAGITBACK', JSON.stringify(newData))
                        }
                        setTimeout(() => {
                            setProgress(100)
                            setFile(null)
                            setfileContent('')
                            seth1('')
                            setLable('')
                            setCategory('')
                            HANDLESAVE()
                            setProgress(0)
                        }, 5000);
                    }).catch(err => {
                        console.log('put err:', err)
                        toast.error('Error Upload  Check Console!')
                        if(err.response.status===401){
                            localStorage.clear()
                            navigate(`${cfg.imgURI}/login`)
                        }
                    });
                } else {
                    toast.warn('You have already selected this file for the logo')
                }
            } catch (error) {
                toast.error('Error uploading file! Check The Console')
                console.error('Error uploading file:', error);
            }
        }
    }
    const handleChange = (event) => {
        if (event.target.files[0].type.split('/')[1] === 'img' || event.target.files[0].type.split('/')[1] === 'jpg' || event.target.files[0].type.split('/')[1] === 'jpeg' || event.target.files[0].type.split('/')[1] === 'png') {
            setFile(event.target.files[0]);
            input.current.value = ''
        } else {
            toast.error("Please enter the logo in img and jpg format.")
            setFile(null);
            input.current.value = ''
        }
    };
    const handleContentChange = (e) => {
        setfileContent(e.target.value)
    }
    return (<MainLayoutAdmin title={'Add Blog'}>
        <div>
            <div class="row">
                <div class="col">
                    <div class="card">
                        <div class="card-body">
                            {File !== null ? <div class="alert alert-custom" role="alert">
                                <div class="alert-content">
                                    <div>
                                        <label htmlFor="fileName2">{`https://github.com/${OwnerName}/${RepoName}/image/social/${File.name}`}</label>
                                    </div>
                                    <br />
                                    <span class="alert-title">{File.name}</span>
                                    <span class="alert-text">URL:<a target="_blank" href={URL.createObjectURL(File)}> {URL.createObjectURL(File)} </a></span>
                                    <br />
                                    {/* onClick={handleUpload} */}
                                    <button onClick={() => setFile(null)} type="button" className="btn btn-danger m-2">Remove File</button>
                                </div>
                            </div> : null}

                            <div id="dropzone">
                                <form className="dropzone needsclick dz-clickable" onClick={() => input.current.click()}>
                                    <div className="dz-message needsclick" >
                                        <button type="button" className="dz-button">Drop files here or click to upload.</button><br />
                                        <button type="button" className="dz-button">50*50 px</button><br />
                                        <span className="note needsclick">(This is just a demo dropzone. Selected files are <strong>not</strong> actually uploaded.)</span>
                                    </div>
                                    <input style={{ display: 'none' }} type="file" ref={input} onChange={handleChange} />
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">

                <div class="col">


                    <div class="card">
                        <div class="card-body">
                            <label htmlFor="fileName">h1 Blog Content MarkDown :</label>
                            <input onChange={(e) => { seth1(e.target.value) }} id="fileName" value={h1} type="text" class="form-control form-control-solid-bordered" aria-describedby="..." placeholder="# hello gyse" />
                            <br />
                            <label htmlFor="fileName">Text Blog Content MarkDown :</label>
                            <textarea onChange={handleContentChange} id="fileName" value={fileContent} type="text" style={{ height: 300 }} class="form-control form-control-solid-bordered" aria-describedby="..." placeholder="hello gyse" > </textarea>
                            <br />
                            <label htmlFor="fileName">Lable Blog Content MarkDown :</label>
                            <input onChange={(e) => { setLable(e.target.value) }} id="fileName" value={Lable} type="text" class="form-control form-control-solid-bordered" aria-describedby="..." placeholder="# Lables" />
                            <br />
                            <label htmlFor="fileName">Category Blog Content MarkDown :</label>
                            <input onChange={(e) => { setCategory(e.target.value) }} id="fileName" value={Category} type="text" class="form-control form-control-solid-bordered" aria-describedby="..." placeholder="# Categorys" />

                            <br />
                            <div class="alert-content">
                                {
                                    Progress !== 0 ?
                                        <div>
                                            <span class="btn btn-light alert-title"><div class="spinner-border text-primary" role="status">
                                                <span class="visually-hidden">Loading...</span>
                                            </div> Uploading . . . .</span>
                                            <br />
                                            <br />
                                            <br />
                                            <br />
                                            <div className="progress">
                                                <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuemax={100} style={{ width: `${Progress}%` }} />
                                            </div>
                                        </div>
                                        : null
                                }  </div><br />
                            <button onClick={handleChangeTeamITEMS} type="button" class="btn btn-success">Add Blog</button>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    </MainLayoutAdmin>);
}

export default AddBlog;