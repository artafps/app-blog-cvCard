

import axios from "axios";
import Dashboard from "../dashboard";
import { Octokit } from "@octokit/rest";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

const PlanS = () => {

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
            if (DATAGIT.Plan.Status === "") {
                setSTATUSPLAN(false)
            } else if (DATAGIT.Plan.Status === "false") {
                setSTATUSPLAN(false)
            } else {
                setSTATUSPLAN(true)
            }
            setTITLE(DATAGIT.Plan.Title)
            setITEMSPLAN(DATAGIT.Plan.Arr)
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
        setTimeout(async () => {
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


    const [STATUSPLAN, setSTATUSPLAN] = useState(false);
    const [TITLE, setTITLE] = useState();

    const [TopTitle, setTopTitle] = useState("");
    const [Title, setTitle] = useState("");
    const [Description, setDescription] = useState("");
    const [Percent, setPercent] = useState("");
    const [Cheked, setCheked] = useState("");

   

    const [ITEMSPLAN, setITEMSPLAN] = useState([]);


    const handleChangeSTATUSPLAN = async (events) => {

        let Data = localStorage.getItem('DATAGITBACK')
        if (Data === null) {
            DATAGITARRY.Plan.Status = String(events)
            localStorage.setItem('DATAGITBACK', JSON.stringify(DATAGITARRY))
            setSTATUSPLAN(events)
        } else {
            const newData = JSON.parse(Data)
            newData.Plan.Status = String(events)
            localStorage.setItem('DATAGITBACK', JSON.stringify(newData))
            setSTATUSPLAN(events)
        }
        Data = localStorage.getItem('DATAGITBACK')
        if (JSON.stringify(DATAGITARRY) !== Data) {
            setONCHANGESAVE(true)
        } else {
            setONCHANGESAVE(false)
        }
    }
    const handleChangeTITLEPLAN = async (events) => {
        let Data = localStorage.getItem('DATAGITBACK')
        if (Data === null) {
            DATAGITARRY.Plan.Title = String(events)
            localStorage.setItem('DATAGITBACK', JSON.stringify(DATAGITARRY))
            setTITLE(events)
        } else {
            const newData = JSON.parse(Data)
            newData.Plan.Title = String(events)
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

    const handleChangePLANITEMS = async () => {
        if ( TopTitle.trim() === '' && Title.trim() === '' &&
            Description.trim() === '' && Percent.trim() === '' &&
            Cheked.trim() === '') {
            // check Items get user
            toast.error('Hello, please fill in the link section and upload the icon file to complete the operation')
        }
        try {
           
                toast.success('File Uploaded successfully!')
                var d = localStorage.getItem('DATAGITBACK')
                const item = {
                    "TopTitle": TopTitle,
                    "Title": Title,
                    "Description": Description,
                    "Percent": Percent,
                    "Cheked": Cheked
                }
                if (d === null) {
                    DATAGITARRY.Plan.Arr = [item]
                    localStorage.setItem('DATAGITBACK', JSON.stringify(DATAGITARRY))
                } else {
                    let Data = JSON.parse(d)
                    const socialHeader = Data.Plan.Arr
                    socialHeader.push(item)
                    setITEMSPLAN(socialHeader)
                    const newData = Data
                    newData.Plan.Arr = socialHeader
                    localStorage.setItem('DATAGITBACK', JSON.stringify(newData))
                }
                setTimeout(() => {
                    setTopTitle('')
                    setTitle('')
                    setDescription('')
                    setPercent('')
                    setCheked('')
                    HANDLESAVE()
                }, 5000);
            
        } catch (error) {
            toast.error('Error uploading file! Check The Console')
            console.error('Error uploading file:', error);
        }





    }
   
    const handleDeleteITEM_PLAN = async (id) => {
        var d = localStorage.getItem('DATAGITBACK')
        if (d === null) {
            const newDataSocial = DATAGITARRY.Plan.Arr.filter(item => item.TopTitle !== id)
            DATAGITARRY.Plan.Arr = newDataSocial
            localStorage.setItem('DATAGITBACK', JSON.stringify(DATAGITARRY))
            HANDLESAVE()
        } else {
            let Data = JSON.parse(d)
            const newDataSocial = Data.Plan.Arr.filter(item => item.TopTitle !== id)
            Data.Plan.Arr = newDataSocial
            setITEMSPLAN(Data.Plan.Arr)
            localStorage.setItem('DATAGITBACK', JSON.stringify(Data))
            HANDLESAVE()
        }
    }
    return (<Dashboard title='Plan' disc='Edit the road map section'>{ONCHANGESAVE ? <div class="card" style={{ left: 500, bottom: 20, boxShadow: "5px 5px 100px gray", width: 700, position: 'fixed', zIndex: 10 }}>
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
                        <h5>Status Plan</h5>
                    </div>
                </div>
                <br />

                <div class="form-check form-switch">
                    {/* {} } */}
                    <input checked={STATUSPLAN} onChange={() => handleChangeSTATUSPLAN(!STATUSPLAN)} className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
                    <label class="form-check-label" for="flexSwitchCheckDefault">Do you want this section to be displayed on the site?</label>
                </div>
            </div>
        </div>

        <div class="card">
            <div class="card-body">
                <div className="row">
                    <div className="col">
                        <h5>Edit Title Plan</h5>
                    </div>
                </div>
                <br />
                <label class="form-check-label" >Title Plan</label>
                <input value={TITLE} onChange={e => handleChangeTITLEPLAN(e.target.value)} type="text" class="form-control" placeholder="Title Plan" aria-label="Username" aria-describedby="basic-addon1" />
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

                        {ITEMSPLAN.length !== 0 ?
                            ITEMSPLAN.map(item => {
                                return (
                                    <div style={{ borderRadius: 20, marginBottom: 10 }} className={item.Dark ? "widget-payment-request-author bg-dark" : "widget-payment-request-author"}>
                                       
                                        <div className="widget-payment-request-author-info">
                                            <span className="widget-payment-request-author-name">{item.Title}</span>
                                            <span className="widget-payment-request-author-about">{item.TopTitle}</span>
                                        </div>
                                        <div className="widget-payment-request-author-info">
                                            <span className="widget-payment-request-author-name">{item.Percent}</span>
                                            <span className="widget-payment-request-author-about">{item.Cheked}</span>
                                        </div>
                                        <div className="widget-payment-request-author-info">
                                            <span className="widget-payment-request-author-name">{item.Description}</span>
                                        </div>
                                        <span class="widget-payment-request-product-price"><button onClick={() => { handleDeleteITEM_PLAN(item.TopTitle) }} type="button" class="btn btn-danger"><i class="material-icons">delete_outline</i>Remove</button>     </span>
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
                        <label class="form-check-label" > Title Text</label>
                        <div class="input-group mb-3">
                            <input value={Title} onChange={(e) => { setTitle(e.target.value) }} type="text" className="form-control form-control" id="custom-url" aria-describedby="custom-addon3" />
                            <br />
                            <br />
                        </div>
                        <label class="form-check-label" >Description Text</label>
                        <div class="input-group mb-3">
                            <input value={Description} onChange={(e) => { setDescription(e.target.value) }} type="text" className="form-control form-control" id="custom-url" aria-describedby="custom-addon3" />
                            <br />
                            <br />
                        </div>
                        <label class="form-check-label" >Percent </label>
                        <div class="input-group mb-3">

                            <input value={Percent} onChange={(e) => { setPercent(e.target.value) }} type="text" className="form-control form-control" id="custom-url" aria-describedby="custom-addon3" />
                            <br />
                            <br />
                        </div>
                        <label class="form-check-label" >Cheked  </label>
                        <label class="form-check-label" >Use "," to separate each part  </label>
                        <div class="input-group mb-3">
                            <input value={Cheked} onChange={(e) => { setCheked(e.target.value) }} type="text" className="form-control form-control" id="custom-url" aria-describedby="custom-addon3" />
                            <br />
                            <br />
                        </div>
                        <br />
                    </div>
                   


                    <div className="widget-payment-request-actions m-t-md d-flex">
                        <a onClick={handleChangePLANITEMS} className="btn btn-primary flex-grow-1 m-l-xxs">Add Social Media Link</a>
                    </div>
                </div>
            </div>


        </div>

    </Dashboard>);
}
export default PlanS;