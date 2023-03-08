import React from 'react';
import styled from 'styled-components';
import {TextField, Button, Divider}from '@mui/material';
import TwitterIcon from '@mui/icons-material/Twitter';
import {useDispatch} from "react-redux";
import {storeCheckLogin, storeUsername} from "../redux/redux";
import {useNavigate} from 'react-router-dom';
import axios from "axios";


const LoginBox = styled.div`
  border-radius: 15px;
  border: 3px solid;
  margin: 20vh 30vw auto 30vw;
  height: 50vh;
  text-align: center;
  background-color: white;
`;

const EmailBox = {
    width: "90%",
    height: "20%",
    margin: "0vh 1vw 0vh 1vw",
    backgroundColor: "white",
};

const LoginDivider = {
    margin: "2vh 1vw 2vh 1vw",
    borderBottomWidth: "2px",
    width: "95%",
};

function Login() {

    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const dispatch = useDispatch();
    const navigation = useNavigate();


    const handleLogin = async () => {
        let u = email;
        let p = password;
        console.log(email);
        console.log(password);
        if (u !== "" && p !== "") {
            const request = {username: email, password: password}
            await axios.post("/auth/jwt/create", request)
            .then((res) => {
                console.log(res.data)
                dispatch(storeUsername(email));
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
                <h1>Login</h1>
                <TextField required id="username" label="Username" style={EmailBox} onChange={(event) => setEmail(event.target.value)}/>
                <TextField required id="password" style={EmailBox} label="Password" onChange={(event) => setPassword(event.target.value)}/>
                <Button variant="contained" onClick={() => handleLogin()} >Login</Button>
                <Divider style={LoginDivider}/>
                <Button variant="contained">
                    <TwitterIcon/>
                </Button>
            </LoginBox>
        </div>

    );
}

export default Login;