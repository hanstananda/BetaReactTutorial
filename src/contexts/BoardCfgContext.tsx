import { createContext } from 'react';

export interface BoardCfgType {
  rowSize: number,
  colSize: number,
}

export const BoardCfgContext = createContext<BoardCfgType>(
  {
    rowSize: 3,
    colSize: 3,
  }
);
