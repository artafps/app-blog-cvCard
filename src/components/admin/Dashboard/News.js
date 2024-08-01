import axios from "axios";
import Dashboard from "../dashboard";
import { Octokit } from "@octokit/rest";
import { toast } from "react-toastify";
import { useEffect, useRef, useState } from "react";
import { getFileContent } from "../../../utils/getFileGit";
import { fileToBase64 } from "../../../utils/fileToBase64";
import cfg from '../../../Config.json'
import { useNavigate } from "react-router";

const News = () => {
    const navigate = useNavigate()

    const handleGetFileContent = async (fileUrl) => {
        try {
            const response = await axios.get(fileUrl);
            return response.data; // محتوای فایل در اینجا بازگردانده می‌شود
        } catch (error) {
            console.error('Error fetching file content:', error);
            if(error.response.status===401){
                localStorage.clear()
                navigate(`${cfg.imgURI}/login`)
            }
            throw error; // ارور ممکن است برای مدیریت خطاها بازگردانده شود
        }
    };

    const handleDelete = (path, sha) => {
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
            toast.success('File Deleted Successfully!')
        }).catch(err => {
            console.error("Error deleting file:", err);
            toast.error('Error deleting file!')
            if(err.response.status===401){
                localStorage.clear()
                navigate(`${cfg.imgURI}/login`)
            }
        });
    };




    const Lang = localStorage.getItem('selectLanguage');

    const configNameFile =`Config-Web-${Lang}.json`

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
            console.log(DATAGIT)
            setSha(res.sha)
            if (DATAGIT.News.Status === "") {
                setSTATUSNEWS(false)
            } else if (DATAGIT.News.Status === "false") {
                setSTATUSNEWS(false)
            } else {
                setSTATUSNEWS(true)
            }
            setTITLE(DATAGIT.News.Title)
            setITEMSNEWS(DATAGIT.News.Arr)
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


    const [STATUSNEWS, setSTATUSNEWS] = useState(false);
    const [TITLE, setTITLE] = useState();

    const [TopTitle, setTopTitle] = useState("");
    const [SubTitle, setSubTitle] = useState("");
    const [Direction, setDirection] = useState("");
    const [BtnText, setBtnText] = useState("");
    const [LinkBtn, setLinkBtn] = useState("");

    const [Progress, setProgress] = useState(0);

    const input = useRef(null)
    const [File, setFile] = useState(null);
    const [ITEMSNEWS, setITEMSNEWS] = useState([]);


    const handleChangeSTATUSNEWS = async (events) => {

        let Data = localStorage.getItem('DATAGITBACK')
        if (Data === null) {
            DATAGITARRY.News.Status = String(events)
            localStorage.setItem('DATAGITBACK', JSON.stringify(DATAGITARRY))
            setSTATUSNEWS(events)
        } else {
            const newData = JSON.parse(Data)
            newData.News.Status = String(events)
            localStorage.setItem('DATAGITBACK', JSON.stringify(newData))
            setSTATUSNEWS(events)
        }
        Data = localStorage.getItem('DATAGITBACK')
        if (JSON.stringify(DATAGITARRY) !== Data) {
            setONCHANGESAVE(true)
        } else {
            setONCHANGESAVE(false)
        }
    }
    const handleChangeTITLENEWS = async (events) => {
        let Data = localStorage.getItem('DATAGITBACK')
        if (Data === null) {
            DATAGITARRY.News.Title = String(events)
            localStorage.setItem('DATAGITBACK', JSON.stringify(DATAGITARRY))
            setTITLE(events)
        } else {
            const newData = JSON.parse(Data)
            newData.News.Title = String(events)
            localStorage.setItem('DATAGITBACK', JSON.stringify(newData))
            setTITLE(events)
        }
        Data = localStorage.getItem('DATAGITBACK')
        if (JSON.stringify(DATAGITARRY) !== Data) {
            setONCHANGESAVE(true)
        } else {
            setONCHANGESAVE(false)
        }
    }

    const handleChangeNEWSITEMS = async () => {
        if (!input && TopTitle.trim() === '' &&
            SubTitle.trim() === '' && Direction.trim() === '' &&
            BtnText.trim() === '' && LinkBtn.trim() === '') {
            // check Items get user
            toast.error('Hello, please fill in the link section and upload the icon file to complete the operation')
        }
        try {
            var events = `https://api.github.com/repos/${OwnerName}/${RepoName}/contents/news/jpg/NEWS-f-${File.name}`
            var icon = `https://raw.githubusercontent.com/${OwnerName}/${RepoName}/main/news/jpg/NEWS-f-${File.name}`
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
                        "ImageURI": icon,
                        "TopTitle": TopTitle,
                        "SubTitle": SubTitle,
                        "Direction": Direction,
                        "BtnText": BtnText,
                        "LinkBtn": LinkBtn
                    }
                    if (d === null) {
                        console.log("1")
                        DATAGITARRY.News.Arr = [item]
                        localStorage.setItem('DATAGITBACK', JSON.stringify(DATAGITARRY))
                    } else {
                        let Data = JSON.parse(d)
                        const socialHeader = Data.News.Arr
                        socialHeader.push(item)
                        setITEMSNEWS(socialHeader)
                        const newData = Data
                        newData.News.Arr = socialHeader
                        localStorage.setItem('DATAGITBACK', JSON.stringify(newData))
                    }
                    setTimeout(() => {
                        setProgress(100)
                        setFile(null)
                        setTopTitle('')
                        setSubTitle('')
                        setDirection('')
                        setBtnText('')
                        setLinkBtn('')
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
    const handleDeleteITEM_NEWS = async (id) => {
        var events = `https://api.github.com/repos/${OwnerName}/${RepoName}/contents/${id.split(`https://raw.githubusercontent.com/${OwnerName}/${RepoName}/main/`)[1]}`
        const data2 = await getFileContent(events)
        var d = localStorage.getItem('DATAGITBACK')
        if (d === null) {
            const newDataSocial = DATAGITARRY.News.Arr.filter(item => item.ImageURI !== id)
            DATAGITARRY.News.Arr = newDataSocial
            localStorage.setItem('DATAGITBACK', JSON.stringify(DATAGITARRY))
            HANDLESAVE()
        } else {
            let Data = JSON.parse(d)
            const newDataSocial = Data.News.Arr.filter(item => item.ImageURI !== id)
            Data.News.Arr = newDataSocial
            setITEMSNEWS(Data.News.Arr)
            localStorage.setItem('DATAGITBACK', JSON.stringify(Data))
            HANDLESAVE()
        }
        setTimeout(() => {
            handleDelete(data2.path, data2.sha)
        }, 5000);
    }
    return (<Dashboard title='News' disc='Edit the news section'>
      {ONCHANGESAVE ? <div class="card" >
            <div class="card-body" style={{ display: "flex", justifyContent: 'space-between' }}><div>Click the Save button to save the information ؟</div>
                <div>
                    <button onClick={HANDLESAVE} type="button" class="btn btn-outline-success m-2">Save</button>
                    <button onClick={() => {
                        getData()
                        setONCHANGESAVE(false)
                    }} type="button" class="btn btn-outline-danger">Return</button></div></div></div>
            : null}


        <div class="card">
            <div class="card-body">
                <div className="row">
                    <div className="col">
                        <h5>Status News</h5>
                    </div>
                </div>
                <br />

                <div class="form-check form-switch">
                    {/* {} } */}
                    <input checked={STATUSNEWS} onChange={() => handleChangeSTATUSNEWS(!STATUSNEWS)} className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
                    <label class="form-check-label" for="flexSwitchCheckDefault">Do you want this section to be displayed on the site?</label>
                </div>
            </div>
        </div>

        <div class="card">
            <div class="card-body">
                <div className="row">
                    <div className="col">
                        <h5>Edit Title News</h5>
                    </div>
                </div>
                <br />
                <label class="form-check-label" >Title News</label>
                <input value={TITLE} onChange={e => handleChangeTITLENEWS(e.target.value)} type="text" class="form-control" placeholder="Title News" aria-label="Username" aria-describedby="basic-addon1" />
            </div>
        </div>

        <div className="card">
            <div className=" widget widget-payment-request">
                <div className="card-header">
                    <h5 className="card-title">Social Media Header</h5>
                </div>
                <div class="form-check form-switch">
                    <label class="form-check-label" > Add your social media. </label>
                </div>
                <div className="card-body">
                    <div className="widget-payment-request-container">

                        {ITEMSNEWS.length !== 0 ?
                            ITEMSNEWS.map(item => {
                                return (
                                    <div style={{ borderRadius: 20, marginBottom: 10 }} className={item.Dark ? "widget-payment-request-author bg-dark" : "widget-payment-request-author"}>
                                        <div className="avatar m-r-sm">
                                            <img src={item.ImageURI} alt />
                                        </div>
                                        <div className="widget-payment-request-author-info">
                                            <span className="widget-payment-request-author-name">{item.TopTitle}</span>
                                            <span className="widget-payment-request-author-about">{item.SubTitle}</span>
                                        </div>
                                        <div className="widget-payment-request-author-info">
                                            <span className="widget-payment-request-author-about">{item.ImageURI.split(`https://raw.githubusercontent.com/${OwnerName}/${RepoName}/main/`)[1]}</span>
                                        </div>
                                        <span class="widget-payment-request-product-price"><button onClick={() => { handleDeleteITEM_NEWS(item.ImageURI) }} type="button" class="btn btn-danger"><i class="material-icons">delete_outline</i>Remove</button>     </span>

                                    </div>
                                )
                            })
                            : null}
                        <br />
                        <br />

                        <label class="form-check-label" >Top Title Text</label>
                        <div class="input-group mb-3">
                            <input value={TopTitle} onChange={(e) => { setTopTitle(e.target.value) }} type="text" className="form-control form-control" id="custom-url" aria-describedby="custom-addon3" />
                            <br />
                            <br />
                        </div>
                        <label class="form-check-label" >Sub Title Text</label>
                        <div class="input-group mb-3">
                            <input value={SubTitle} onChange={(e) => { setSubTitle(e.target.value) }} type="text" className="form-control form-control" id="custom-url" aria-describedby="custom-addon3" />
                            <br />
                            <br />
                        </div>
                        <label class="form-check-label" >Direction Text</label>
                        <div class="input-group mb-3">
                            <input value={Direction} onChange={(e) => { setDirection(e.target.value) }} type="text" className="form-control form-control" id="custom-url" aria-describedby="custom-addon3" />
                            <br />
                            <br />
                        </div>
                        <label class="form-check-label" >Btn Text</label>
                        <div class="input-group mb-3">

                            <input value={BtnText} onChange={(e) => { setBtnText(e.target.value) }} type="text" className="form-control form-control" id="custom-url" aria-describedby="custom-addon3" />
                            <br />
                            <br />
                        </div>
                        <label class="form-check-label" >Btn Link</label>
                        <div class="input-group mb-3">
                            <span class="input-group-text input-group-text" id="custom-addon3">https://</span>
                            <input value={LinkBtn} onChange={(e) => { setLinkBtn(e.target.value) }} type="text" className="form-control form-control" id="custom-url" aria-describedby="custom-addon3" />

                        </div>
                        <br />
                    </div>
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
                            {
                                Progress !== 0 ?
                                    <div>
                                        <span class="btn btn-light alert-title"><div class="spinner-border text-primary" role="status">
                                            <span class="visually-hidden">Loading...</span>
                                        </div> Uploading . . . .</span>

                                        <div className="progress">
                                            <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuemax={100} style={{ width: `${Progress}%` }} />
                                        </div>
                                    </div>
                                    : null
                            }

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


                    <div className="widget-payment-request-actions m-t-md d-flex">
                        <a onClick={handleChangeNEWSITEMS} className="btn btn-primary flex-grow-1 m-l-xxs">Add Social Media Link</a>
                    </div>
                </div>
            </div>
        </div>






    </Dashboard>);
}
export default News;