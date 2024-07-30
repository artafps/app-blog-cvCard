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
          <Route path="/" exact element={<Login />} />
          <Route path="/admin/dashboard/Header&Footer" exact element={<HeaderSAndFooterS />} />
          <Route path="/admin/dashboard/SliderS" exact element={<SliderS />} />
          <Route path="/admin/dashboard/DonateBTNS" exact element={<DonateBTNS />} />
          <Route path="/admin/dashboard/Skils" exact element={<LanguageBoxS />} />
          <Route path="/admin/dashboard/News" exact element={<News />} />
          <Route path="/admin/dashboard/Blogs" exact element={<Blogs />} />
          <Route path="/admin/dashboard/ProjectS" exact element={<ProjectS />} />
          <Route path="/admin/dashboard/MyTeamS" exact element={<MyTeamS />} />
          <Route path="/admin/dashboard/PlanS" exact element={<PlanS />} />
          <Route path="/admin/dashboard/Labels&Categorys" exact element={<LabelsAndCategorys />} />
          <Route path="/admin/dashboard/Change-Language-Web" exact element={<ChangeLangS />} />
          <Route path="/admin/document" exact element={<Document />} />
          <Route path="/admin/file-manager" exact element={<FileManager />} />
          <Route path="/admin/upload-file" exact element={<UploadFile />} />
          <Route path="/admin/create-file" exact element={<FileUploader />} />
          <Route path="/admin/blog" exact element={<ListBlog />} />
          <Route path="/admin/addblog" exact element={<CreateBlog />} />
        </Routes >
      </Router >
    </Fragment>
  );
}

export default App;
