import React from "react";
import {Outlet} from "react-router-dom";
import BasicNavbar from "../components/navbar/basicNavbar";

const BasicLayout = () => {
    return (
        <div>
            <BasicNavbar />
            <Outlet />
        </div>
    );
};

export default BasicLayout;