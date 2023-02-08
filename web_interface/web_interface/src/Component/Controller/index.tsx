import { Grid, Box, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Circle } from "@mui/icons-material";
import ArrowCircleDownOutlinedIcon from "@mui/icons-material/ArrowCircleDownOutlined";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import ArrowCircleUpOutlinedIcon from "@mui/icons-material/ArrowCircleUpOutlined";
import { TYPE_STYLE } from "../../Constantes/Types";
import HelpIcon from "@mui/icons-material/Help";

interface controllerProps {
  handleAddHistory: (action: "add" | "clear", value: string) => void;
  handleClickShowHelp: () => void;
  style: TYPE_STYLE;
}

declare global {
  interface WindowEventMap {
    keydown: React.KeyboardEvent<HTMLInputElement>;
    keyup: React.KeyboardEvent<HTMLInputElement>;
  }
}

const Controller: React.FC<controllerProps> = React.memo(
  ({ handleAddHistory, style, handleClickShowHelp }) => {
    const handleUserKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
      const { key } = event;
      if (
        key === "z" ||
        key === "q" ||
        key === "s" ||
        key === "d" ||
        key === "o" ||
        key === "p" ||
        key === "a"
      ) {
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

    const [keyPressed, setKeyPressed] = useState<"" | "z" | "q" | "s" | "d" | "o" | "p" | "a">("");

    return (
      <Grid
        container
        spacing={0}
        style={{
          border: style.borderWidth + " solid " + style.borderColor,
          borderRadius: style.borderRadius,
          padding: "20px",
          backgroundColor: style.backgroundColor,
        }}
      >
        <Grid item xs={10}></Grid>
        <Grid item xs={2}>
          <HelpIcon onClick={handleClickShowHelp} style={{ cursor: "pointer" }} />{" "}
        </Grid>
        <Grid item xs={4}>
          <Box display="flex" justifyContent="center" alignItems="center"></Box>
        </Grid>
        <Grid item xs={4}>
          <Box display="flex" justifyContent="center" alignItems="center">
            <Button
              sx={{ borderRadius: 28 }}
              variant="contained"
              style={{
                border: style.borderWidthButton + " solid " + style.borderColorButton,
              }}
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
              style={{
                border: style.borderWidthButton + " solid " + style.borderColorButton,
              }}
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
              style={{
                border: style.borderWidthButton + " solid " + style.borderColorButton,
              }}
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
              style={{
                border: style.borderWidthButton + " solid " + style.borderColorButton,
              }}
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
              style={{
                border: style.borderWidthButton + " solid " + style.borderColorButton,
              }}
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
              style={{
                border: style.borderWidthButton + " solid " + style.borderColorButton,
              }}
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
              style={{
                border: style.borderWidthButton + " solid " + style.borderColorButton,
              }}
              sx={{ borderRadius: 28 }}
              variant="contained"
              color={keyPressed === "p" ? "primary" : "inherit"}
            >
              <Circle />
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12} style={{ marginTop: "25px" }}>
          <Box display="flex" justifyContent={"center"} alignItems="center">
            <Button
              style={{
                border: style.borderWidthButton + " solid " + style.borderColorButton,
              }}
              sx={{ borderRadius: 28, fontWeight: "bold" }}
              variant="contained"
              color={keyPressed === "a" ? "primary" : "inherit"}
            >
              ARRÊT
            </Button>
          </Box>
        </Grid>
      </Grid>
    );
  }
);

export default Controller;
