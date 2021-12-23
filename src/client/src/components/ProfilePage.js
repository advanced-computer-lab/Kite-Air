import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import InfoCard from "./InfoCard.js";
import DisplayInfo from "./DisplayInfo";
import LoginInfo from "./LoginInfo";
import UpdatePassword from "./UpdatePassword";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CollapsibleTable from "./CollapsibleTable";
import { useEffect, useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../context/index.js";

import BackgroundLetterAvatars from "./Avatar";
const drawerWidth = 340;

export default function ProfilePage() {
  const navigate = useNavigate();

  const [state, setState] = useContext(UserContext);
  const [isDisplay, setisDisplay] = useState(true);
  const [isPasswordUpdate, setisPasswordUpdate] = useState(true);
  const [isBooking, setisBooking] = useState(false);
  const [loading, setLoading] = useState(true);

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
