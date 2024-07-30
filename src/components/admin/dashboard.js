import { useLocation, useNavigate } from "react-router";
import MainLayoutAdmin from "../layouts/MainLayoutAdmin";
import cfg from '../../Config.json'

const Dashboard = (Props) => {
    const navigate = useNavigate()
    const { pathname } = useLocation();
    return (<MainLayoutAdmin title={''}>
        
        <div >
            <div class="dropdown ">
                <a class="content-menu-toggle btn btn-primary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                    <i className="material-icons">menu</i> content
                </a>
                <ul class="dropdown-menu list-unstyled content-menu " aria-labelledby="dropdownMenuLink">
                    <li><a onClick={() => { navigate(`${cfg.imgURI}/admin/dashboard/Header&Footer`)}} className={pathname.split('/')[2] === 'Header&Footer' ? "active" : null} >Header & Footer</a></li>
                    <li><a onClick={() => { navigate(`${cfg.imgURI}/admin/dashboard/DonateBTNS`)}} className={pathname.split('/')[2] === 'DonateBTNS' ? "active" : null}  >Donate Button</a></li>
                    <li><a onClick={() => { navigate(`${cfg.imgURI}/admin/dashboard/SliderS`)}} className={pathname.split('/')[2] === 'SliderS' ? "active" : null}  >Slider</a></li>
                    <li><a onClick={() => { navigate(`${cfg.imgURI}/admin/dashboard/Skils`)}} className={pathname.split('/')[2] === 'Skils' ? "active" : null} >Skils</a></li>
                    <li className="divider" />
                    <li><a onClick={() => { navigate(`${cfg.imgURI}/admin/dashboard/News`)}} className={pathname.split('/')[2] === 'News' ? "active" : null} >News</a></li>
                    <li><a onClick={() => { navigate(`${cfg.imgURI}/admin/dashboard/Blogs`)}} className={pathname.split('/')[2] === 'Blogs' ? "active" : null} >Blogs</a></li>
                    <li><a onClick={() => { navigate(`${cfg.imgURI}/admin/dashboard/ProjectS`)}} className={pathname.split('/')[2] === 'ProjectS' ? "active" : null} >Project</a></li>
                    <li><a onClick={() => { navigate(`${cfg.imgURI}/admin/dashboard/MyTeamS`)}} className={pathname.split('/')[2] === 'MyTeamS' ? "active" : null} >My Team</a></li>
                    <li><a onClick={() => { navigate(`${cfg.imgURI}/admin/dashboard/PlanS`)}} className={pathname.split('/')[2] === 'PlanS' ? "active" : null} >How Work Plans</a></li>
                    <li><a onClick={() => { navigate(`${cfg.imgURI}/admin/dashboard/Labels&Categorys`)}} className={pathname.split('/')[2] === 'Labels&Categorys' ? "active" : null} >Labels & Categorys</a></li>
                    <li><a onClick={() => { navigate(`${cfg.imgURI}/admin/dashboard/Change-Language-Web`)}} className={pathname.split('/')[2] === 'Change-Language-Web' ? "active" : null} >Change Language Web</a></li>
                </ul>
            </div>
            <div className="content-menu content-menu-right ps">
                <ul className="list-unstyled">
                    <li><a onClick={() => { navigate(`${cfg.imgURI}/admin/dashboard/Header&Footer`)}} className={pathname.split('/')[2] === 'Header&Footer' ? "active" : null} >Header & Footer</a></li>
                    <li><a onClick={() => { navigate(`${cfg.imgURI}/admin/dashboard/DonateBTNS`)}} className={pathname.split('/')[2] === 'DonateBTNS' ? "active" : null}  >Donate Button</a></li>
                    <li><a onClick={() => { navigate(`${cfg.imgURI}/admin/dashboard/SliderS`)}} className={pathname.split('/')[2] === 'SliderS' ? "active" : null}  >Slider</a></li>
                    <li><a onClick={() => { navigate(`${cfg.imgURI}/admin/dashboard/Skils`)}} className={pathname.split('/')[2] === 'Skils' ? "active" : null} >Skils</a></li>
                    <li className="divider" />
                    <li><a onClick={() => { navigate(`${cfg.imgURI}/admin/dashboard/News`)}} className={pathname.split('/')[2] === 'News' ? "active" : null} >News</a></li>
                    <li><a onClick={() => { navigate(`${cfg.imgURI}/admin/dashboard/Blogs`)}} className={pathname.split('/')[2] === 'Blogs' ? "active" : null} >Blogs</a></li>
                    <li><a onClick={() => { navigate(`${cfg.imgURI}/admin/dashboard/ProjectS`)}} className={pathname.split('/')[2] === 'ProjectS' ? "active" : null} >Project</a></li>
                    <li><a onClick={() => { navigate(`${cfg.imgURI}/admin/dashboard/MyTeamS`)}} className={pathname.split('/')[2] === 'MyTeamS' ? "active" : null} >My Team</a></li>
                    <li><a onClick={() => { navigate(`${cfg.imgURI}/admin/dashboard/PlanS`)}} className={pathname.split('/')[2] === 'PlanS' ? "active" : null} >How Work Plans</a></li>
                    <li><a onClick={() => { navigate(`${cfg.imgURI}/admin/dashboard/Labels&Categorys`)}} className={pathname.split('/')[2] === 'Labels&Categorys' ? "active" : null} >Labels & Categorys</a></li>
                    <li><a onClick={() => { navigate(`${cfg.imgURI}/admin/dashboard/Change-Language-Web`)}} className={pathname.split('/')[2] === 'Change-Language-Web' ? "active" : null} >Change Language Web</a></li>
                </ul>
                <div className="ps__rail-x" style={{ left: 0, bottom: 0 }}><div className="ps__thumb-x" tabIndex={0} style={{ left: 0, width: 0 }} /></div><div className="ps__rail-y" style={{ top: 0, right: 0 }}><div className="ps__thumb-y" tabIndex={0} style={{ top: 0, height: 0 }} /></div></div>
            <div className="content-wrapper">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col">
                            <div className="page-description">
                                <h1>{Props.title}</h1>
                                <span>{Props.disc}</span>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        {Props.children}
                    </div>
                </div>
            </div>
        </div>

    </MainLayoutAdmin>
    );
}

export default Dashboard;