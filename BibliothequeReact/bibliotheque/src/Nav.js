import React from 'react';
import './App.css'
import { Link} from 'react-router-dom'



function Nav(){
const navStyle = {
    const:'white'
};

    return (
        <nav>
            <h3>La bibliotheque</h3>
            <div className = "nav-link">
                <Link style={navStyle} to="/index">
                <li>Accueil</li>
                </Link>
                <Link style={navStyle} to="/Livres">
                <li>Livres</li>
                </Link>
            </div>
        </nav>
    )
}

export default Nav;