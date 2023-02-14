import { useContext, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Square from "./Square";
import { boxSizePx } from "../contexts/GameGrid";
import { BoardCfgContext } from "../contexts/BoardCfgContext";
import calculateWinner from "../hooks/calculateWinner";
import classes from './Board.module.css'

function Board() {
  // TODO: Use context for these, extract more functions out 
  const BoardConfig = useContext(BoardCfgContext);
  const rowSize = BoardConfig.rowSize
  const colSize = BoardConfig.colSize
  const [currentPlayer, setNextPlayer] = useState<string>("X");
  const [squares, setSquares] = useState<string[][]>(
    [...Array(rowSize)].map((_) => Array(colSize).fill(""))
  );
  const [winSquares, setWinSquares] = useState<boolean[][]>(
    [...Array(rowSize)].map((_) => Array(colSize).fill(false))
  );
  const [isGameFinished, setIsGameFinished] = useState<boolean>(false);

  const winner = calculateWinner(squares);
  let status;
  if (winner[0] != "") {
    if (winner[0] == "tie") {
      status = "Game is a tie!";
    } else {
      status = "Winner is " + winner[0];
    }
    if (!isGameFinished) {
      setWinSquares(winner[1]);
      setIsGameFinished(true);
    }
  } else {
    status = "Current Turn: " + currentPlayer;
  }

  function handleClick(i: number, j: number) {
    if (squares[i][j] != "") {
      return;
    }
    if (isGameFinished) {
      return;
    }
    const nextSquares = squares.map((squares) => squares.slice());
    console.log("editing row " + i + " col " + j);
    nextSquares[i][j] = currentPlayer;
    setNextPlayer(currentPlayer == "X" ? "O" : "X");
    console.log("next square is " + nextSquares);
    setSquares(nextSquares);
  }
  return (
    <Stack spacing={3} justifyContent="center" alignItems="center">
      <Box>
        <Grid
          container
          // className={classes.gameGrid}
          sx={{
            "--Grid-borderWidth": "1px",
            borderTop: "var(--Grid-borderWidth) solid",
            borderLeft: "var(--Grid-borderWidth) solid",
            borderColor: "divider",
            "& > div": {
              borderBottom: "var(--Grid-borderWidth) solid",
              borderColor: "divider",
            },
            width: boxSizePx * colSize + 2, // Small hack to fix the Grid size XD
          }}
        >
          {squares.map((lines, indexY) => (
            <Grid
              container
              spacing={0}
              sx={{
                "& > div": {
                  borderRight: "var(--Grid-borderWidth) solid",
                  borderColor: "divider",
                },
              }}
            >
              {lines.map((item, indexX) => (
                // Key is used to suppress Warning: Each child in a list should have a unique "key" prop.
                <Grid xs={4} sx={{ height: boxSizePx, width: boxSizePx }}>
                  <Square
                    key={"square-" + (indexY * rowSize + indexX)}
                    value={item}
                    onSquareClick={() => handleClick(indexY, indexX)}
                    isWinCoord={winSquares[indexY][indexX]}
                  />
                </Grid>
              ))}
            </Grid>
          ))}
        </Grid>
      </Box>
      <Typography variant="h5">{status}</Typography>
    </Stack>
  );
}

export default Board;
