import { BoardInfo } from "../types/BoardInfo";
import { CellScore, direction } from "../types/AI";
import { posChecksX, posChecksY } from "../types/Boardconst";

export default function easyAI(
  boardInfo: BoardInfo,
  currentTurn: string
): [number, number] {
  // assumes board is well-formed
  const rowSize = boardInfo.squares.length;
  const colSize = boardInfo.squares[0].length;
  const board = boardInfo.squares;

  let counter=0
  while (true) {
    // get random col and row
    let i = Math.floor(Math.random() * rowSize);
    let j = Math.floor(Math.random() * colSize);
    if (board[i][j].value == "") {
      // just move here bich
      return [i, j];
    }
    counter++
    if (counter>100) {
      // give up 
      break
    }
  }

  return [-1,-1]
}

export function normalAI(
  boardInfo: BoardInfo,
  currentTurn: string
): [number, number] {
  // assumes board is well-formed
  const rowSize = boardInfo.squares.length;
  const colSize = boardInfo.squares[0].length;
  const winLength = Math.min(colSize, rowSize);
  const board = boardInfo.squares;
  let scoreTable: CellScore[] = [];

  // check horizontal
  for (let y = 0; y < rowSize; y++) {
    let countE = 0;
    let countX = 0;
    let countO = 0;
    for (let x = 0; x < winLength; x++) {
      switch (board[y][x].value) {
        case "X":
          countX++;
          break;
        case "O":
          countO++;
          break;
        default:
          countE++;
      }
    }
    scoreTable.push({
      xStart: 0,
      yStart: y,
      direction: direction['LR'],
      countE: countE,
      countX: countX, 
      countO: countO,
    });
  }

  // check vertical 
  for (let x = 0; x < colSize; x++) {
    let countE = 0;
    let countX = 0;
    let countO = 0;
    for (let y = 0; y < winLength; y++) {
      switch (board[y][x].value) {
        case "X":
          countX++;
          break;
        case "O":
          countO++;
          break;
        default:
          countE++;
      }
    }
    scoreTable.push({
      xStart: x,
      yStart: 0,
      direction: direction['UD'],
      countE: countE,
      countX: countX, 
      countO: countO,
    });
  }

  // check diagonal Down Right
  for (let x = 0; x <= colSize - winLength; x++) {
    let countE = 0;
    let countX = 0;
    let countO = 0;
    for (let y = 0; y < winLength; y++) {
      switch (board[y][x+y].value) {
        case "X":
          countX++;
          break;
        case "O":
          countO++;
          break;
        default:
          countE++;
      }
    }
    scoreTable.push({
      xStart: x,
      yStart: 0,
      direction: direction['DR'],
      countE: countE,
      countX: countX, 
      countO: countO,
    });
  }

  // check diagonal Down Left
  for (let x = colSize - 1 ; x >= winLength -1; x--) {
    let countE = 0;
    let countX = 0;
    let countO = 0;
    for (let y = 0; y < winLength; y++) {
      switch (board[y][x-y].value) {
        case "X":
          countX++;
          break;
        case "O":
          countO++;
          break;
        default:
          countE++;
      }
    }
    scoreTable.push({
      xStart: x,
      yStart: 0,
      direction: direction['DL'],
      countE: countE,
      countX: countX, 
      countO: countO,
    });
  }

  function compareCellScores(a : CellScore,b : CellScore): number {
    // O's turn
    if (currentTurn == 'O'){
      // almost win, just win la 
      if (a.countO ==winLength-1 && a.countE >= 1) {
        return 100;
      } else if (b.countO == winLength -1 && b.countE >= 1) {
        return -100;
      }

      // break streak 
      if (a.countX >=2 && a.countO ==0) {
        // console.log("streak need to be broken found!")
        return 50
      } else if (b.countX >=2 && b.countO ==0) {
        // console.log("streak need to be broken found!")
        return -50
      }
      return (a.countX - b.countX ) * 3 + (a.countO - b.countO) * 2
    } 
    else {
      // X's turn

      // almost win, just win la 
      if (a.countX ==winLength-1 && a.countE >= 1) {
        return 100;
      } else if (b.countX == winLength -1 && b.countE >= 1) {
        return -100;
      }

      // break streak 
      if (a.countO >=2 && a.countX ==0) {
        return 50
      } else if (b.countO >=2 && a.countX==0) {
        return -50
      }
      return (a.countO - b.countO ) * 3 + (a.countX - b.countX) * 2
    }

  }

  scoreTable.sort(compareCellScores)
  scoreTable.reverse()
  // console.log("scoretable is",scoreTable)

  // try to play based on the best avaiable
  for(let z=0;z< scoreTable.length; z++) {
    let currentBestMove =  scoreTable[z];
    let y=currentBestMove.yStart
    let x=currentBestMove.xStart
    let dir = currentBestMove.direction
    for(let i=0;i<winLength;i++) {
      if(board[y][x].value=='') {
        // found empty place, just move here
        return [y,x]
      }
      y+=posChecksY[dir]
      x+=posChecksX[dir]
    }
  } 

  // cannot solve
  return [-1,-1] 
}
