import { useContext, useState } from "react";

import Grid from "@mui/material/Unstable_Grid2";

import Square from "./Square";
import { boxSizePx } from "../types/Boardconst";
import { BoardCfgContext } from "../contexts/BoardCfgContext";
import calculateWinner from "../hooks/calculateWinner";
import classes from "./Board.module.scss";
import { OnPlay } from "./Game";
import { BoardInfo } from "../types/BoardInfo";

// TODO: type Function properly by making interface, e.g.
/*
interface SearchFunc {
  (source: string, subString: string): boolean;
}
*/
function Board({
  boardInfo,
  handlePlay,
  currentPlayer,
}: {
  boardInfo: BoardInfo;
  handlePlay: OnPlay;
  currentPlayer: string;
}) {
  const BoardConfig = useContext(BoardCfgContext);
  const rowSize = BoardConfig.rowSize;
  const colSize = BoardConfig.colSize;

  // TODO: Find a better way to calculate winner, may not need to bloat boardInfo with winning squares, etc.
  const calculatedBoardInfo = calculateWinner(boardInfo);
  console.log("calculated square is %o", calculatedBoardInfo);

  function handleClick(i: number, j: number) {
    if (boardInfo.squares[i][j].value != "") {
      // illegal move, place already taken
      return;
    }
    if (boardInfo.gameFinished) {
      // illegal move, game already finished
      return;
    }
    // Create deep copy of board object
    const updatedBoardInfo = structuredClone(boardInfo);

    console.log("editing row " + i + " col " + j);
    // stupid way to deepcopy an object

    updatedBoardInfo.squares[i][j].value = currentPlayer;
    console.log("next square is %o", updatedBoardInfo);
    handlePlay(updatedBoardInfo);
  }

  return (
    <Grid
      container
      className={classes.rowGrid}
      sx={{ width: boxSizePx * colSize + 2 }} // Small hack to fix the Grid size XD
    >
      {calculatedBoardInfo.squares.map((lines, indexY) => (
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
                onSquareClick={() => handleClick(indexY, indexX)}
              />
            </Grid>
          ))}
        </Grid>
      ))}
    </Grid>
  );
}

export default Board;
