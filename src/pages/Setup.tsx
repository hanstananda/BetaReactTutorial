import React from "react";
import { useContext, useState } from "react";
import Container from "@mui/material/Container";

import Paper from "@mui/material/Paper";
import { boxSizePx, maxSquares, minSquares } from "../types/Boardconst";
import { BoardCfgContext } from "../contexts/BoardCfgContext";
import Game from "../components/Game";
import { ToolBar } from "../components/ToolBar";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import { FormControl } from "@mui/material";

export const row = 3;
export const col = 3;

function SetupMenu() {
  const [boardCfg, setBoardCfg] = useState({
    rowSize: 3,
    colSize: 3,
  });

  function setRowSize(rowSize: number) {
    setBoardCfg({
      rowSize: rowSize,
      colSize: boardCfg.colSize,
    });
  }

  function setColSize(colSize: number) {
    setBoardCfg({
      colSize: colSize,
      rowSize: boardCfg.rowSize,
    });
  }

  const possibleSizes = Array(maxSquares - minSquares + 1)
    .fill(0)
    .map((_, i) => i + minSquares);

  return (
    <React.Fragment>
      <ToolBar />
      <Container sx={{ justifyContent: "center", alignItems: "center" }}>
        <Paper
          variant="outlined"
          sx={{ textAlign: "center", p: 5, m: 2, width: boxSizePx * (col + 1) }}
        >
          <BoardCfgContext.Provider value={boardCfg}>
            {/* <FormControl sx={{ minWidth: 120 }}> */}
            <InputLabel id="Row size">Row size</InputLabel>
            <Select
              value={boardCfg.rowSize.toString(10)}
              label="Row size"
              id="Row size"
              onChange={(event: SelectChangeEvent) =>
                setRowSize(parseInt(event.target.value))
              }
            >
              {possibleSizes.map((value, _) => (
                <MenuItem key={"rowSize-" + value} value={value}>
                  {value}
                </MenuItem>
              ))}
            </Select>
            <InputLabel id="Column size">Column size</InputLabel>
            <Select
              value={boardCfg.colSize.toString(10)}
              label="Column size"
              id="Column size"
              onChange={(event: SelectChangeEvent) =>
                setColSize(parseInt(event.target.value))
              }
            >
              {possibleSizes.map((value, _) => (
                <MenuItem key={"colSize-" + value} value={value}>
                  {value}
                </MenuItem>
              ))}
            </Select>
            {/* </FormControl> */}
          </BoardCfgContext.Provider>
        </Paper>
      </Container>
    </React.Fragment>
  );
}

export default SetupMenu;
