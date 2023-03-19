export interface BoardCfgState {
  rowSize: number
  colSize: number
  setRowSize: (rowSize: number) => void
  setColSize: (colSize: number) => void
  mode: string
  setMode: (inputMode: string) => void
  compTurn: [string]
  setCompTurn: (inputMode: string) => void
}