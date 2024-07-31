import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from "./components/auth/login";
import { Fragment } from "react";
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
import ListBlog from './components/admin/ListBlog';
import CreateBlog from './components/admin/CreateBlog';
import cfg from './Config.json'
function App() {

  return (
    <Fragment>
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
          <Route path={`${cfg.imgURI}/login`} exact element={<Login />} />
          <Route path={`${cfg.imgURI}/admin/dashboard/hf`} exact element={<HeaderSAndFooterS />} />
          <Route path={`${cfg.imgURI}/admin/dashboard/slider`} exact element={<SliderS />} />
          <Route path={`${cfg.imgURI}/admin/dashboard/donate-btn`} exact element={<DonateBTNS />} />
          <Route path={`${cfg.imgURI}/admin/dashboard/skil`} exact element={<LanguageBoxS />} />
          <Route path={`${cfg.imgURI}/admin/dashboard/news`} exact element={<News />} />
          <Route path={`${cfg.imgURI}/admin/dashboard/blog`} exact element={<Blogs />} />
          <Route path={`${cfg.imgURI}/admin/dashboard/project`} exact element={<ProjectS />} />
          <Route path={`${cfg.imgURI}/admin/dashboard/myteam`} exact element={<MyTeamS />} />
          <Route path={`${cfg.imgURI}/admin/dashboard/plan`} exact element={<PlanS />} />
          <Route path={`${cfg.imgURI}/admin/dashboard/lc`} exact element={<LabelsAndCategorys />} />
          <Route path={`${cfg.imgURI}/admin/dashboard/change-language-web`} exact element={<ChangeLangS />} />
          <Route path={`${cfg.imgURI}/admin/document`} exact element={<Document />} />
          <Route path={`${cfg.imgURI}/`} exact element={<FileManager />} />
          <Route path={`${cfg.imgURI}/admin/upload-file`} exact element={<UploadFile />} />
          <Route path={`${cfg.imgURI}/admin/create-file`} exact element={<FileUploader />} />
          <Route path={`${cfg.imgURI}/admin/blog`} exact element={<ListBlog />} />
          <Route path={`${cfg.imgURI}/admin/addblog`} exact element={<CreateBlog />} />
        </Routes >
      </Router >
    </Fragment>
  );
}

export default App;
