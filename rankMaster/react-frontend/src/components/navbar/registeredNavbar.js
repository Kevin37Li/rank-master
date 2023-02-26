import React from "react";
import { Link } from "react-router-dom";
import './registeredNavbar.css';
import Logo from './rm.png';

function RegisteredNavbar() {
    return (
        <nav>
            <ul>
                <li className="navbarlink">
                    <Link className="linkstyle" to="/myApp">Home</Link>
                </li>
                <li className="navbarlink">
                    <Link className="linkstyle" to="/myApp/categories">Categories</Link>
                </li>
                <li className="navbarlink">
                    <Link className="linkstyle" to="/myApp/search">Search</Link>
                </li>
                <li className="navbarlink">
                    <Link className="linkstyle" to="/myApp/lists/create">Create</Link>
                </li>
                <li className="navbarlink">
                    <Link className="linkstyle" to="/myApp/lists">My Lists</Link>
                </li>
            </ul>
        </nav>
    );
}

export default RegisteredNavbar;