import { BoardInfo } from "../types/BoardInfo";

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

// Left -> Right, Up -> Down, Diagonal Down Right, Diagonal Down Left
const direction = {
  LR: 0,
  UD: 1,
  DR: 2,
  DL: 3,
};

// right, down, right-down, left-down
const posChecksY = [0, 1, 1, 1];
const posChecksX = [1, 0, 1, -1];

export interface CellScore {
  xStart: number;
  yStart: number;
  direction: number;
  countE: number;
  countX: number; 
  countO: number;
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
      scoreTable.push({
        xStart: 0,
        yStart: y,
        direction: direction['LR'],
        countE: countE,
        countX: countX, 
        countO: countO,
      });
    }
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
      scoreTable.push({
        xStart: x,
        yStart: 0,
        direction: direction['UD'],
        countE: countE,
        countX: countX, 
        countO: countO,
      });
    }
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
      scoreTable.push({
        xStart: x,
        yStart: 0,
        direction: direction['UD'],
        countE: countE,
        countX: countX, 
        countO: countO,
      });
    }
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
      scoreTable.push({
        xStart: x,
        yStart: 0,
        direction: direction['UD'],
        countE: countE,
        countX: countX, 
        countO: countO,
      });
    }
  }

  function compareCellScores(a : CellScore,b : CellScore) {
    if (a.countE + a.countX + a.countO ==winLength) {
      // cannot be used to play, just return the other first 
      if (b.countE + b.countX + b.countO == winLength) {
        // both full, tie
        return 0
      }
      // return one with cells
      return -100;
    } else if (b.countE + b.countX + b.countO == winLength) {
      // b full, return a
      return 100
    }

    // O's turn
    {
      // no block
      if (a.countX == 0 && b.countX ==0) {
        // play whichever more beneficial
        if (a.countO == b.countO) {
          // same number, play in place more empty 
          return b.countE - a.countE
        }
        else {
          // play whichever has more O since no opponent (X)
          return a.countO - b.countO
        }
      } else if (a.countX ==0 ) {
        return 50;
      } else if (b.countX == 0) {
        return -50;
      }
      return (a.countX - b.countX ) * 3 + (a.countO - b.countO) * 2
    } 

  }

  scoreTable.sort(compareCellScores)
  scoreTable.reverse()

  // try to play based on the best avaiable
  for(let z=0;z< scoreTable.length; z++) {
    let currentBestMove =  scoreTable[z];
    let y=currentBestMove.yStart
    let x=currentBestMove.xStart
    let dir = currentBestMove.direction
    for(let i=0;i<winLength;i++) {
      if (x < 0 || y < 0 || y >= rowSize || x >= colSize) {
        console.log("Warning! invalid check at ",x,y,currentBestMove)
        break;
      }
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
