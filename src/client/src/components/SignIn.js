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
import CircularProgress from "@mui/material/CircularProgress";


import { useNavigate } from "react-router-dom";
import { useEffect, useState,useContext } from "react";
import { UserContext } from "../context";

import { toast } from "react-toastify";
import axios from "axios";


const theme = createTheme();

export default function SignIn() {
  const [username, setusername] = useState("");
  const [Password, setPassword] = useState("");
  const [user, setUser] = useState({});

  const [loading, setLoading] = useState(false);
  const [state, setState] = useContext(UserContext);


  const inputs = {
    username: username,
    Password: Password,
  };

  let navigate = useNavigate();

  const inputsHandlerPass = (e) => {
    setPassword(e.target.value);
  };
  const inputsHandlerusername = (e) => {
    setusername(e.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);

    setUser(inputs);
    fetchUser();
    setLoading(false);

  };

  const baseURL = "http://localhost:4000/login";

  const fetchUser = () => {
    axios
      .post(baseURL, {
        username: username,
        Password: Password
      })
      .then((response) => { 
        setState({
          user: response.data.user,
          token: response.data.token ,
        });

        window.localStorage.setItem(
          "auth",
          JSON.stringify({ user: response.data.user, token:  response.data.token })
        );

        let auth = JSON.parse(window.localStorage.getItem("auth"));
        console.log(auth);

        if(response.data.user.Admin === "1"){
          navigate("/admin");
        }
        else navigate("/");
      })
      .catch((error) => {

        
        toast.error(error.response.data);


      });
  };

  return (
    <ThemeProvider theme={theme}>
      {loading ? (
        <p>
          {" "}
          Loading...
        </p>
      ) : (
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
            <Avatar sx={{ m: 1, bgcolor: "primary.main"}}>
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
              ): "Sign In"}
              </Button>
              <Grid container>
                <Grid item xs>
                  {/* <Link href="#" variant="body2">
                    Forgot password?
                  </Link> */}
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
      )}
    </ThemeProvider>
  );
}
