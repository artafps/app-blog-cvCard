import axios from "axios";
import FileMaping from "./components-dashboard/FileMaping";
import MainLayoutAdmin from "../layouts/MainLayoutAdmin";
import { toast } from "react-toastify";
import cfg from '../../Config.json'
import { useNavigate } from "react-router";


const FileManager = () => {
    const navigate = useNavigate()

    const editFile = async (filePath, newContent, sha, token) => {
        try {
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

    return (<MainLayoutAdmin title={'File Manager'}>
                <FileMaping editFile={editFile}/>
    </MainLayoutAdmin>);
}

export default FileManager;