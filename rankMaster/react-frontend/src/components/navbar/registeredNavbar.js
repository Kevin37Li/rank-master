import React from "react";
import { Link } from "react-router-dom";
import './registeredNavbar.css';

function RegisteredNavbar() {
    return (
        <nav>
            <ul>
                <li>
                    <Link className="linkstyle" to="/">Home</Link>
                </li>
                <li>
                    <Link className="linkstyle" to="/categories">Categories</Link>
                </li>
                <li>
                    <Link className="linkstyle" to="/search">Search</Link>
                </li>
                <li>
                    <Link className="linkstyle" to="/create">Create</Link>
                </li>
                <li>
                    <Link className="linkstyle" to="/mylists">My Lists</Link>
                </li>
            </ul>
        </nav>
    );
}

export default RegisteredNavbar;