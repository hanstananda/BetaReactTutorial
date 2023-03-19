export interface BoardCfgState {
  rowSize: number
  colSize: number
  setRowSize: (rowSize: number) => void
  setColSize: (colSize: number) => void
  mode: string
  compTurn: [string]
}