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
export default function DisplayInfo({ handleDisplay }) {
  const [state, setState] = useContext(UserContext);
  const [loading, setLoading] = useState(true);

  // let auth = JSON.parse(window.localStorage.getItem("auth"));

  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [Passport, setPassport] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (state && state.user) {
      console.log("user from state => ", state.user);

      setEmail(state.user.Email);
      setPassport(state.user.PassportNo);
      setFirstName(state.user.FirstName);
      setLastName(state.user.LastName);
    }
  }, [state && state.user]);

  return (
    <div>
    <Card style={{}}>
      <CardContent style={{ backgroundColor: "whitesmoke",padding:25}}>
        <Typography gutterBottom variant="h5" component="div">
          Basic Information
        </Typography>
      
        
     
        <div class="col-md-12">
              <div class="card mb-3">
                <div class="card-body">
                  <div class="row">
                  
                      <h6 class="mb-0">First Name</h6>
                    
                    <div class="col-sm-9 text-secondary">
                    {FirstName}
                    </div>
               
                  </div>
                  <hr/>
                  <div class="row">
                  
                      <h6 class="mb-0">Last Name</h6>
                  
                    <div class="col-sm-9 text-secondary">
                    {LastName}
                    </div>
                  </div>
                  <hr/>
                  <div class="row">
                   
                      <h6 class="mb-0">Email</h6>
                  
                    <div >
                      {email}
                    </div>
                  </div>
                  <hr/>

                  <div class="row">
                  
                      <h6 class="mb-0">Passport Number</h6>
                  
                    <div class="col-sm-9 text-secondary">
                      {Passport}
                    </div>
                  </div>
               
                 
                </div>
                 </div>
              </div>
              <hr/>
        {/* <TextField
          label="First Name"
          margin="dense"
          id="FirstName"
          value={FirstName}
          InputLabelProps={{ shrink: true }}
          disabled={true}
          type="text"
          variant="standard"
        /> */}

      
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button onClick={handleDisplay} size="medium">
            Edit
          </Button>
        </div>
      </CardContent>
    </Card>
    </div>
    //}
  );
}

// &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;
// <TextField
//   label="Last Name"
//   margin="dense"
//   id="LastName"
//   InputLabelProps={{ shrink: true }}
//   value={LastName}
//   disabled={true}
//   type="text"
//   variant="standard"
// />
// <br />
// <br />
// <br />
// <TextField
//   margin="dense"
//   variant="standard"
//   InputLabelProps={{ shrink: true }}
//   label="Email"
//   id="email"
//   value={email}
//   disabled={true}
//   type="text"
// />
//  {/* &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;
//  <TextField
//   margin="dense"
//   variant="standard"
//   InputLabelProps={{ shrink: true }}
//   label="Username"
//   id="username"
//   value={state.user.username}
//   disabled={true}
//   type="text"
// /> */}
// <br />
// <br />

//   <TextField
//     label="Passport Number"
//     margin="dense"
//     id="PassportNo"
//     value={Passport}
//     InputLabelProps={{ shrink: true }}
//     disabled={true}
//     type="text"
//     variant="standard"
//   />
