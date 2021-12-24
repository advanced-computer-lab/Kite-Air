import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../context/index.js";

//mport Typography from '@mui/material/Typography';
export default function LoginInfo({ handleDisplay }) {
  const [state, setState] = useContext(UserContext);
  const [loading, setLoading] = useState(true);

  // let auth = JSON.parse(window.localStorage.getItem("auth"));


  useEffect(() => {
    if (state && state.user) {
      console.log("user from state => ", state.user);
    }
  }, [state && state.user]);

  //const baseURL = "http://localhost:8000/users/loggedIn";
  // const fetchUser = () => {
  //   axios
  //     .get(baseURL, {
  //         params: {
  //           username: user.username,
  //           Password: user.Password
  //         }})
  //     .then((response) => {
  //         console.log("here  111 "+ response);
  //       setLogged(response.data);

  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });}
  //     console.log("pass"+user.Password);
  //     useEffect(() => {
  //       fetchUser();
  //     }, []);
  return (
    <Card style={{}}>
      <CardContent style={{ backgroundColor: "whitesmoke",padding:25}}>
        <Typography gutterBottom variant="h5" component="div">
          Security and Login
        </Typography>
        <hr />
        Change password
        <br/>
        It's a good idea to use a strong password that you're not using elsewhere
        <Button onClick={handleDisplay} size="medium">
            Edit
        </Button>
        
      </CardContent>
    </Card>
    //}
  );
}
