import { useContext, useState } from "react";
import { BoardCfgContext } from "../contexts/BoardCfgContext";
import Board from "./Board";

export interface onPlay{

}

export default function Game() {
  const BoardConfig = useContext(BoardCfgContext);
  const rowSize = BoardConfig.rowSize;
  const colSize = BoardConfig.colSize;
  const [history, setHistory] = useState<string[][][]>([[...Array(rowSize)].map((_) => Array(colSize).fill(""))]);
  const currentSquares = history[history.length - 1];

  function handlePlay( squares: string[][]) {
    setHistory([...history, squares])
  }
  
  return (
    <Board squares={currentSquares} handlePlay={handlePlay}/>
    // <div className="game">
    //   <div className="game-board">
        
    //   </div>
    //   <div className="game-info">
    //     <ol>{/*TODO*/}</ol>
    //   </div>
    // </div>
  );
}
