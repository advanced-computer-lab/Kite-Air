import * as React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import InfoCard from "./InfoCard.js";
import DisplayInfo from "./DisplayInfo";
import LoginInfo from "./LoginInfo";
import UpdatePassword from "./UpdatePassword";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { UserContext } from "../context/index.js";
import { toast } from "react-toastify";
import Unauthorized from "./Unauthorized";

import BackgroundLetterAvatars from "./Avatar";
const drawerWidth = 340;

export default function ProfilePage() {
  const [state, setState] = useContext(UserContext);
  const navigate = useNavigate();
  const [isDisplay, setisDisplay] = useState(true);
  const [isPasswordUpdate, setisPasswordUpdate] = useState(true);
  const [isBooking, setisBooking] = useState(false);
  const [loading, setLoading] = useState(true);
  const isLoggedIn = state && state.token != "";

  const handleDisplayOFF = () => {
    setisDisplay(false);
  };
  const handleDisplayON = () => {
    setisDisplay(true);
  };

  const handleLoginOFF = () => {
    setisPasswordUpdate(false);
  };
  const handleLoginON = () => {
    setisPasswordUpdate(true);
  };
  return (
    <div  style={{
      display: "flex",
      }}>
        
        <div
         style={{
           width: 340, 
          display: "flex",
          justifyContent: "left",
       //   alignItems: "center",
         // float="left",
        //  backgroundColor: "blue"
         }}
          >
  
            &nbsp; &nbsp; &nbsp;
     

            <div>
            &nbsp; &nbsp; &nbsp;
           
            <List>
            <div align="center">
            <br />
            <br />
            <br />
              <BackgroundLetterAvatars
                n={state.user.FirstName + " " + state.user.LastName}
              />
               <br />
            </div>
            <Divider />
            <br/>
              <Button onClick={() => {}} variant={"outlined"}>
                {" "}
                <InboxIcon /> My Details
              </Button>
              <br />
              <br />

              <Button
                onClick={() => {
                  navigate("/mybookings");
                }}
              >
                {" "}
                <MailIcon /> My Bookings
              </Button>
            </List>
            <Divider />
            </div>
          </div>
 
    <div 
    style={{
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "blue" }}>

      {" "}

 
      {state && state.user && (
        <Box sx={{ display: "flex" }}>
          <CssBaseline />

          <AppBar
            position="fixed"
            sx={{
              width: `calc(100% - ${drawerWidth}px)`,
              ml: `${drawerWidth}px`,
            }}
          ></AppBar>

        

          <Box
            component="main"
            sx={{
              flexGuser: 1,
              bgcolor: "background.default",
              p: 3,
              width: 700,
            }}
          >
            <Toolbar />

            {isDisplay && isPasswordUpdate? (
              <div>
              <DisplayInfo handleDisplay={handleDisplayOFF} />
              <br/>
              <LoginInfo handleDisplay={handleLoginOFF} />
              </div>
            ) : isDisplay && !isPasswordUpdate ? (
              <div>
              <DisplayInfo handleDisplay={handleDisplayOFF} />
              <br/>
              <UpdatePassword handleDisplay={handleLoginON} />
              </div>
            ) : (
              <div>
              <InfoCard handleDisplay={handleDisplayON} />
              <br/>
              <LoginInfo handleDisplay={handleLoginOFF} />
              </div>
            )}
          </Box>
        </Box>
      )}
    </div>
    </div>
  );
}
