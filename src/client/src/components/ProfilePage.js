import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import InfoCard from './InfoCard.js';
import DisplayInfo from './DisplayInfo';
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import axios from "axios";
import BackgroundLetterAvatars from './Avatar';
const drawerWidth = 240;

export default function ProfilePage({user}) {

    const [isDisplay, setisDisplay] = useState(true);

  const handleDisplayOFF = () => {
    setisDisplay(false);
  }

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
            >
                <Toolbar>
                    <Typography variant="h6" noWrap component="div">
                        Settings
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="permanent"
                anchor="left"
            >
                &nbsp; &nbsp; &nbsp;
             
              <div align="center">
                <BackgroundLetterAvatars n="Rawan Reda"/>
              </div>
              &nbsp; &nbsp; &nbsp;
                <Divider />
               
                <List>
                    {['My details', 'My Bookings', 'Payment methods', 'Email subscriptions'].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
                <Divider />

            </Drawer>
            <Box
                component="main"
                sx={{ flexGuser: 1, bgcolor: 'background.default', p: 3, width:1250 }}>
                <Toolbar />

                {isDisplay ? <DisplayInfo user={user} handleDisplay={handleDisplayOFF} /> : <InfoCard user={user} handleDisplay={handleDisplayOFF}/>}


            </Box>
           
        </Box>
    );
}

{/* <DisplayInfo user={user}/> */}