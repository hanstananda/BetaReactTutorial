import React from "react";
import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Link from "@mui/material/Link";
import { Link as RouterLink } from "react-router-dom" ;


export function ToolBar() {
  return (
    <React.Fragment>
      <AppBar position="fixed">
        <Toolbar>
          <Link
            variant="h6"
            color="inherit"
            underline="none"
            component={RouterLink} 
            to="/"
            sx={{
              fontWeight: "medium",
              textTransform: "capitalize",
              fontFamily: "Monospace",
            }}
          >
            Simply Tic Tac Toe
          </Link>
          
          
        </Toolbar>
      </AppBar>
      {/* Refer to https://mui.com/material-ui/react-app-bar/ for Second Toolbar component hack */}
      <Toolbar />
    </React.Fragment>
  );
}
