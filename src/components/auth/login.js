import React, { Fragment, useState } from 'react'
import { useNavigate } from 'react-router';


const Login = () => {
    const [Owner, setOwner] = useState('');
    const [Repo, setRepo] = useState('');
    const [AC, setAC] = useState('');
    const [CT, setClassicToken] = useState('');
    
    const navigate = useNavigate()
    const handleSetDataInLocalStorange = () => {
        localStorage.setItem("Owner", Owner)
        localStorage.setItem("Repo", Repo)
        localStorage.setItem("AC", AC)
        localStorage.setItem("CT", CT)
        navigate('/file-manager')
    }
    return (<Fragment>

        <div className="app app-auth-lock-screen align-content-stretch d-flex flex-wrap justify-content-end">
            <div className="app-auth-background">
            </div>
            <div className="app-auth-container">
                <div className="logo">
                    <div>Login Admin Panel Repo</div>
                </div>
                <p className="auth-description">You can use this source code to create a management panel for your personal sites with the help of GitHub. Thank you for following me on GitHub. <br/>
                My Github : github.com/ <a href="https://github.com/artafps" >artafps</a></p>
                <div className="auth-credentials m-b-xxl">
                    <label htmlFor="signInPassword" className="form-label">Owner name</label>
                    <input value={Owner} onChange={(e) => { setOwner(e.target.value) }} type="text" className="form-control" placeholder="artafps" />
                </div>
                <div className="auth-credentials m-b-xxl">
                    <label htmlFor="signInPassword" className="form-label">Repo Link Address</label>
                    <input value={Repo} onChange={(e) => { setRepo(e.target.value) }} type="text" className="form-control" placeholder="artafps" />
                </div>
                <div className="auth-credentials m-b-xxl">
                    <label htmlFor="signInPassword" className="form-label">Access Token</label>
                    <input value={AC} onChange={(e) => { setAC(e.target.value) }} type="password" className="form-control" placeholder="●●●●●●●●" />
                </div>
                <div className="auth-credentials m-b-xxl">
                    <label htmlFor="signInPassword" className="form-label">
                        Tokens (classic)
                        </label>
                    <input value={CT} onChange={(e) => { setClassicToken(e.target.value) }} type="password" className="form-control" placeholder="●●●●●●●●" />
                </div>
                <div className="auth-submit">
                    <div onClick={handleSetDataInLocalStorange} className="btn btn-primary">Login By Access Token</div>
                    <a href="https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens" className="auth-forgot-password float-end">Forgot Access Token?</a>
                </div>
            </div>
        </div>
    </Fragment>);
}

export default Login;