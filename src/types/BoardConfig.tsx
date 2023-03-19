export interface BoardCfgState {
  rowSize: number
  colSize: number
  setRowSize: (rowSize: number) => void
  setColSize: (colSize: number) => void
  mode: string
  setMode: (inputMode: string) => void
  compTurn: [string]
  setCompTurn: (inputTurn: string) => void
  AILevel: string
  setAILevel: (inputLevel: string) => void
}