import React from "react";
import Header from "./Header";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

export default function LandingPage() {
  return (
    <div>
      <Header />
      <section className="showcase">
        <div className="showcase-overlay">
          <h1>Kite Airlines</h1>
          <p>Making the sky the best place to be!</p>


          <footer style= {{position: "absolute",
                bottom: "-0px"}}>
            <p style={{ textAlign: "center"}}>
              <Copyright />
            </p>
          </footer>
        </div>
      </section>
    </div>
  );
}

function Copyright() {
  return (
    <Typography variant="caption" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="/">
        Kite Air
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}


