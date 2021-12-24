import * as React from "react";
import LockIcon from "@mui/icons-material/Lock";
import Link from "@mui/material/Link";
import { UserContext } from "../context/index.js";
import { useContext } from "react";
import AirplanemodeInactiveIcon from '@mui/icons-material/AirplanemodeInactive';

const drawerWidth = 340;

export default function NotFound() {
  const [state, setState] = useContext(UserContext);

  return (
    <>
      {" "}
      <div
        style={{
          height: "95vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          backgroundColor: "#191b3a",
          paddingTop: "2vh",
        }}
      >
        <p style={{ color: "white" }}>
          <AirplanemodeInactiveIcon style={{ fontSize: 130 }} />
        </p>
        <p style={{ color: "white", fontSize: "3vh" }}>
          Error 404: Page not found :(
        </p>
      </div>
    </>
  );
}
