import React from "react";
import { Link } from "react-router-dom";

function RegisteredNavbar() {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/categories">Categories</Link>
                </li>
                <li>
                    <Link to="/search">Search</Link>
                </li>
                <li>
                    <Link to="/create">Create</Link>
                </li>
                <li>
                    <Link to="/mylists">MyLists</Link>
                </li>
            </ul>
        </nav>
    );
}

export default RegisteredNavbar;