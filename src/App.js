import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from "./components/auth/login";
import { Fragment } from "react";
import Dashboard from './components/admin/dashboard';
import Document from './components/admin/document';
import FileManager from './components/admin/FileManager';
import UploadFile from './components/admin/uploadFile';
import FileUploader from './components/admin/FileUploader';
function App() {
  return (
    <Fragment>
      {/* <head>
        {handleGETTheme() ? <link href="../../style/style.css" rel="stylesheet" /> :
          <link href="../../style/style-dark.css" rel="stylesheet" />
        }
      </head> */}
      {/* <ToastContainer
        className='irs'
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={true}
        theme={handleGETTheme() ? 'light' : 'dark'}
        rtl={true}
      /> */}
      <Router>
        <Routes>
          <Route path="/login" exact element={<Login />} />
          <Route path="/dashboard" exact element={<Dashboard />} />
          <Route path="/document" exact element={<Document />} />
          <Route path="/file-manager" exact element={<FileManager />} />
          <Route path="/upload-file" exact element={<UploadFile />} />
          <Route path="/create-file" exact element={<FileUploader />} />
        </Routes >
      </Router > </Fragment>
  );
}

export default App;
