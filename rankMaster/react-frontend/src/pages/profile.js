import {useSelector} from "react-redux";
import React, {useEffect} from "react";
import axios from "axios";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {Button, TextField} from "@mui/material";
import styled from "styled-components";

const ButtonStyle = {
    margin: "2vh 0 2vh 0",
}

const ProfileBox = styled.div`
  border-radius: 15px;
  border: 3px solid rgba(255, 255, 255, 0.587);
  margin: 10vh 35vw auto 35vw;
  height: 70vh;
  text-align: center;
  padding: 2vh 2vw 2vh 2vw;
`;

const ProfileP = styled.p`
  color: white;
  font-size: 15px;
`;

const ProfileEntry = {
    width: "90%",
    height: "10%",
    margin: "0vh 1vw 0vh 1vw",
    backgroundColor: "white",
    color: "white"
};

const Profile = () => {
    const jwt = useSelector(state => state.jwt);

    const [data, setData] = React.useState("");

    useEffect(() => {
        // call api or anything
        let res = fetch();
        console.log(res.data);
    });

    const fetch = async () => {
        let config = {
                'Content-Type':'application/json',
                Authorization: `Bearer ${JSON.parse(jwt).access}`,
        }

        if (jwt !== "") {
            console.log(config);
            console.log(jwt);
            await axios({
                url: "http://127.0.0.1:8000/myApp/user/profile/me",
                method: "get",
                headers: config
            }).then((res) => {
                console.log(res);
                console.log("success");
                return "Hello";
            }).catch((error) => {
                console.log(error)
            })
        }
    };

    return (
        <div>
            <meta charSet="UTF-8"></meta>
            <ProfileBox>
                <h2><AccountCircleIcon color={"primary"} fontSize={"large"}/></h2>
                <ProfileP>First Name</ProfileP>
                <TextField disabled={true} id="first" label="First Name" style={ProfileEntry}/>
                <ProfileP>LAst Name</ProfileP>
                <TextField disabled={true} id="last" label="Last Name" style={ProfileEntry}/>
                <ProfileP>Email</ProfileP>
                <TextField disabled={true} id="email" label="Email" style={ProfileEntry}/>
                <ProfileP>Username</ProfileP>
                <TextField disabled={true} id="username" label="Username" style={ProfileEntry}/>
                <Button style={ButtonStyle} variant="contained" onClick={() => {}} >Edit</Button>
            </ProfileBox>
        </div>
    );
}

export default Profile;