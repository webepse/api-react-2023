import { Link } from "react-router-dom";
import authAPI from "../services/authAPI";

const Navbar = (props) => {
    const handleLogout = () => {
        authAPI.logout()
    }

    return ( 
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">API-Platform React</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/customers">Clients</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/invoices">Factures</Link>
                        </li>
                    </ul>
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <a className="nav-link" href="#">Inscription</a>
                        </li>
                        <li className="nav-item">
                            <Link className="btn btn-success" to="/login">Connexion</Link>
                        </li>
                        <li className="nav-item">
                            <button className="btn btn-danger" onClick={handleLogout}>Déconnexion</button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>


     );
}
 
export default Navbar;