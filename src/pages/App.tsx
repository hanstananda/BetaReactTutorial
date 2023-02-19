import React from "react";
import { useContext, useState } from "react";
import Container from "@mui/material/Container";

import Paper from "@mui/material/Paper";
import { boxSizePx } from "../types/Boardconst";
import { BoardCfgContext } from "../contexts/BoardCfgContext";
import Game from "../components/Game";
import { ToolBar } from "../components/ToolBar";

export const row = 3;
export const col = 3;

function App() {
  const [boardCfg, setBoardCfg] = useState({
    rowSize: 3,
    colSize: 3,
  });

  return (
    <React.Fragment>
      <ToolBar />
      <Container sx={{ justifyContent: "center", alignItems: "center" }}>
        <Paper
          variant="outlined"
          sx={{ textAlign: "center", p: 5, m: 2, width: boxSizePx * (col + 1) }}
        >
          <BoardCfgContext.Provider value={boardCfg}>
            <Game />
          </BoardCfgContext.Provider>
        </Paper>
      </Container>
    </React.Fragment>
  );
}

export default App;
