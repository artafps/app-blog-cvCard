import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from "./components/auth/login";
import { Fragment } from "react";
import Dashboard from './components/admin/dashboard';
import Document from './components/admin/document';
import FileManager from './components/admin/FileManager';
import UploadFile from './components/admin/uploadFile';
import FileUploader from './components/admin/FileUploader';
import HeaderSAndFooterS from './components/admin/Dashboard/HeaderSAndFooterS';
import SliderS from './components/admin/Dashboard/SliderS';
import DonateBTNS from './components/admin/Dashboard/DonateBTNS';
import LanguageBoxS from './components/admin/Dashboard/LanguageBoxS';
import News from './components/admin/Dashboard/News';
import Blogs from './components/admin/Dashboard/Blogs';
import ProjectS from './components/admin/Dashboard/ProjectS';
import MyTeamS from './components/admin/Dashboard/MyTeamS';
import PlanS from './components/admin/Dashboard/PlanS';
import LabelsAndCategorys from './components/admin/Dashboard/LabelsAndCategorys';
import ChangeLangS from './components/admin/Dashboard/ChangeLangS';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {


  return (

    <Fragment>
      <head>
        {localStorage.getItem("theme") === 'light' ? <link href="../../style/style.css" rel="stylesheet" /> :
          <link href="../../style/style-dark.css" rel="stylesheet" />
        }
      </head>
      <ToastContainer
        className='irs'
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={true}
        theme={localStorage.getItem("theme") === 'light' ? 'light' : 'dark'}
        rtl={false}
      />
      <Router>
        <Routes>
          <Route path="/" exact element={<Login />} />


          <Route path="/dashboard/Header&Footer" exact element={<HeaderSAndFooterS />} />
          <Route path="/dashboard/SliderS" exact element={<SliderS />} />
          <Route path="/dashboard/DonateBTNS" exact element={<DonateBTNS />} />
          <Route path="/dashboard/Skils" exact element={<LanguageBoxS />} />

          <Route path="/dashboard/News" exact element={<News />} />
          <Route path="/dashboard/Blogs" exact element={<Blogs />} />
          <Route path="/dashboard/ProjectS" exact element={<ProjectS />} />
          <Route path="/dashboard/MyTeamS" exact element={<MyTeamS />} />
          <Route path="/dashboard/PlanS" exact element={<PlanS />} />
          <Route path="/dashboard/Labels&Categorys" exact element={<LabelsAndCategorys />} />
          <Route path="/dashboard/Change-Language-Web" exact element={<ChangeLangS />} />

          <Route path="/document" exact element={<Document />} />
          <Route path="/file-manager" exact element={<FileManager />} />
          <Route path="/upload-file" exact element={<UploadFile />} />
          <Route path="/create-file" exact element={<FileUploader />} />
        </Routes >
      </Router >
    </Fragment>
  );
}

export default App;
