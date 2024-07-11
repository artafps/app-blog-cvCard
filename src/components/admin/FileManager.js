import axios from "axios";
import FileMaping from "./components-dashboard/FileMaping";
import MainLayoutAdmin from "../layouts/MainLayoutAdmin";
import { toast } from "react-toastify";


const FileManager = () => {
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
            throw error;
        }
    };

    return (<MainLayoutAdmin title={'File Manager'}>
                <FileMaping editFile={editFile}/>
    </MainLayoutAdmin>);
}

export default FileManager;