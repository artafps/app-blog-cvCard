
import { useEffect, useRef, useState } from "react";
import Dashboard from "../dashboard";
import axios from "axios";
import { toast } from "react-toastify";
import { Octokit } from "@octokit/rest";
import { getFileContent } from "../../../utils/getFileGit";
import { fileToBase64 } from "../../../utils/fileToBase64";
const SliderS = () => {
    const input = useRef(null)
    const [IMAGEURI1, setIMAGEURI1] = useState(null);
    const input2 = useRef(null)
    const [IMAGEURI2, setIMAGEURI2] = useState(null);
    const [Progress, setProgress] = useState(0);
    const [Progress2, setProgress2] = useState(0);

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


    const handleChange = (event) => {
        if (event.target.files[0].type.split('/')[1] === 'img' || event.target.files[0].type.split('/')[1] === 'jpg' || event.target.files[0].type.split('/')[1] === 'jpeg' || event.target.files[0].type.split('/')[1] === 'png') {
            setIMAGEURI1(event.target.files[0]);
            input.current.value = ''
        } else {
            toast.error("Please enter the logo in img and jpg format.")
            setIMAGEURI1(null);
            input.current.value = ''
        }
    };
    const handleChange2 = (event) => {
        if (event.target.files[0].type.split('/')[1] === 'img' || event.target.files[0].type.split('/')[1] === 'jpg' || event.target.files[0].type.split('/')[1] === 'jpeg' || event.target.files[0].type.split('/')[1] === 'png') {
            setIMAGEURI2(event.target.files[0]);
            input.current.value = ''
        } else {
            toast.error("Please enter the logo in img and jpg format.")
            setIMAGEURI2(null);
            input.current.value = ''
        }
    };

    

    const [STAUSSLIDER, setSTAUSSLIDER] = useState();
    const [H1TEXT, setH1TEXT] = useState();
    const [DESCRIPTION, setDESCRIPTION] = useState();
    const [BTNTEXT, setBTNTEXT] = useState();
    const [LINKBTN, setLINKBTN] = useState();
    
    
    const [TEXTCIRCLE, setTEXTCIRCLE] = useState();
    const [LINKCIRCLE, setLINKCIRCLE] = useState();

    const configNameFile = 'Config-Web-EN.json'

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
            if (DATAGIT.Slider.Status === "") {
                setSTAUSSLIDER(false)
            } else if (DATAGIT.Slider.Status === "false") {
                setSTAUSSLIDER(false)
            } else {
                setSTAUSSLIDER(true)
            }
            setH1TEXT(DATAGIT.Slider.H1Text)
            setDESCRIPTION(DATAGIT.Slider.Description)
            setBTNTEXT(DATAGIT.Slider.BtnText)
            setLINKBTN(DATAGIT.Slider.LinkBtn)
            setTEXTCIRCLE(DATAGIT.Slider.TextCircle)
            setLINKCIRCLE(DATAGIT.Slider.LinkCircle)
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



    const handleUploadIMAGE1 = async (file) => {
        try {

            console.log(file)
            var events = `https://api.github.com/repos/${OwnerName}/${RepoName}/contents/image/IMAGE1-f-${file.name}`
            var icon = `https://raw.githubusercontent.com/${OwnerName}/${RepoName}/main/image/IMAGE1-f-${file.name}`
            // get EVents ? or no create agar bood ke hichi agar nabod besaz
            var data = await getFileContent(events)

            console.log(!data)
            if (!data) {
                setProgress(10)
                toast.info('The upload process may take up to a minute due to Github security reasons.\n  Please do not leave the page')
                var route = `https://api.github.com/repos/${OwnerName}/${RepoName}/contents/${DATAGITARRY.Slider.ImageURI1.split(`https://raw.githubusercontent.com/${OwnerName}/${RepoName}/main/`)[1]}`
                const fileContentBase64 = await fileToBase64(file);
                await axios.put(events, {
                    message: 'Upload file' + file.name,
                    content: fileContentBase64,
                    branch: 'main', // Change the branch name if needed
                }, {
                    headers: {
                        Authorization: `token ${accessToken}`,
                    },
                }).then(res => {
                    setProgress(30)
                    toast.success('File Uploaded successfully!')
                    let Data = localStorage.getItem('DATAGITBACK')
                    if (Data === null) {
                        DATAGITARRY.Slider.ImageURI1 = String(icon)
                        localStorage.setItem('DATAGITBACK', JSON.stringify(DATAGITARRY))
                    } else {
                        const newData = JSON.parse(Data)
                        newData.Slider.ImageURI1 = String(icon)
                        localStorage.setItem('DATAGITBACK', JSON.stringify(newData))
                    }

                    setTimeout(() => {
                        setProgress(70)
                        HANDLESAVE()
                    }, 5000);
                }).catch(err => {
                    console.log('put err:', err)
                    toast.error('Error Upload  Check Console!')
                });

                if (route !== '') {
                    const data2 = await getFileContent(route)
                    if (data2) {
                        setTimeout(() => {
                            setProgress(100)
                            setIMAGEURI1(null)
                            handleDelete(data2.path, data2.sha)
                            setProgress(0)
                        }, 7000);
                    }else{
                        setProgress(100)
                    setIMAGEURI1(null)
                    setProgress(0)
                    }
                }else {
                    setProgress(100)
                    setIMAGEURI1(null)
                    setTimeout(() => {
                        setProgress(0)
                    }, 2000);
                }
            } else {
                toast.warn('You have already selected this file for the Image Right')
            }
        } catch (error) {
            toast.error('Error uploading file! Check The Console')
            console.error('Error uploading file:', error);
        }
    };

    const handleUploadIMAGE2 = async (file) => {
        try {

            console.log(file)
            var events = `https://api.github.com/repos/${OwnerName}/${RepoName}/contents/image/IMAGE1-f-${file.name}`
            var icon = `https://raw.githubusercontent.com/${OwnerName}/${RepoName}/main/image/IMAGE1-f-${file.name}`
            // get EVents ? or no create agar bood ke hichi agar nabod besaz
            var data = await getFileContent(events)

            console.log(!data)
            if (!data) {
                setProgress(10)
                toast.info('The upload process may take up to a minute due to Github security reasons.\n  Please do not leave the page')
                var route = `https://api.github.com/repos/${OwnerName}/${RepoName}/contents/${DATAGITARRY.Slider.ImageURI2.split(`https://raw.githubusercontent.com/${OwnerName}/${RepoName}/main/`)[1]}`
                const fileContentBase64 = await fileToBase64(file);
                await axios.put(events, {
                    message: 'Upload file' + file.name,
                    content: fileContentBase64,
                    branch: 'main', // Change the branch name if needed
                }, {
                    headers: {
                        Authorization: `token ${accessToken}`,
                    },
                }).then(res => {
                    setProgress2(30)
                    toast.success('File Uploaded successfully!')
                    let Data = localStorage.getItem('DATAGITBACK')
                    if (Data === null) {
                        DATAGITARRY.Slider.ImageURI1 = String(icon)
                        localStorage.setItem('DATAGITBACK', JSON.stringify(DATAGITARRY))
                    } else {
                        const newData = JSON.parse(Data)
                        newData.Slider.ImageURI1 = String(icon)
                        localStorage.setItem('DATAGITBACK', JSON.stringify(newData))
                    }
                    setTimeout(() => {
                        setProgress2(70)
                        HANDLESAVE()
                    }, 5000);
                }).catch(err => {
                    console.log('put err:', err)
                    toast.error('Error Upload  Check Console!')
                });

                if (route !== '') {
                    const data2 = await getFileContent(route)
                    if (data2) {
                        setTimeout(() => {
                            setProgress2(100)
                            setIMAGEURI2(null)
                            handleDelete(data2.path, data2.sha)
                            setProgress2(0)
                        }, 7000);
                    }else{
                        setProgress2(100)
                    setIMAGEURI2(null)
                    setProgress2(0)
                    }
                }else {
                    setProgress2(100)
                    setIMAGEURI2(null)
                    setTimeout(() => {
                        setProgress2(0)
                    }, 2000);
                }
            } else {
                toast.warn('You have already selected this file for the Image Left')
            }
        } catch (error) {
            toast.error('Error uploading file! Check The Console')
            console.error('Error uploading file:', error);
        }
    };
    const handleChangeSTATUSSLIDER = async (events) => {

        let Data = localStorage.getItem('DATAGITBACK')
        if (Data === null) {
            DATAGITARRY.Slider.Status = String(events)
            localStorage.setItem('DATAGITBACK', JSON.stringify(DATAGITARRY))
            setSTAUSSLIDER(events)
        } else {
            const newData = JSON.parse(Data)
            newData.Slider.Status = String(events)
            localStorage.setItem('DATAGITBACK', JSON.stringify(newData))
            setSTAUSSLIDER(events)
        }
        Data = localStorage.getItem('DATAGITBACK')
        if (JSON.stringify(DATAGITARRY) !== Data) {
            setONCHANGESAVE(true)
        } else {
            setONCHANGESAVE(false)
        }
    }
    const handleChangeH1TEXTSLIDER = async (events) => {
        let Data = localStorage.getItem('DATAGITBACK')
        if (Data === null) {
            DATAGITARRY.Slider.H1Text = String(events)
            localStorage.setItem('DATAGITBACK', JSON.stringify(DATAGITARRY))
            setH1TEXT(events)
        } else {
            const newData = JSON.parse(Data)
            newData.Slider.H1Text = String(events)
            localStorage.setItem('DATAGITBACK', JSON.stringify(newData))
            setH1TEXT(events)
        }
        Data = localStorage.getItem('DATAGITBACK')
        if (JSON.stringify(DATAGITARRY) !== Data) {
            setONCHANGESAVE(true)
        } else {
            setONCHANGESAVE(false)
        }
    }

    const handleChangeDESCRIPTIONSLIDER = async (events) => {
        let Data = localStorage.getItem('DATAGITBACK')
        if (Data === null) {
            DATAGITARRY.Slider.Description = String(events)
            localStorage.setItem('DATAGITBACK', JSON.stringify(DATAGITARRY))
            setDESCRIPTION(events)
        } else {
            const newData = JSON.parse(Data)
            newData.Slider.Description = String(events)
            localStorage.setItem('DATAGITBACK', JSON.stringify(newData))
            setDESCRIPTION(events)
        }
        Data = localStorage.getItem('DATAGITBACK')
        if (JSON.stringify(DATAGITARRY) !== Data) {
            setONCHANGESAVE(true)
        } else {
            setONCHANGESAVE(false)
        }
    }

    const handleChangeBTNTEXTSLIDER = async (events) => {
        let Data = localStorage.getItem('DATAGITBACK')
        if (Data === null) {
            DATAGITARRY.Slider.BtnText = String(events)
            localStorage.setItem('DATAGITBACK', JSON.stringify(DATAGITARRY))
            setBTNTEXT(events)
        } else {
            const newData = JSON.parse(Data)
            newData.Slider.BtnText = String(events)
            localStorage.setItem('DATAGITBACK', JSON.stringify(newData))
            setBTNTEXT(events)
        }
        Data = localStorage.getItem('DATAGITBACK')
        if (JSON.stringify(DATAGITARRY) !== Data) {
            setONCHANGESAVE(true)
        } else {
            setONCHANGESAVE(false)
        }
    }

    const handleChangeBTNLINKSLIDER = async (events) => {
        let Data = localStorage.getItem('DATAGITBACK')
        if (Data === null) {
            DATAGITARRY.Slider.LinkBtn = String(events)
            localStorage.setItem('DATAGITBACK', JSON.stringify(DATAGITARRY))
            setLINKBTN(events)
        } else {
            const newData = JSON.parse(Data)
            newData.Slider.LinkBtn = String(events)
            localStorage.setItem('DATAGITBACK', JSON.stringify(newData))
            setLINKBTN(events)
        }
        Data = localStorage.getItem('DATAGITBACK')
        if (JSON.stringify(DATAGITARRY) !== Data) {
            setONCHANGESAVE(true)
        } else {
            setONCHANGESAVE(false)
        }
    }

    const handleChangeTEXTCIRCLESLIDER = async (events) => {
        let Data = localStorage.getItem('DATAGITBACK')
        if (Data === null) {
            DATAGITARRY.Slider.TextCircle = String(events)
            localStorage.setItem('DATAGITBACK', JSON.stringify(DATAGITARRY))
            setTEXTCIRCLE(events)
        } else {
            const newData = JSON.parse(Data)
            newData.Slider.TextCircle = String(events)
            localStorage.setItem('DATAGITBACK', JSON.stringify(newData))
            setTEXTCIRCLE(events)
        }
        Data = localStorage.getItem('DATAGITBACK')
        if (JSON.stringify(DATAGITARRY) !== Data) {
            setONCHANGESAVE(true)
        } else {
            setONCHANGESAVE(false)
        }
    }

    const handleChangeLINKCIRCLESLIDER = async (events) => {
        let Data = localStorage.getItem('DATAGITBACK')
        if (Data === null) {
            DATAGITARRY.Slider.LinkCircle = String(events)
            localStorage.setItem('DATAGITBACK', JSON.stringify(DATAGITARRY))
            setLINKCIRCLE(events)
        } else {
            const newData = JSON.parse(Data)
            newData.Slider.LinkCircle = String(events)
            localStorage.setItem('DATAGITBACK', JSON.stringify(newData))
            setLINKCIRCLE(events)
        }
        Data = localStorage.getItem('DATAGITBACK')
        if (JSON.stringify(DATAGITARRY) !== Data) {
            setONCHANGESAVE(true)
        } else {
            setONCHANGESAVE(false)
        }
    }
    return (<Dashboard title='Slider' disc='SliderEdit the home page slider section'>

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
                        <h5>Status Slider</h5>
                    </div>
                </div>
                <br/>

                <div class="form-check form-switch">
                    {/* {} } */}
                    <input checked={STAUSSLIDER} onChange={() => handleChangeSTATUSSLIDER(!STAUSSLIDER)} className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
                    <label class="form-check-label" for="flexSwitchCheckDefault">Do you want this section to be displayed on the site?</label>
                </div>
            </div>
        </div>

        <div class="card">
            <div class="card-body">
                <div className="row">
                    <div className="col">
                        <h5>Edit H1 Text</h5>
                    </div>
                </div>
                <br/>

                <label class="form-check-label" >H1 Text </label>
                <textarea value={H1TEXT} onChange={e => handleChangeH1TEXTSLIDER(e.target.value)} type="text" class="form-control" placeholder="H1 Text" aria-label="Username" aria-describedby="basic-addon1" />
            </div>
        </div>

        <div class="card">
            <div class="card-body">
                <div className="row">
                    <div className="col">
                        <h5>Edit Description</h5>
                    </div>
                </div>
                <br/>

                <label class="form-check-label" >Description </label>
                <textarea value={DESCRIPTION} onChange={e => handleChangeDESCRIPTIONSLIDER(e.target.value)} type="text" class="form-control" placeholder="Description" aria-label="Username" aria-describedby="basic-addon1" />

            </div>
        </div>
        <div class="card">
            <div class="card-body">
                <div className="row">
                    <div className="col">
                        <h5>Edit Btn</h5>
                    </div>
                    </div>
                    <br/>

                    <label class="form-check-label" >Btn Text </label>
                    <input value={BTNTEXT} onChange={e => handleChangeBTNTEXTSLIDER(e.target.value)} type="text" class="form-control " placeholder="Btn Text" aria-label="Username" aria-describedby="basic-addon1" />
                    <br/>
                    <label class="form-check-label" >Btn Link </label>
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="basic-addon3">https://</span>
                        <input value={LINKBTN} onChange={e => handleChangeBTNLINKSLIDER(e.target.value)} type="text" class="form-control" id="basic-url" aria-describedby="basic-addon3" />
                    </div>
            </div>
        </div>
        <div class="card">
            <div class="card-body">
                <div className="row">
                    <div className="col">
                        <h5>Edit Circle</h5>
                    </div>
                </div>
                <br/>

                <label class="form-check-label" >Circle Text </label>
                <input value={TEXTCIRCLE} onChange={e => handleChangeTEXTCIRCLESLIDER(e.target.value)} type="text" class="form-control " placeholder="Circle Text" aria-label="Username" aria-describedby="basic-addon1" />
                <br/>
                <label class="form-check-label" >Circle Link </label>
                <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon3">https://</span>
                    <input value={LINKCIRCLE} onChange={e => handleChangeLINKCIRCLESLIDER(e.target.value)} type="text" class="form-control" id="basic-url" aria-describedby="basic-addon3" />
                </div>
            </div>
        </div>


        {/* image 1 and 2 */}
        <div class="card">
            <div class="card-body">
                <div className="row">
                    <div className="col">
                        <h5>Image Right</h5>
                    </div>
                </div>
                <label class="form-check-label" >Please choose a Image Right for your site. </label>
                <br />
                
                {IMAGEURI1 !== null ? <div class="alert alert-custom" role="alert">
                    <div class="alert-content">
                        <div>
                            <label htmlFor="fileName">{`https://github.com/${OwnerName}/${RepoName}/image/logo/${IMAGEURI1.name}`}</label>
                        </div>
                        <br />
                        <span class="alert-title">{IMAGEURI1.name}</span>
                        <span class="alert-text">URL:<a target="_blank" href={URL.createObjectURL(IMAGEURI1)}> {URL.createObjectURL(IMAGEURI1)} </a></span>
                        <br />

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


                        {/* onClick={handleUpload} */}
                        <button onClick={() => {setIMAGEURI1(null);setProgress(0)}} type="button" className="btn btn-danger m-2">Remove File</button>
                        <button onClick={() => { handleUploadIMAGE1(IMAGEURI1) }} type="button" className="btn btn-success m-2">Upload File</button><br />

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

        <div class="card">
            <div class="card-body">
                <div className="row">
                    <div className="col">
                        <h5>Image Left</h5>
                    </div>
                </div>
                <label class="form-check-label" >Please choose a Image Left for your site. </label>
                <br />
                
                {IMAGEURI2 !== null ? <div class="alert alert-custom" role="alert">
                    <div class="alert-content">
                        <div>
                            <label htmlFor="fileName">{`https://github.com/${OwnerName}/${RepoName}/image/logo/${IMAGEURI2.name}`}</label>
                        </div>
                        <br />
                        <span class="alert-title">{IMAGEURI2.name}</span>
                        <span class="alert-text">URL:<a target="_blank" href={URL.createObjectURL(IMAGEURI2)}> {URL.createObjectURL(IMAGEURI2)} </a></span>
                        <br />

                        {
                            Progress2 !== 0 ?
                                <div>
                                    <span class="btn btn-light alert-title"><div class="spinner-border text-primary" role="status">
                                        <span class="visually-hidden">Loading...</span>
                                    </div> Uploading . . . .</span>

                                    <div className="progress">
                                        <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuemax={100} style={{ width: `${Progress2}%` }} />
                                    </div>
                                </div>
                                : null
                        }


                        {/* onClick={handleUpload} */}
                        <button onClick={() => {setIMAGEURI2(null);setProgress2(0)}} type="button" className="btn btn-danger m-2">Remove File</button>
                        <button onClick={() => { handleUploadIMAGE2(IMAGEURI2) }} type="button" className="btn btn-success m-2">Upload File</button><br />

                    </div>
                </div> : null}

                <div id="dropzone">
                    <form className="dropzone needsclick dz-clickable" onClick={() => input2.current.click()}>
                        <div className="dz-message needsclick" >
                            <button type="button" className="dz-button">Drop files here or click to upload.</button><br />
                            <span className="note needsclick">(This is just a demo dropzone. Selected files are <strong>not</strong> actually uploaded.)</span>
                        </div>
                        <input style={{ display: 'none' }} type="file" ref={input2} onChange={handleChange2} />
                    </form>
                </div>


            </div>
        </div>

    </Dashboard>);
}
export default SliderS;