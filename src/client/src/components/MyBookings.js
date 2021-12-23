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
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import CollapsibleTable from "./CollapsibleTable";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/index.js";

import { useEffect, useState, useContext } from "react";
import axios from "axios";
import BackgroundLetterAvatars from "./Avatar";
import { STATES } from "mongoose";
import Unauthorized from "./Unauthorized.js";
const drawerWidth = 340;

export default function MyBookings() {
  const navigate = useNavigate();

  const [isDisplay, setisDisplay] = useState(true);
  const [isBooking, setisBooking] = useState(false);
  const [state, setState] = useContext(UserContext);

  const handleDisplayOFF = () => {
    setisDisplay(false);
  };
  const handleDisplayON = () => {
    setisDisplay(true);
  };

  const isLoggedIn = state && state.token != "";

  return (
    <div  style={{
      display: "flex",
      }}>
        
        <div
         style={{
           width: 250, 
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
            <Button
            onClick={() => {
              navigate("/ProfilePage");
            }}
          >
            {" "}
            <InboxIcon /> My Details
          </Button>
          <br />
          <br />

          <Button onClick={() => {}} variant="outlined">
            {" "}
            <MailIcon /> My Bookings
          </Button>
            </List>
            <Divider />
            </div>
          </div>
          
        {/* <div
          sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <br />
        <br />
        <br />
        &nbsp; &nbsp; &nbsp;
        <div align="center">
          <BackgroundLetterAvatars
            n={state.user.FirstName + " " + state.user.LastName}
          />
        </div>
        &nbsp; &nbsp; &nbsp;
        <Divider />
        <List>
          <Button
            onClick={() => {
              navigate("/ProfilePage");
            }}
            variant="permanent"
            anchor="left"
          >
     
            &nbsp; &nbsp; &nbsp;
            <div align="center">
              <BackgroundLetterAvatars
                n={state && state.user.FirstName + " " + state.user.LastName}
              />
            </div>
            &nbsp; &nbsp; &nbsp;
            <Divider />
            <List>
              <Button
                onClick={() => {
                  navigate("/ProfilePage");
                }}
              >
                {" "}
                <InboxIcon /> My Details
              </Button>
              <br />
              <br />

          <Button onClick={() => {}} variant="outlined">
            {" "}
            <MailIcon /> My Bookings
          </Button>
        </List>
        <Divider />
      </div> */}
    <div 
    style={{
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
//  backgroundColor: "blue"
 }}>
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      ></AppBar>

  

      <Box
        component="main"
        sx={{
          flexGuser: 1,
          bgcolor: "background.default",
          p: 3,
          width: "1025px",
        }}
      >
        <Toolbar />
        <CollapsibleTable />
      </Box>
    </Box>
    </div>
    </div>
  );
}
