import { useContext, useState } from "react";
import { BoardCfgContext } from "../contexts/BoardCfgContext";
import Board from "./Board";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

export interface OnPlay {
  (board: BoardInfo): void;
}

export interface BoardInfo {
  gameFinished: boolean;
  winner: string;
  squares: SquareData[][];
}

export interface SquareData {
  value: string;
  isWinSquare: boolean;
}

export default function Game() {
  const BoardConfig = useContext(BoardCfgContext);
  const rowSize = BoardConfig.rowSize;
  const colSize = BoardConfig.colSize;
  const [history, setHistory] = useState<BoardInfo[]>([
    {
      squares: [...Array(rowSize)].map((_) =>
        Array(colSize).fill(null).map( // fill with null first then we re-declare using map, 
        // Take note of: https://stackoverflow.com/a/43461022/7276831
            _ => (
                {
                    value: "",
                    isWinSquare: false,
                  }
            )
        )
      ),
      gameFinished: false,
      winner: "",
    },
  ]);
  const currentBoardInfo = history[history.length - 1];

  function handlePlay(boardInfo: BoardInfo) {
    setHistory([...history, boardInfo]);
  }

  let status;
  if (currentBoardInfo.gameFinished) {
    if (currentBoardInfo.winner == "tie") {
      status = "Game is a tie!";
    } else {
      status = "Winner is " + currentBoardInfo.winner;
    }
  } else {
    status = "Current Turn: "; //+ currentPlayer;
  }

  return (
    <Stack spacing={3} justifyContent="center" alignItems="center">
      <Box>
        <Board boardInfo={currentBoardInfo} handlePlay={handlePlay} />
      </Box>
      <Typography variant="h5">{status}</Typography>
    </Stack>
  );
}
