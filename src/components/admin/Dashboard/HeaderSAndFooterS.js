
import { useEffect, useRef, useState } from "react";
import Dashboard from "../dashboard";
import { toast } from "react-toastify";
import { Octokit } from "@octokit/rest";
import axios from "axios";
import { fileToBase64 } from "../../../utils/fileToBase64";
import { getFileContent } from "../../../utils/getFileGit";
import cfg from '../../../Config.json'
import { useNavigate } from "react-router";
const HeaderSAndFooterS = () => {
    const navigate = useNavigate()

    ///File name
    const Lang = localStorage.getItem('selectLanguage');

    const configNameFile =`Config-Web-${Lang}.json`
    // state get
    // prograsces 
    const [Progress, setProgress] = useState(0);
    const [Progress2, setProgress2] = useState(0);
    const [Progress3, setProgress3] = useState(0);
    const [Progress4, setProgress4] = useState(0);

    const [ONCHANGESAVE, setONCHANGESAVE] = useState(false);
    const [STATUSHEADER, setSTATUSHEADER] = useState(false);
    const [TITLEHEADER, setTITLEHEADER] = useState("");
    const [SOCIALMEDIALISTHEADER, setSOCIALMEDIALISTHEADER] = useState([]);
    const [SOCIALMEDIALINKHEADER, setSOCIALMEDIALINKHEADER] = useState("");
    const [SOCIALDARKMODEHEADER, setSOCIALDARKMODEHEADER] = useState(false);


    const [STATUSFOOTER, setSTATUSFOOTER] = useState(false);
    const [TITLEFOOTER, setTITLEFOOTER] = useState("");
    const [TEXTFOOTER, setTEXTFOOTER] = useState("");
    const [SOCIALMEDIALISTFOOTER, setSOCIALMEDIALISTFOOTER] = useState([]);
    const [SOCIALMEDIALINKFOOTER, setSOCIALMEDIALINKFOOTER] = useState("");
    const [SOCIALDARKMODEFOOTER, setSOCIALDARKMODEFOOTER] = useState(false);

    const [STAUSPOWERBY, setSTAUSPOWERBY] = useState(false);
    const [POWERBYNAME, setPOWERBYNAME] = useState("");
    const [POWERBYLINK, setPOWERBYLINK] = useState("");

    const [STAUSCommunity, setSTAUSCommunity] = useState(false);
    const [TextCommunity, setTextCommunity] = useState("");
    const [BtnTextCommunity, setBtnTextCommunity] = useState("");
    const [LinkBtnCommunity, setLinkBtnCommunity] = useState("");

    const accessToken = localStorage.getItem('AC');
    const OwnerName = localStorage.getItem('Owner');
    const RepoName = localStorage.getItem('Repo');

    const input = useRef(null)
    const [file, setFile] = useState(null);
    const input2 = useRef(null)
    const [file2, setFile2] = useState(null);
    const input3 = useRef(null)
    const [file3, setFile3] = useState(null);
    const input4 = useRef(null)
    const [file4, setFile4] = useState(null);

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
    const handleChange3 = (event) => {
        if (event.target.files[0].type.split('/')[1] === 'img' || event.target.files[0].type.split('/')[1] === 'jpg' || event.target.files[0].type.split('/')[1] === 'jpeg' || event.target.files[0].type.split('/')[1] === 'png') {
            setFile3(event.target.files[0]);
            input3.current.value = ''
        } else {
            toast.error("Please enter the logo in img and jpg format.")
            setFile3(null);
            input3.current.value = ''
        }

    };
    const handleChange2 = (event) => {
        if (event.target.files[0].size > 2500) {
            toast.error("Size file 2500 50px*50px.")
            return
        }
        if (event.target.files[0].type.split('/')[1] === 'img' || event.target.files[0].type.split('/')[1] === 'jpg' || event.target.files[0].type.split('/')[1] === 'jpeg' || event.target.files[0].type.split('/')[1] === 'png') {
            setFile2(event.target.files[0]);
            input4.current.value = ''
        } else {
            toast.error("Please enter the logo in img and jpg format.")
            setFile2(null);
            input4.current.value = ''
        }

    };
    const handleChange4 = (event) => {
        if (event.target.files[0].size > 2500) {
            toast.error("Size file 2500 50px*50px.")
            return
        }
        if (event.target.files[0].type.split('/')[1] === 'img' || event.target.files[0].type.split('/')[1] === 'jpg' || event.target.files[0].type.split('/')[1] === 'jpeg' || event.target.files[0].type.split('/')[1] === 'png') {
            setFile4(event.target.files[0]);
            input2.current.value = ''
        } else {
            toast.error("Please enter the logo in img and jpg format.")
            setFile4(null);
            input2.current.value = ''
        }

    };

    const [Sha, setSha] = useState('');
    const [DATAGITARRY, setDATAGITARRY] = useState();
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
    const handleGetFileData = (file) => {
        const filePath = `https://api.github.com/repos/${OwnerName}/${RepoName}/contents/${file.path}`;
        handleGetFileContent(filePath).then((res) => {
            const binaryData = decodeURIComponent(escape(atob(res.content)));
            localStorage.setItem('DATAGITBACK', binaryData)
            const DATAGIT = JSON.parse(binaryData)
            setDATAGITARRY(DATAGIT)
            console.log(DATAGIT)
            setSha(res.sha)
            if (DATAGIT.Header.Status === "") {
                setSTATUSHEADER(false)
            } else if (DATAGIT.Header.Status === "false") {
                setSTATUSHEADER(false)
            } else {
                setSTATUSHEADER(true)
            }
            if (DATAGIT.Footer.Status === "") {
                setSTATUSFOOTER(false)
            } else if (DATAGIT.Footer.Status === "false") {
                setSTATUSFOOTER(false)
            } else {
                setSTATUSFOOTER(true)
            }

            setTITLEHEADER(DATAGIT.Header.Logo.Title)
            setTITLEFOOTER(DATAGIT.Footer.Logo.Title)
            setTEXTFOOTER(DATAGIT.Footer.Logo.Text)
            setSOCIALMEDIALISTHEADER(DATAGIT.Header.Social)
            setSOCIALMEDIALISTFOOTER(DATAGIT.Footer.Social)
            setSTAUSPOWERBY(DATAGIT.Footer.PowerBy.Status)
            setPOWERBYNAME(DATAGIT.Footer.PowerBy.Text)
            setPOWERBYLINK(DATAGIT.Footer.PowerBy.Link)
            setSTAUSCommunity(DATAGIT.Community.Status)
            setTextCommunity(DATAGIT.Community.Text)
            setBtnTextCommunity(DATAGIT.Community.BtnText)
            setLinkBtnCommunity(DATAGIT.Community.LinkBtn)
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

    // ON CHANGE HEADER AND FOOTER
    const handleChangeSTATUSHEADER = async (events) => {

        let Data = localStorage.getItem('DATAGITBACK')
        if (Data === null) {
            DATAGITARRY.Header.Status = String(events)
            localStorage.setItem('DATAGITBACK', JSON.stringify(DATAGITARRY))
            setSTATUSHEADER(events)
        } else {
            const newData = JSON.parse(Data)
            newData.Header.Status = String(events)
            localStorage.setItem('DATAGITBACK', JSON.stringify(newData))
            setSTATUSHEADER(events)
        }
        Data = localStorage.getItem('DATAGITBACK')
        if (JSON.stringify(DATAGITARRY) !== Data) {
            // save box on شود
            setONCHANGESAVE(true)
        } else {
            setONCHANGESAVE(false)
        }
    }
    const handleChangeTITLEHEADER = (events) => {
        let Data = localStorage.getItem('DATAGITBACK')

        if (Data === null) {
            DATAGITARRY.Header.Logo.Title = String(events)
            localStorage.setItem('DATAGITBACK', JSON.stringify(DATAGITARRY))
            setTITLEHEADER(events)
        } else {
            const newData = JSON.parse(Data)
            newData.Header.Logo.Title = String(events)
            localStorage.setItem('DATAGITBACK', JSON.stringify(newData))
            setTITLEHEADER(events)
        }
        Data = localStorage.getItem('DATAGITBACK')
        console.log(Data, "--------------", JSON.stringify(DATAGITARRY))
        if (JSON.stringify(DATAGITARRY) !== Data) {
            // save box on شود
            setONCHANGESAVE(true)
        } else {
            setONCHANGESAVE(false)
        }

    }
    // delete 
    // remove item and delet image social/jpg
    const handleDeleteSOCIAL_Header = async (id) => {
        var events = `https://api.github.com/repos/${OwnerName}/${RepoName}/contents/${id.split(`https://raw.githubusercontent.com/${OwnerName}/${RepoName}/main/`)[1]}`
        const data2 = await getFileContent(events)
        var d = localStorage.getItem('DATAGITBACK')
        if (d === null) {
            const newDataSocial = DATAGITARRY.Header.Social.filter(item => item.Icone !== id)
            DATAGITARRY.Header.Social = newDataSocial
            localStorage.setItem('DATAGITBACK', JSON.stringify(DATAGITARRY))
            HANDLESAVE()
        } else {
            let Data = JSON.parse(d)
            const newDataSocial = Data.Header.Social.filter(item => item.Icone !== id)
            Data.Header.Social = newDataSocial
            setSOCIALMEDIALISTHEADER(Data.Header.Social)
            localStorage.setItem('DATAGITBACK', JSON.stringify(Data))
            HANDLESAVE()
        }
        setTimeout(() => {
            handleDelete(data2.path, data2.sha)
        }, 5000);
    }
    const handleDeleteSOCIAL_Footer = async (id) => {
        var events = `https://api.github.com/repos/${OwnerName}/${RepoName}/contents/${id.split(`https://raw.githubusercontent.com/${OwnerName}/${RepoName}/main/`)[1]}`
        const data2 = await getFileContent(events)
        var d = localStorage.getItem('DATAGITBACK')
        if (d === null) {
            const newDataSocial = DATAGITARRY.Footer.Social.filter(item => item.Icone !== id)
            DATAGITARRY.Footer.Social = newDataSocial
            localStorage.setItem('DATAGITBACK', JSON.stringify(DATAGITARRY))
            HANDLESAVE()
        } else {
            let Data = JSON.parse(d)
            const newDataSocial = Data.Footer.Social.filter(item => item.Icone !== id)
            Data.Footer.Social = newDataSocial
            setSOCIALMEDIALISTFOOTER(Data.Footer.Social)
            localStorage.setItem('DATAGITBACK', JSON.stringify(Data))
            HANDLESAVE()
        }
        setTimeout(() => {
            handleDelete(data2.path, data2.sha)
        }, 5000);
    }
    const handleChangeSOCIALHEADER = async () => {
        if (!file2 && SOCIALMEDIALINKHEADER.trim() === '') {
            // check items get user
            toast.error('Hello, please fill in the link section and upload the icon file to complete the operation')
        }
        try {

            var events = `https://api.github.com/repos/${OwnerName}/${RepoName}/contents/social/jpg/icon-f-${file2.name}`
            var icon = `https://raw.githubusercontent.com/${OwnerName}/${RepoName}/main/social/jpg/icon-f-${file2.name}`
            var data = await getFileContent(events)
            //and uploaded file 

            if (!data) {
                setProgress3(10)
                toast.info('The upload process may take up to a minute due to Github security reasons.\n  Please do not leave the page')
                const fileContentBase64 = await fileToBase64(file2);
                await axios.put(events, {
                    message: 'Upload file' + file2.name,
                    content: fileContentBase64,
                    branch: 'main', // Change the branch name if needed
                }, {
                    headers: {
                        Authorization: `token ${accessToken}`,
                    },
                }).then(res => {
                    setProgress3(30)
                    toast.success('File Uploaded successfully!')
                    var d = localStorage.getItem('DATAGITBACK')
                    const item = {
                        "Dark": SOCIALDARKMODEHEADER,
                        "Icone": icon,
                        "Link": SOCIALMEDIALINKHEADER
                    }
                    if (d === null) {
                        console.log("1")
                        DATAGITARRY.Header.Social = [item]
                        localStorage.setItem('DATAGITBACK', JSON.stringify(DATAGITARRY))
                    } else {
                        let Data = JSON.parse(d)
                        const socialHeader = Data.Header.Social
                        socialHeader.push(item)
                        setSOCIALMEDIALISTHEADER(socialHeader)
                        const newData = Data
                        newData.Header.Social = socialHeader
                        localStorage.setItem('DATAGITBACK', JSON.stringify(newData))
                    }
                    setTimeout(() => {
                        setProgress3(100)
                        setFile2(null)
                        setSOCIALDARKMODEHEADER(false)
                        setSOCIALMEDIALINKHEADER('')
                        HANDLESAVE()
                        setProgress3(0)
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

    const handleChangeSTATUSFOOTER = (events) => {
        let Data = localStorage.getItem('DATAGITBACK')
        if (Data === null) {
            DATAGITARRY.Footer.Status = String(events)
            localStorage.setItem('DATAGITBACK', JSON.stringify(DATAGITARRY))
            setSTATUSFOOTER(events)
        } else {
            const newData = JSON.parse(Data)
            newData.Footer.Status = String(events)
            localStorage.setItem('DATAGITBACK', JSON.stringify(newData))
            setSTATUSFOOTER(events)
        }
        Data = localStorage.getItem('DATAGITBACK')
        if (JSON.stringify(DATAGITARRY) !== Data) {
            // save box on شود
            setONCHANGESAVE(true)
        } else {
            setONCHANGESAVE(false)
        }


    }
    const handleChangeTITLEFOOTER = (events) => {
        let Data = localStorage.getItem('DATAGITBACK')

        if (Data === null) {
            DATAGITARRY.Footer.Logo.Title = String(events)
            localStorage.setItem('DATAGITBACK', JSON.stringify(DATAGITARRY))
            setTITLEFOOTER(events)
        } else {
            const newData = JSON.parse(Data)
            newData.Footer.Logo.Title = String(events)
            localStorage.setItem('DATAGITBACK', JSON.stringify(newData))
            setTITLEFOOTER(events)
        }
        Data = localStorage.getItem('DATAGITBACK')
        console.log(Data, "--------------", JSON.stringify(DATAGITARRY))
        if (JSON.stringify(DATAGITARRY) !== Data) {
            // save box on شود
            setONCHANGESAVE(true)
        } else {
            setONCHANGESAVE(false)
        }
    }
    const handleChangeTEXTFOOTER = (events) => {
        let Data = localStorage.getItem('DATAGITBACK')

        if (Data === null) {
            DATAGITARRY.Footer.Logo.Text = String(events)
            localStorage.setItem('DATAGITBACK', JSON.stringify(DATAGITARRY))
            setTEXTFOOTER(events)
        } else {
            const newData = JSON.parse(Data)
            newData.Footer.Logo.Text = String(events)
            localStorage.setItem('DATAGITBACK', JSON.stringify(newData))
            setTEXTFOOTER(events)
        }
        Data = localStorage.getItem('DATAGITBACK')
        console.log(Data, "--------------", JSON.stringify(DATAGITARRY))
        if (JSON.stringify(DATAGITARRY) !== Data) {
            // save box on شود
            setONCHANGESAVE(true)
        } else {
            setONCHANGESAVE(false)
        }
    }

    const handleChangeSOCIALFOOTER = async () => {

        if (!file4 && SOCIALMEDIALINKFOOTER === '') {
            // check items get user
            toast.error('Hello, please fill in the link section and upload the icon file to complete the operation')
        }
        try {

            var events = `https://api.github.com/repos/${OwnerName}/${RepoName}/contents/social/jpg/icon-f-${file4.name}`
            var icon = `https://raw.githubusercontent.com/${OwnerName}/${RepoName}/main/social/jpg/icon-f-${file4.name}`
            var data = await getFileContent(events)
            //and uploaded file 

            if (!data) {
                setProgress3(10)
                toast.info('The upload process may take up to a minute due to Github security reasons.\n  Please do not leave the page')
                const fileContentBase64 = await fileToBase64(file4);
                await axios.put(events, {
                    message: 'Upload file' + file4.name,
                    content: fileContentBase64,
                    branch: 'main', // Change the branch name if needed
                }, {
                    headers: {
                        Authorization: `token ${accessToken}`,
                    },
                }).then(res => {
                    setProgress3(30)
                    toast.success('File Uploaded successfully!')
                    var d = localStorage.getItem('DATAGITBACK')
                    const item = {
                        "Dark": SOCIALDARKMODEFOOTER,
                        "Icone": icon,
                        "Link": SOCIALMEDIALINKFOOTER
                    }
                    if (d === null) {
                        console.log("1")
                        DATAGITARRY.Footer.Social = [item]
                        localStorage.setItem('DATAGITBACK', JSON.stringify(DATAGITARRY))
                    } else {
                        let Data = JSON.parse(d)
                        const socialFooter = Data.Footer.Social
                        socialFooter.push(item)
                        setSOCIALMEDIALISTFOOTER(socialFooter)
                        const newData = Data
                        newData.Header.Social = socialFooter
                        localStorage.setItem('DATAGITBACK', JSON.stringify(newData))
                    }
                    setTimeout(() => {
                        setProgress4(100)
                        setFile3(null)
                        setSOCIALDARKMODEFOOTER(false)
                        setSOCIALMEDIALINKFOOTER('')
                        HANDLESAVE()
                        setProgress4(0)
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

    const handleChangeSTAUSPOWERBY = (events) => {
        let Data = localStorage.getItem('DATAGITBACK')
        if (Data === null) {
            DATAGITARRY.Footer.PowerBy.Status = String(events)
            localStorage.setItem('DATAGITBACK', JSON.stringify(DATAGITARRY))
            setSTAUSPOWERBY(events)
        } else {
            const newData = JSON.parse(Data)
            newData.Footer.PowerBy.Status = String(events)
            localStorage.setItem('DATAGITBACK', JSON.stringify(newData))
            setSTAUSPOWERBY(events)
        }
        Data = localStorage.getItem('DATAGITBACK')
        if (JSON.stringify(DATAGITARRY) !== Data) {
            setONCHANGESAVE(true)
        } else {
            setONCHANGESAVE(false)
        }

    }
    const handleChangePOWERBYNAME = (events) => {
        let Data = localStorage.getItem('DATAGITBACK')

        if (Data === null) {
            DATAGITARRY.Footer.PowerBy.Text = String(events)
            localStorage.setItem('DATAGITBACK', JSON.stringify(DATAGITARRY))
            setPOWERBYNAME(events)
        } else {
            const newData = JSON.parse(Data)
            newData.Footer.PowerBy.Text = String(events)
            localStorage.setItem('DATAGITBACK', JSON.stringify(newData))
            setPOWERBYNAME(events)
        }
        Data = localStorage.getItem('DATAGITBACK')
        console.log(Data, "--------------", JSON.stringify(DATAGITARRY))
        if (JSON.stringify(DATAGITARRY) !== Data) {
            // save box on شود
            setONCHANGESAVE(true)
        } else {
            setONCHANGESAVE(false)
        }
    }
    const handleChangePOWERBYLINK = (events) => {
        let Data = localStorage.getItem('DATAGITBACK')
        if (Data === null) {
            DATAGITARRY.Footer.PowerBy.Link = String(events)
            localStorage.setItem('DATAGITBACK', JSON.stringify(DATAGITARRY))
            setPOWERBYLINK(events)
        } else {
            const newData = JSON.parse(Data)
            newData.Footer.PowerBy.Link = String(events)
            localStorage.setItem('DATAGITBACK', JSON.stringify(newData))
            setPOWERBYLINK(events)
        }
        Data = localStorage.getItem('DATAGITBACK')
        console.log(Data, "--------------", JSON.stringify(DATAGITARRY))
        if (JSON.stringify(DATAGITARRY) !== Data) {
            setONCHANGESAVE(true)
        } else {
            setONCHANGESAVE(false)
        }
    }
    const handleChangeStatusCommunity = (events) => {
        let Data = localStorage.getItem('DATAGITBACK')
        if (Data === null) {
            DATAGITARRY.Community.Status = String(events)
            localStorage.setItem('DATAGITBACK', JSON.stringify(DATAGITARRY))
            setSTAUSCommunity(events)
        } else {
            const newData = JSON.parse(Data)
            newData.Community.Status = String(events)
            localStorage.setItem('DATAGITBACK', JSON.stringify(newData))
            setSTAUSCommunity(events)
        }
        Data = localStorage.getItem('DATAGITBACK')
        console.log(Data, "--------------", JSON.stringify(DATAGITARRY))
        if (JSON.stringify(DATAGITARRY) !== Data) {
            setONCHANGESAVE(true)
        } else {
            setONCHANGESAVE(false)
        }
    }

    const handleChangeTextCommunity = (events) => {
        let Data = localStorage.getItem('DATAGITBACK')
        if (Data === null) {
            DATAGITARRY.Community.Text = String(events)
            localStorage.setItem('DATAGITBACK', JSON.stringify(DATAGITARRY))
            setTextCommunity(events)
        } else {
            const newData = JSON.parse(Data)
            newData.Community.Text = String(events)
            localStorage.setItem('DATAGITBACK', JSON.stringify(newData))
            setTextCommunity(events)
        }
        Data = localStorage.getItem('DATAGITBACK')
        console.log(Data, "--------------", JSON.stringify(DATAGITARRY))
        if (JSON.stringify(DATAGITARRY) !== Data) {
            setONCHANGESAVE(true)
        } else {
            setONCHANGESAVE(false)
        }
    }
    const handleChangeBtnTextCommunity = (events) => {
        let Data = localStorage.getItem('DATAGITBACK')
        if (Data === null) {
            DATAGITARRY.Community.BtnText = String(events)
            localStorage.setItem('DATAGITBACK', JSON.stringify(DATAGITARRY))
            setBtnTextCommunity(events)
        } else {
            const newData = JSON.parse(Data)
            newData.Community.BtnText = String(events)
            localStorage.setItem('DATAGITBACK', JSON.stringify(newData))
            setBtnTextCommunity(events)
        }
        Data = localStorage.getItem('DATAGITBACK')
        console.log(Data, "--------------", JSON.stringify(DATAGITARRY))
        if (JSON.stringify(DATAGITARRY) !== Data) {
            setONCHANGESAVE(true)
        } else {
            setONCHANGESAVE(false)
        }
    }
    const handleChangeLinkBtnCommunity = (events) => {
        let Data = localStorage.getItem('DATAGITBACK')
        if (Data === null) {
            DATAGITARRY.Community.LinkBtn = String(events)
            localStorage.setItem('DATAGITBACK', JSON.stringify(DATAGITARRY))
            setLinkBtnCommunity(events)
        } else {
            const newData = JSON.parse(Data)
            newData.Community.LinkBtn = String(events)
            localStorage.setItem('DATAGITBACK', JSON.stringify(newData))
            setLinkBtnCommunity(events)
        }
        Data = localStorage.getItem('DATAGITBACK')
        console.log(Data, "--------------", JSON.stringify(DATAGITARRY))
        if (JSON.stringify(DATAGITARRY) !== Data) {
            setONCHANGESAVE(true)
        } else {
            setONCHANGESAVE(false)
        }
    }

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
    // uploadFile
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
            if(err.response.status===401){
                localStorage.clear()
                navigate(`${cfg.imgURI}/login`)
            }
            toast.error('Error deleting file!')
        });
    };
    const handleUploadLOGOHEADER = async (file) => {
        try {

            console.log(file)
            var events = `https://api.github.com/repos/${OwnerName}/${RepoName}/contents/logo/logoHEADER-f-${file.name}`
            var icon = `https://raw.githubusercontent.com/${OwnerName}/${RepoName}/main/logo/logoHEADER-f-${file.name}`
            // get EVents ? or no create agar bood ke hichi agar nabod besaz
            var data = await getFileContent(events)

            console.log(!data)
            if (!data) {
                setProgress(10)
                toast.info('The upload process may take up to a minute due to Github security reasons.\n  Please do not leave the page')
                var route = `https://api.github.com/repos/${OwnerName}/${RepoName}/contents/${DATAGITARRY.Header.Logo.ImageURI.split(`https://raw.githubusercontent.com/${OwnerName}/${RepoName}/main/`)[1]}`
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
                        DATAGITARRY.Header.Logo.ImageURI = String(icon)
                        localStorage.setItem('DATAGITBACK', JSON.stringify(DATAGITARRY))
                    } else {
                        const newData = JSON.parse(Data)
                        newData.Header.Logo.ImageURI = String(icon)
                        localStorage.setItem('DATAGITBACK', JSON.stringify(newData))
                    }

                    setTimeout(() => {
                        setProgress(70)
                        HANDLESAVE()
                    }, 5000);
                }).catch(err => {
                    console.log('put err:', err)
                    toast.error('Error Upload  Check Console!')
                    if(err.response.status===401){
                        localStorage.clear()
                        navigate(`${cfg.imgURI}/login`)
                    }
                });

                if (route !== '') {
                    const data2 = await getFileContent(route)
                    if (data2) {

                        setTimeout(() => {
                            setProgress(100)
                            setFile(null)
                            handleDelete(data2.path, data2.sha)
                            setProgress(0)
                        }, 7000);
                    } else {
                        setProgress2(100)
                        setFile3(null)
                        setTimeout(() => {
                            setProgress2(0)
                        }, 1000);
                    }
                } else {
                    setProgress2(100)
                    setFile3(null)
                    setTimeout(() => {
                        setProgress2(0)
                    }, 2000);
                }
            } else {
                toast.warn('You have already selected this file for the logo')
            }
        } catch (error) {
            toast.error('Error uploading file! Check The Console')
            console.error('Error uploading file:', error);
        }
    };


    const handleUploadLOGOFooter = async (file) => {
        try {

            console.log(file3)
            var events = `https://api.github.com/repos/${OwnerName}/${RepoName}/contents/logo/logoFooter-f-${file3.name}`
            var icon = `https://raw.githubusercontent.com/${OwnerName}/${RepoName}/main/logo/logoFooter-f-${file3.name}`
            // get EVents ? or no create agar bood ke hichi agar nabod besaz
            var data = await getFileContent(events)

            console.log(!data)
            if (!data) {
                setProgress2(10)
                toast.info('The upload process may take up to a minute due to Github security reasons.\n  Please do not leave the page')
                var route = `https://api.github.com/repos/${OwnerName}/${RepoName}/contents/${DATAGITARRY.Footer.Logo.ImageURI.split(`https://raw.githubusercontent.com/${OwnerName}/${RepoName}/main/`)[1]}`
                const fileContentBase64 = await fileToBase64(file3);
                await axios.put(events, {
                    message: 'Upload file' + file3.name,
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
                        DATAGITARRY.Footer.Logo.ImageURI = String(icon)
                        localStorage.setItem('DATAGITBACK', JSON.stringify(DATAGITARRY))
                    } else {
                        const newData = JSON.parse(Data)
                        newData.Footer.Logo.ImageURI = String(icon)
                        localStorage.setItem('DATAGITBACK', JSON.stringify(newData))
                    }

                    setTimeout(() => {
                        setProgress2(70)
                        HANDLESAVE()
                    }, 5000);
                }).catch(err => {
                    console.log('put err:', err)
                    toast.error('Error Upload  Check Console!')
                    if(err.response.status===401){
                        localStorage.clear()
                        navigate(`${cfg.imgURI}/login`)
                    }
                });

                if (route !== '') {
                    const data2 = await getFileContent(route)
                    if (data2) {

                        setTimeout(() => {
                            setProgress2(100)
                            setFile3(null)
                            handleDelete(data2.path, data2.sha)
                            setProgress2(0)
                        }, 7000);
                    } else {
                        setProgress2(100)
                        setFile3(null)
                        setTimeout(() => {
                            setProgress2(0)
                        }, 1000);
                    }
                } else {
                    setProgress2(100)
                    setFile3(null)
                    setTimeout(() => {
                        setProgress2(0)
                    }, 2000);
                }
            } else {
                toast.warn('You have already selected this file for the logo')
            }

        } catch (error) {
            toast.error('Error uploading file! Check The Console')
            console.error('Error uploading file:', error);
        }
    };
    return (<Dashboard title='Header And Footer' disc='Site header and footer editing section'>
        {/* Header */}
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
                        <h5>Status Header</h5>
                    </div>
                </div>
                <div class="form-check form-switch">
                    <input checked={STATUSHEADER} onChange={() => handleChangeSTATUSHEADER(!STATUSHEADER)} className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
                    <label class="form-check-label" for="flexSwitchCheckDefault">   Do you want this section to be displayed on the site?</label>
                </div>
            </div>

        </div>
        <div class="card">
            <div class="card-body">
                <div className="row">
                    <div className="col">
                        <h5>Logo Header</h5>
                    </div>
                </div>
                <label class="form-check-label" >Please choose a logo for your site. </label>
                <br />
                <br />
                <label class="form-check-label" >Title Site </label>
                <input value={TITLEHEADER} onChange={e => handleChangeTITLEHEADER(e.target.value)} type="text" class="form-control" placeholder="Title Site" aria-label="Username" aria-describedby="basic-addon1" />
                <br />
                {file !== null ? <div class="alert alert-custom" role="alert">
                    <div class="alert-content">
                        <div>
                            <label htmlFor="fileName">{`https://github.com/${OwnerName}/${RepoName}/image/logo/logoHEADER-f-${file.name}`}</label>
                        </div>
                        <br />
                        <span class="alert-title">{file.name}</span>
                        <span class="alert-text">URL:<a target="_blank" href={URL.createObjectURL(file)}> {URL.createObjectURL(file)} </a></span>
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
                        <button onClick={() => setFile(null)} type="button" className="btn btn-danger m-2">Remove File</button>
                        <button onClick={() => { handleUploadLOGOHEADER(file) }} type="button" className="btn btn-success m-2">Upload File</button><br />

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

                        {SOCIALMEDIALISTHEADER.length !== 0 ?
                            SOCIALMEDIALISTHEADER.map(item => {
                                return (
                                    <div style={{ borderRadius: 20, marginBottom: 10 }} className={item.Dark ? "widget-payment-request-author bg-dark" : "widget-payment-request-author"}>
                                        <div className="avatar m-r-sm">
                                            <img src={item.Icone} alt />
                                        </div>
                                        <div className="widget-payment-request-author-info">
                                            <span className="widget-payment-request-author-name">{`https://${item.Link}`}</span>
                                            <span className="widget-payment-request-author-about">{item.Icone.split(`https://raw.githubusercontent.com/${OwnerName}/${RepoName}/main/`)[1]}</span>
                                        </div>
                                        <span class="widget-payment-request-product-price"><button onClick={() => { handleDeleteSOCIAL_Header(item.Icone) }} type="button" class="btn btn-danger"><i class="material-icons">delete_outline</i>Remove</button>     </span>

                                    </div>
                                )
                            })
                            : null}
                        <br />
                        <br />
                        <div class="form-check form-switch">
                            <input checked={SOCIALDARKMODEHEADER} onChange={() => setSOCIALDARKMODEHEADER(!SOCIALDARKMODEHEADER)} className="form-check-input" type="checkbox" id="flexSwitchCheckDefault2345" />
                            <label class="form-check-label" for="flexSwitchCheckDefault2345">  On Dark Mode?</label>
                        </div>


                        <div class="input-group mb-3">
                            <span class="input-group-text input-group-text" id="custom-addon3">https://</span>
                            <input value={SOCIALMEDIALINKHEADER} onChange={(e) => { setSOCIALMEDIALINKHEADER(e.target.value) }} type="text" className="form-control form-control" id="custom-url" aria-describedby="custom-addon3" />
                            <br />
                        </div>
                        {file2 !== null ? <div class="alert alert-custom" role="alert">
                            <div class="alert-content">
                                <div>
                                    <label htmlFor="fileName2">{`https://github.com/${OwnerName}/${RepoName}/image/social/logoFooter-f-${file2.name}`}</label>
                                </div>
                                <br />
                                <span class="alert-title">{file2.name}</span>
                                <span class="alert-text">URL:<a target="_blank" href={URL.createObjectURL(file2)}> {URL.createObjectURL(file2)} </a></span>
                                <br />
                                {/* onClick={handleUpload} */}
                                <button onClick={() => setFile2(null)} type="button" className="btn btn-danger m-2">Remove File</button>
                                {
                                    Progress3 !== 0 ?
                                        <div>
                                            <span class="btn btn-light alert-title"><div class="spinner-border text-primary" role="status">
                                                <span class="visually-hidden">Loading...</span>
                                            </div> Uploading . . . .</span>

                                            <div className="progress">
                                                <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuemax={100} style={{ width: `${Progress3}%` }} />
                                            </div>
                                        </div>
                                        : null
                                }

                            </div>
                        </div> : null}

                        <div id="dropzone">
                            <form className="dropzone needsclick dz-clickable" onClick={() => input2.current.click()}>
                                <div className="dz-message needsclick" >
                                    <button type="button" className="dz-button">Drop files here or click to upload.</button><br />
                                    <button type="button" className="dz-button">50*50 px</button><br />
                                    <span className="note needsclick">(This is just a demo dropzone. Selected files are <strong>not</strong> actually uploaded.)</span>
                                </div>
                                <input style={{ display: 'none' }} type="file" ref={input2} onChange={handleChange2} />
                            </form>
                        </div>


                        <div className="widget-payment-request-actions m-t-md d-flex">
                            <a onClick={handleChangeSOCIALHEADER} className="btn btn-primary flex-grow-1 m-l-xxs">Add Social Media Link</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>



        {/* Footer */}
        <div class="card">
            <div class="card-body">
                <div className="row">
                    <div className="col">
                        <h5>Status Footer</h5>
                    </div>
                </div>
                <div class="form-check form-switch">
                    <input checked={STATUSFOOTER} onChange={() => handleChangeSTATUSFOOTER(!STATUSFOOTER)} className="form-check-input" type="checkbox" id="flexSwitchCheckDefault23" />
                    <label class="form-check-label" for="flexSwitchCheckDefault23">   Do you want this section to be displayed on the site?</label>
                </div>
            </div>

        </div>
        <div class="card">
            <div class="card-body">
                <div className="row">
                    <div className="col">
                        <h5>Logo Footer</h5>
                    </div>
                </div>
                <label class="form-check-label">Please choose a logo for your site. </label>
                <br />
                <br />
                <label class="form-check-label" >Title Site </label>
                <input value={TITLEFOOTER} onChange={e => handleChangeTITLEFOOTER(e.target.value)} type="text" class="form-control" placeholder="Title Site" aria-label="Username" aria-describedby="basic-addon1" />

                <br />
                <label class="form-check-label" >Text Site </label>
                <input value={TEXTFOOTER} onChange={e => handleChangeTEXTFOOTER(e.target.value)} type="text" class="form-control" placeholder="Title Site" aria-label="Username" aria-describedby="basic-addon1" />
                <br />
                {file3 !== null ? <div class="alert alert-custom" role="alert">
                    <div class="alert-content">
                        <div>
                            <label htmlFor="fileName">{`https://github.com/${OwnerName}/${RepoName}/image/logo/${file3.name}`}</label>
                        </div>
                        <br />
                        <span class="alert-title">{file3.name}</span>
                        <span class="alert-text">URL:<a target="_blank" href={URL.createObjectURL(file3)}> {URL.createObjectURL(file3)} </a></span>
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
                        <button onClick={() => setFile3(null)} type="button" className="btn btn-danger m-2">Remove File</button>
                        <button onClick={() => { handleUploadLOGOFooter(file3) }} type="button" className="btn btn-success m-2">Upload File</button><br />

                    </div>
                </div> : null}

                <div id="dropzone">
                    <form className="dropzone needsclick dz-clickable" onClick={() => input3.current.click()}>
                        <div className="dz-message needsclick" >
                            <button type="button" className="dz-button">Drop files here or click to upload.</button><br />
                            <span className="note needsclick">(This is just a demo dropzone. Selected files are <strong>not</strong> actually uploaded.)</span>
                        </div>
                        <input style={{ display: 'none' }} type="file" ref={input3} onChange={handleChange3} />
                    </form>
                </div>


            </div>
        </div>

        <div className="card">
            <div className=" widget widget-payment-request">
                <div className="card-header">
                    <h5 className="card-title">Social Media Footer</h5>
                </div>
                <div class="form-check form-switch">
                    <label class="form-check-label" > Add your social media. </label>
                </div>
                <div className="card-body">
                    <div className="widget-payment-request-container">
                        {SOCIALMEDIALISTFOOTER.length !== 0 ?
                            SOCIALMEDIALISTFOOTER.map(item => {
                                return (
                                    <div style={{ borderRadius: 20, marginBottom: 10 }} className={item.Dark ? "widget-payment-request-author bg-dark" : "widget-payment-request-author"}>
                                        <div className="avatar m-r-sm">
                                            <img src={item.Icone} alt />
                                        </div>
                                        <div className="widget-payment-request-author-info">
                                            <span className="widget-payment-request-author-name">{`https://${item.Link}`}</span>
                                            <span className="widget-payment-request-author-about">{item.Icone.split(`https://raw.githubusercontent.com/${OwnerName}/${RepoName}/main/`)[1]}</span>
                                        </div>
                                        <span class="widget-payment-request-product-price"><button onClick={() => { handleDeleteSOCIAL_Footer(item.Icone) }} type="button" class="btn btn-danger"><i class="material-icons">delete_outline</i>Remove</button>     </span>
                                    </div>
                                )
                            })
                            : null}
                        <br />
                        <br />
                        <div class="form-check form-switch">
                            <input checked={SOCIALDARKMODEFOOTER} onChange={() => setSOCIALDARKMODEFOOTER(!SOCIALDARKMODEFOOTER)} className="form-check-input" type="checkbox" id="flexSwitchCheckDefault234" />
                            <label class="form-check-label" for="flexSwitchCheckDefault234">  On Dark Mode?</label>
                        </div>

                        <label class="form-check-label" > Link Social Media </label>
                        <div class="input-group mb-3">
                            <span class="input-group-text input-group-text" id="custom-addon3">https://</span>
                            <input value={SOCIALMEDIALINKFOOTER} onChange={(e) => { setSOCIALMEDIALINKFOOTER(e.target.value) }} type="text" className="form-control form-control" id="custom-url" aria-describedby="custom-addon3" />
                            <br />
                        </div>

                        {file4 !== null ? <div class="alert alert-custom" role="alert">
                            <div class="alert-content">
                                <div>
                                    <label htmlFor="fileName2">{`https://github.com/${OwnerName}/${RepoName}/image/social/${file4.name}`}</label>
                                </div>
                                <br />
                                <span class="alert-title">{file4.name}</span>
                                <span class="alert-text">URL:<a target="_blank" href={URL.createObjectURL(file4)}> {URL.createObjectURL(file4)} </a></span>
                                <br />
                                {/* onClick={handleUpload} */}
                                <button onClick={() => setFile4(null)} type="button" className="btn btn-danger m-2">Remove File</button>
                                <button type="button" className="btn btn-success m-2">Upload File</button><br />
                                {
                                    Progress4 !== 0 ?
                                        <div>
                                            <span class="btn btn-light alert-title"><div class="spinner-border text-primary" role="status">
                                                <span class="visually-hidden">Loading...</span>
                                            </div> Uploading . . . .</span>

                                            <div className="progress">
                                                <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuemax={100} style={{ width: `${Progress4}%` }} />
                                            </div>
                                        </div>
                                        : null
                                }
                            </div>
                        </div> : null}

                        <div id="dropzone">
                            <form className="dropzone needsclick dz-clickable" onClick={() => input4.current.click()}>
                                <div className="dz-message needsclick" >
                                    <button type="button" className="dz-button">Drop files here or click to upload.</button><br />
                                    <button type="button" className="dz-button">50*50 px</button><br />
                                    <span className="note needsclick">(This is just a demo dropzone. Selected files are <strong>not</strong> actually uploaded.)</span>
                                </div>
                                <input style={{ display: 'none' }} type="file" ref={input4} onChange={handleChange4} />
                            </form>
                        </div>

                        <div className="widget-payment-request-actions m-t-md d-flex">
                            <a onClick={handleChangeSOCIALFOOTER} className="btn btn-primary flex-grow-1 m-l-xxs">Add Social Media Link</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="card">
            <div className=" widget widget-payment-request"><div className="card-header">
                <h5 className="card-title">PowerBy Footer</h5>
            </div>
                <div className="card-body">
                    <div class="form-check form-switch">
                        <input checked={STAUSPOWERBY} onChange={() => handleChangeSTAUSPOWERBY(!STAUSPOWERBY)} className="form-check-input" type="checkbox" id="flexSwitchCheckDefault234455" />
                        <label class="form-check-label" for="flexSwitchCheckDefault234455">on PowerBy ?</label>
                    </div>
                    <br />
                    <label class="form-check-label" >Name PowerBy </label>
                    <input value={POWERBYNAME} onChange={e => handleChangePOWERBYNAME(e.target.value)} type="text" class="form-control" placeholder="Name PowerBy " aria-label="Username" aria-describedby="basic-addon1" />

                    <br />
                    <label class="form-check-label" for="flexSwitchCheckDefault234"> Link PowerBy :</label>
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="basic-addon3">https://</span>
                        <input value={POWERBYLINK} onChange={(e) => { handleChangePOWERBYLINK(e.target.value) }} type="text" class="form-control" id="basic-url" aria-describedby="basic-addon3" />
                    </div>

                </div>
            </div>
        </div>
        <div className="card">
            <div className=" widget widget-payment-request"><div className="card-header">
                <h5 className="card-title">Community</h5>
            </div>
                <div className="card-body">
                    <div class="form-check form-switch">
                        <input checked={STAUSCommunity} onChange={() => handleChangeStatusCommunity(!STAUSCommunity)} className="form-check-input" type="checkbox" id="flexSwitchCheckDefault234455sd" />
                        <label class="form-check-label" for="flexSwitchCheckDefault234455sd">on STAUS Community ?</label>
                    </div>
                    <br />
                    <label class="form-check-label" >Text Community  </label>
                    <input value={TextCommunity} onChange={e => handleChangeTextCommunity(e.target.value)} type="text" class="form-control" placeholder="Name PowerBy " aria-label="Username" aria-describedby="basic-addon1" />

                    <br />
                    <label class="form-check-label" >Btn Text Community  </label>
                    <input value={BtnTextCommunity } onChange={e => handleChangeBtnTextCommunity(e.target.value)} type="text" class="form-control" placeholder="Name PowerBy " aria-label="Username" aria-describedby="basic-addon1" />

                    <br />
                    <label class="form-check-label" for="flexSwitchCheckDefault234"> Link Community :</label>
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="basic-addon3">https://</span>
                        <input value={LinkBtnCommunity} onChange={(e) => { handleChangeLinkBtnCommunity(e.target.value) }} type="text" class="form-control" id="basic-url" aria-describedby="basic-addon3" />
                    </div>

                </div>
            </div>
        </div>
        {ONCHANGESAVE ? <div class="card" >
            <div class="card-body" style={{ display: "flex", justifyContent: 'space-between' }}><div>Click the Save button to save the information ؟</div>
                <div>
                    <button onClick={HANDLESAVE} type="button" class="btn btn-outline-success m-2">Save</button>
                    <button onClick={() => {
                        getData()
                        setONCHANGESAVE(false)
                    }} type="button" class="btn btn-outline-danger">Return</button></div></div></div>
            : null}
    </Dashboard>
    );
}
export default HeaderSAndFooterS;