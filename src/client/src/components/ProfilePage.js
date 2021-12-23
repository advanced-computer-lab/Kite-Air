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
  const [loading, setLoading] = useState(true);
  const isLoggedIn = state && state.token != "";

  const handleDisplayOFF = () => {
    setisDisplay(false);
  };
  const handleDisplayON = () => {
    setisDisplay(true);
  };
  return (
    <>
      {" "}
      {!isLoggedIn && (
      <Unauthorized/>
      )}
      {isLoggedIn && (
        <Box sx={{ display: "flex" }}>
          <CssBaseline />

          <AppBar
            position="fixed"
            sx={{
              width: `calc(100% - ${drawerWidth}px)`,
              ml: `${drawerWidth}px`,
            }}
          ></AppBar>

          <div
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
    
            &nbsp; &nbsp; &nbsp;
            <div align="center">
              <BackgroundLetterAvatars
                n={state.user.FirstName + " " + state.user.LastName}
              />
            </div>
            &nbsp; &nbsp; &nbsp;
            <Divider />
            <List>
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

            {isDisplay ? (
              <DisplayInfo handleDisplay={handleDisplayOFF} />
            ) : (
              <InfoCard handleDisplay={handleDisplayON} />
            )}
          </Box>
        </Box>
      )}
    </>
  );
}
