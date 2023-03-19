export interface BoardInfo {
  gameFinished: boolean;
  winner: string;
  squares: SquareData[][];
}

export interface SquareData {
  value: string;
  isWinSquare: boolean;
  disabled: boolean;
}
