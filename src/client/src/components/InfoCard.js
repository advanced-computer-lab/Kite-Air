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
export default function InfoCard({user}) {
  const [FirstName, setFirstName] = useState(user.FirstName);
  const [LastName, setLastName] = useState(user.LastName);
  const [Passport, setPassport] = useState(user.PassportNo);
  const [Address, setAddress] = useState(user.Address);
  const [username, setUsername] = useState(user.username);
  const [Password, setPassword] = useState(user.Password);
  const [CountryCode, setCountryCode] = useState(user.CountryCode);
  const [TelephoneNo, setTelephoneNo] = useState(user.TelephoneNo);
  const [Email, setEmail] = useState(user.Email);

  // const [redirect, setRedirect] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  function updatePersonalInfo() {
    const data = {
      FirstName: FirstName,
      LastName: LastName,
      Email: Email,
      PassportNo: Passport,
     
      Address:Address,
      username:username,
      Password: Password,
      CountryCode:CountryCode,
      TelephoneNo : TelephoneNo

    };

    axios
      .put("http://localhost:8000/users/" + user._id, data)
      .then((res) => {
        console.log(data);
        console.log("success");
        alert("Success");

        // toast.success("Flight Updated!", {
        //   position: "top-right",
        //   autoClose: 5000,
        //   hideProgressBar: false,
        //   closeOnClick: true,
        //   pauseOnHover: true,
        //   draggable: true,
        //   progress: undefined,
        // });

        window.location.reload(false);
        // component: () => <Navigate to='/'/>
        // handleClose();
      })
      .catch((err) => {
        console.log("Error in Update!");
      });
  }

  const handleClickOpen = () => {
    setOpen(true);
  };
  return (
    <Card style={{ maxWidth: 1500 }}>

      <CardContent style={{backgroundColor: "	whitesmoke"}}>
        <Typography gutterBottom variant="h5" component="div">
        Personal Details
        </Typography>
<br/>

     

<TextField 
label="First Name"  
margin="dense"
            id="FirstName"
            value={FirstName}
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
            type="text"
            variant="standard"/>

&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; 


<TextField  label="Last Name"    
            margin="dense"
            id="LastName"
            value={LastName}
            onChange={(e) => {
              setLastName(e.target.value);
            }}
            type="text"
            variant="standard"/>

<br/>
<br/>
<br/>


<TextField  label="Email"  margin="dense"
            id="Email"
            value={Email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            type="text"
            variant="standard"/>

<br/>
<br/>


<div>
<TextField label="Passport Number"  margin="dense"
            id="Passport"
            value={Passport}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            type="text"
            variant="standard"/>
</div>

<div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button onClick={updatePersonalInfo} size="medium">Edit</Button>
      </div>
      </CardContent>
     
     
    
    </Card>
  );
}
