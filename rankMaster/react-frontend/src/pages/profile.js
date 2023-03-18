import {useSelector} from "react-redux";
import React, {useEffect} from "react";
import axios from "axios";
import {Button, Card, TextField, CardContent} from "@mui/material";
import styled from "styled-components";

const ProfileBox = styled.div`
  margin: 10vh 30vw auto 30vw;
  height: 70vh;
  padding: 5vh 0vw 0vh 0vw;
  width: 40vw;
  text-align: center;
`;

const Flex = styled.div`
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  margin: auto;
  display: flex;
  text-align: center;
`;

const ProfileH1 = styled.h1`
  font-family: Andale Mono, monospace;
  color: #09426B;
  color: white;
  width: 100%;
  font-weight: bold;
`;

const ProfileEntry = {
    width: "25%",
    height: "15%",
    margin: "1vh 1vw 1vh 1vw",
    border: "solid #09426B",
    backgroundColor: "rgba(0, 0, 0, 0.906)",
    color: "white"
};

const Profile = () => {
    const jwt = useSelector(state => state.jwt);
    const username = useSelector(state => state.username);
    const [email, setEmail] = React.useState("");
    const [firstName, setFirstName] = React.useState("");
    const [lastName, setLastName] = React.useState("");
    const [data, setData] = React.useState([]);

    useEffect(() => {
        // call api or anything
        let res = fetch();
        console.log(res.data);
    }, [email]);

    const fetch = async () => {
        let config = {
                'Content-Type':'application/json',
                Authorization: `Bearer ${JSON.parse(jwt).access}`,
        }

        if (jwt !== "") {
            console.log(config);
            console.log(jwt);
            await axios({
                url: "http://127.0.0.1:8000/myApp/get/user/" + username,
                method: "get",
                headers: config
            }).then((res) => {
                console.log(res);
                setFirstName(res.data.first_name);
                setLastName(res.data.last_name);
                setEmail(res.data.email);
                setData(res.data.rankings);
                console.log("success");
                return "Hello";
            }).catch((error) => {
                console.log(error)
            })
        }
    };

    const renderCards = async (current) => {

        let config = {
            'Content-Type':'application/json',
            Authorization: `Bearer ${JSON.parse(jwt).access}`,
        }

        let id = current.list_id;

        console.log("http://127.0.0.1:8000/myApp/get/user/" + username + "/" + id);
        await axios({
            url: "http://127.0.0.1:8000/myApp/get/user/" + username + "/" + id,
            method: "get",
            headers: config
        }).then((res) => {
            console.log(res);
            console.log("success fetch ranking");
            console.log(res.data.ranking_list.toString());
            console.log(typeof res.data.ranking_list.toString());
            let ranking = "";
            res.data.ranking_list.forEach(element => ranking += element + " > ");
            ranking = ranking.substring(0, ranking.length - 2);
            alert (ranking);
        }).catch((error) => {
            console.log(error)
        })
    }

    return (
        <div>
            <meta charSet="UTF-8"></meta>
            <ProfileBox>
                <ProfileH1>Hi! {firstName} {lastName}! Your rankings are: </ProfileH1>
                <Flex>
                    {data.map((entry)=>{
                        let id = entry.list_id;
                        console.log(id);


                        return(
                            <Card style={ProfileEntry}>
                                <CardContent>
                                    <p>{entry.list_title}:</p>
                                    <Button onClick={async () => renderCards(entry)}>Your Ranking</Button>
                                </CardContent>
                            </Card>
                        )
                    })
                    }
                </Flex>
            </ProfileBox>
        </div>
    );
}

export default Profile;