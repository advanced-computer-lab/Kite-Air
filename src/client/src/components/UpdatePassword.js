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
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

import { toast } from "react-toastify";

var bcrypt = require('bcryptjs');
//mport Typography from '@mui/material/Typography';
export default function UpdatePassword({ handleDisplay }) {
  const [state, setState] = useContext(UserContext);

  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [PassportNo, setPassportNo] = useState(state.user.PassportNo);

  const [Current, setCurrent] = useState("");
  const [New, setNew] = useState("");
 // const [Retype, setRetype] = useState("");

  const [Address, setAddress] = useState(state.user.Address);
  const [username, setUsername] = useState(state.user.username);
  const [Password, setPassword] = useState("");
  const [NewPassword, setNewPassword] = useState("");
  const [Retype, setRePassword] = useState("");
  const [CountryCode, setCountryCode] = useState(state.user.CountryCode);
  const [TelephoneNo, setTelephoneNo] = useState(state.user.TelephoneNo);
  const [Email, setEmail] = useState("");
  const [ok, setOk] = useState(false);

  const [loading, setLoading] = useState(false);

  // const [redirect, setRedirect] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    if (state && state.user) {
      console.log("user from state => ", state.user);
      setEmail(state.user.Email);
     // setPassportNo(state.user.PassportNo);
      setFirstName(state.user.FirstName);
      setLastName(state.user.LastName);
    }
  }, [state && state.user]);

  function checkNewPassword() {
    setLoading(true);
    const data = {
      _id: state.user._id,
      username: username,
      FirstName: FirstName,
      LastName: LastName,
      Address: Address, 
      PassportNo: PassportNo,
      NewPassword: NewPassword,
      Current: Current,       
      CountryCode: CountryCode,
      TelephoneNo: TelephoneNo,
      Email: Email,
      Admin: "0",
    };
console.log(NewPassword); 
console.log(Retype); 
console.log(NewPassword===Retype);

if(NewPassword.length<8){
  setLoading(false);
  toast.error("New password should have atleast 8 characters. ", {
    position: "top-right",
    autoClose: 10000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
 

}
else if(NewPassword!==Retype){
  setLoading(false);
  toast.error("New password does not match.", {
    position: "top-right",
    autoClose: 10000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
  
}

  else  if(NewPassword===Retype && NewPassword.length>8){

  axios
      .put("http://localhost:8000/users/password/:id" + state.user._id, data)
      .then( async (res) => {

        let auth = JSON.parse(window.localStorage.getItem("auth"));
        auth.user = data;
        window.localStorage.setItem("auth", JSON.stringify(auth));

        setState({ ...state, user: data });

        setLoading(false);

        toast.success("Password Updated!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setOk(true);
        handleDisplay();
      })


  
    }

  }

 function updatePassword() {
    setLoading(true);
    const data = {
      _id: state.user._id,
      username: username,
      FirstName: FirstName,
      LastName: LastName,
      Address: Address,
      PassportNo: PassportNo,
      NewPassword: NewPassword,
      Current: Current,       
      CountryCode: CountryCode,
      TelephoneNo: TelephoneNo,
      Email: Email,
      Admin: "0",
    };

   axios
      .post("http://localhost:8000/users/checkPassword/:id" + state.user._id, data)
      .then((res) => {

        let auth = JSON.parse(window.localStorage.getItem("auth"));
        auth.user = data;
        window.localStorage.setItem("auth", JSON.stringify(auth));
        // console.log("setting auth");
        // console.log(auth);

        // update context
        setState({ ...state, user: data });

        setLoading(false);
        setOk(true);
        checkNewPassword();
      })
      .catch((err) => {
        setLoading(false);
        toast.error("Incorrect Current Password", {
            position: "top-right",
            autoClose: 10000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        // console.log(err.response.data.split("-"));

      });

   
  }

  return (
    <Card style={{ }}>
      <CardContent style={{ backgroundColor: "	whitesmoke",padding:25}}>
        <Typography gutterBottom variant="h5" component="div">
          Security and Login
        </Typography>
        <hr />
        {open ? { handleDisplay } : " "}
      

       <div>
     
       <TextField
            label="Current Password"
            margin="dense"
            id="Current"
            //value={PassportNo}
            onChange={(e) => {
              setCurrent(e.target.value);
            }}
            type="password"
            variant="standard"
          />
          <br/>
   
       <TextField
            label="New Password"
            margin="dense"
            id="New"
            type="password"
            //value={PassportNo}
            onChange={(e) => {
              setNewPassword(e.target.value);
              
            }}
           
            variant="standard"
          />
         
          <br/>
          <TextField
            label="Re-type New Password"
            margin="dense"
            id="RetypeNewPassword"
           // value={PassportNo}
           onChange={(e) => {
            setRePassword(e.target.value);
            
          }}
            type="password"
            variant="standard"
          />
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Box sx={{ m: 1, position: "relative" }}>
          <Button
            //  variant="outlined"
              disabled={loading}
              //onClick={handleButtonClick}
              onClick={handleDisplay}
              size="medium"
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              disabled={loading}
              //onClick={handleButtonClick}
              onClick={updatePassword}
              size="medium"
            >
              Confirm
            </Button>
            {loading && (
              <CircularProgress
                size={24}
                sx={{
                  color: "blue",
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  marginTop: "-12px",
                  marginLeft: "-12px",
                }}
              />
            )}
          </Box>
        </div>
      </CardContent>
    </Card>
  );
}
