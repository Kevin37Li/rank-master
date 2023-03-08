import React from "react";
import {Outlet} from "react-router-dom";
import BasicNavbar from "../components/navbar/basicNavbar";
import styled from 'styled-components';

const BackGround = styled.div`
  background-color: rgba(0, 0, 0, 0.906);
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