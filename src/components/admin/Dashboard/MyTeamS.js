
import axios from "axios";
import Dashboard from "../dashboard";
import { Octokit } from "@octokit/rest";
import { toast } from "react-toastify";
import { useEffect, useRef, useState } from "react";
import { getFileContent } from "../../../utils/getFileGit";
import { fileToBase64 } from "../../../utils/fileToBase64";

const MyTeamS = () => {

    const handleGetFileContent = async (fileUrl) => {
        try {
            const response = await axios.get(fileUrl);
            return response.data; // محتوای فایل در اینجا بازگردانده می‌شود
        } catch (error) {
            console.error('Error fetching file content:', error);
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
            if (DATAGIT.Team.Status === "") {
                setSTATUSTeam(false)
            } else if (DATAGIT.Team.Status === "false") {
                setSTATUSTeam(false)
            } else {
                setSTATUSTeam(true)
            }
            setTITLE(DATAGIT.Team.Title)
            setITEMSTeam(DATAGIT.Team.Arr)
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


    const [STATUSTeam, setSTATUSTeam] = useState(false);
    const [TITLE, setTITLE] = useState();

    const [Name, setName] = useState("");
    const [Gitlab, setGitlab] = useState("");
    const [Github, setGithub] = useState("");
    const [Tel, setTel] = useState("");
    const [Ins, setIns] = useState("");
    const [Twit, setTwit] = useState("");
    const [Lid, setLid] = useState("");
    const [Drib, setDrib] = useState("");
    const [Disc, setDisc] = useState("");

    const [Progress, setProgress] = useState(0);

    const input = useRef(null)
    const [File, setFile] = useState(null);
    const [ITEMSTeam, setITEMSTeam] = useState([]);


    const handleChangeSTATUSTeam = async (events) => {

        let Data = localStorage.getItem('DATAGITBACK')
        if (Data === null) {
            DATAGITARRY.Team.Status = String(events)
            localStorage.setItem('DATAGITBACK', JSON.stringify(DATAGITARRY))
            setSTATUSTeam(events)
        } else {
            const newData = JSON.parse(Data)
            newData.Team.Status = String(events)
            localStorage.setItem('DATAGITBACK', JSON.stringify(newData))
            setSTATUSTeam(events)
        }
        Data = localStorage.getItem('DATAGITBACK')
        if (JSON.stringify(DATAGITARRY) !== Data) {
            setONCHANGESAVE(true)
        } else {
            setONCHANGESAVE(false)
        }
    }
    const handleChangeTITLETeam = async (events) => {
        let Data = localStorage.getItem('DATAGITBACK')
        if (Data === null) {
            DATAGITARRY.Team.Title = String(events)
            localStorage.setItem('DATAGITBACK', JSON.stringify(DATAGITARRY))
            setTITLE(events)
        } else {
            const newData = JSON.parse(Data)
            newData.Team.Title = String(events)
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

    const handleChangeTeamITEMS = async () => {
        if (!input && Name.trim() === '' ) {
            // check Items get user
            toast.error('Hello, please fill in the link section and upload the icon file to complete the operation')
        }
        try {
            var events = `https://api.github.com/repos/${OwnerName}/${RepoName}/contents/Team/jpg/Team-f-${File.name}`
            var icon = `https://raw.githubusercontent.com/${OwnerName}/${RepoName}/main/Team/jpg/Team-f-${File.name}`
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
                        "Name": Name,
                        "Gitlab": Gitlab,
                        "Github": Github,
                        "Tel": Tel,
                        "Ins": Ins,
                        "Twit": Twit,
                        "Lid": Lid,
                        "Drib": Drib,
                        "Disc": Disc
                    }
                    if (d === null) {
                        DATAGITARRY.Team.Arr = [item]
                        localStorage.setItem('DATAGITBACK', JSON.stringify(DATAGITARRY))
                    } else {
                        let Data = JSON.parse(d)
                        const socialHeader = Data.Team.Arr
                        socialHeader.push(item)
                        setITEMSTeam(socialHeader)
                        const newData = Data
                        newData.Team.Arr = socialHeader
                        localStorage.setItem('DATAGITBACK', JSON.stringify(newData))
                    }
                    setTimeout(() => {
                        setProgress(100)
                        setFile(null)
                        setName('')
                        setGitlab('')
                        setGithub('')
                        setTel('')
                        setIns('')
                        setTwit('')
                        setLid('')
                        setDrib('')
                        setDisc('')
                        HANDLESAVE()
                        setProgress(0)
                    }, 5000);
                }).catch(err => {
                    console.log('put err:', err)
                    toast.error('Error Upload  Check Console!')
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
    const handleDeleteITEM_Team = async (id) => {
        var events = `https://api.github.com/repos/${OwnerName}/${RepoName}/contents/${id.split(`https://raw.githubusercontent.com/${OwnerName}/${RepoName}/main/`)[1]}`
        const data2 = await getFileContent(events)
        var d = localStorage.getItem('DATAGITBACK')
        if (d === null) {
            const newDataSocial = DATAGITARRY.Team.Arr.filter(item => item.ImageURI !== id)
            DATAGITARRY.Team.Arr = newDataSocial
            localStorage.setItem('DATAGITBACK', JSON.stringify(DATAGITARRY))
            HANDLESAVE()
        } else {
            let Data = JSON.parse(d)
            const newDataSocial = Data.Team.Arr.filter(item => item.ImageURI !== id)
            Data.Team.Arr = newDataSocial
            setITEMSTeam(Data.Team.Arr)
            localStorage.setItem('DATAGITBACK', JSON.stringify(Data))
            HANDLESAVE()
        }
        setTimeout(() => {
            handleDelete(data2.path, data2.sha)
        }, 5000);
    }

    return (<Dashboard title='MyTeam' disc='Edit our team section'>

        {ONCHANGESAVE ? <div class="card" style={{ left: 500, bottom: 20, boxShadow: "5px 5px 100px gray", width: 700, position: 'fixed', zIndex: 10 }}>
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
                        <h5>Status Team</h5>
                    </div>
                </div>
                <br />

                <div class="form-check form-switch">
                    {/* {} } */}
                    <input checked={STATUSTeam} onChange={() => handleChangeSTATUSTeam(!STATUSTeam)} className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
                    <label class="form-check-label" for="flexSwitchCheckDefault">Do you want this section to be displayed on the site?</label>
                </div>
            </div>
        </div>

        <div class="card">
            <div class="card-body">
                <div className="row">
                    <div className="col">
                        <h5>Edit Title Team</h5>
                    </div>
                </div>
                <br />
                <label class="form-check-label" >Title Team</label>
                <input value={TITLE} onChange={e => handleChangeTITLETeam(e.target.value)} type="text" class="form-control" placeholder="Title Team" aria-label="Username" aria-describedby="basic-addon1" />
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

                        {ITEMSTeam.length !== 0 ?
                            ITEMSTeam.map(item => {
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
                                        <span class="widget-payment-request-product-price"><button onClick={() => { handleDeleteITEM_Team(item.ImageURI) }} type="button" class="btn btn-danger"><i class="material-icons">delete_outline</i>Remove</button>     </span>

                                    </div>
                                )
                            })
                            : null}
                        <br />
                        <br />

                        <label class="form-check-label" >Name </label>
                        <div class="input-group mb-3">
                            <input value={Name} onChange={(e) => { setName(e.target.value) }} type="text" className="form-control form-control" id="custom-url" aria-describedby="custom-addon3" />
                            <br />
                            <br />
                        </div>
                        
                        <label class="form-check-label" >Gitlab </label>
                        <div class="input-group mb-3">
                            <input value={Gitlab} onChange={(e) => { setGitlab(e.target.value) }} type="text" className="form-control form-control" id="custom-url" aria-describedby="custom-addon3" />
                            <br />
                            <br />
                        </div>
                        
                        <label class="form-check-label" >Github </label>
                        <div class="input-group mb-3">
                            <input value={Github} onChange={(e) => { setGithub(e.target.value) }} type="text" className="form-control form-control" id="custom-url" aria-describedby="custom-addon3" />
                            <br />
                            <br />
                        </div>

                        <label class="form-check-label" >Telegram </label>
                        <div class="input-group mb-3">
                            <input value={Tel} onChange={(e) => { setTel(e.target.value) }} type="text" className="form-control form-control" id="custom-url" aria-describedby="custom-addon3" />
                            <br />
                            <br />
                        </div>

                        <label class="form-check-label" >Instagram </label>
                        <div class="input-group mb-3">
                            <input value={Ins} onChange={(e) => { setIns(e.target.value) }} type="text" className="form-control form-control" id="custom-url" aria-describedby="custom-addon3" />
                            <br />
                            <br />
                        </div>

                        <label class="form-check-label" >Twiter </label>
                        <div class="input-group mb-3">
                            <input value={Twit} onChange={(e) => { setTwit(e.target.value) }} type="text" className="form-control form-control" id="custom-url" aria-describedby="custom-addon3" />
                            <br />
                            <br />
                        </div>


                        <label class="form-check-label" >Linkedin </label>
                        <div class="input-group mb-3">
                            <input value={Lid} onChange={(e) => { setLid(e.target.value) }} type="text" className="form-control form-control" id="custom-url" aria-describedby="custom-addon3" />
                            <br />
                            <br />
                        </div>

                        <label class="form-check-label" >Dribbble </label>
                        <div class="input-group mb-3">
                            <input value={Drib} onChange={(e) => { setDrib(e.target.value) }} type="text" className="form-control form-control" id="custom-url" aria-describedby="custom-addon3" />
                            <br />
                            <br />
                        </div>

                        
                        <label class="form-check-label" >Discord </label>
                        <div class="input-group mb-3">
                            <input value={Disc} onChange={(e) => { setDisc(e.target.value) }} type="text" className="form-control form-control" id="custom-url" aria-describedby="custom-addon3" />
                            <br />
                            <br />
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
                        <a onClick={handleChangeTeamITEMS} className="btn btn-primary flex-grow-1 m-l-xxs">Add Social Media Link</a>
                    </div>
                </div>
            </div>
        </div>





    </Dashboard>);
}
export default MyTeamS;