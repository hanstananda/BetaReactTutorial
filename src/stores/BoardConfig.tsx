import { create } from "zustand";
import { BoardCfgState } from "../types/BoardConfig";
import { createJSONStorage, persist, devtools } from "zustand/middleware";

export const useBoardCfgStore = create<BoardCfgState>()(
  
    persist(
      (set, get) => ({
        rowSize: 3,
        colSize: 3,
        mode: "PVE",
        compTurn: ["O"],
        setRowSize: function (inputRowSize: number): void {
          console.log("New row size is ", inputRowSize);
          set((_) => ({ rowSize: inputRowSize }));
          console.log("New sizes are ", get().rowSize, get().colSize);
        },
        setColSize: function (inputColSize: number): void {
          console.log("New col size is ", inputColSize);
          set((_) => ({ colSize: inputColSize }));
          console.log("New sizes are ", get().rowSize, get().colSize);
        },
      }),
      {
        name: "board-config-storage",
        storage: createJSONStorage(() => sessionStorage),
      }
    )
  
);
