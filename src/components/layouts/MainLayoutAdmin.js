import { Octokit } from "@octokit/rest";
import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import File from '../admin/Index.json'
import File2 from '../admin/Language.json'
import { fileToBase64 } from "../../utils/fileToBase64";
import { toast } from "react-toastify";
import cfg from '../../Config.json'
const MainLayoutAdmin = (Props) => {
    const [profileImage, setProfileImage] = useState('');
    const [fullName, setFullName] = useState('');
    const [OPEN, setOPEN] = useState(true);
    const navigate = useNavigate()
    const { pathname } = useLocation();
    const OwnerName = localStorage.getItem('Owner');
    const accessToken = localStorage.getItem('AC');
    const ClassicToken = localStorage.getItem('CT');
    const [StatusCreateWeb, SetStatusCreateWeb] = useState(false);
    const RepoName = localStorage.getItem('Repo');
    useEffect(() => {
        const fetchFullName = async () => {
            try {
                const query = `
                query {
                  viewer {
                    name
                  }
                }
              `;

                const response = await axios.post('https://api.github.com/graphql', {
                    query: query
                }, {
                    headers: {
                        Authorization: `Bearer ${ClassicToken}`
                    }
                });

                const viewerName = response.data.data.viewer.name;
                setFullName(viewerName);
            } catch (error) {
                console.error('Error fetching full name:', error);
            }
        };

        fetchFullName();
        const fetchProfileImage = async () => {
            try {

                const query = `
            query {
              viewer {
                avatarUrl
              }
            }
          `;

                const response = await axios.post('https://api.github.com/graphql', {
                    query: query
                }, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                });

                const imageUrl = response.data.data.viewer.avatarUrl;
                setProfileImage(imageUrl);
            } catch (error) {
                console.error('Error fetching profile image:', error);
            }
        };

        fetchProfileImage();
    }, []);
    const [darkMode, setdarkMode] = useState('light');
    const handleSunMode = () => {
        localStorage.setItem('theme', 'light')
        setdarkMode('light')
    }
    const handleDarkMode = () => {
        localStorage.setItem('theme', 'dark')
        setdarkMode('dark')
    }
    const theme = localStorage.getItem("theme")
    const getData = () => {
        const octokit = new Octokit({
            auth: accessToken
        });
        const owner = OwnerName;
        const repo = RepoName;

        octokit.paginate(`GET /repos/${OwnerName}/${RepoName}/contents/configs`, {
            owner: owner,
            repo: repo,
            path: ""
        }).then(files => {
            const data = files.filter(item => {
                console.log(item)
                if (item.name === 'Config-Web-EN.json') {
                    return item
                }
            })
            if (data.length > 0) {
                SetStatusCreateWeb(true)
            }
        }).catch(err => {
            console.error("Error getting file list:", err);
        });
    }
    const handleCreateWebSite = async () => {
        // قرار است نام فایل بعدا داینامیک باشد
        const file = JSON.stringify(File)
        const file2 = JSON.stringify(File2)
        try {
            const data = {
                message: "Create new file",
                content: btoa(unescape(encodeURIComponent(file)))
            };
            const languageData = {
                message: "Create new file",
                content: btoa(unescape(encodeURIComponent(file2)))
            };
            const functionThatReturnPromise = () => new Promise(resolve => setTimeout(resolve, 3000));
            console.log(functionThatReturnPromise)
            const response = await axios.put(`https://api.github.com/repos/artafps/artafps/contents/configs/Config-Web-EN.json`, data, {
                headers: {
                    Authorization: `token ${accessToken}`
                }
            });

            const response2 = await axios.put(`https://api.github.com/repos/artafps/artafps/contents/configs/Language.json`, languageData, {
                headers: {
                    Authorization: `token ${accessToken}`
                }
            });
            toast.success('File created successfully!')
            console.log('File created:', response.data, response2.data);
        } catch (error) {
            toast.error('Error uploading file Check console')

            console.error('Error uploading file:', error);

        }

    }
    useEffect(() => {

        getData()
    }, []);
    return (<Fragment>

        {theme === 'dark' ? (
            <link href="./assets/css/darktheme.css" rel="stylesheet" />
        ) : null}
        <div>
            <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Create personal site</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                        </div>
                        <div className="modal-body">
                            Hello my friend
                            If you want to start a personal site, just click the "Create".
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#exampleModal">Close</button>
                            <button type="button" className="btn btn-success" onClick={handleCreateWebSite} data-bs-toggle="modal" data-bs-target="#exampleModal">Create</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className={OPEN ? "app align-content-stretch d-flex flex-wrap" : 'app align-content-stretch d-flex flex-wrap sidebar-hidden'}>
            <div className="app-sidebar" >
                <div className={OPEN ? "logo" : 'logo hidden-sidebar-logo'} >
                    <div className="sidebar-user-switcher user-activity-online" style={{ direction: "ltr", float: "left" }}>
                        <img src={profileImage} alt style={{ direction: "ltr", float: "left", marginRight: 10, }} />
                        <span style={{ direction: "ltr", float: "left", textAlign: 'left', }} className="user-info-text">{fullName}<br /><span className="user-state-info">{OwnerName}</span></span>

                    </div>
                </div>
                <div className="app-menu ps ps--active-y" >
                    <ul className="accordion-menu">
                        <li className="sidebar-title">
                            Apps
                        </li>
                        {
                            StatusCreateWeb ? (<li type="button" style={{ cursor: 'pointer' }} className={pathname.split('/')[2] === 'dashboard' ? "active-page" : ''}>
                                <a onClick={() => navigate(`${cfg.imgURI}/admin/dashboard/Header&Footer`)} className={pathname.split('/')[2] === 'dashboard' ? "active" : ''}><i className="material-icons-two-tone">dashboard</i>Dashboard</a>
                            </li>) : (
                                <li type="button" data-bs-toggle="modal" data-bs-target="#exampleModal" style={{ cursor: 'pointer' }} className={pathname.split('/')[2] === 'dashboard' ? "active-page" : ''}>
                                    <a className={pathname.split('/')[2] === 'dashboard' ? "active" : ''}><i className="material-icons-two-tone">dashboard</i>Dashboard</a>
                                </li>
                            )
                        }

                        <li style={{ cursor: 'pointer' }} className={pathname === '/admin/file-manager' ? "active-page" : ''}>
                            <a onClick={() => navigate(`${cfg.imgURI}/admin/file-manager`)} className={pathname === '/admin/file-manager' ? "active" : ''}><i className="material-icons-two-tone">cloud_queue</i>File Manager</a>
                        </li>
                        <li style={{ cursor: 'pointer' }} className={pathname === '/admin/create-file' ? "active-page" : ''}>
                            <a onClick={() => navigate(`${cfg.imgURI}/admin/create-file`)} className={pathname === '/admin/create-file' ? "active" : ''}><i className="material-icons-two-tone">
                                note_add
                            </i>Create file</a>
                        </li>
                        <li style={{ cursor: 'pointer' }} className={pathname === '/admin/upload-file' ? "active-page" : ''}>
                            <a onClick={() => navigate(`${cfg.imgURI}/admin/upload-file`)} className={pathname === '/admin/upload-file' ? "active" : ''}><i className="material-icons-two-tone">
                                upload_file
                            </i>Upload file</a>
                        </li>
                        <li className="sidebar-title">
                            Blog
                        </li>
                        
                        <li style={{ cursor: 'pointer' }} className={pathname === '/admin/blog' ? "active-page" : ''}>
                            <a onClick={() => navigate(`${cfg.imgURI}/admin/blog`)} className={pathname === '/admin/blog' ? "active" : ''}><i className="material-icons-two-tone">receipt_long</i>Blog List</a>
                        </li>

                        <li style={{ cursor: 'pointer' }} className={pathname === '/admin/addblog' ? "active-page" : ''}>
                            <a onClick={() => navigate(`${cfg.imgURI}/admin/addblog`)} className={pathname === '/admin/addblog' ? "active" : ''}><i className="material-icons-two-tone">note_add</i>Add Blog</a>

                        </li>
                        <li className="sidebar-title">
                            Other
                        </li>
                        <li style={{ cursor: 'pointer' }} className={pathname === '/admin/document' ? "active-page" : ''}>
                            <a onClick={() => navigate(`${cfg.imgURI}/admin/document`)} className={pathname === '/admin/document' ? "active" : ''}><i className="material-icons-two-tone">description</i>Document</a>

                        </li>
                    </ul>

                </div>
            </div>
            
            <div className="app-container">
                {/* <div className="search">
                    <form>
                        <input className="form-control" type="text" placeholder="Type here..." aria-label="Search" />
                    </form>
                    <a href="#" className="toggle-search"><i className="material-icons">close</i></a>
                </div> */}
                <div className="app-header">
                    <nav className="navbar navbar-light navbar-expand-lg">
                        <div className="container-fluid">
                            <div className="navbar-nav" id="navbarNav">
                                <ul className="navbar-nav">
                                    <li className="nav-item" onClick={() => { setOPEN(!OPEN) }}>
                                        <a className="nav-link hide-sidebar-toggle-button" href="#"><i className="material-icons">first_page</i></a>
                                    </li>
                                    {localStorage.getItem('theme') === 'dark' ? <li className="nav-item" onClick={handleSunMode} >
                                        <a className="nav-link hide-sidebar-toggle-button" href="#"><i className="material-icons-two-tone">light_mode</i></a>
                                    </li>
                                        : <li className="nav-item" onClick={handleDarkMode} >
                                            <a className="nav-link hide-sidebar-toggle-button" href="#"><i className="material-icons-two-tone">dark_mode</i></a>
                                        </li>}

                                    <li className="nav-item dropdown hidden-on-mobile">

                                        <a className="nav-link dropdown-toggle" href="#" id="exploreDropdownLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            <i className="material-icons-outlined">explore</i>
                                        </a>
                                        <ul className="dropdown-menu dropdown-lg large-items-menu" aria-labelledby="exploreDropdownLink">
                                            <li>
                                                <h6 className="dropdown-header">Repositories</h6>
                                            </li>
                                            <li>
                                                <a className="dropdown-item" href="#">
                                                    <h5 className="dropdown-item-title">
                                                        Neptune iOS
                                                        <span className="badge badge-warning">1.0.2</span>
                                                        <span className="hidden-helper-text">switch<i className="material-icons">keyboard_arrow_right</i></span>
                                                    </h5>
                                                    <span className="dropdown-item-description">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</span>
                                                </a>
                                            </li>
                                            <li>
                                                <a className="dropdown-item" href="#">
                                                    <h5 className="dropdown-item-title">
                                                        Neptune Android
                                                        <span className="badge badge-info">dev</span>
                                                        <span className="hidden-helper-text">switch<i className="material-icons">keyboard_arrow_right</i></span>
                                                    </h5>
                                                    <span className="dropdown-item-description">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</span>
                                                </a>
                                            </li>
                                            <li className="dropdown-btn-item d-grid">
                                                <button className="btn btn-primary">Create new repository</button>
                                            </li>
                                        </ul>
                                    </li>

                                </ul>
                            </div>
                            <div className="d-flex">
                                <ul className="navbar-nav">
                                    {/* <li className="nav-item hidden-on-mobile">
                <a className="nav-link active" href="#">Applications</a>
              </li>
              <li className="nav-item hidden-on-mobile">
                <a className="nav-link" href="#">Reports</a>
              </li>
              <li className="nav-item hidden-on-mobile">
                <a className="nav-link" href="#">Projects</a>
              </li> */}
                                    {/* <li className="nav-item">
                                        <a className="nav-link toggle-search" href="#"><i className="material-icons">search</i></a>
                                    </li> */}
                                    {/* <li className="nav-item hidden-on-mobile">
                <a className="nav-link language-dropdown-toggle" href="#" id="languageDropDown" data-bs-toggle="dropdown"><img src="../../assets/images/flags/us.png" alt /></a>
                <ul className="dropdown-menu dropdown-menu-end language-dropdown" aria-labelledby="languageDropDown">
                  <li><a className="dropdown-item" href="#"><img src="../../assets/images/flags/germany.png" alt />German</a></li>
                  <li><a className="dropdown-item" href="#"><img src="../../assets/images/flags/italy.png" alt />Italian</a></li>
                  <li><a className="dropdown-item" href="#"><img src="../../assets/images/flags/china.png" alt />Chinese</a></li>
                </ul>
              </li> */}
                                    <li className="nav-item hidden-on-mobile">
                                        {/* <a className="nav-link nav-notifications-toggle" id="notificationsDropDown" href="#" data-bs-toggle="dropdown">4</a> */}
                                        <div className="dropdown-menu dropdown-menu-end notifications-dropdown" aria-labelledby="notificationsDropDown">
                                            <h6 className="dropdown-header">Notifications</h6>
                                            <div className="notifications-dropdown-list">
                                                <a href="#">
                                                    <div className="notifications-dropdown-item">
                                                        {/* <div className="notifications-dropdown-item-image">
                          <span className="notifications-badge bg-info text-white">
                            <i className="material-icons-outlined">campaign</i>
                          </span>
                        </div> */}
                                                        <div className="notifications-dropdown-item-text">
                                                            <p className="bold-notifications-text">Donec tempus nisi sed erat vestibulum, eu suscipit ex laoreet</p>
                                                            <small>19:00</small>
                                                        </div>
                                                    </div>
                                                </a>
                                                <a href="#">
                                                    <div className="notifications-dropdown-item">
                                                        <div className="notifications-dropdown-item-image">
                                                            <span className="notifications-badge bg-danger text-white">
                                                                <i className="material-icons-outlined">bolt</i>
                                                            </span>
                                                        </div>
                                                        <div className="notifications-dropdown-item-text">
                                                            <p className="bold-notifications-text">Quisque ligula dui, tincidunt nec pharetra eu, fringilla quis mauris</p>
                                                            <small>18:00</small>
                                                        </div>
                                                    </div>
                                                </a>
                                                <a href="#">
                                                    <div className="notifications-dropdown-item">
                                                        <div className="notifications-dropdown-item-image">
                                                            <span className="notifications-badge bg-success text-white">
                                                                <i className="material-icons-outlined">alternate_email</i>
                                                            </span>
                                                        </div>
                                                        <div className="notifications-dropdown-item-text">
                                                            <p>Nulla id libero mattis justo euismod congue in et metus</p>
                                                            <small>yesterday</small>
                                                        </div>
                                                    </div>
                                                </a>
                                                <a href="#">
                                                    <div className="notifications-dropdown-item">
                                                        <div className="notifications-dropdown-item-image">
                                                            <span className="notifications-badge">
                                                                <img src={profileImage} alt />
                                                            </span>
                                                        </div>
                                                        <div className="notifications-dropdown-item-text">
                                                            <p>Praesent sodales lobortis velit ac pellentesque</p>
                                                            <small>yesterday</small>
                                                        </div>
                                                    </div>
                                                </a>
                                                <a href="#">
                                                    <div className="notifications-dropdown-item">
                                                        <div className="notifications-dropdown-item-image">
                                                            <span className="notifications-badge">
                                                                <img src="../../assets/images/avatars/avatar.png" alt />
                                                            </span>
                                                        </div>
                                                        <div className="notifications-dropdown-item-text">
                                                            <p>Praesent lacinia ante eget tristique mattis. Nam sollicitudin velit sit amet auctor porta</p>
                                                            <small>yesterday</small>
                                                        </div>
                                                    </div>
                                                </a>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                </div>

                <div className="app-content">
                    {Props.title !== '' ? (<div className="content-wrapper">

                        <div className="container">
                            <div className="row">
                                <div className="col">
                                    <div className="page-description">
                                        <h1>{Props.title}</h1>
                                    </div>
                                </div>
                            </div>


                        </div>
                    </div>) : null}
                    {Props.children}
                </div>
            </div>
        </div>

    </Fragment>);
}

export default MainLayoutAdmin;