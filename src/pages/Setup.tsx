import React from "react";
import { useContext, useState } from "react";
import Container from "@mui/material/Container";

import Paper from "@mui/material/Paper";
import { maxSquares, minSquares } from "../types/Boardconst";
import { ToolBar } from "../components/ToolBar";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import { Box, Button, FormControl, Stack } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { useBoardCfgStore } from "../stores/BoardCfgContext";

const possibleSizes = Array(maxSquares - minSquares + 1)
  .fill(0)
  .map((_, i) => i + minSquares);

function sizeOptions(type: string, size: number) {
  const setter = (() => {
    switch (type.toLowerCase()) {
      case "row":
        return useBoardCfgStore((state) => state.setRowSize);
      case "col":
      default:
        return useBoardCfgStore((state) => state.setColSize);
    }
  })();
  // const setRowSize = useBoardCfgStore(state => state.setRowSize)
  const name = type + " size";
  const result = (
    <Box>
      <InputLabel id={name}>{name}</InputLabel>
      <Select
        value={size.toString(10)}
        label={name}
        id={name}
        onChange={(event: SelectChangeEvent) =>
          setter(parseInt(event.target.value))
        }
      >
        {possibleSizes.map((value, _) => (
          <MenuItem key={name + value} value={value}>
            {value}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
  return result;
}

function SetupMenu() {
  const rowSize = useBoardCfgStore((state) => state.rowSize);
  const colSize = useBoardCfgStore((state) => state.colSize);

  const rowOptions = sizeOptions("Row", rowSize);
  const colOptions = sizeOptions("Col", colSize);

  const setColSize = useBoardCfgStore((state) => state.setColSize);

  return (
    <React.Fragment>
      <ToolBar />
      <Container
        sx={{ justifyContent: "center", alignItems: "center", paddingTop: 5 }}
        maxWidth="xs"
      >
        <Paper variant="outlined" sx={{ padding: 5 }}>
          <Grid container spacing={2}>
            <Grid
              xs={12}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={2}
              >
                {rowOptions}
                {colOptions}
              </Stack>
            </Grid>
            <Grid
              xs={12}
              display="flex"
              justifyContent="center"
              alignItems="center"
              sx={{ marginTop: 5 }}
            >
              <Button href="/game" variant="contained">
                Play!
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </React.Fragment>
  );
}

export default SetupMenu;
