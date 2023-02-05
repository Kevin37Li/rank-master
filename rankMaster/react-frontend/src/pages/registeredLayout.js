import React from "react";
import {Outlet} from "react-router-dom";
import RegisteredNavbar from "../components/navbar/registeredNavbar";

const RegisteredLayout = () => {
    return (
        <div>
            <RegisteredNavbar />
            <Outlet />
        </div>
    );
};

export default RegisteredLayout;