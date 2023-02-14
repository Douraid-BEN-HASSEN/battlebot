import { Grid, Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { CUSTOM_STYLE } from "../../Constantes/Style";
import { Header } from "../";
interface acceuilProps {}

const Acceuil: React.FC<acceuilProps> = React.memo(({}) => {
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
      <Header
        style={CUSTOM_STYLE}
        showHelp={false}
        infosRequest={{ address: "", port: 0 }}
        lastAction={""}
        mode={"avance"}
      />
      <Grid container spacing={0} style={{ width: "95%", marginLeft: "2.5%" }}>
        <Grid item xs={12}>
          <Link to="/web">
            <Button
              style={{
                border: CUSTOM_STYLE.borderWidthButton + " solid " + CUSTOM_STYLE.borderColorButton,
                backgroundColor: CUSTOM_STYLE.backgroundColorButton,
                width: "100%",
                marginTop: "25px",
              }}
              sx={{ borderRadius: 28 }}
              variant="contained"
            >
              Web
            </Button>
          </Link>
        </Grid>
        <Grid item xs={12}>
          <Link to="/mobile">
            <Button
              style={{
                border: CUSTOM_STYLE.borderWidthButton + " solid " + CUSTOM_STYLE.borderColorButton,
                backgroundColor: CUSTOM_STYLE.backgroundColorButton,
                width: "100%",
                marginTop: "25px",
              }}
              sx={{ borderRadius: 28 }}
              variant="contained"
            >
              Mobile
            </Button>
          </Link>
        </Grid>
      </Grid>
    </div>
  );
});

export default Acceuil;
