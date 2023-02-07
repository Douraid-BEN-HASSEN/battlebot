import { Grid, Box, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Circle } from "@mui/icons-material";
import ArrowCircleDownOutlinedIcon from "@mui/icons-material/ArrowCircleDownOutlined";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import ArrowCircleUpOutlinedIcon from "@mui/icons-material/ArrowCircleUpOutlined";

interface controllerProps {
  handleAddHistory: (action: "add" | "clear", value: string) => void;
}

declare global {
  interface WindowEventMap {
    keydown: React.KeyboardEvent<HTMLInputElement>;
    keyup: React.KeyboardEvent<HTMLInputElement>;
  }
}

const Controller: React.FC<controllerProps> = React.memo(({ handleAddHistory }) => {
  const handleUserKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const { key } = event;
    if (key === "z" || key === "q" || key === "s" || key === "d" || key === "o" || key === "p") {
      setKeyPressed(key);
      handleAddHistory("add", key);
    } else if (key === "r") {
      if (isInversion) setIsInversion(false);
      else setIsInversion(true);
    }
  };

  const handleUserKeyRelease = (event: React.KeyboardEvent<HTMLInputElement>) => {
    setKeyPressed("");
  };

  useEffect(() => {
    window.addEventListener("keydown", handleUserKeyPress);
    window.addEventListener("keyup", handleUserKeyRelease);
  });

  const [isInversion, setIsInversion] = useState<boolean>(false);

  const [keyPressed, setKeyPressed] = useState<"" | "z" | "q" | "s" | "d" | "o" | "p">("");

  return (
    <Grid
      container
      spacing={0}
      style={{
        border: "2px solid #3f51b5",
        borderRadius: "4px",
        padding: "20px",
        backgroundColor: "lightblue",
      }}
    >
      <Grid item xs={12}></Grid>
      <Grid item xs={4}>
        <Box display="flex" justifyContent="center" alignItems="center"></Box>
      </Grid>
      <Grid item xs={4}>
        <Box display="flex" justifyContent="center" alignItems="center">
          <Button
            sx={{ borderRadius: 28 }}
            variant="contained"
            color={keyPressed === "z" ? "primary" : "inherit"}
          >
            <ArrowCircleUpOutlinedIcon />
          </Button>
        </Box>
      </Grid>
      <Grid item xs={4}>
        <Box display="flex" justifyContent="center" alignItems="center"></Box>
      </Grid>
      <Grid item xs={4}>
        <Box display="flex" justifyContent="center" alignItems="center">
          <Button
            sx={{ borderRadius: 28 }}
            variant="contained"
            color={keyPressed === "q" ? "primary" : "inherit"}
          >
            <ArrowCircleLeftOutlinedIcon />
          </Button>
        </Box>
      </Grid>
      <Grid item xs={4}>
        <Box display="flex" justifyContent="center" alignItems="center"></Box>
      </Grid>
      <Grid item xs={4}>
        <Box display="flex" justifyContent="center" alignItems="center">
          <Button
            sx={{ borderRadius: 28 }}
            variant="contained"
            color={keyPressed === "d" ? "primary" : "inherit"}
          >
            <ArrowCircleRightOutlinedIcon />
          </Button>
        </Box>
      </Grid>
      <Grid item xs={4}>
        <Box display="flex" justifyContent="center" alignItems="center"></Box>
      </Grid>
      <Grid item xs={4}>
        <Box display="flex" justifyContent="center" alignItems="center">
          <Button
            sx={{ borderRadius: 28 }}
            variant="contained"
            color={keyPressed === "s" ? "primary" : "inherit"}
          >
            <ArrowCircleDownOutlinedIcon />
          </Button>
        </Box>
      </Grid>
      <Grid item xs={4}>
        <Box display="flex" justifyContent="center" alignItems="center"></Box>
      </Grid>
      <Grid item xs={4} style={{ marginTop: "50px" }}>
        <Box display="flex" justifyContent="center" alignItems="center">
          <Button
            sx={{ borderRadius: 28 }}
            variant="contained"
            color={keyPressed === "o" ? "primary" : "inherit"}
          >
            <Circle />
          </Button>
        </Box>
      </Grid>
      <Grid item xs={4} style={{ marginTop: "50px" }}>
        <Box display="flex" justifyContent="center" alignItems="center">
          <Button
            sx={{ borderRadius: 28, fontWeight: "bold" }}
            variant="contained"
            color={isInversion ? "primary" : "inherit"}
          >
            INVERSION
          </Button>
        </Box>
      </Grid>
      <Grid item xs={4} style={{ marginTop: "50px" }}>
        <Box display="flex" justifyContent="center" alignItems="center">
          <Button
            sx={{ borderRadius: 28 }}
            variant="contained"
            color={keyPressed === "p" ? "primary" : "inherit"}
          >
            <Circle />
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
});

export default Controller;
