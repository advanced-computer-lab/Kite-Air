import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import axios from "axios";


//mport Typography from '@mui/material/Typography';
export default function  DisplayInfo({ user, handleDisplay }) {

  console.log("this is the user" + {user}); 
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [Passport, setPassport] = useState("");
    const [username, setusername] = useState("");


const [logged, setLogged] = useState({}); 
  
  const baseURL = "http://localhost:8000/users/loggedIn";
    const fetchUser = () => {
      axios
        .get(baseURL, {
            params: {
              username: user.username,
              Password: user.Password
            }})
        .then((response) => {
            console.log("here  111 "+ response); 
          setLogged(response.data);
        
        })
        .catch((error) => {
          console.log(error);
        });}
        console.log("pass"+user.Password);
        useEffect(() => {
          fetchUser();
        }, []);
  return (

    <Card style={{ maxWidth: 500 }}>
      <CardContent style={{backgroundColor: "	whitesmoke"}}>
        <Typography gutterBottom variant="h5" component="div">
       Basic Information
        </Typography>
<br/>

<TextField 
label="First Name"  
margin="dense"
            id="FirstName"
            value={logged.FirstName}
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
            InputLabelProps={{ shrink: true }}
            disabled={true}
            type="text"
            variant="standard"/>

&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; 

<TextField  label="Last Name"    
            margin="dense"
            id="LastName"
            InputLabelProps={{ shrink: true }}
            value={logged.LastName}
            onChange={(e) => {
              setLastName(e.target.value);
            }}
            disabled={true}
            type="text"
            variant="standard"/>

<br/>
<br/>
<br/>


<TextField margin="dense"
variant="standard"
InputLabelProps={{ shrink: true }}
label="Username"
            id="email"
            value={logged.Email}
            onChange={(e) => {
              setusername(e.target.value);
            }}
            disabled={true}
            type="text"
            />

<br/>
<br/>


<div>
<TextField label="Passport Number"  
            margin="dense"
            id="PassportNo"
            value={logged.PassportNo}
            onChange={(e) => {
              setPassport(e.target.value);
            }}
            InputLabelProps={{ shrink: true }}
            disabled={true}
            type="text"
            variant="standard"/>
</div>

<div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button  onClick={handleDisplay}   size="medium">Edit</Button>
      </div>
      </CardContent>
     
     
    
    </Card>
    //}
  );
}
