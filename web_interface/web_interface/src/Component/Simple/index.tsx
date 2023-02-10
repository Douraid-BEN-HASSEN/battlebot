import { Grid, Box, Button, Slider } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Circle } from "@mui/icons-material";
import ArrowCircleDownOutlinedIcon from "@mui/icons-material/ArrowCircleDownOutlined";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import ArrowCircleUpOutlinedIcon from "@mui/icons-material/ArrowCircleUpOutlined";
import { TYPE_STYLE } from "../../Constantes/Types";
import HelpIcon from "@mui/icons-material/Help";
import { DEFAULT_INFOS_REQUEST } from "../../Constantes/Values";
import { KEY_TO_ACTION } from "../../Constantes/Values";
import { goBack, goFront, turnLeft, turnRight, stopp } from "../../Functions/Request";

interface simpleProps {}

declare global {
  interface WindowEventMap {
    keydown: React.KeyboardEvent<HTMLInputElement>;
    keyup: React.KeyboardEvent<HTMLInputElement>;
  }
}

const style = {
  backgroundColor: "lightblue",
  borderColor: "#3f51b5",
  borderWidth: "4px",
  borderRadius: "4px",
  fontColor: "black",
  mainBackgroundColor: "lightgray",
  borderWidthButton: "2px",
  borderColorButton: "#3f51b5",
} as TYPE_STYLE;

const Simple: React.FC<simpleProps> = React.memo(({}) => {
  const [isPushed, setIsPushed] = useState<boolean>(false);
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
      updateHistory("add", key);
      setIsPushed(true);
    } else if (key === "r") {
      if (isInversion) setIsInversion(false);
      else setIsInversion(true);
    }
  };

  const handleReleaseButton = (key: string) => {
    if (key === "z" || key === "q" || key === "s" || key === "d")
      stopp(DEFAULT_INFOS_REQUEST.address, DEFAULT_INFOS_REQUEST.port, "/test");
  };

  const handleUserKeyRelease = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const { key } = event;
    if (
      isPushed === true &&
      (key === "z" ||
        key === "q" ||
        key === "s" ||
        key === "d" ||
        key === "o" ||
        key === "p" ||
        key === "a")
    ) {

      handleReleaseButton(key);
      setKeyPressed("");
      setIsPushed(false);
    }
  };

  const [lastAction, setLastAction] = useState<string>("");

  const [isInversion, setIsInversion] = useState<boolean>(false);

  const [keyPressed, setKeyPressed] = useState<"" | "z" | "q" | "s" | "d" | "o" | "p" | "a">("");

  const [powerValue, setPowerValue] = useState<number>(50);

  useEffect(() => {
    window.addEventListener("keydown", handleUserKeyPress, true);
  }, []);

  useEffect(() => {
    window.addEventListener("keyup", handleUserKeyRelease);
    return () => window.removeEventListener("keyup", handleUserKeyRelease);
  });

  const [datasHistory, setDatasHistory] = useState<Array<string>>([]);

  const updateHistory = (action: "add" | "clear", value: string) => {
    if (action === "clear") {
      setLastAction("");
      setDatasHistory([]);
      //setIsChange(true);
    } else if (action === "add") {
      if (value !== "r") {
        let tmp = datasHistory;
        if (tmp.length === 0 || (tmp.length > 0 && tmp.at(-1) !== KEY_TO_ACTION[value])) {
          if (value === "z")
            goFront(DEFAULT_INFOS_REQUEST.address, DEFAULT_INFOS_REQUEST.port, "/test");
          else if (value === "q")
            turnLeft(DEFAULT_INFOS_REQUEST.address, DEFAULT_INFOS_REQUEST.port, "/test");
          else if (value === "d")
            turnRight(DEFAULT_INFOS_REQUEST.address, DEFAULT_INFOS_REQUEST.port, "/test");
          else if (value === "s")
            goBack(DEFAULT_INFOS_REQUEST.address, DEFAULT_INFOS_REQUEST.port, "/test");
          else if (value === "a")
            stopp(DEFAULT_INFOS_REQUEST.address, DEFAULT_INFOS_REQUEST.port, "/test");
          tmp.push(KEY_TO_ACTION[value]);
          setLastAction(KEY_TO_ACTION[value].split(":")[1]);
          setDatasHistory(tmp);
          //setIsChange(true);
        }
      }
    }
  };

  return (
    <>
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
        <Grid item xs={12}></Grid>
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
              }}
            />
          </Box>
        </Grid>
      </Grid>
    </>
  );
});

export default Simple;
