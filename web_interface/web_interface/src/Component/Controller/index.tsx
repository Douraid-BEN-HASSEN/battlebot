import { Grid, Box, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import CircleIcon from "@mui/icons-material/Circle";
import { Circle } from "@mui/icons-material";

interface controllerProps {
  handleAddHistory : (value:string) => void 
}

declare global {
  interface WindowEventMap {
    keydown: React.KeyboardEvent<HTMLInputElement>;
    keyup: React.KeyboardEvent<HTMLInputElement>;
  }
}

const Controller: React.FC<controllerProps> = React.memo(({
  handleAddHistory
}) => {
  const handleUserKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const { key } = event;
    if (key === "z" || key === "q" || key === "s" || key === "d" || key === "o" || key === "p")
      setKeyPressed(key);
      handleAddHistory(key)
  };

  const handleUserKeyRelease = (event: React.KeyboardEvent<HTMLInputElement>) => {
    setKeyPressed("");
  };

  useEffect(() => {
    window.addEventListener("keydown", handleUserKeyPress);
    window.addEventListener("keyup", handleUserKeyRelease);
  });

  const [keyPressed, setKeyPressed] = useState<"" | "z" | "q" | "s" | "d" | "o" | "p">("");

  return (
    <Grid
      container
      spacing={0}
      style={{
        border: "2px solid #3f51b5",
        borderRadius:"4px" , 
        padding:'20px'
      }}
    >
      <Grid item xs={4}>
        <Box display="flex" justifyContent="center" alignItems="center"></Box>
      </Grid>
      <Grid item xs={4}>
        <Box display="flex" justifyContent="center" alignItems="center">
          <Button variant="contained" color={keyPressed === "z" ? "primary" : "inherit"}>
            <ArrowCircleUpIcon />
          </Button>
        </Box>
      </Grid>
      <Grid item xs={4}>
        <Box display="flex" justifyContent="center" alignItems="center"></Box>
      </Grid>
      <Grid item xs={4}>
        <Box display="flex" justifyContent="center" alignItems="center">
          <Button variant="contained" color={keyPressed === "q" ? "primary" : "inherit"}>
            <ArrowCircleLeftIcon />
          </Button>
        </Box>
      </Grid>
      <Grid item xs={4}>
        <Box display="flex" justifyContent="center" alignItems="center"></Box>
      </Grid>
      <Grid item xs={4}>
        <Box display="flex" justifyContent="center" alignItems="center">
          <Button variant="contained" color={keyPressed === "d" ? "primary" : "inherit"}>
            <ArrowCircleRightIcon />
          </Button>
        </Box>
      </Grid>
      <Grid item xs={4}>
        <Box display="flex" justifyContent="center" alignItems="center"></Box>
      </Grid>
      <Grid item xs={4}>
        <Box display="flex" justifyContent="center" alignItems="center">
          <Button variant="contained" color={keyPressed === "s" ? "primary" : "inherit"}>
            <ArrowCircleDownIcon />
          </Button>
        </Box>
      </Grid>
      <Grid item xs={4}>
        <Box display="flex" justifyContent="center" alignItems="center"></Box>
      </Grid>
      <Grid item xs={6} style={{ marginTop: "50px" }}>
        <Box display="flex" justifyContent="center" alignItems="center">
          <Button variant="contained" color={keyPressed === "o" ? "primary" : "inherit"}>
            <Circle />
          </Button>
        </Box>
      </Grid>
      <Grid item xs={6} style={{ marginTop: "50px" }}>
        <Box display="flex" justifyContent="center" alignItems="center">
          <Button variant="contained" color={keyPressed === "p" ? "primary" : "inherit"}>
            <Circle />
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
});

export default Controller;
