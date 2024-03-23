import FileUploaderComponent from "./components-dashboard/FileUploaderComponent";
import MainLayoutAdmin from "../layouts/MainLayoutAdmin";


const FileUploader = () => {
    return (<MainLayoutAdmin title={'Create File'}>
       <FileUploaderComponent/>
    </MainLayoutAdmin>);
}

export default FileUploader;