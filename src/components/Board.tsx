import { useContext, useState } from "react";

import Grid from "@mui/material/Unstable_Grid2";

import Square from "./Square";
import { boxSizePx } from "../types/Boardconst";
import calculateWinner from "../hooks/calculateWinner";
import classes from "./Board.module.scss";
import { OnPlay } from "./Game";
import { BoardInfo } from "../types/BoardInfo";
import { useBoardCfgStore } from "../stores/BoardCfgContext";

// TODO: type Function properly by making interface, e.g.
/*
interface SearchFunc {
  (source: string, subString: string): boolean;
}
*/
function Board({
  boardInfo,
  handlePlay,
}: {
  boardInfo: BoardInfo;
  handlePlay: OnPlay;
}) {
  const rowSize = useBoardCfgStore((state) => state.rowSize)
  const colSize = useBoardCfgStore((state) => state.rowSize)
  

  return (
    <Grid
      container
      className={classes.rowGrid}
      sx={{ width: boxSizePx * colSize + 2 }} // Small hack to fix the Grid size XD
    >
      {boardInfo.squares.map((lines, indexY) => (
        // Key is used to suppress Warning: Each child in a list should have a unique "key" prop.
        <Grid
          container
          key={"line-" + indexY}
          className={classes.colGrid}
          spacing={0}
        >
          {lines.map((item, indexX) => (
            <Grid
              key={"grid-" + (indexY * rowSize + indexX)}
              xs={4}
              sx={{ height: boxSizePx, width: boxSizePx }}
            >
              <Square
                key={"square-" + (indexY * rowSize + indexX)}
                squareData={item}
                onSquareClick={() => handlePlay(boardInfo, indexY, indexX)}
              />
            </Grid>
          ))}
        </Grid>
      ))}
    </Grid>
  );
}

export default Board;
