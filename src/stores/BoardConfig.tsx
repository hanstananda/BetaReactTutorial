import { create } from "zustand";
import { BoardCfgState } from "../types/BoardConfig";
import { createJSONStorage, persist, devtools } from "zustand/middleware";

export const useBoardCfgStore = create<BoardCfgState>()(
  
    persist(
      (set, get) => ({
        rowSize: 3,
        colSize: 3,
        mode: "PVP",
        compTurn: ["O"],
        setRowSize: function (inputRowSize: number): void {
          console.log("New row size is ", inputRowSize);
          set((_) => ({ colSize: inputRowSize }));
          set((_) => ({ rowSize: inputRowSize }));
          console.log("New sizes are ", get().rowSize, get().colSize);
        },
        setColSize: function (inputColSize: number): void {
          console.log("New col size is ", inputColSize);
          set((_) => ({ colSize: inputColSize }));
          set((_) => ({ rowSize: inputColSize }));
          console.log("New sizes are ", get().rowSize, get().colSize);
        },
        setMode: function (inputMode: string): void {
          console.log("New mode is ", inputMode);
          switch (inputMode.toUpperCase()) {
            case 'PVE':
              set((_) => ({ mode: inputMode }));
              break;
            default: 
              set((_) => ({ mode: 'PVP'}));
          }
        },
        setCompTurn: function (inputSymbol: string) : void {
          switch (inputSymbol.toUpperCase()) {
            case 'X':
              set((_) => ({ compTurn: ["X"] }));
              break;
            default: 
              set((_) => ({ compTurn: ["O"] }));
          }
        },
      }),
      {
        name: "board-config-storage",
        storage: createJSONStorage(() => sessionStorage),
      }
    )
  
);
