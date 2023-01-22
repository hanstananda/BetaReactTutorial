import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

function Square({ coord = 1, value, onSquareClick }: { coord: number, value: string, onSquareClick: any }) {
  return (
    <button
      onClick={onSquareClick}
      className="square" >
      {value}
    </button>
  )
}

function calculateWinner(board: string[][]): string {
  // used to calculate traverse path of the squares
  // down, right, right-down, left-down
  const posChecksY = [1, 0, 1, 1]
  const posChecksX = [0, 1, 1, -1]
  // assumes board is well-formed
  const row = board.length
  const col = board[0].length
  for (let y = 0; y < row; y++) {
    for (let x = 0; x < col; x++) {
      const res = board[y][x]
      if (board[y][x] == '') {
        continue
      }
      // check for each probable win scenario
      for (let i = 0; i < posChecksX.length; i++) {
        let isWin = true
        // check for consecutive symbols
        let nextY = y
        let nextX = x
        for (let j = 1; j < Math.min(row, col); j++) {
          nextY += posChecksY[i]
          nextX += posChecksX[i]
          // check valid coord 
          if (nextY < 0 || nextX < 0 || nextY >= row || nextX >= col) {
            isWin = false
            break
          }
          console.log(i, j, nextX, nextY, res, board[nextY][nextX])
          if (board[nextY][nextX] != res) {
            isWin = false
            break
          }
        }
        if (isWin) {
          return res
        }
      }
    }
  }
  return ""
}

function Board() {
  const row = 3
  const col = 3
  const [currentPlayer, setNextPlayer] = useState<string>('X')
  const [squares, setSquares] = useState<string[][]>([...Array(row)].map(_ => Array(col).fill("")))

  const winner = calculateWinner(squares);
  let status;
  if (winner != "") {
    status = "Winner is " + winner
  } else {
    status = "Current Turn: " + currentPlayer
  }

  function handleClick(i: number, j: number) {
    if (squares[i][j] != '') {
      return
    }
    const nextSquares = squares.map(squares => squares.slice())
    console.log("editing row " + i + " col " + j)
    nextSquares[i][j] = currentPlayer
    setNextPlayer(currentPlayer == 'X' ? 'O' : 'X')
    console.log("next square is " + nextSquares)
    setSquares(nextSquares)
  }
  return (
    <div>
      <div className='status'>{status}</div>
      <div className='board-row'>
        {
          [...Array(row)].map((_, i) =>
            // Key is used to suppress Warning: Each child in a list should have a unique "key" prop.
            <div key={"row-" + i} className="board-row">
              {
                [...Array(col)].map((_, j) =>
                  <Square key={"square-" + (row * i + j + 1)} value={squares[i][j]} onSquareClick={() => handleClick(i, j)} coord={row * i + j + 1} />
                )
              }
            </div>
          )
        }
      </div>
    </div>
  )
}

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR haha
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <Board />
    </div>
  )
}

export default App
