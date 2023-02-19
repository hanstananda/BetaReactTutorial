import { useContext, useState } from "react";
import { BoardCfgContext } from "../contexts/BoardCfgContext";
import Board from "./Board";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import calculateWinner from "../hooks/calculateWinner";
import { BoardInfo } from "../types/BoardInfo";
import { getStatusText } from "../utils/getStatusText";

export interface OnPlay {
  (board: BoardInfo, selectedRow: number, selectedCol: number): void;
}

export default function Game() {
  const BoardConfig = useContext(BoardCfgContext);
  const rowSize = BoardConfig.rowSize;
  const colSize = BoardConfig.colSize;

  const [turn, setTurn] = useState<number>(0);
  const currentPlayer = turn % 2 == 0 ? "X" : "O";

  const [history, setHistory] = useState<BoardInfo[]>([
    {
      squares: [...Array(rowSize)].map((_) =>
        Array(colSize)
          .fill(null)
          .map(
            // fill with null first then we re-declare using map,
            // Take note of: https://stackoverflow.com/a/43461022/7276831
            (_) => ({
              value: "",
              isWinSquare: false,
            })
          )
      ),
      gameFinished: false,
      winner: "",
    },
  ]);
  const currentBoardInfo = history[turn];

  function handlePlay(
    boardInfo: BoardInfo,
    selectedRow: number,
    selectedCol: number
  ) {
    if (boardInfo.squares[selectedRow][selectedCol].value != "") {
      // illegal move, place already taken
      return;
    }
    if (boardInfo.gameFinished) {
      // illegal move, game already finished
      return;
    }
    // Create deep copy of board object
    const updatedBoardInfo = structuredClone(boardInfo);

    console.log("editing row " + selectedRow + " col " + selectedCol);
    // stupid way to deepcopy an object

    updatedBoardInfo.squares[selectedRow][selectedCol].value = currentPlayer;

    const calculatedBoardInfo = calculateWinner(updatedBoardInfo);
    const nextHistory = [...history.slice(0, turn + 1), calculatedBoardInfo];
    setHistory(nextHistory);
    setTurn(nextHistory.length - 1);
  }

  function undo() {
    setTurn(turn - 1);
  }

  console.log("Now on turn %d with board state %o", turn, currentBoardInfo);
  console.log("History is %o", history);

  const status = getStatusText(currentBoardInfo, currentPlayer);

  return (
    <Stack spacing={3} justifyContent="center" alignItems="center">
      <Box>
        <Board
          boardInfo={currentBoardInfo}
          handlePlay={handlePlay}
        />
      </Box>
      <Typography variant="h5">{status}</Typography>
      {/* Create an undo button that's disabled for 0th turn */}
      <Button variant="contained" disabled={turn == 0} onClick={() => undo()}>
        Undo
      </Button>
    </Stack>
  );
}
