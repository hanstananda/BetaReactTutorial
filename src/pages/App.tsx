import React from "react";
import Container from "@mui/material/Container";

import Paper from "@mui/material/Paper";
import { boxSizePx } from "../types/Boardconst";
import Game from "../components/Game";
import { ToolBar } from "../components/ToolBar";
import { useBoardCfgStore } from "../stores/BoardConfig";


function App() {
  const colSize = useBoardCfgStore((state) => state.colSize)
  return (
    <React.Fragment>
      <ToolBar />
      <Container >
        <Paper
          variant="outlined"
          sx={{ textAlign: "center", p: 5, m: 2, minWidth: boxSizePx * (colSize + 1) }}
        >
            <Game />
        </Paper>
      </Container>
    </React.Fragment>
  );
}

export default App;
