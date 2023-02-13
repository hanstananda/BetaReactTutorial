// used to calculate traverse path of the squares
// down, right, right-down, left-down
const posChecksY = [1, 0, 1, 1];
const posChecksX = [0, 1, 1, -1];

function calculateWinner(board: string[][]): [string, boolean[][]] {
  // assumes board is well-formed
  const row = board.length;
  const col = board[0].length;
  let winMap = [...Array(row)].map((_) => Array(col).fill(false));
  let countFilled = 0;
  for (let y = 0; y < row; y++) {
    for (let x = 0; x < col; x++) {
      const res = board[y][x];
      if (board[y][x] == "") {
        continue;
      }
      countFilled += 1;
      // check for each probable win scenario
      for (let i = 0; i < posChecksX.length; i++) {
        let isWin = true;
        // check for consecutive symbols
        let nextY = y;
        let nextX = x;
        for (let j = 1; j < Math.min(row, col); j++) {
          nextY += posChecksY[i];
          nextX += posChecksX[i];
          // check valid coord
          if (nextY < 0 || nextX < 0 || nextY >= row || nextX >= col) {
            isWin = false;
            break;
          }
          console.log(i, j, nextX, nextY, res, board[nextY][nextX]);
          if (board[nextY][nextX] != res) {
            isWin = false;
            break;
          }
        }
        if (isWin) {
          // backtrack and mark winning board
          let nextY = y;
          let nextX = x;
          for (let j = 0; j < Math.min(row, col); j++) {
            winMap[nextY][nextX] = true;
            nextY += posChecksY[i];
            nextX += posChecksX[i];
          }
          return [res, winMap];
        }
      }
    }
  }
  if (countFilled == row * col) {
    return ["tie", winMap];
  }
  return ["", winMap];
}

export default calculateWinner;
