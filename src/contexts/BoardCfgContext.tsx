import { createContext } from 'react';
import { BoardCfgType } from '../types/BoardCfg';

export const BoardCfgContext = createContext<BoardCfgType>(
  {
    rowSize: 3,
    colSize: 3,
  }
);
