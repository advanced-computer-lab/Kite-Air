import * as React from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import { useNavigate } from "react-router-dom"; // version 5.2.0
import { useContext, useState } from "react";
import { UserContext } from "../context/index.js";
import { toast } from "react-toastify";

import axios from "axios";

export default function Summary(props) {
  //searchData
  const [state, setState] = useContext(UserContext);
  const [ok, setOk] = useState(false);
  const [loading, setLoading] = useState(false);


  const [showLogin, setShowLogin] = useState(false);
  const [username, setusername] = useState("");
  const [Password, setPassword] = useState("");

  const navigate = useNavigate();
  let loggedIn = state && state.user;

  function getBaggage(selectedDepF) {
    if (props.searchData.fseatsAvailable) {
      return selectedDepF.fbaggage;
    } else if (props.searchData.bseatsAvailable) {
      return selectedDepF.bbaggage;
    } else if (props.searchData.eseatsAvailable) {
      return selectedDepF.ebaggage;
    }
  }

  function getClass() {
    if (props.searchData.fseatsAvailable) {
      return "First";
    } else if (props.searchData.bseatsAvailable) {
      return "Business";
    } else if (props.searchData.eseatsAvailable) {
      return "Economy";
    }
  }

  function getPrice(selectedF) {
    if (props.searchData.fseatsAvailable) {
      return selectedF.fprice;
    } else if (props.searchData.bseatsAvailable) {
      return selectedF.bprice;
    } else if (props.searchData.eseatsAvailable) {
      return selectedF.eprice;
    }
  }

  function getNoOfPassengers() {
    if (props.searchData.fseatsAvailable) {
      return props.searchData.fseatsAvailable;
    } else if (props.searchData.bseatsAvailable) {
      return props.searchData.bseatsAvailable;
    } else if (props.searchData.eseatsAvailable) {
      return props.searchData.eseatsAvailable;
    }
  }

  const baseURL = "http://localhost:4000/login";

  const fetchUser = () => {
    axios
      .post(baseURL, {
        username: username,
        Password: Password,
      })
      .then((response) => {
        setState({
          user: response.data.user,
          token: response.data.token,
        });

        window.localStorage.setItem(
          "auth",
          JSON.stringify({
            user: response.data.user,
            token: response.data.token,
          })
        );

        let auth = JSON.parse(window.localStorage.getItem("auth"));

        navigate("/pickSeats", {
          state: {
            searchData: props.searchData,
            selectedDepF: props.selectedDep,
            selectedRetF: props.selectedRet,
          },
        });

        
      })
      .catch((error) => {
        toast.error(error.response.data);
      });
  };

  const inputsHandlerPass = (e) => {
    setPassword(e.target.value);
  };
  const inputsHandlerusername = (e) => {
    setusername(e.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);

    fetchUser();
    setLoading(false);

  };

  const handleRedirection = () => {
    console.log("In nav");
    if (loggedIn) {
      navigate("/pickSeats", {
        state: {
          searchData: props.searchData,
          selectedDepF: props.selectedDep,
          selectedRetF: props.selectedRet,
        },
      });
    } else {
      toast.warning("Please sign in first!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setOk(true);
      setShowLogin(true);
    }
  };

  const handleClose = () => {
    setShowLogin(false);
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Reservation Summary
      </Typography>
      <table class="tg" style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{}}>
            <td class="tg-0lax" style={{ fontWeight: "bold" }}></td>

            <td class="tg-0lax" style={{ fontWeight: "bold" }}>
              {" "}
              Departure Flight
            </td>
            <td class="tg-0lax" style={{ fontWeight: "bold" }}>
              Return Flight
            </td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="tg-0lax" style={{ fontWeight: "bold" }}>
              &nbsp;{" "}
            </td>

            <td class="tg-0lax"> &nbsp;</td>
            <td class="tg-0lax">&nbsp; </td>
          </tr>
          <tr>
            <td
              class="tg-0lax"
              style={{
                borderBottom: "1px solid #ddd",
                padding: "8px",
                fontWeight: "bold",
              }}
            >
              {" "}
              Flight No.{" "}
            </td>

            <td style={{ borderBottom: "1px solid #ddd", padding: "8px" }}>
              {props.selectedDep.FlightNo}
            </td>
            <td style={{ borderBottom: "1px solid #ddd", padding: "8px" }}>
              {props.selectedRet.FlightNo}
            </td>
          </tr>
          <tr>
            <td
              style={{
                borderBottom: "1px solid #ddd",
                padding: "8px",
                fontWeight: "bold",
              }}
            >
              {" "}
              From - To
            </td>

            <td style={{ borderBottom: "1px solid #ddd", padding: "8px" }}>
              {props.selectedDep.From} - {props.selectedDep.To}
            </td>
            <td style={{ borderBottom: "1px solid #ddd", padding: "8px" }}>
              {props.selectedRet.From} - {props.selectedRet.To}
            </td>
          </tr>
          <tr>
            <td
              style={{
                borderBottom: "1px solid #ddd",
                padding: "8px",
                fontWeight: "bold",
              }}
            >
              {" "}
              Departure Date{" "}
            </td>

            <td style={{ borderBottom: "1px solid #ddd", padding: "8px" }}>
              {props.selectedDep.FlightDate.replaceAll("-", "/")}{" "}
            </td>
            <td style={{ borderBottom: "1px solid #ddd", padding: "8px" }}>
              {props.selectedRet.FlightDate.replaceAll("-", "/")}{" "}
            </td>
          </tr>
          <tr>
            <td
              style={{
                borderBottom: "1px solid #ddd",
                padding: "8px",
                fontWeight: "bold",
              }}
            >
              {" "}
              Departure - Arrival
            </td>

            <td style={{ borderBottom: "1px solid #ddd", padding: "8px" }}>
              {props.selectedDep.DepartureTime} -{" "}
              {props.selectedDep.ArrivalTime}
            </td>
            <td style={{ borderBottom: "1px solid #ddd", padding: "8px" }}>
              {props.selectedRet.DepartureTime} -{" "}
              {props.selectedRet.ArrivalTime}
            </td>
          </tr>

          <tr>
            <td
              style={{
                borderBottom: "1px solid #ddd",
                padding: "8px",
                fontWeight: "bold",
              }}
            >
              Cabin Class
            </td>

            <td style={{ borderBottom: "1px solid #ddd", padding: "8px" }}>
              {getClass()}
            </td>
            <td style={{ borderBottom: "1px solid #ddd", padding: "8px" }}>
              {getClass()}
            </td>
          </tr>

          <tr>
            <td
              style={{
                borderBottom: "1px solid #ddd",
                padding: "8px",
                fontWeight: "bold",
              }}
            >
              Baggage Allowance
            </td>

            <td style={{ borderBottom: "1px solid #ddd", padding: "8px" }}>
              {getBaggage(props.selectedDep)} checked bags, 1 Carry-on
            </td>
            <td style={{ borderBottom: "1px solid #ddd", padding: "8px" }}>
              {getBaggage(props.selectedRet)} checked bags, 1 Carry-on
            </td>
          </tr>
          <tr>
            <td
              style={{
                borderBottom: "1px solid #ddd",
                padding: "8px",
                fontWeight: "bold",
              }}
            >
              Number of Passengers
            </td>

            <td style={{ borderBottom: "1px solid #ddd", padding: "8px" }}>
              {getNoOfPassengers()}
            </td>
            <td style={{ borderBottom: "1px solid #ddd", padding: "8px" }}>
              {getNoOfPassengers()}
            </td>
          </tr>
          <tr>
            <td
              style={{
                borderBottom: "1px solid #ddd",
                padding: "8px",
                fontWeight: "bold",
              }}
            >
              Ticket Price (per 1)
            </td>

            <td style={{ borderBottom: "1px solid #ddd", padding: "8px" }}>
              ${getPrice(props.selectedDep)}
            </td>
            <td style={{ borderBottom: "1px solid #ddd", padding: "8px" }}>
              ${getPrice(props.selectedRet)}
            </td>
          </tr>
        </tbody>
      </table>

      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        {" "}
        <Button
          variant="contained"
          onClick={handleRedirection}
          sx={{ mt: 3, ml: 1 }}
        >
          Confirm
        </Button>
      </div>

      {showLogin && (
        <div>
          <Dialog open={showLogin} onClose={handleClose}>
            {/* <DialogTitle>Sign in</DialogTitle> */}
            <DialogContent>
              <Container component="main" maxWidth="xs">
                <CssBaseline />

                <Box
                  sx={{
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
                    <LockOutlinedIcon />
                  </Avatar>
                  <Typography component="h1" variant="h5">
                    Sign in
                  </Typography>
                  <Box
                    component="form"
                    onSubmit={handleSubmit}
                    noValidate
                    sx={{ mt: 1 }}
                  >
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
                      name="password"
                      label="Password"
                      type="password"
                      id="Password"
                      value={Password || ""}
                      onChange={inputsHandlerPass}
                      // autoComplete="current-password"
                    />
                    <FormControlLabel
                      control={<Checkbox value="remember" color="primary" />}
                      label="Remember me"
                    />
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                    >
                      Sign In
                    </Button>
                    <Grid container>
                      <Grid item xs>
                        <Link href="#" variant="body2">
                          Forgot password?
                        </Link>
                      </Grid>
                      <Grid item>
                        <Link href="signup" variant="body2">
                          {"Don't have an account? Sign Up"}
                        </Link>
                      </Grid>
                    </Grid>
                  </Box>
                </Box>
              </Container>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
            </DialogActions>
          </Dialog>
        </div>
      )}
    </React.Fragment>
  );
}
