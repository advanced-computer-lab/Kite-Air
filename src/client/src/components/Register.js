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
import LockOpenIcon from "@mui/icons-material/LockOpen";
import CircularProgress from "@mui/material/CircularProgress";

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
import {
  CountryDropdown,
  RegionDropdown,
  CountryRegionData,
} from "react-country-region-selector";

import MuiPhoneNumber from "material-ui-phone-number";

const theme = createTheme();

export default function Register() {
  const [state, setState] = useContext(UserContext);

  window.localStorage.removeItem("auth");
  setState(null);


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
  const [Country, setCountry] = useState("");
  const [City, setCity] = useState("");

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
    Address: City + " - " + Country,
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

  const inputsHandlerPassportNo = (e) => {
    setPassportNo(e.target.value);
  };

  const inputsHandlerTelephoneNo = (e) => {
    setCountryCode((e + "").substring(0, 3));
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
          <Avatar sx={{ m: 1, bgcolor: "primary" }}>
            <LockOpenIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>

          <Box component="form" onSubmit={submitButton} sx={{ mt: 1 }}>
            <table>
              <tr>
                <td style={{ width: "50%" }}>
                  {" "}
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
                </td>
                <td style={{ width: "50%" }}>
                  {" "}
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
                </td>
              </tr>
            </table>

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

            <table>
              <tr>
                <td style={{ width: "50%" }}>
                  {" "}
                  <div class="MuiFormControl-root MuiFormControl-marginNormal MuiFormControl-fullWidth MuiTextField-root css-17vbkzs-MuiFormControl-root-MuiTextField-root">
                    <label
                      class="MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-shrink MuiInputLabel-outlined MuiFormLabel-root MuiFormLabel-colorPrimary MuiFormLabel-filled Mui-required css-1kty9di-MuiFormLabel-root-MuiInputLabel-root"
                      data-shrink="true"
                      for="country"
                      id="country-label"
                    >
                      <span
                        aria-hidden="true"
                        class="MuiInputLabel-asterisk MuiFormLabel-asterisk css-wgai2y-MuiFormLabel-asterisk"
                      >
                        Select Country *
                      </span>
                    </label>
                    <div class="MuiOutlinedInput-root MuiInputBase-root MuiInputBase-colorPrimary MuiInputBase-fullWidth MuiInputBase-formControl css-md26zr-MuiInputBase-root-MuiOutlinedInput-root">
                      <CountryDropdown
                        id="country"
                        name="Country"
                        value={Country}
                        onChange={(val) => setCountry(val)}
                        class="MuiOutlinedInput-input MuiInputBase-input css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input"
                      />

                      <fieldset
                        aria-hidden="true"
                        class="MuiOutlinedInput-notchedOutline css-1d3z3hw-MuiOutlinedInput-notchedOutline"
                      >
                        <legend class="css-1z7n62">
                          <span>Select Country&nbsp;*</span>
                        </legend>
                      </fieldset>
                    </div>
                  </div>
                </td>
                <td style={{ width: "50%" }}>
                  <div class="MuiFormControl-root MuiFormControl-marginNormal MuiFormControl-fullWidth MuiTextField-root css-17vbkzs-MuiFormControl-root-MuiTextField-root">
                    <label
                      class="MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-shrink MuiInputLabel-outlined MuiFormLabel-root MuiFormLabel-colorPrimary MuiFormLabel-filled Mui-required css-1kty9di-MuiFormLabel-root-MuiInputLabel-root"
                      data-shrink="true"
                      for="City"
                      id="City-label"
                    >
                      <span
                        aria-hidden="true"
                        class="MuiInputLabel-asterisk MuiFormLabel-asterisk css-wgai2y-MuiFormLabel-asterisk"
                      >
                        Select City *
                      </span>
                    </label>
                    <div class="MuiOutlinedInput-root MuiInputBase-root MuiInputBase-colorPrimary MuiInputBase-fullWidth MuiInputBase-formControl css-md26zr-MuiInputBase-root-MuiOutlinedInput-root">
                      <RegionDropdown
                        id="city"
                        name="City"
                        country={Country}
                        value={City}
                        onChange={(val) => setCity(val)}
                        class="MuiOutlinedInput-input MuiInputBase-input css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input"
                      />

                      <fieldset
                        aria-hidden="true"
                        class="MuiOutlinedInput-notchedOutline css-1d3z3hw-MuiOutlinedInput-notchedOutline"
                      >
                        <legend class="css-1z7n62">
                          <span>Select City&nbsp;*</span>
                        </legend>
                      </fieldset>
                    </div>
                  </div>
                </td>
              </tr>
            </table>

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
              name="PassportNo."
              label="Passport No."
              id="PassportNo"
              value={PassportNo || ""}
              onChange={inputsHandlerPassportNo}
              autoFocus
              autoComplete="false"
              type="text"
            />
            <hr />

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
              autoComplete="none"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="PasswordConfirmation"
              label="Retype Password"
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
              {loading ? (
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
              ): "Sign Up"}
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
