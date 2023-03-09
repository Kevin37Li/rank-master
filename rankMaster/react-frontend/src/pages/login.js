import React from 'react';
import styled from 'styled-components';
import {TextField, Button, Divider}from '@mui/material';
import TwitterIcon from '@mui/icons-material/Twitter';
import {useDispatch, useSelector} from "react-redux";
import {storeCheckLogin, storeUsername} from "../redux/redux";
import {useNavigate} from 'react-router-dom';
import axios from "axios";

const LoginBox = styled.div`
  border-radius: 15px;
  border: 3px solid;
  margin: 10vh 35vw auto 35vw;
  height: 60vh;
  text-align: center;
  background-color: white;
  padding: 0 2vw 0 2vw;
`;

const LoginEntry = {
    width: "90%",
    height: "10%",
    margin: "0vh 1vw 0vh 1vw",
    backgroundColor: "white",
    color: "white"
};

const LoginDivider = {
    margin: "0vh 1vw 0vh 1vw",
    borderBottomWidth: "2px",
    width: "95%",
};

const ButtonStyle = {
    margin: "2vh 0 2vh 0",
}

const Login = () => {
    const login = useSelector(state => state.checkLogin)

    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const dispatch = useDispatch();
    const navigation = useNavigate();


    const handleLogin = async () => {
        let u = username;
        let p = password;
        console.log(username);
        console.log(password);
        if (u !== "" && p !== "") {
            const request = {username: username, password: password}
            await axios.post("/auth/jwt/create", request)
            .then((res) => {
                console.log(res.data)
                dispatch(storeUsername(username));
                dispatch(storeCheckLogin(true));
                navigation('/myApp', { replace: true });
            }).catch((error) => {
                console.log(error);
            });
        }
    };

    return (
        <div>
            <meta charSet="UTF-8"></meta>
            <LoginBox>
                <h2>Login</h2>
                <TextField required id="username" label="Username" style={LoginEntry} onChange={(event) => setUsername(event.target.value)}/>
                <TextField required id="password" style={LoginEntry} label="Password" onChange={(event) => setPassword(event.target.value)}/>
                <Button style={ButtonStyle} variant="contained" onClick={() => handleLogin()} >Login</Button>
                <Divider style={LoginDivider}/>
                <Button style={ButtonStyle} variant="contained">
                    <TwitterIcon/>
                </Button>
            </LoginBox>
        </div>
    );

}

export default Login;