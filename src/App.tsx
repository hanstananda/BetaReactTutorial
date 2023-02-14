import React from 'react'
import { useContext, useState } from 'react';
import Container from '@mui/material/Container';

import './App.css'
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import { boxSizePx } from './contexts/GameGrid';
import Board from './components/Board';
import { BoardCfgContext } from './contexts/BoardCfgContext';

export const row = 3
export const col = 3

function App() {

  const [ boardCfg, setBoardCfg ] = useState({
    rowSize: 3,
    colSize: 3,
  })

  return (
    <React.Fragment>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" sx={{fontWeight: 'medium', textTransform: 'capitalize',  fontFamily: 'Monospace'   }}>Simply Tic Tac Toe</Typography>
        </Toolbar>
      </AppBar>
      {/* Refer to https://mui.com/material-ui/react-app-bar/ for Second Toolbar component hack */}
      <Toolbar />
      <Container sx={{ justifyContent:'center', alignItems:'center' }}>
        <Paper variant="outlined" sx={{ textAlign: 'center' , p: 5 , m:2, width: boxSizePx*(col+1) }}  >
          <BoardCfgContext.Provider value={boardCfg}>
          <Board />
          </BoardCfgContext.Provider>
        </Paper>
      </Container>
    </React.Fragment>
  )
}

export default App
