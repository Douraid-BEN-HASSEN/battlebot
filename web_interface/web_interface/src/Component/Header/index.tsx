import { AppBar, Box, Grid, Toolbar } from "@mui/material";
import React from "react";
import { Stack } from "@mui/system";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import PetsIcon from "@mui/icons-material/Pets";
import { TYPE_INFOS_REQUEST, TYPE_STYLE } from "../../Constantes/Types";
import Logo from "../../Assets/Logo.png";
import useSound from "use-sound";
import song from "../../Assets/Song.mp3";
import { CUSTOM_STYLE } from "../../Constantes/Style";

interface headerProps {
  showHelp: boolean;
  infosRequest: TYPE_INFOS_REQUEST;
  lastAction: string;
  mode: "avance" | "basique";
}

const Header: React.FC<headerProps> = React.memo(
  ({  showHelp, infosRequest, lastAction, mode }) => {
    const [playSound] = useSound(song);

    const onClickLogo = () => {
      playSound();
      console.log("Félicitations, vous avez trouvé l'easter egg ;)");
    };

    return (
      <>
        <Box sx={{ flewGrow: 1 }}>
          <AppBar
            position="static"
            style={{
              height: "65px",
              backgroundColor: CUSTOM_STYLE.backgroundColor,
              borderBottom: CUSTOM_STYLE.borderWidth + " solid " + CUSTOM_STYLE.borderColor,
              marginBottom: mode === "avance" && showHelp === false ? "60px" : "0px",
            }}
          >
            <Toolbar>
              <Grid container spacing={0} justifyContent="center">
                <Box display="flex" justifyContent="start" alignItems="center">
                  <Grid
                    item
                    xs={12}
                    style={{
                      fontWeight: "bold",
                      color: CUSTOM_STYLE.fontColor,
                      fontSize: "30px",
                    }}
                  >
                    <Stack direction="row" alignItems={"center"} gap={1}>
                      <img
                        onClick={onClickLogo}
                        style={{ cursor: "pointer" }}
                        src={Logo}
                        srcSet={Logo}
                        alt={"Jaw Breaker"}
                        loading={"lazy"}
                      />

                      {/*
                      <LocalFireDepartmentIcon />
                      <PetsIcon /> Jaw Breaker <PetsIcon /> <LocalFireDepartmentIcon />
                  */}
                    </Stack>
                  </Grid>
                </Box>
              </Grid>
            </Toolbar>
          </AppBar>
        </Box>
        {(showHelp || mode === "basique") && (
          <Grid
            container
            spacing={0}
            justifyContent="center"
            style={{
              width: "100%",
              backgroundColor: CUSTOM_STYLE.backgroundColor,
              borderBottom: CUSTOM_STYLE.borderWidth + " solid " + CUSTOM_STYLE.borderColor,
              padding: "5px 0 5px 0",
              marginBottom: mode === "avance" && showHelp === true ? "60px" : "0px",
              fontWeight: "bold",
              color: CUSTOM_STYLE.fontColor,
            }}
          >
            <Grid item xs={3}>
              <Box display="flex" justifyContent="center" alignItems="center">
                Contrôles : ZQSD
              </Box>
            </Grid>
            <Grid item xs={3}>
              <Box display="flex" justifyContent="center" alignItems="center">
                Arrêt : A
              </Box>
            </Grid>
            <Grid item xs={3}>
              <Box display="flex" justifyContent="center" alignItems="center">
                Reversion : R
              </Box>
            </Grid>
            <Grid item xs={3}>
              <Box display="flex" justifyContent="center" alignItems="center">
                Lever/Baisser la pelle : P O
              </Box>
            </Grid>
          </Grid>
        )}
        {mode === "basique" && (
          <>
            <Grid
              container
              spacing={0}
              justifyContent="center"
              style={{
                width: "100%",
                backgroundColor: CUSTOM_STYLE.backgroundColor,
                borderBottom: CUSTOM_STYLE.borderWidth + " solid " + CUSTOM_STYLE.borderColor,
                padding: "5px 0 5px 0",
                fontWeight: "bold",
                color: CUSTOM_STYLE.fontColor,
              }}
            >
              <Grid item xs={6}>
                <Box display="flex" justifyContent="center" alignItems="center">
                  Adresse : {infosRequest.address}
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box display="flex" justifyContent="center" alignItems="center">
                  Port : {infosRequest.port}
                </Box>
              </Grid>
            </Grid>
            <Grid
              container
              spacing={0}
              justifyContent="center"
              style={{
                width: "100%",
                backgroundColor: CUSTOM_STYLE.backgroundColor,
                borderBottom: CUSTOM_STYLE.borderWidth + " solid " + CUSTOM_STYLE.borderColor,
                padding: "5px 0 5px 0",
                fontWeight: "bold",
                marginBottom: mode === "basique" ? "60px" : "0px",
                color: CUSTOM_STYLE.fontColor,
              }}
            >
              <Grid item xs={12}>
                <Box display="flex" justifyContent="center" alignItems="center">
                  Dernière action : {lastAction}
                </Box>
              </Grid>
            </Grid>
          </>
        )}
      </>
    );
  }
);

export default Header;
