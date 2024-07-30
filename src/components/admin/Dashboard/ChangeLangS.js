
import axios from "axios";
import Dashboard from "../dashboard";
import { Octokit } from "@octokit/rest";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import File from '../Index.json'
import { useNavigate } from "react-router-dom";
const ChangeLangS = () => {

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



    const navigate = useNavigate()


    const configNameFile = 'Language.json'
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
            localStorage.setItem('languageConfig', binaryData)
            const DATAGIT = JSON.parse(binaryData)
            setDATAGITARRY(DATAGIT)
            console.log(DATAGIT)
            setSha(res.sha)
            setLanguage(DATAGIT.Language)
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
            if (files.length < 1) {
                navigate('/file-manager')
            }
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
        await editFile(configNameFile, localStorage.getItem('languageConfig'), Sha, accessToken)
        setONCHANGESAVE(false)
        setTimeout(async () => {
            getData()
        }, 4000);
        setTimeout(async () => {
            const Data = localStorage.getItem('languageConfig')
            if (JSON.stringify(DATAGITARRY) !== Data) {
                //bug is here 
                setONCHANGESAVE(false)
            } else {
                setONCHANGESAVE(false)
            }
        }, 5000);
    }
    const handleCreateWebSite = async (name) => {
        // قرار است نام فایل بعدا داینامیک باشد
        const file = JSON.stringify(File)

        try {
            const data = {
                message: "Create new file",
                content: btoa(unescape(encodeURIComponent(file)))
            };
            const functionThatReturnPromise = () => new Promise(resolve => setTimeout(resolve, 3000));
            console.log(functionThatReturnPromise)
            const response = await axios.put(`https://api.github.com/repos/artafps/artafps/contents/configs/Config-Web-${name}.json`, data, {
                headers: {
                    Authorization: `token ${accessToken}`
                }
            });
            toast.success('File created successfully!')
            console.log('File created:', response.data);
        } catch (error) {
            toast.error('Error uploading file Check console')

            console.error('Error uploading file:', error);

        }

    }


    const [Title, setTitle] = useState("");




    const [Language, setLanguage] = useState([]);




    const handleChangeLanguage = async () => {
        if (Title.trim() === '') {
            toast.error('Hello, please fill in the link section and upload the icon file to complete the operation')
        }
        try {
            toast.success('File Edite successfully!')
            var d = localStorage.getItem('languageConfig')
            const item = Title
            if (d === null) {
                DATAGITARRY.Language = [item]
                handleCreateWebSite(item)
                localStorage.setItem('languageConfig', JSON.stringify(DATAGITARRY))
            } else {
                let Data = JSON.parse(d)
                const socialHeader = Data.Language
                socialHeader.push(item)
                setLanguage(socialHeader)
                handleCreateWebSite(item)
                const newData = Data
                newData.Language = socialHeader
                localStorage.setItem('languageConfig', JSON.stringify(newData))
            }
            setTimeout(() => {
                setTitle('')
                HANDLESAVE()
            }, 5000);

        } catch (error) {
            toast.error('Error uploading file! Check The Console')
            console.error('Error uploading file:', error);
        }
    }
    const handleDeleteITEM_Language = async (id) => {
        var d = localStorage.getItem('languageConfig')
        if (d === null) {
            const newDataSocial = DATAGITARRY.Language.filter(item => item !== id)
            DATAGITARRY.Language = newDataSocial
            localStorage.setItem('languageConfig', JSON.stringify(DATAGITARRY))
            HANDLESAVE()
        } else {
            let Data = JSON.parse(d)
            const newDataSocial = Data.Language.filter(item => item !== id)
            Data.Language = newDataSocial
            setLanguage(Data.Language)
            localStorage.setItem('languageConfig', JSON.stringify(Data))
            HANDLESAVE()
        }
    }
    return (<Dashboard title='Change Language' disc='Edit the admin panel language'>
        <div className="card">
            <div className=" widget widget-payment-request">
                <div className="card-header">
                    <h5 className="card-title">Language</h5>
                </div>
                <div class="form-check form-switch">
                    <label class="form-check-label" > Add Language. </label>
                </div>
                <div className="card-body">
                    <div className="widget-payment-request-container">

                        {Language.length !== 0 ?
                            Language.map(item => {
                                return (
                                    <div style={{ borderRadius: 20, marginBottom: 10 }} className={"widget-payment-request-author"}>

                                        <div className="widget-payment-request-author-info">
                                            <span className="widget-payment-request-author-name">{item}</span>
                                        </div>
                                        <span class="widget-payment-request-product-price"><button disabled={localStorage.getItem('selectLanguage') === item ? true : false} onClick={() => {
                                            localStorage.setItem('selectLanguage', item)
                                            getData()
                                        }} type="button" class="btn btn-primary m-2">Select Language For Edite </button></span>
                                        <span class="widget-payment-request-product-price"><button onClick={() => { handleDeleteITEM_Language(item) }} type="button" class="btn btn-danger"><i class="material-icons">delete_outline</i>Remove</button></span>
                                    </div>
                                )
                            })
                            : null}
                        <br />
                        <br />


                        <label class="form-check-label" > Language type in: fa , en , arb , ge </label>
                        <div class="input-group mb-3">
                            <input value={Title} onChange={(e) => { setTitle(e.target.value) }} type="text" className="form-control form-control" id="custom-url" aria-describedby="custom-addon3" />
                            <br />
                            <br />
                        </div>
                    </div>


                    <div className="widget-payment-request-actions m-t-md d-flex">
                        <a onClick={handleChangeLanguage} className="btn btn-primary flex-grow-1 m-l-xxs">Add Language</a>
                    </div>
                </div>
            </div>
        </div>


    </Dashboard>);
}
export default ChangeLangS;