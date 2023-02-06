import { Grid, Box, Button } from "@mui/material";
import React, { useEffect, useState } from "react";

interface controllerProps {}

declare global {
  interface WindowEventMap {
    keydown: React.KeyboardEvent<HTMLInputElement>;
    keyup: React.KeyboardEvent<HTMLInputElement>;
  }
}

const Controller: React.FC<controllerProps> = React.memo(({}) => {
  const handleUserKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const { key } = event;
    if (key === "z" || key === "q" || key === "s" || key === "d") setKeyPressed(key);
  };

  const handleUserKeyRelease = (event: React.KeyboardEvent<HTMLInputElement>) => {
    setKeyPressed("")
  };

  useEffect(() => {
    window.addEventListener("keydown", handleUserKeyPress);
    window.addEventListener("keyup", handleUserKeyRelease);
  });

  const [keyPressed, setKeyPressed] = useState<"" | "z" | "q" | "s" | "d">("");

  return (
    <Grid container spacing={0}>
      <Grid item xs={4}>
        <Box display="flex" justifyContent="center" alignItems="center"></Box>
      </Grid>
      <Grid item xs={4}>
        <Box display="flex" justifyContent="center" alignItems="center">
          <Button variant="contained" color={keyPressed === "z" ? "primary" : "inherit"}>
            UP
          </Button>
        </Box>
      </Grid>
      <Grid item xs={4}>
        <Box display="flex" justifyContent="center" alignItems="center"></Box>
      </Grid>
      <Grid item xs={4}>
        <Box display="flex" justifyContent="center" alignItems="center">
          <Button variant="contained" color={keyPressed === "q" ? "primary" : "inherit"}>
            LEFT
          </Button>
        </Box>
      </Grid>
      <Grid item xs={4}>
        <Box display="flex" justifyContent="center" alignItems="center"></Box>
      </Grid>
      <Grid item xs={4}>
        <Box display="flex" justifyContent="center" alignItems="center">
          <Button variant="contained" color={keyPressed === "d" ? "primary" : "inherit"}>
            RIGHT
          </Button>
        </Box>
      </Grid>
      <Grid item xs={4}>
        <Box display="flex" justifyContent="center" alignItems="center"></Box>
      </Grid>
      <Grid item xs={4}>
        <Box display="flex" justifyContent="center" alignItems="center">
          <Button variant="contained" color={keyPressed === "s" ? "primary" : "inherit"}>
            BOTTOM
          </Button>
        </Box>
      </Grid>
      <Grid item xs={4}>
        <Box display="flex" justifyContent="center" alignItems="center"></Box>
      </Grid>
    </Grid>
  );
});

export default Controller;
