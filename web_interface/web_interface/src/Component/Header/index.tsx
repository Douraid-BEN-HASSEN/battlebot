import { AppBar, Box, Grid, Toolbar } from "@mui/material";
import React from "react";
import { Stack } from "@mui/system";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import PetsIcon from "@mui/icons-material/Pets";
import { TYPE_STYLE } from "../../Constantes/Types";
interface headerProps {
  style: TYPE_STYLE;
  showHelp: boolean;
}

const Header: React.FC<headerProps> = React.memo(({ style, showHelp }) => {
  return (
    <>
      <Box sx={{ flewGrow: 1 }}>
        <AppBar
          position="static"
          style={{
            height: "60px",
            marginBottom: showHelp ? "0px" : "60px",
            backgroundColor: style.backgroundColor,
            borderBottom: style.borderWidth + " solid " + style.borderColor,
          }}
        >
          <Toolbar>
            <Grid container spacing={0} justifyContent="center">
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
      <Box sx={{}}>
        {showHelp && (
          <Grid
            container
            spacing={0}
            justifyContent="center"
            style={{
              width: "100%",
              marginBottom: "60px",
              backgroundColor: style.backgroundColor,
              borderBottom: style.borderWidth + " solid " + style.borderColor,
              padding: "5px 0 5px 0",
              fontWeight:'bold'
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
      </Box>
    </>
  );
});

export default Header;
