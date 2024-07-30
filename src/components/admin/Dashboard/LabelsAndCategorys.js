

import axios from "axios";
import Dashboard from "../dashboard";
import { Octokit } from "@octokit/rest";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

const LabelsAndCategorys = () => {

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
            
            setLABLE(DATAGIT.Lable)
            setCATEGORY(DATAGIT.Category)
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



    const [Title, setTitle] = useState("");
    const [Title2, setTitle2] = useState("");
    



    const [LABLE, setLABLE] = useState([]);
    const [CATEGORY, setCATEGORY] = useState([]);



    const handleChangeLable = async () => {
        if ( Title.trim() === '' ) {
            toast.error('Hello, please fill in the link section and upload the icon file to complete the operation')
        }
        try {

            toast.success('File Uploaded successfully!')
            var d = localStorage.getItem('DATAGITBACK')
            const item = Title
            if (d === null) {
                DATAGITARRY.Lable = [item]
                localStorage.setItem('DATAGITBACK', JSON.stringify(DATAGITARRY))
            } else {
                let Data = JSON.parse(d)
                const socialHeader = Data.Lable
                socialHeader.push(item)
                setLABLE(socialHeader)
                const newData = Data
                newData.Lable = socialHeader
                localStorage.setItem('DATAGITBACK', JSON.stringify(newData))
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

    const handleChangeCategory = async () => {
        if ( Title.trim() === '' ) {
            toast.error('Hello, please fill in the link section and upload the icon file to complete the operation')
        }
        try {

            toast.success('File Uploaded successfully!')
            var d = localStorage.getItem('DATAGITBACK')
            const item = Title
            if (d === null) {
                DATAGITARRY.Category = [item]
                localStorage.setItem('DATAGITBACK', JSON.stringify(DATAGITARRY))
            } else {
                let Data = JSON.parse(d)
                const socialHeader = Data.Category
                socialHeader.push(item)
                setCATEGORY(socialHeader)
                const newData = Data
                newData.Category = socialHeader
                localStorage.setItem('DATAGITBACK', JSON.stringify(newData))
            }
            setTimeout(() => {
                setTitle2('')
                HANDLESAVE()
            }, 5000);

        } catch (error) {
            toast.error('Error uploading file! Check The Console')
            console.error('Error uploading file:', error);
        }
    }
    const handleDeleteITEM_Lable = async (id) => {
        var d = localStorage.getItem('DATAGITBACK')
        if (d === null) {
            const newDataSocial = DATAGITARRY.Lable.filter(item => item !== id)
            DATAGITARRY.Lable = newDataSocial
            localStorage.setItem('DATAGITBACK', JSON.stringify(DATAGITARRY))
            HANDLESAVE()
        } else {
            let Data = JSON.parse(d)
            const newDataSocial = Data.Lable.filter(item => item !== id)
            Data.Lable = newDataSocial
            setLABLE(Data.Lable)
            localStorage.setItem('DATAGITBACK', JSON.stringify(Data))
            HANDLESAVE()
        }
    }
    const handleDeleteITEM_Category = async (id) => {
        var d = localStorage.getItem('DATAGITBACK')
        if (d === null) {
            const newDataSocial = DATAGITARRY.Category.filter(item => item !== id)
            DATAGITARRY.Category = newDataSocial
            localStorage.setItem('DATAGITBACK', JSON.stringify(DATAGITARRY))
            HANDLESAVE()
        } else {
            let Data = JSON.parse(d)
            const newDataSocial = Data.Category.filter(item => item !== id)
            Data.Category = newDataSocial
            setCATEGORY(Data.Category)
            localStorage.setItem('DATAGITBACK', JSON.stringify(Data))
            HANDLESAVE()
        }
    }
    return (<Dashboard title='Label And Category' disc='Edit labels and categories'> <div className="card">
        <div className=" widget widget-payment-request">
            <div className="card-header">
                <h5 className="card-title">Lable</h5>
            </div>
            <div class="form-check form-switch">
                <label class="form-check-label" > Add Lable. </label>
            </div>
            <div className="card-body">
                <div className="widget-payment-request-container">

                    {LABLE.length !== 0 ?
                        LABLE.map(item => {
                            return (
                                <div style={{ borderRadius: 20, marginBottom: 10 }} className={"widget-payment-request-author"}>

                                    <div className="widget-payment-request-author-info">
                                        <span className="widget-payment-request-author-name">{item}</span>
                                    </div>
                                    <span class="widget-payment-request-product-price"><button onClick={() => { handleDeleteITEM_Lable(item) }} type="button" class="btn btn-danger"><i class="material-icons">delete_outline</i>Remove</button>     </span>
                                </div>
                            )
                        })
                        : null}
                    <br />
                    <br />


                    <label class="form-check-label" > Title Text</label>
                    <div class="input-group mb-3">
                        <input value={Title} onChange={(e) => { setTitle(e.target.value) }} type="text" className="form-control form-control" id="custom-url" aria-describedby="custom-addon3" />
                        <br />
                        <br />
                    </div>
                </div>


                <div className="widget-payment-request-actions m-t-md d-flex">
                    <a onClick={handleChangeLable} className="btn btn-primary flex-grow-1 m-l-xxs">Add Lable</a>
                </div>
            </div>
        </div>


    </div>
        <div className="card">
            <div className=" widget widget-payment-request">
                <div className="card-header">
                    <h5 className="card-title">Category</h5>
                </div>
                <div class="form-check form-switch">
                    <label class="form-check-label" > Add your Category. </label>
                </div>
                <div className="card-body">
                    <div className="widget-payment-request-container">

                        {CATEGORY.length !== 0 ?
                            CATEGORY.map(item => {
                                return (
                                    <div style={{ borderRadius: 20, marginBottom: 10 }} className={"widget-payment-request-author"}>

                                        <div className="widget-payment-request-author-info">
                                            <span className="widget-payment-request-author-name">{item}</span>
                                        </div>
                                  
                                        <span class="widget-payment-request-product-price"><button onClick={() => { handleDeleteITEM_Category(item) }} type="button" class="btn btn-danger"><i class="material-icons">delete_outline</i>Remove</button>     </span>
                                    </div>
                                )
                            })
                            : null}
                        <br />
                        <br />
                        <label class="form-check-label" > Title Category</label>
                        <div class="input-group mb-3">
                            <input value={Title2} onChange={(e) => { setTitle2(e.target.value) }} type="text" className="form-control form-control" id="custom-url" aria-describedby="custom-addon3" />
                            <br />
                            <br />
                        </div>
                    </div>



                    <div className="widget-payment-request-actions m-t-md d-flex">
                        <a onClick={handleChangeCategory} className="btn btn-primary flex-grow-1 m-l-xxs">Add Category</a>
                    </div>
                </div>
            </div>


        </div> </Dashboard>);
}
export default LabelsAndCategorys;


