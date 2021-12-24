import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MoreIcon from "@mui/icons-material/MoreVert";
import Button from "@mui/material/Button";
import { useNavigate, useLocation } from "react-router-dom";
import Link from "@mui/material/Link";

import { useContext, useEffect } from "react";
import { UserContext } from "../context/index.js";
import axios from "axios";

import logo from "../assets/whiteKite.png";

export default function Header() {
  const [state, setState] = useContext(UserContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const navigate = useNavigate();
  const location = useLocation();

  const currpath = location.pathname;

  console.log(state);
  const isLoggedIn = state && state.user;
  const isAdmin =  state &&state.user.Admin === "1";


  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleClickLogin = (event) => {
    navigate("/login");
  };

  const handleProfileClick = (event) => {
    setAnchorEl(null);
    handleMobileMenuClose();
    navigate("/ProfilePage");
  };

  const logout = () => {
    axios
      .delete("http://localhost:4000/logout", { token: state.token })
      .then((response) => {
        navigate("/login");
        console.log("deletedtoken");
        window.localStorage.removeItem("auth");
        setState(null);
      })
      .catch((error) => {
        console.log(error);
      });
  

    handleMenuClose();
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {!isAdmin && <MenuItem onClick={handleProfileClick}>Profile</MenuItem>}
      <MenuItem onClick={logout}>Log-out</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {!isAdmin && (
        <MenuItem onClick={handleProfileClick}>
          <p>Profile</p>
        </MenuItem>
      )}

      <MenuItem onClick={logout}>
        <p>Log-out</p>
      </MenuItem>
    </Menu>
  );

  const landingSyle =
    location.pathname == "/"
      ? { background: "transparent", boxShadow: "none" }
      : { background: "#191b3a" };

      const pos =
      location.pathname == "/"
      ? "absolute"
        : "sticky"

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar style={landingSyle} position={pos} >
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            <div
              color="inherit"
              onClick={() => {
                navigate("/");
              }}
              style={{ textDecoration: "none", cursor: "pointer" }}
            >
              {/* Kite Air */}
              <img src={logo} height="45" alt="logo" />
            </div>{" "}
          </Typography>

          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            {isLoggedIn ? (
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            ) : (
              <Button
                onClick={handleClickLogin}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                Login
              </Button>
            )}
          </Box>

          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            {isLoggedIn ? (
              <IconButton
                size="large"
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            ) : (
              <div></div>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
