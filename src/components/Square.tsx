import React from 'react';
import Button from '@mui/material/Button';
import { boxSizePx } from "../const/GameGrid";

function Square(
  {
    isWinCoord = false, value, onSquareClick,
  }: {
    isWinCoord: boolean;
    value: string;
    onSquareClick: any;
  }) {
  return (
    <Button variant="text" sx={{ width: boxSizePx, height: boxSizePx, fontSize: boxSizePx - 10, fontWeight: 'medium', color: isWinCoord ? 'blue' : 'black' }}
      onClick={onSquareClick}
      className="square">
      {value}
    </Button>
  );
}

export default Square