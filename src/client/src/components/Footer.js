import React from "react";

import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';



function Copyright() {
    return (
      <Typography variant="body2" color="text.secondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="/">
          Kite Air
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }



export default function Footer() {
  return (
    <div>
      <footer className="footer">
        <div style={{ textAlign: "center" }}>
        
        <br/>
        <br/>
          <Copyright />
         
        </div>
      </footer>
    </div>
  );
}
