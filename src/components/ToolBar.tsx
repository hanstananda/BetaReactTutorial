import React from "react";
import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";

export function ToolBar() {
  return (
    <React.Fragment>
      <AppBar position="fixed">
        <Toolbar>
          <Typography
            variant="h6"
            sx={{
              fontWeight: "medium",
              textTransform: "capitalize",
              fontFamily: "Monospace",
            }}
          >
            Simply Tic Tac Toe
          </Typography>
        </Toolbar>
      </AppBar>
      {/* Refer to https://mui.com/material-ui/react-app-bar/ for Second Toolbar component hack */}
      <Toolbar />
    </React.Fragment>
  );
}
