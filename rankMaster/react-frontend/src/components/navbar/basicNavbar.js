import React from "react";
import { Link } from "react-router-dom";
import './registeredNavbar.css';
import styled from "styled-components";
import {useSelector} from "react-redux";

const NavBar = styled.nav`
    background-color: #0095ff;
    background-color: #005862;
    background: linear-gradient(to bottom right, #00a6c3, #00cd6d);
    height: 7.5vh;
    width: 100vw;
    margin: 0 0 0 0;
    border: solid 2px black;
    position: fixed;
    z-index: 1;
    top: 0;
`;

const NavBarLink = styled.li`
    display: inline;
    padding: 2.5vw;
`;

const NavBarUl = styled.ul`
    padding-top: 0.75vh;
    margin-left: 5vw;
`;

const NavLink = {
    textDecoration: "none",
    color: "white",
    fontWeight: "bold",
};

function BasicNavbar() {
    const login = useSelector(state => state.checkLogin)
    if (login) {
        return(
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
                        <Link style={NavLink} to="/myApp/lists/create">Create</Link>
                    </NavBarLink>
                    <NavBarLink>
                        <Link style={NavLink} to="/myApp/lists">My Lists</Link>
                    </NavBarLink>
                    <NavBarLink>
                        <Link style={NavLink} to="/myApp/profile">Profile</Link>
                    </NavBarLink>
                </ul>
            </NavBar>
        )
    } else {
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
                    <NavBarLink>
                        <Link style={NavLink} to="/myApp/register">Register</Link>
                    </NavBarLink>
                </ul>
            </NavBar>
        );
    }

}

export default BasicNavbar;