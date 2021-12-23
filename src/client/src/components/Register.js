import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { SettingsInputSvideoRounded } from "@material-ui/icons";
import { useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../context";
import { useContext } from "react";
import { toast } from "react-toastify";

import MuiPhoneNumber from "material-ui-phone-number";

const theme = createTheme();

export default function Register() {
  const [username, setusername] = useState("");
  const [Password, setPassword] = useState("");
  const [PasswordC, setPasswordC] = useState("");
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [PassportNo, setPassportNo] = useState("");
  const [Email, setEmail] = useState("");
  const [Address, setAddress] = useState("");
  const [CountryCode, setCountryCode] = useState("");
  const [TelephoneNo, setTelephoneNo] = useState("");

  const [ok, setOk] = useState(false);
  const [loading, setLoading] = useState(false);
  //const [state, setState] = useContext(UserContext);
  let navigate = useNavigate();

  const inputs = {
    username: username,
    Password: Password,
    PasswordC: PasswordC,
    FirstName: FirstName,
    LastName: LastName,
    Address: Address,
    PassportNo: PassportNo,
    CountryCode: CountryCode,
    TelephoneNo: TelephoneNo,
    Email: Email,
  };

  const inputsHandlerPass = (e) => {
    setPassword(e.target.value);
  };
  const inputsHandlerPassC = (e) => {
    setPasswordC(e.target.value);
  };
  const inputsHandlerusername = (e) => {
    setusername(e.target.value);
  };
  const inputsHandlerFirstName = (e) => {
    setFirstName(e.target.value);
  };
  const inputsHandlerLastName = (e) => {
    setLastName(e.target.value);
  };
  const inputsHandlerAddress = (e) => {
    setAddress(e.target.value);
  };
  const inputsHandlerPassportNo = (e) => {
    setPassportNo(e.target.value);
  };

  const inputsHandlerTelephoneNo = (e) => {

    setCountryCode((e+"").substring(0,3));
    setTelephoneNo(e);
  };
  const inputsHandlerEmail = (e) => {
    setEmail(e.target.value);
  };
  const baseURL = "http://localhost:4000/register";

  const submitButton = async (event) => {
    event.preventDefault();

    console.log(inputs);
    setLoading(true);
    await axios
      .post(baseURL, inputs)
      .then((res) => {
        setLoading(false);
        toast.success("Registeration Successful! Please sign in.", {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          progress: undefined,
        });
        setOk(true);
        navigate("/login");
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error.response.data);
        setPassword("");
        setPasswordC("");
        
      });
  };


  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="lg" style={{ width: "500px" }}>
        <CssBaseline />

        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>

          <Box component="form" onSubmit={submitButton} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              name="FirstName"
              label="First Name"
              id="FirstName"
              value={FirstName || ""}
              onChange={inputsHandlerFirstName}
              autoFocus
            />

            <TextField
              margin="normal"
              required
              name="LastName"
              label="Last Name"
              id="LastName"
              value={LastName || ""}
              onChange={inputsHandlerLastName}
              autoFocus
            />

            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              value={username || ""}
              required
              onChange={inputsHandlerusername}
              //   onBlur={(e)=>{
              //     ((username=="")?"what":'')
              //   }}
              autoFocus
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="Email"
              label="Email"
              id="Email"
              type="Email"
              value={Email || ""}
              onChange={inputsHandlerEmail}
              autoFocus
            />

            <MuiPhoneNumber
              label="Phone Number"
              fullWidth
              margin="normal"
              required
              variant="outlined"
              defaultCountry={"eg"}
              value={TelephoneNo}

              onChange={inputsHandlerTelephoneNo}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="Address"
              label="Address"
              id="Address"
              value={Address || ""}
              onChange={inputsHandlerAddress}
              autoFocus
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="PassportNo."
              label="Passport No."
              id="PassportNo"
              value={PassportNo || ""}
              onChange={inputsHandlerPassportNo}
              autoFocus
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Enter Password"
              type="password"
              id="Password"
              value={Password || ""}
              onChange={inputsHandlerPass}
              autoFocus
              // autoComplete="current-password"
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="PasswordConfirmation"
              label="Confirm Password"
              type="password"
              id="PasswordConfirmation"
              value={PasswordC || ""}
              onChange={inputsHandlerPassC}
              autoFocus
              autoComplete="none"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container>
              <Grid item></Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
