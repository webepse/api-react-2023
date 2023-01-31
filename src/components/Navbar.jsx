const Navbar = (props) => {
    return ( 
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">API-Platform React</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <a className="nav-link" href="#">Clients</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Factures</a>
                        </li>
                    </ul>
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <a className="nav-link" href="#">Inscription</a>
                        </li>
                        <li className="nav-item">
                            <a className="btn btn-success" href="#">Connexion</a>
                        </li>
                        <li className="nav-item">
                            <a className="btn btn-danger" href="#">Déconnexion</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>


     );
}
 
export default Navbar;