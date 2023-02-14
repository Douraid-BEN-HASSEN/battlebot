import React, { useState } from "react";
import { CUSTOM_STYLE } from "../../Constantes/Style";
import Header from "../Header";
import ArrowCircleDownOutlinedIcon from "@mui/icons-material/ArrowCircleDownOutlined";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import ArrowCircleUpOutlinedIcon from "@mui/icons-material/ArrowCircleUpOutlined";
import { Grid, Box, Button } from "@mui/material";
import {
  goBack,
  goFront,
  turnLeft,
  turnRight,
  stopp,
  upShovel,
  downShovel,
} from "../../Functions/Request";
import { DEFAULT_INFOS_REQUEST } from "../../Constantes/Values";

interface mainComponentMobileProps {}

const MainComponentMobile: React.FC<mainComponentMobileProps> = React.memo(({}) => {
  const [keyPressed, setKeyPressed] = useState<"" | "z" | "q" | "s" | "d" | "o" | "p" | "a">("");
  const [isInversion, setIsInversion] = useState<boolean>(false);

  const handleChangeInversion = () => {
    console.log("handle change inversion ")
    if (isInversion) setIsInversion(false);
    else setIsInversion(true);
  };

  const onClickButton = (value: "z" | "q" | "s" | "d" | "o" | "p" | "a") => {
    console.log("on click button")
    setKeyPressed(value);
    sendRequest(value);
  };

  const sendRequest = (value: "z" | "q" | "s" | "d" | "o" | "p" | "a") => {
    console.log("send request")
    if (value === "z") goFront(DEFAULT_INFOS_REQUEST.address, DEFAULT_INFOS_REQUEST.port, "/test");
    else if (value === "s")
      goBack(DEFAULT_INFOS_REQUEST.address, DEFAULT_INFOS_REQUEST.port, "/test");
    else if (value === "a")
      stopp(DEFAULT_INFOS_REQUEST.address, DEFAULT_INFOS_REQUEST.port, "/test");
    else if (value === "o")
      downShovel(DEFAULT_INFOS_REQUEST.address, DEFAULT_INFOS_REQUEST.port, "/test");
    else if (value === "p")
      upShovel(DEFAULT_INFOS_REQUEST.address, DEFAULT_INFOS_REQUEST.port, "/test");
    else if (value === "q")
      turnLeft(DEFAULT_INFOS_REQUEST.address, DEFAULT_INFOS_REQUEST.port, "/test", isInversion);
    else if (value === "d")
      turnRight(DEFAULT_INFOS_REQUEST.address, DEFAULT_INFOS_REQUEST.port, "/test", isInversion);
  };

  return (
    <div
      style={{
        height: "100%",
        position: "absolute",
        left: "0px",
        width: "100%",
        overflow: "hidden",
        backgroundColor: CUSTOM_STYLE.mainBackgroundColor,
      }}
    >
      {String(isInversion)}
      <Header
        style={CUSTOM_STYLE}
        showHelp={false}
        infosRequest={{ address: "", port: 0 }}
        lastAction={""}
        mode={"avance"}
      />
      <Grid
        container
        spacing={0}
        style={{
          border: CUSTOM_STYLE.borderWidth + " solid " + CUSTOM_STYLE.borderColor,
          borderRadius: CUSTOM_STYLE.borderRadius,
          padding: "20px",
          width: "98%",
          borderLeft: "1%",
          backgroundColor: CUSTOM_STYLE.backgroundColor,
        }}
      >
        <Grid item xs={12}></Grid>

        <Grid item xs={4}>
          <Box display="flex" justifyContent="center" alignItems="center"></Box>
        </Grid>
        <Grid item xs={4}>
          <Box display="flex" justifyContent="center" alignItems="center">
            <Button
              onClick={() => onClickButton("z")}
              sx={{ borderRadius: 28, backgroundColor: CUSTOM_STYLE.backgroundColorButton }}
              variant="contained"
              style={{
                border: CUSTOM_STYLE.borderWidthButton + " solid " + CUSTOM_STYLE.borderColorButton,
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
              onClick={() => onClickButton("q")}
              style={{
                border: CUSTOM_STYLE.borderWidthButton + " solid " + CUSTOM_STYLE.borderColorButton,
                backgroundColor: CUSTOM_STYLE.backgroundColorButton,
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
              onClick={() => onClickButton("d")}
              style={{
                border: CUSTOM_STYLE.borderWidthButton + " solid " + CUSTOM_STYLE.borderColorButton,
                backgroundColor: CUSTOM_STYLE.backgroundColorButton,
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
              onClick={() => onClickButton("s")}
              style={{
                border: CUSTOM_STYLE.borderWidthButton + " solid " + CUSTOM_STYLE.borderColorButton,
                backgroundColor: CUSTOM_STYLE.backgroundColorButton,
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

        <Grid item xs={6} style={{ marginTop: "25px" }}>
          <Box display="flex" justifyContent="center" alignItems="center">
            <Button
              style={{
                border: CUSTOM_STYLE.borderWidthButton + " solid " + CUSTOM_STYLE.borderColorButton,
                backgroundColor: CUSTOM_STYLE.backgroundColorButton,
              }}
              sx={{ borderRadius: 28, fontWeight: "bold" }}
              variant="contained"
              color={isInversion ? "primary" : "inherit"}
              onClick={handleChangeInversion}
            >
              INVERSION
            </Button>
          </Box>
        </Grid>

        <Grid item xs={6} style={{ marginTop: "25px" }}>
          <Box display="flex" justifyContent={"center"} alignItems="center">
            <Button
              style={{
                border: CUSTOM_STYLE.borderWidthButton + " solid " + CUSTOM_STYLE.borderColorButton,
                backgroundColor: CUSTOM_STYLE.backgroundColorButton,
              }}
              sx={{ borderRadius: 28, fontWeight: "bold" }}
              variant="contained"
              onClick={() => onClickButton("a")}
              color={keyPressed === "a" ? "primary" : "inherit"}
            >
              ARRÊT
            </Button>
          </Box>
        </Grid>

        <Grid item xs={4} style={{ marginTop: "25px" }}>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            style={{ fontWeight: "bold", color: CUSTOM_STYLE.fontColor }}
          >
            PELLE :
          </Box>
        </Grid>
        <Grid item xs={4} style={{ marginTop: "25px" }}>
          <Box display="flex" justifyContent="center" alignItems="center">
            <Button
              sx={{ borderRadius: 28 }}
              variant="contained"
              style={{
                border: CUSTOM_STYLE.borderWidthButton + " solid " + CUSTOM_STYLE.borderColorButton,
                backgroundColor: CUSTOM_STYLE.backgroundColorButton,
              }}
              color={keyPressed === "o" ? "primary" : "inherit"}
              onClick={() => onClickButton("o")}
            >
              <ArrowCircleUpOutlinedIcon />
            </Button>
          </Box>
        </Grid>
        <Grid item xs={4} style={{ marginTop: "25px" }}>
          <Box display="flex" justifyContent="center" alignItems="center">
            <Button
              onClick={() => onClickButton("p")}
              sx={{ borderRadius: 28 }}
              variant="contained"
              style={{
                border: CUSTOM_STYLE.borderWidthButton + " solid " + CUSTOM_STYLE.borderColorButton,
                backgroundColor: CUSTOM_STYLE.backgroundColorButton,
              }}
              color={keyPressed === "p" ? "primary" : "inherit"}
            >
              <ArrowCircleDownOutlinedIcon />
            </Button>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
});

export default MainComponentMobile;
