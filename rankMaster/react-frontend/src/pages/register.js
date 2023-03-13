import React from 'react';
import styled from 'styled-components';
import {TextField, Button, Divider}from '@mui/material';
import TwitterIcon from '@mui/icons-material/Twitter';
import {useDispatch} from "react-redux";
import {storeCheckLogin, storeUsername} from "../redux/redux";
import {useNavigate} from 'react-router-dom';
import axios from "axios";
import Login from "./login";


const RegisterBox = styled.div`
  border-radius: 15px;
  border: 3px solid;
  margin: 5vh 35vw auto 35vw;
  height: 85vh;
  text-align: center;
  background-color: white;
  padding: 0 2vw 0 2vw;
  overflow: scroll;
`;

const RegisterEntry = {
    width: "90%",
    height: "10%",
    margin: "1vh 1vw 0vh 1vw",
    backgroundColor: "white",
    padding: "6px",
};

const RegisterDivider = {
    margin: "0vh 1vw 0vh 1vw",
    borderBottomWidth: "2px",
    width: "95%",
};

const ButtonStyle = {
    margin: "2vh 0 2vh 0",
}

const Register = () => {

    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [firstName, setFirstName] = React.useState("");
    const [lastName, setLastName] = React.useState("");


    const dispatch = useDispatch();
    const navigation = useNavigate();

    const handleRegister = async () => {
        let u = username;
        let p = password;
        let cp = confirmPassword;
        let e = email;
        let f = firstName;
        let l = lastName;

        if (u !== "" && p !== "" && cp !== "" && e !== "" && f !== "" && l !== "" ) {
            if (p !== cp) {
                console.log("Passwords do not match")
                return;
            }

            const request = {username: username, password: password, email: email, first_name: firstName, last_name: lastName};

            await axios.post("/auth/users/", request)
                .then((res) => {
                    console.log(res.data)
                    // dispatch(storeUsername(username));
                    // dispatch(storeCheckLogin(false));
                    navigation('/myApp', { replace: true });
                    console.log("user created");
                    alert("Please log in again");
                }).catch((error) => {
                    console.log(error);
                });
        }
    };

    return (
        <div>
            <meta charSet="UTF-8"></meta>
            <RegisterBox>
                <h2>Register</h2>
                <TextField required id="username" label="Username" style={RegisterEntry} onChange={(event) => setUsername(event.target.value)}/>
                <TextField required id="password" style={RegisterEntry} label="Password" onChange={(event) => setPassword(event.target.value)}/>
                <TextField required id="confirmPassword" style={RegisterEntry} label="Confirm Password" onChange={(event) => setConfirmPassword(event.target.value)}/>
                <TextField required id="email" style={RegisterEntry} label="Email" onChange={(event) => setEmail(event.target.value)}/>
                <TextField required id="firstName" style={RegisterEntry} label="First Name" onChange={(event) => setFirstName(event.target.value)}/>
                <TextField required id="lastName" style={RegisterEntry} label="LastName" onChange={(event) => setLastName(event.target.value)}/>
                <Button style={ButtonStyle} variant="contained" onClick={() => handleRegister()} >Register</Button>
                <Divider style={RegisterDivider}/>
                <Button style={ButtonStyle} variant="contained">
                    <TwitterIcon/>
                </Button>
            </RegisterBox>
        </div>
    );
}

export default Register;