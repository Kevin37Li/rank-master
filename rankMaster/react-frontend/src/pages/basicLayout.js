import React from "react";
import {Outlet} from "react-router-dom";
import BasicNavbar from "../components/navbar/basicNavbar";
import styled from 'styled-components';

const BackGround = styled.div`
        width: 100vw;
        height: 98vh;
        background: linear-gradient(to bottom right, #abd4ff, #fff8c9);
        padding-top: 2vh;
    `;

const BasicLayout = () => {
    return (
        <BackGround>
            <BasicNavbar />
            <Outlet />
        </BackGround>
    );
};

export default BasicLayout;