
export interface CellScore {
  xStart: number;
  yStart: number;
  direction: number;
  countE: number;
  countX: number;
  countO: number;
}

// Left -> Right, Up -> Down, Diagonal Down Right, Diagonal Down Left
export const direction = {
  LR: 0,
  UD: 1,
  DR: 2,
  DL: 3,
};
