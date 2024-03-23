import { useLocation, useNavigate } from "react-router";
import MainLayoutAdmin from "../layouts/MainLayoutAdmin";


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
                    <li><a onClick={() => { navigate('/Header&Footer') }} className="active">Header & Footer</a></li>
                    <li><a onClick={() => { navigate('/DonateBTNS') }} >Donate Button & Social Media</a></li>
                    <li><a onClick={() => { navigate('/SliderS') }} >Slider</a></li>
                    <li><a onClick={() => { navigate('/LanguageBoxS') }} >Language Box</a></li>
                    <li><a onClick={() => { navigate('/About&Content-Us') }} >About & Content - Us</a></li>
                    <li className="divider" />
                    <li><a onClick={() => { navigate('/PlanS') }} >How Work Plans</a></li>
                    <li><a onClick={() => { navigate('/News') }} >News</a></li>
                    <li><a onClick={() => { navigate('/ProjectS') }} >Project</a></li>
                    <li><a onClick={() => { navigate('/Blogs') }} >Blogs</a></li>
                    <li><a onClick={() => { navigate('/Labels&Categorys') }} >Labels & Categorys</a></li>
                    <li><a onClick={() => { navigate('/MyTeamS') }} >My Team</a></li>
                    <li className="divider" />
                    <li><a onClick={() => { navigate('/Change-Language-Web') }} >Change Language Web</a></li>
                </ul>
            </div>
            <div className="content-menu content-menu-right ps">
                <ul className="list-unstyled">
                <li><a onClick={() => { navigate('/Header&Footer') }} className="active">Header & Footer</a></li>
                    <li><a onClick={() => { navigate('/SliderS') }} >Slider</a></li>
                    <li><a onClick={() => { navigate('/DonateBTNS') }} >Donate Button</a></li>
                    <li><a onClick={() => { navigate('/LanguageBoxS') }} >Language Box</a></li>
                    <li><a onClick={() => { navigate('/About&Content-Us') }} >About & Content - Us</a></li>
                    <li className="divider" />
                    <li><a onClick={() => { navigate('/News') }} >News</a></li>
                    <li><a onClick={() => { navigate('/Blogs') }} >Blogs</a></li>
                    <li><a onClick={() => { navigate('/ProjectS') }} >Project</a></li>
                    <li><a onClick={() => { navigate('/MyTeamS') }} >My Team</a></li>
                    <li><a onClick={() => { navigate('/PlanS') }} >How Work Plans</a></li>
                    <li><a onClick={() => { navigate('/Labels&Categorys') }} >Labels & Categorys</a></li>
                    <li><a onClick={() => { navigate('/Change-Language-Web') }} >Change Language Web</a></li>
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