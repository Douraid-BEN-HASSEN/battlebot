import { AppBar, Box, Grid, Toolbar } from "@mui/material";
import React from "react";
import { Stack } from "@mui/system";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import PetsIcon from "@mui/icons-material/Pets";
import { TYPE_INFOS_REQUEST, TYPE_STYLE } from "../../Constantes/Types";
interface headerProps {
  style: TYPE_STYLE;
  showHelp: boolean;
  infosRequest: TYPE_INFOS_REQUEST;
  lastAction: string;
  mode: "avance" | "basique";
}

const Header: React.FC<headerProps> = React.memo(
  ({ style, showHelp, infosRequest, lastAction, mode }) => {
    
    return (
      <>
        <Box sx={{ flewGrow: 1 }}>
          <AppBar
            position="static"
            style={{
              height: "60px",
              backgroundColor: style.backgroundColor,
              borderBottom: style.borderWidth + " solid " + style.borderColor,
              marginBottom: mode === "avance" && showHelp === false ? "60px" : "0px"
            }}
          >
            <Toolbar
            >
              <Grid container spacing={0} justifyContent="center" >
                <Box display="flex" justifyContent="center" alignItems="center">
                  <Grid
                    item
                    xs={12}
                    style={{
                      fontWeight: "bold",
                      color: style.fontColor,
                      fontSize: "30px",
                    }}
                  >
                    <Stack direction="row" alignItems={"center"} gap={1}>
                      <LocalFireDepartmentIcon />
                      <PetsIcon /> Jaw Breaker <PetsIcon /> <LocalFireDepartmentIcon />
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
              backgroundColor: style.backgroundColor,
              borderBottom: style.borderWidth + " solid " + style.borderColor,
              padding: "5px 0 5px 0",
              fontWeight: "bold",
              marginBottom: mode === "avance" && showHelp === true ? "60px" : "0px",
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
                Actions : OP
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
                backgroundColor: style.backgroundColor,
                borderBottom: style.borderWidth + " solid " + style.borderColor,
                padding: "5px 0 5px 0",
                fontWeight: "bold",
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
                backgroundColor: style.backgroundColor,
                borderBottom: style.borderWidth + " solid " + style.borderColor,
                padding: "5px 0 5px 0",
                fontWeight: "bold",
                marginBottom: mode === "basique" ? "60px" : "0px"
              }}
            >
              <Grid item xs={12}   >
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
