import MainLayoutAdmin from "../layouts/MainLayoutAdmin";


const Dashboard = () => {
    return (<MainLayoutAdmin title={''}>
        <div >
            <div class="dropdown ">
                <a class="content-menu-toggle btn btn-primary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                <i className="material-icons">menu</i> content
                </a>
                <ul class="dropdown-menu list-unstyled content-menu " aria-labelledby="dropdownMenuLink">
                    <li><a className="active">Header</a></li>
                    <li><a >Donate Button</a></li>
                    <li><a >Slider</a></li>
                    <li><a >Language Box</a></li>
                    <li><a >News</a></li>
                    <li><a >Project</a></li>
                    <li><a >How Work Plans</a></li>
                    <li><a >Blogs</a></li>
                    <li><a >My Team</a></li>
                    <li><a >About Us</a></li>
                    <li><a >Content Us</a></li>
                    <li className="divider" />
                    <li><a >labels & Categorys</a></li>
                    <li><a >Change Language Web</a></li>
                    <li><a ></a></li>
                </ul>
            </div>
            <div className="content-menu content-menu-right ps">
                <ul className="list-unstyled">
                    <li><a className="active">Header</a></li>
                    <li><a >Donate Button</a></li>
                    <li><a >Slider</a></li>
                    <li><a >Language Box</a></li>
                    <li><a >News</a></li>
                    <li><a >Project</a></li>
                    <li><a >How Work Plans</a></li>
                    <li><a >Blogs</a></li>
                    <li><a >My Team</a></li>
                    <li><a >About Us</a></li>
                    <li><a >Content Us</a></li>
                    <li className="divider" />
                    <li><a >labels & Categorys</a></li>
                    <li><a >Change Language Web</a></li>
                    <li><a ></a></li>
                </ul>
                <div className="ps__rail-x" style={{ left: 0, bottom: 0 }}><div className="ps__thumb-x" tabIndex={0} style={{ left: 0, width: 0 }} /></div><div className="ps__rail-y" style={{ top: 0, right: 0 }}><div className="ps__thumb-y" tabIndex={0} style={{ top: 0, height: 0 }} /></div></div>
            <div className="content-wrapper">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col">
                            <div className="page-description">
                                <h1>Header</h1>
                                <span>Changing the logo, menu and social media link
                                    .</span>
                            </div>
                        </div>
                    </div>
                    <div className="row">



                    </div>
                </div>
            </div>
        </div>

    </MainLayoutAdmin>
    );
}

export default Dashboard;