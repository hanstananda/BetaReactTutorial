// used to calculate traverse path of the squares

import { useContext } from "react";
import { BoardInfo } from "../components/Game";
import { BoardCfgContext } from "../contexts/BoardCfgContext";

// down, right, right-down, left-down
const posChecksY = [1, 0, 1, 1];
const posChecksX = [0, 1, 1, -1];

function calculateWinner(boardInfo: BoardInfo): BoardInfo {
  // assumes board is well-formed
  const BoardConfig = useContext(BoardCfgContext);
  const rowSize = BoardConfig.rowSize
  const colSize = BoardConfig.colSize
  const board = boardInfo.squares
  let countFilled = 0;
  for (let y = 0; y < rowSize; y++) {
    for (let x = 0; x < colSize; x++) {
      const curSymbol = board[y][x].value;
      if (board[y][x].value == "") {
        continue;
      }
      countFilled += 1;
      // check for each probable win scenario
      for (let i = 0; i < posChecksX.length; i++) {
        let isWin = true;
        // check for consecutive symbols
        let nextY = y;
        let nextX = x;
        for (let j = 1; j < Math.min(rowSize, colSize); j++) {
          nextY += posChecksY[i];
          nextX += posChecksX[i];
          // check valid coord
          if (nextY < 0 || nextX < 0 || nextY >= rowSize || nextX >= colSize) {
            isWin = false;
            break;
          }
          console.log(i, j, nextX, nextY, curSymbol, board[nextY][nextX]);
          if (board[nextY][nextX].value != curSymbol) {
            isWin = false;
            break;
          }
        }
        if (isWin) {
          // backtrack and mark winning board
          let nextY = y;
          let nextX = x;
          for (let j = 0; j < Math.min(rowSize, colSize); j++) {
            board[nextY][nextX].isWinSquare = true;
            nextY += posChecksY[i];
            nextX += posChecksX[i];
          }
          boardInfo.winner = curSymbol;
          boardInfo.gameFinished = true;
          return boardInfo; // immediately return to exit for loop
        }
      }
    }
  }
  if (countFilled == rowSize * colSize) {
    boardInfo.gameFinished = true;
    boardInfo.winner = "tie";
  }
  return boardInfo;
}

export default calculateWinner;
