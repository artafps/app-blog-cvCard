import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";


const MainLayoutAdmin = (Props) => {
    const [profileImage, setProfileImage] = useState('');
    const [fullName, setFullName] = useState('');
    const [OPEN, setOPEN] = useState(true);
    const navigate = useNavigate()
    const { pathname } = useLocation();
    const OwnerName = localStorage.getItem('Owner');
    const accessToken = localStorage.getItem('AC');
    const ClassicToken = localStorage.getItem('CT');
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
    return (<Fragment>
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
                        <li style={{ cursor: 'pointer' }} className={pathname.split('/')[1] === 'dashboard' ? "active-page" : ''}>
                            <a onClick={() => navigate('/dashboard')} className={pathname === '/dashboard' ? "active" : ''}><i className="material-icons-two-tone">dashboard</i>Dashboard</a>
                        </li>
                        <li style={{ cursor: 'pointer' }} className={pathname === '/file-manager' ? "active-page" : ''}>
                            <a onClick={() => navigate('/file-manager')} className={pathname === '/file-manager' ? "active" : ''}><i className="material-icons-two-tone">cloud_queue</i>File Manager</a>
                        </li>
                        <li style={{ cursor: 'pointer' }} className={pathname === '/create-file' ? "active-page" : ''}>
                            <a onClick={() => navigate('/create-file')} className={pathname === '/create-file' ? "active" : ''}><i className="material-icons-two-tone">
                                note_add
                            </i>Create file</a>
                        </li>
                        <li style={{ cursor: 'pointer' }} className={pathname === '/upload-file' ? "active-page" : ''}>
                            <a onClick={() => navigate('/upload-file')} className={pathname === '/upload-file' ? "active" : ''}><i className="material-icons-two-tone">
                                upload_file
                            </i>Upload file</a>
                        </li>
                        <li className="sidebar-title">
                            Other
                        </li>
                        <li style={{ cursor: 'pointer' }} className={pathname === '/document' ? "active-page" : ''}>
                            <a onClick={() => navigate('/document')} className={pathname === '/document' ? "active" : ''}><i className="material-icons-two-tone">description</i>Document</a>

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