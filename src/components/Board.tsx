import { useContext, useState } from "react";

import Grid from "@mui/material/Unstable_Grid2";

import Square from "./Square";
import { boxSizePx } from "../contexts/GameGrid";
import { BoardCfgContext } from "../contexts/BoardCfgContext";
import calculateWinner from "../hooks/calculateWinner";
import classes from "./Board.module.scss";
import { OnPlay, BoardInfo } from "./Game";

// TODO: type Function properly by making interface, e.g.
/*
interface SearchFunc {
  (source: string, subString: string): boolean;
}
*/
function Board({
  boardInfo = {
    squares: [...Array(3)].map((_) =>
      Array(3).fill({ value: "", isWinSquare: false })
    ),
    gameFinished: false,
    winner: "",
  },
  handlePlay = () => {},
}: {
  boardInfo: BoardInfo;
  handlePlay: OnPlay;
}) {
  const BoardConfig = useContext(BoardCfgContext);
  const rowSize = BoardConfig.rowSize;
  const colSize = BoardConfig.colSize;
  // TODO: Use context for this, extract more functions out
  const [currentPlayer, setNextPlayer] = useState<string>("X");  

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
    const updatedBoardInfo = {
      squares: boardInfo.squares.map(row => row.slice()),
      gameFinished: boardInfo.gameFinished,
      winner: boardInfo.winner,
    }

    console.log("editing row " + i + " col " + j);
    // stupid way to deepcopy an object 
    
    updatedBoardInfo.squares[i][j].value = currentPlayer;
    setNextPlayer(currentPlayer == "X" ? "O" : "X");
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
        <Grid container className={classes.colGrid} spacing={0}>
          {lines.map((item, indexX) => (
            // Key is used to suppress Warning: Each child in a list should have a unique "key" prop.
            <Grid xs={4} sx={{ height: boxSizePx, width: boxSizePx }}>
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
