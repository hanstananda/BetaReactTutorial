import { BoardInfo } from "../types/BoardInfo";

export function getStatusText(
  boardInfo: BoardInfo,
  currentPlayer: string
): string {
  let status;
  if (boardInfo.gameFinished) {
    if (boardInfo.winner == "tie") {
      status = "Game is a tie!";
    } else {
      status = "Winner is " + boardInfo.winner;
    }
  } else {
    status = "Current Turn: " + currentPlayer;
  }
  return status;
}
