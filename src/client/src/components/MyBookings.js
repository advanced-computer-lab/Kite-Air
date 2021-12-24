import * as React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import Button from "@mui/material/Button";
import AirplaneTicketIcon from '@mui/icons-material/AirplaneTicket';
import AssignmentIndOutlinedIcon from '@mui/icons-material/AssignmentIndOutlined';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import CollapsibleTable from "./CollapsibleTable";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/index.js";

import { useEffect, useState, useContext } from "react";
import BackgroundLetterAvatars from "./Avatar";
import Unauthorized from "./Unauthorized";
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
    <>
      {isLoggedIn ? (
        <div
          style={{
            display: "flex",
          }}
        >
           <div
         style={{
           width: 250, 

          justifyContent: "left",

          backgroundColor: "#f2f8fb"
         }}>
            &nbsp; &nbsp; &nbsp;
            <div>
              &nbsp; &nbsp; &nbsp;
              <List>
                <div align="center">
                  <BackgroundLetterAvatars
                    n={state.user.FirstName + " " + state.user.LastName}
                  />
                  <br />
                </div>
                <Divider />
                <br />
                <Button style={{ width: "100%" }}
                  onClick={() => {
                    navigate("/ProfilePage");
                  }}
                >
                  {" "}
                  <AssignmentIndIcon /> My Details
                </Button>
                <br />
                <br />

                <Button style={{ width: "100%" }} onClick={() => {}} variant="outlined">
                  {" "}
                  <AirplaneTicketIcon /> My Bookings
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
              //  backgroundColor: "blue"
            }}
          >
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
                  width: "1025px",
                }}
              >
               
                <CollapsibleTable />
              </Box>
            </Box>
          </div>
        </div>
      ) : (
        <Unauthorized/>
      )}
    </>
  );
}
