import MainLayoutAdmin from "../layouts/MainLayoutAdmin";
import axios from "axios";
import { Octokit } from "@octokit/rest";
import { toast } from "react-toastify";
import { useEffect, useRef, useState } from "react";
import { getFileContent } from "../../utils/getFileGit";
import { fileToBase64 } from "../../utils/fileToBase64";

const ListBlog = () => {


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

    const configNameFile = `Config-Web-${Lang}.json`

    const accessToken = localStorage.getItem('AC');
    const OwnerName = localStorage.getItem('Owner');
    const RepoName = localStorage.getItem('Repo');

    const [ONCHANGESAVE, setONCHANGESAVE] = useState(false);
    const [Sha, setSha] = useState('');
    const [DATAGITARRY, setDATAGITARRY] = useState();
    const [BlogList, setBlogList] = useState([]);


    const handleGetFileData = (file) => {
        const filePath = `https://api.github.com/repos/${OwnerName}/${RepoName}/contents/${file.path}`;
        handleGetFileContent(filePath).then((res) => {
            const binaryData = decodeURIComponent(escape(atob(res.content)));
            localStorage.setItem('DATAGITBACK', binaryData)
            const DATAGIT = JSON.parse(binaryData)
            setDATAGITARRY(DATAGIT)
            setBlogList(DATAGIT.Blog.Arr)
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

    const [BlogEditStatus, setBlogEditStatus] = useState(false);
    const [BlogEditValue, setBlogEditValue] = useState("");
    const [h1, seth1] = useState("");
    const [Lable, setLable] = useState("");
    const [Category, setCategory] = useState("");
    const [fileContent, setfileContent] = useState("");



    const [Progress, setProgress] = useState(0);

    const input = useRef(null)
    const [File, setFile] = useState(null);

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
    const handleEditeContentBlog = (events) => {
        setBlogEditValue(events)
        setBlogEditStatus(true)
        seth1(events.h1)
        setLable(events.Lable)
        setCategory(events.Category)
        setfileContent(events.Content)
    }

    const handleChangeEditBlog = async () => {
        if (fileContent.trim() === '' || h1.trim() === '' || Lable.trim() === '' || Category.trim() === '') {
            // check Items get user
            toast.error('Hello, please fill in the link section and upload the icon file to complete the operation')
        } else {
            try {
                var icon
                if (File) {
                    var events = `https://api.github.com/repos/${OwnerName}/${RepoName}/contents/blogs/blogs-f-${File.name}`
                    icon = `https://raw.githubusercontent.com/${OwnerName}/${RepoName}/main/blogs/blogs-f-${File.name}`
                    var data = await getFileContent(events)
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
                        }).then(async res => {
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
                                const socialHeader = await Data.Blog.Arr.filter(item => item.h1 !== BlogEditValue.h1)
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
                        });
                    } else {
                        toast.warn('You have already selected this file for the logo')
                    }
                } else {
                    icon = BlogEditValue.ImageURI

                    setProgress(30)
                    toast.success('File Uploaded successfully!')
                    var d = localStorage.getItem('DATAGITBACK')
                    var daat = {
                        "h1": h1,
                        "ImageURI": icon,
                        "Content": fileContent,
                        "Lable": Lable,
                        "Category": Category,

                    }
                    if (d === null) {
                        DATAGITARRY.Blog.Arr = [daat]
                        localStorage.setItem('DATAGITBACK', JSON.stringify(DATAGITARRY))
                    } else {
                        let Data = JSON.parse(d)
                        var socialHeader = []

                        for (let i = 0; i < Data.Blog.Arr.length; i++) {
                            const item = Data.Blog.Arr[i];
                            if (item.h1 !== BlogEditValue.h1) {
                                await socialHeader.push(item)
                            } else {
                                await socialHeader.push(daat)

                            }
                        }

                        const newData = Data
                        newData.Blog.Arr = socialHeader
                        localStorage.setItem('DATAGITBACK', JSON.stringify(newData))
                    }
                    setTimeout(() => {
                        setProgress(100)
                        setFile(null)
                        setfileContent('')
                        setBlogEditValue('')
                        setBlogEditStatus(false)
                        seth1('')
                        setLable('')
                        setCategory('')
                        HANDLESAVE()
                        setProgress(0)
                    }, 5000);

                }
                //and uploaded file 

            } catch (error) {
                toast.error('Error uploading file! Check The Console')
                console.error('Error uploading file:', error);
            }
        }
    }

    const handleDeleteBlog = async (data) => {
        var events = `https://api.github.com/repos/${OwnerName}/${RepoName}/contents/${data.ImageURI.split(`https://raw.githubusercontent.com/${OwnerName}/${RepoName}/main/`)[1]}`
        const data2 = await getFileContent(events)
        var d = localStorage.getItem('DATAGITBACK')
        if (d === null) {
            const newDataSocial = DATAGITARRY.Blog.Arr.filter(item => item.h1 !== data.h1 )
            DATAGITARRY.Blog.Arr = newDataSocial
            localStorage.setItem('DATAGITBACK', JSON.stringify(DATAGITARRY))
            HANDLESAVE()
        } else {
            let Data = JSON.parse(d)
            const newDataSocial = Data.Blog.Arr.filter(item => item.h1 !== data.h1)
            Data.Blog.Arr = newDataSocial
            setBlogList(Data.Blog.Arr)
            localStorage.setItem('DATAGITBACK', JSON.stringify(Data))
            HANDLESAVE()
        }
        setTimeout(() => {
            handleDelete(data2.path, data2.sha)
        }, 5000);
    }

    return (
        <MainLayoutAdmin title={'List Blog'}>
            <div className="card">
                <div className=" widget widget-payment-request">
                    <div className="card-header">
                        <h5 className="card-title">List Blog</h5>
                    </div>
                    <div class="form-check form-switch">
                        <label class="form-check-label" > edit your List Blog. </label>
                    </div>
                    <div className="card-body">
                        <div className="widget-payment-request-container">
                            {BlogList.length !== 0 ?
                                BlogList.map(item => {
                                    return (
                                        <div style={{ borderRadius: 20, marginBottom: 10 }} className={item.Dark ? "widget-payment-request-author bg-dark m-2" : "widget-payment-request-author m-2"}>
                                            <div className="avatar m-r-sm">
                                                <img src={item.ImageURI} alt />
                                            </div>
                                            <div className="widget-payment-request-author-info">
                                                <span className="widget-payment-request-author-name">{item.h1}</span>
                                            </div>
                                            <div className="widget-payment-request-author-info">
                                                <span className="widget-payment-request-author-name">{item.Lable}</span>
                                                <span className="widget-payment-request-author-about">{item.Lable}</span>
                                            </div>
                                            <div className="widget-payment-request-author-info">
                                                <span className="widget-payment-request-author-about">{item.ImageURI.split(`https://raw.githubusercontent.com/${OwnerName}/${RepoName}/main/`)[1]}</span>
                                            </div>
                                            <span class="widget-payment-request-product-price"><button onClick={() => { handleEditeContentBlog(item) }} type="button" class="btn btn-primary m-2"><i class="material-icons">edit</i>Edit</button>     </span>
                                            <span class="widget-payment-request-product-price"><button onClick={() => { handleDeleteBlog(item) }} type="button" class="btn btn-danger m-2"><i class="material-icons">delete_outline</i>Remove</button>     </span>
                                        </div>
                                    )
                                })
                                : null}
                        </div>
                    </div>
                </div>
            </div>
            {BlogEditStatus ? (
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
                                                    <div className="progress">
                                                        <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuemax={100} style={{ width: `${Progress}%` }} />
                                                    </div>
                                                </div>
                                                : null
                                        }  </div><br />
                                    <button onClick={handleChangeEditBlog} type="button" class="btn btn-success">Edit Blog</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div >) : null
            }
        </MainLayoutAdmin>);
}
export default ListBlog;