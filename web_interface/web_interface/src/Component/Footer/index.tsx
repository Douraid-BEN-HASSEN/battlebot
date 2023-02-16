import { Toolbar, Grid, AppBar, Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { CUSTOM_STYLE } from "../../Constantes/Style";
import { DEFAULT_INFOS_REQUEST } from "../../Constantes/Values";

interface footerProps {
  handleTest: () => void;
}

const Footer: React.FC<footerProps> = React.memo(({  handleTest }) => {

  return (
    <Box sx={{ flewGrow: 1 }} style={{ position: "fixed", left: "0", bottom: "0", width: "100%" }}>
      <AppBar
        position="sticky"
        style={{
          backgroundColor: CUSTOM_STYLE.backgroundColor,
          borderTop: CUSTOM_STYLE.borderWidth + " solid " + CUSTOM_STYLE.borderColor,
          padding: "10px",
        }}
      >
        <Toolbar>
          <Grid container spacing={1} justifyContent="center">
            <Grid item xs={6} style={{ fontWeight: "bold" }}>
              <Box display="flex" justifyContent="center" alignItems="center">
                <TextField
                  value={DEFAULT_INFOS_REQUEST.address}
                  disabled={true}
                  style={{ width: "100%", backgroundColor: CUSTOM_STYLE.backgroundColorButton }}
                  label="Adresse IP"
                />
              </Box>
            </Grid>
            <Grid item xs={3} style={{ fontWeight: "bold" }}>
              <Box display="flex" justifyContent="center" alignItems="center">
                <TextField
                  value={DEFAULT_INFOS_REQUEST.port}
                  disabled={true}
                  style={{ width: "100%", backgroundColor: CUSTOM_STYLE.backgroundColorButton }}
                  label="Port"
                  type={"number"}
                />
              </Box>
            </Grid>
            <Grid item xs={3} style={{ fontWeight: "bold" }}>
              <Grid item xs={12} style={{ fontWeight: "bold", marginTop: "5px" }}>
                <Box display="flex" justifyContent="center" alignItems="center">
                  <Button
                    onClick={handleTest}
                    color="inherit"
                    variant="contained"
                    style={{
                      width: "95%",
                      color: CUSTOM_STYLE.fontColor,
                      fontWeight: "bold",
                      backgroundColor: CUSTOM_STYLE.backgroundColorButton,
                    }}
                  >
                    Tester
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  );
});

export default Footer;