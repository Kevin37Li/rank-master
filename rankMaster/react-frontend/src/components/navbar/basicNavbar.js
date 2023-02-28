import React from "react";
import { Link } from "react-router-dom";
import './registeredNavbar.css';
import styled from "styled-components";

const NavBar = styled.nav`
    background-color: whitesmoke;
    height: 7.5vh;
    width: 90vw;
    border-radius: 45px;
    border: solid 2px black;
    position: fixed;
    margin: 2vw 5vw 0 5vw;
    z-index: 1;
    top: 0;
`;

const NavBarLink = styled.li`
    display: inline;
    padding: 2.5vw;
`;

const NavLink = {
    textDecoration: "none",
    color: "black",
    fontWeight: "bold",
};

function BasicNavbar() {
    return (
        <NavBar>
            <ul>
                <NavBarLink>
                    <Link style={NavLink} to="/myApp">Home</Link>
                </NavBarLink >
                <NavBarLink>
                    <Link style={NavLink} to="/myApp/categories">Categories</Link>
                </NavBarLink>
                <NavBarLink>
                    <Link style={NavLink} to="/myApp/search">Search</Link>
                </NavBarLink>
                <NavBarLink>
                    <Link style={NavLink} to="/myApp/login">Login</Link>
                </NavBarLink>
            </ul>
        </NavBar>
    );
}

export default BasicNavbar;