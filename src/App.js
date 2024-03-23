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
import AboutUsAndContactUs from './components/admin/Dashboard/AboutUsAndContactUs';
import News from './components/admin/Dashboard/News';
import Blogs from './components/admin/Dashboard/Blogs';
import ProjectS from './components/admin/Dashboard/ProjectS';
import MyTeamS from './components/admin/Dashboard/MyTeamS';
import PlanS from './components/admin/Dashboard/PlanS';
import LabelsAndCategorys from './components/admin/Dashboard/LabelsAndCategorys';
import ChangeLangS from './components/admin/Dashboard/ChangeLangS';


function App() {
  const theme = localStorage.getItem("theme")
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

          <Route path="/dashboard/Header&Footer" exact element={<HeaderSAndFooterS />} />
          <Route path="/dashboard/SliderS" exact element={<SliderS />} />
          <Route path="/dashboard/DonateBTNS" exact element={<DonateBTNS />} />
          <Route path="/dashboard/LanguageBoxS" exact element={<LanguageBoxS />} />
          <Route path="/dashboard/About&Content-Us" exact element={<AboutUsAndContactUs />} />

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
      </Router > </Fragment>
  );
}

export default App;
