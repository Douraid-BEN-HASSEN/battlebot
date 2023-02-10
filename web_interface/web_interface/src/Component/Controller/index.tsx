import { Grid, Box, Button, Slider } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Circle } from "@mui/icons-material";
import ArrowCircleDownOutlinedIcon from "@mui/icons-material/ArrowCircleDownOutlined";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import ArrowCircleUpOutlinedIcon from "@mui/icons-material/ArrowCircleUpOutlined";
import { TYPE_STYLE } from "../../Constantes/Types";
import HelpIcon from "@mui/icons-material/Help";
import { useMemoizedFn } from "ahooks";

interface controllerProps {
  style: TYPE_STYLE;
  mode: "basique" | "avance";
  handleChangePower: (value: number) => void;
  handleReleaseButton: (key: string) => void;
  handleAddHistory: (action: "add" | "clear", value: string) => void;
  handleClickShowHelp: () => void;
}

declare global {
  interface WindowEventMap {
    keydown: React.KeyboardEvent<HTMLInputElement>;
    keyup: React.KeyboardEvent<HTMLInputElement>;
  }
}

const Controller: React.FC<controllerProps> = React.memo(
  ({
    handleAddHistory,
    style,
    handleClickShowHelp,
    mode,
    handleChangePower,
    handleReleaseButton,
  }) => {
    const handleUserKeyPress = useMemoizedFn((event: React.KeyboardEvent<HTMLInputElement>) => {
      const { key } = event;
      console.log("handle on press ", key);
      if (
        key === "z" ||
        key === "q" ||
        key === "s" ||
        key === "d" ||
        key === "o" ||
        key === "p" ||
        key === "a"
      ) {
        console.log("set key pressed : ", key);
        setKeyPressed(key);
        handleAddHistory("add", key);
      } else if (key === "r") {
        if (isInversion) setIsInversion(false);
        else setIsInversion(true);
      }
    });

    const handleUserKeyRelease = (event: React.KeyboardEvent<HTMLInputElement>) => {
      handleReleaseButton(event.key);
    };

    useEffect(() => {
      window.addEventListener("keydown", handleUserKeyPress);
      return () => window.removeEventListener("keydown", handleUserKeyPress);
    }, []);

    useEffect(() => {
      window.addEventListener("keyup", handleUserKeyRelease);
      return () => window.removeEventListener("keyup", handleUserKeyRelease);
    }, []);

    const [isInversion, setIsInversion] = useState<boolean>(false);
    const [keyPressed, setKeyPressed] = useState<"" | "z" | "q" | "s" | "d" | "o" | "p" | "a">("");
    const [powerValue, setPowerValue] = useState<number>(50);
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
          {mode === "avance" && (
            <HelpIcon onClick={handleClickShowHelp} style={{ cursor: "pointer" }} />
          )}
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
        <Grid item xs={12} style={{ marginTop: "25px" }}>
          <Box display="flex" justifyContent={"center"} alignItems="center">
            PUISSANCE : {powerValue}
          </Box>
        </Grid>
        <Grid item xs={12} style={{ marginTop: "25px" }}>
          <Box display="flex" justifyContent={"center"} alignItems="center">
            <Slider
              min={0}
              max={100}
              step={1}
              defaultValue={powerValue}
              valueLabelDisplay="auto"
              //value={powerValue}
              onChange={(value: any) => {
                setPowerValue(value.target.value);
                handleChangePower(value.target.value);
              }}
            />
          </Box>
        </Grid>
      </Grid>
    );
  }
);

export default Controller;
