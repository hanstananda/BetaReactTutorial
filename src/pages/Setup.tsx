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
  const result = <Box>
  <InputLabel id="Row size">Row size</InputLabel>
  <Select
    value={size.toString(10)}
    label="Row size"
    id="Row size"
    onChange={(event: SelectChangeEvent) =>
      useBoardCfgStore((state) => state.setColSize(parseInt(event.target.value)))
    }
  >
    {possibleSizes.map((value, _) => (
      <MenuItem key={"rowSize-" + value} value={value}>
        {value}
      </MenuItem>
    ))}
  </Select>
</Box>
return result;
}

function SetupMenu() {
  const rowSize = useBoardCfgStore((state) => state.rowSize)
  const colSize = useBoardCfgStore((state) => state.rowSize)

  const rowOptions = sizeOptions("row", rowSize)

  function setRowSize(rowSize: number) {
    useBoardCfgStore((state) => state.setRowSize(rowSize))
  }

  function setColSize(colSize: number) {
    useBoardCfgStore((state) => state.setColSize(colSize))
  }

 

  return (
    <React.Fragment>
      <ToolBar />
      <Container
        sx={{ justifyContent: "center", alignItems: "center", paddingTop: 5 }}
        maxWidth="xs"
      >
        <Paper variant="outlined" sx={{padding: 5}}>
            <Grid container spacing={2}>
              <Grid xs={12} display="flex" justifyContent="center" alignItems="center">
                <Stack
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  spacing={2}
                >
                  {rowOptions}
                  {/* <Box>
                    <InputLabel id="Row size">Row size</InputLabel>
                    <Select
                      value={rowSize.toString(10)}
                      label="Row size"
                      id="Row size"
                      onChange={(event: SelectChangeEvent) =>
                        setRowSize(parseInt(event.target.value))
                      }
                    >
                      {possibleSizes.map((value, _) => (
                        <MenuItem key={"rowSize-" + value} value={value}>
                          {value}
                        </MenuItem>
                      ))}
                    </Select>
                  </Box> */}

                  <Box>
                    <InputLabel id="Column size">Col size</InputLabel>
                    <Select
                      value={colSize.toString(10)}
                      label="Column size"
                      id="Column size"
                      onChange={(event: SelectChangeEvent) =>
                        setColSize(parseInt(event.target.value))
                      }
                    >
                      {possibleSizes.map((value, _) => (
                        <MenuItem key={"colSize-" + value} value={value}>
                          {value}
                        </MenuItem>
                      ))}
                    </Select>
                  </Box>
                  
                </Stack>
              </Grid>
              <Grid xs={12} display="flex" justifyContent="center" alignItems="center" sx={{marginTop: 5}}>
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
