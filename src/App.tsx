import React, { useState } from 'react'
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';

import './App.css'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { fabClasses } from '@mui/material';

const boxSizePx = 150
const row = 3
const col = 3

function Square(
  {
    isWinCoord=false,
    value,
    onSquareClick,
  }:
    {
      isWinCoord: boolean,
      value: string,
      onSquareClick: any,
    }
) {
  return (
    <Button variant="text" sx={{ width: boxSizePx, height: boxSizePx, fontSize: boxSizePx-10, fontWeight: 'medium', color: isWinCoord? 'blue': 'black'  }}
      onClick={onSquareClick}
      className="square"  >
      {value}
    </Button>
  )
}

function calculateWinner(board: string[][]): [string, boolean[][]] {
  // used to calculate traverse path of the squares
  // down, right, right-down, left-down
  const posChecksY = [1, 0, 1, 1]
  const posChecksX = [0, 1, 1, -1]
  // assumes board is well-formed
  const row = board.length
  const col = board[0].length
  let winMap = [...Array(row)].map(_ => Array(col).fill(false))
  let countFilled=0
  for (let y = 0; y < row; y++) {
    for (let x = 0; x < col; x++) {
      const res = board[y][x]
      if (board[y][x] == '') {
        continue
      }
      countFilled+=1
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
          // backtrack and mark winning board
          let nextY = y
          let nextX = x
          for (let j = 0; j < Math.min(row, col); j++) {
            winMap[nextY][nextX] = true
            nextY += posChecksY[i]
            nextX += posChecksX[i]
          }
          return [res, winMap]
        }
      }
    }
  }
  if (countFilled== row*col) {
    return ["tie", winMap]
  }
  return ["", winMap]
}

function Board() {
  const [currentPlayer, setNextPlayer] = useState<string>('X')
  const [squares, setSquares] = useState<string[][]>([...Array(row)].map(_ => Array(col).fill("")))
  const [winSquares, setWinSquares] = useState<boolean[][]>([...Array(row)].map(_ => Array(col).fill(false)))
  const [isGameFinished, setIsGameFinished ] = useState<boolean>(false)

  const winner = calculateWinner(squares);
  let status;
  if (winner[0] != "") {
    if (winner[0]=="tie") {
      status = "Game is a tie!"
    } else {
      status = "Winner is " + winner[0]
    }
    if (!isGameFinished) {
      setWinSquares(winner[1])
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
    <Stack spacing={3} justifyContent="center" alignItems="center">
      <Box>
      <Grid container sx={{
          '--Grid-borderWidth': '1px',
          borderTop: 'var(--Grid-borderWidth) solid',
          borderLeft: 'var(--Grid-borderWidth) solid',
          borderColor: 'divider',
          '& > div': {
            borderBottom: 'var(--Grid-borderWidth) solid',
            borderColor: 'divider',
          },
          width: boxSizePx*col+2 // Small hack to fix the Grid size XD
        }}>
      {squares.map( (lines, indexY)  => (
        <Grid container spacing={0} sx={{
          '& > div': {
            borderRight: 'var(--Grid-borderWidth) solid',
            borderColor: 'divider',
          },
        }}>
          {
            lines.map(  (item, indexX) => 
            // Key is used to suppress Warning: Each child in a list should have a unique "key" prop.
              <Grid xs={4} sx= {{ height: boxSizePx, width: boxSizePx }}>
              <Square key={"square-"+ (indexY*row+indexX)} value={item} onSquareClick={() => handleClick(indexY, indexX)} isWinCoord={winSquares[indexY][indexX]} />
              </Grid>
      
           )
          }
        </Grid>
      ) )}
      </Grid>
      </Box>
      <Typography variant="h5">{status}</Typography>
      </Stack>
  )
}

function App() {
  const [count, setCount] = useState(0)

  return (
    <React.Fragment>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" sx={{fontWeight: 'medium', textTransform: 'capitalize',  fontFamily: 'Monospace'   }}>Simply Tic Tac Toe</Typography>
        </Toolbar>
      </AppBar>
      {/* Refer to https://mui.com/material-ui/react-app-bar/ for Second Toolbar component */}
      <Toolbar />
      <Container sx={{ justifyContent:'center', alignItems:'center' }}>
        <Paper variant="outlined" sx={{ textAlign: 'center' , p: 5 , m:2, width: boxSizePx*(col+1) }}  >
        <Board />
        </Paper>
      </Container>
    </React.Fragment>
  )
}

export default App
