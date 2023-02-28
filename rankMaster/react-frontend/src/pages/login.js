import React from 'react';
import styled from 'styled-components';
import {TextField, Button, Divider}from '@mui/material';
import TwitterIcon from '@mui/icons-material/Twitter';


const LoginBox = styled.div`
  border-radius: 15px;
  border: 3px solid;
  margin: 20vh 30vw auto 30vw;
  height: 50vh;
  text-align: center;
  background-color: white;
`;

const EmailBox = {
    width: "80%",
    height: "20%",
    padding: "1vh 1vw 0 1vw",
    backgroundColor: "white",
};

const LoginDivider = {
    margin: "2vh 1vw 2vh 1vw",
    borderBottomWidth: "2px",
    width: "95%",
};

function Login() {

    return (
        <div>
            <meta charSet="UTF-8"></meta>
            <LoginBox>
                <h1>Login</h1>
                <TextField style={EmailBox} label="Email" variant="filled" />
                <TextField style={EmailBox} label="Password" variant="filled" />
                <Button variant="contained">Login</Button>
                <Divider style={LoginDivider}/>
                <Button variant="contained">
                    <TwitterIcon/>
                </Button>
            </LoginBox>
        </div>

    );
}

export default Login;