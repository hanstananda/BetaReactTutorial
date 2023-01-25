import React, { useState } from 'react'
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';

import './App.css'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

function Square(
  {
    coord = 1,
    value,
    onSquareClick,
  }:
    {
      coord: number,
      value: string,
      onSquareClick: any,
    }
) {
  return (
    <Button variant="text" sx={{ width: 50, height: 50, border: 'solid', radius: '0px' }}
      onClick={onSquareClick}
      className="square" >
      {value}
    </Button>
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
  const [isGameFinished, setIsGameFinished ] = useState<boolean>(false)

  const winner = calculateWinner(squares);
  let status;
  if (winner != "") {
    status = "Winner is " + winner
    if (!isGameFinished) {
      setIsGameFinished(true)
    }
  } else {
    status = "Current Turn: " + currentPlayer
  }

  function handleClick(i: number, j: number) {
    if (squares[i][j] != '') {
      return
    }
    if (isGameFinished) {
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
    <Container fixed>
      <Grid container spacing={0}>
        <Grid item xs={12} md={3}>
          <Grid container rowSpacing={0} columnSpacing={0}>
            {
              [...Array(row)].map((_, i) =>
                // Key is used to suppress Warning: Each child in a list should have a unique "key" prop.
                <Grid item xs={12}>
                  {
                    [...Array(col)].map((_, j) =>
                      <Square key={"square-" + (row * i + j + 1)} value={squares[i][j]} onSquareClick={() => handleClick(i, j)} coord={row * i + j + 1} />
                    )
                  }
                </Grid>
              )
            }
          </Grid>
          <Typography variant="h5">{status}</Typography>
        </Grid>
        <Grid item xs={12} md={9}>

        </Grid>
      </Grid>
      
    </Container>
  )
}

function App() {
  const [count, setCount] = useState(0)

  return (
    <React.Fragment>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h5">Simply Tic Tac Toe</Typography>
        </Toolbar>
      </AppBar>
      {/* Refer to https://mui.com/material-ui/react-app-bar/ for Second Toolbar component */}
      <Toolbar />
      <Container>
        <Board />
      </Container>
    </React.Fragment>
  )
}

export default App
