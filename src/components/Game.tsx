import { useContext, useEffect, useState } from "react";
import { useBoardCfgStore } from "../stores/BoardConfig";
import Board from "./Board";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import calculateWinner from "../hooks/calculateWinner";
import { BoardInfo } from "../types/BoardInfo";
import { getStatusText } from "../utils/getStatusText";
import easyAI, { normalAI } from "../hooks/AI";

export interface OnPlay {
  (board: BoardInfo, selectedRow: number, selectedCol: number): void;
}

function getSymbolFromTurn(turn: number): string  {
  return turn % 2 == 0 ? "X" : "O"
}

export default function Game() {
  const rowSize = useBoardCfgStore((state) => state.rowSize)
  const colSize = useBoardCfgStore((state) => state.colSize)
  const compTurn = useBoardCfgStore((state) => state.compTurn)
  const gameMode = useBoardCfgStore((state) => state.mode)
  const AILevel = useBoardCfgStore((state) => state.AILevel)

  const [turn, setTurn] = useState<number>(0);
  const currentPlayer = getSymbolFromTurn(turn);
  //console.log(currentPlayer)


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
              disabled: false,
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

    //console.log("editing row " + selectedRow + " col " + selectedCol);

    // May want to try use reducers...

    updatedBoardInfo.squares[selectedRow][selectedCol].value = currentPlayer;

    updateBoard(updatedBoardInfo);    
  }

  function updateBoard(boardInfo: BoardInfo) {
    const calculatedBoardInfo = calculateWinner(boardInfo);
    const nextHistory = [...history.slice(0, turn + 1), calculatedBoardInfo];
    setHistory(nextHistory);
    setTurn(nextHistory.length - 1);
  }

  function undo() {
    if(gameMode == 'PVE') {
      if (currentBoardInfo.gameFinished) {
        if(currentPlayer==compTurn[0]) {
          setTurn(turn -1);
        } else {
          setTurn(turn -2);
        }
        
      }
      else {
        setTurn(turn - 2);
      }
    } else {
      setTurn(turn - 1);
    }
    
  }
  //console.log("Gamemode is",gameMode)

  // check if current one is AI's turn
  if (compTurn[0]===getSymbolFromTurn(turn) && gameMode=='PVE') {
    runAI()
  }

  function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  async function runAI() {
    if (currentBoardInfo.gameFinished) {
      // Game finished, just return
      return;
    }
    const rowSize = currentBoardInfo.squares.length;
    const colSize = currentBoardInfo.squares[0].length;
    for (let y = 0; y < rowSize; y++) {
      for (let x = 0; x < colSize; x++) {
        currentBoardInfo.squares[y][x].disabled = true;
      }
    }

    // Give fake feeling of AI thinking XD
    await sleep(150);
    //console.log("Compturn is ",compTurn)
    //console.log("AI turn now since it's now ",currentPlayer)
    const [row, col] = AILevel== "easy"? easyAI(currentBoardInfo, compTurn[0]): normalAI(currentBoardInfo, compTurn[0])
    //console.log("AI result: ",row,col)
    for (let y = 0; y < rowSize; y++) {
      for (let x = 0; x < colSize; x++) {
        currentBoardInfo.squares[y][x].disabled = false;
      }
    }
    if (row==-1 || col==-1) {
      // AI can't move
      handlePlay(currentBoardInfo, 1,1)
    } else {
      handlePlay(currentBoardInfo, row, col)
    }

  }


  //console.log("Now on turn %d with board state %o", turn, currentBoardInfo);
  //console.log("History is %o", history);

  const status = getStatusText(currentBoardInfo, currentPlayer);

  return (
    <Stack spacing={3} justifyContent="center" alignItems="center">
      <Box>
        <Board boardInfo={currentBoardInfo} handlePlay={handlePlay} />
      </Box>
      <Typography variant="h5">{status}</Typography>
      {/* Create an undo button that's disabled for 0th turn */}
      <Button variant="contained" disabled={turn == 0} onClick={() => undo()}>
        Undo
      </Button>
    </Stack>
  );
}
