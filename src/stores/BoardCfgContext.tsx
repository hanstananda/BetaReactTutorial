import { create } from 'zustand'
import { BoardCfgState } from "../types/BoardCfg";


export const useBoardCfgStore = create<BoardCfgState>()((set) => ({
  rowSize: 3,
  colSize: 3,
  setRowSize: function (rowSize: number): void {
    set((_) => ({ rowSize: rowSize }))
  },
  setColSize: function (colSize: number): void {
    set((_) => ({ colSize: colSize }))
  }
}))
