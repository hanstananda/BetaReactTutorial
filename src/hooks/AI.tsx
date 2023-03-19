import { BoardInfo } from "../types/BoardInfo";

export default function bitBetterAI(boardInfo: BoardInfo, currentTurn: string): [number, number] {

  // ensure we don't mutate original object
  const computedBoardInfo = structuredClone(boardInfo);
  // assumes board is well-formed

  const rowSize = computedBoardInfo.squares.length;
  const colSize = computedBoardInfo.squares[0].length;
  const board = computedBoardInfo.squares;
  
  while(true) {
    // get random col and row
    let i = Math.floor(Math.random() * rowSize)
    let j = Math.floor(Math.random() * colSize)
    if(board[i][j].value == "") {
      // just move here bich  
      return [i,j]
    }
  }

}

