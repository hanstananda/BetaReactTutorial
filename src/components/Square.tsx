import Button from "@mui/material/Button";
import { boxSizePx } from "../types/Boardconst";
import { SquareData } from "../types/BoardInfo";

function Square({
  squareData,
  onSquareClick,
}: {
  squareData: SquareData;
  onSquareClick: any;
}) {
  return (
    <Button
      variant="text"
      sx={{
        width: boxSizePx,
        height: boxSizePx,
        fontSize: boxSizePx - 10,
        fontWeight: "medium",
        color: squareData.isWinSquare ? "blue" : "black",
      }}
      onClick={onSquareClick}
      className="square"
    >
      {squareData.value}
    </Button>
  );
}

export default Square;
