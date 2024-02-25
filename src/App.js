import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from "./components/auth/login";
import { Fragment } from "react";
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
          <Route path="/login" exact element={<Login  />} />
          <Route path="/Dashboard" exact element={<Login  />} />
        </Routes >
      </Router > </Fragment>
  );
}

export default App;
