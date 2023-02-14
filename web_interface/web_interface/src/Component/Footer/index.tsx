import { Toolbar, Grid, AppBar, Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { CUSTOM_STYLE } from "../../Constantes/Style";
import { TYPE_STYLE, TYPE_INFOS_REQUEST } from "../../Constantes/Types";

interface footerProps {
  handleChange: (values: TYPE_INFOS_REQUEST) => void;
  values: TYPE_INFOS_REQUEST;
  handleTest: () => void;
}

const Footer: React.FC<footerProps> = React.memo(({ handleChange,  values, handleTest }) => {
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [addresse, setAddresse] = useState<string>(values.address);
  const [port, setPort] = useState<number>(values.port);

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
                  value={addresse}
                  disabled={!isUpdate}
                  style={{ width: "100%", backgroundColor: CUSTOM_STYLE.backgroundColorButton }}
                  label="Adresse IP"
                  onChange={(event: any) => {
                    setAddresse(event.target.value);
                  }}
                />
              </Box>
            </Grid>
            <Grid item xs={3} style={{ fontWeight: "bold" }}>
              <Box display="flex" justifyContent="center" alignItems="center">
                <TextField
                  value={port}
                  disabled={!isUpdate}
                  style={{ width: "100%", backgroundColor: CUSTOM_STYLE.backgroundColorButton }}
                  label="Port"
                  type={"number"}
                  onChange={(event: any) => {
                    setPort(event.target.value);
                  }}
                />
              </Box>
            </Grid>
            <Grid item xs={3} style={{ fontWeight: "bold" }}>
              <Grid item xs={12} style={{ fontWeight: "bold" }}>
                <Box display="flex" justifyContent="center" alignItems="center">
                  <Button
                    color="inherit"
                    variant="contained"
                    style={{
                      width: "95%",
                      color: CUSTOM_STYLE.fontColor,
                      fontWeight: "bold",
                      backgroundColor: CUSTOM_STYLE.backgroundColorButton,
                    }}
                    onClick={() => {
                      if (isUpdate === true) {
                        setIsUpdate(false);
                        handleChange({
                          address: addresse,
                          port: port,
                        });
                      } else setIsUpdate(true);
                    }}
                  >
                    {isUpdate ? "Confirmer" : "Modifier"}
                  </Button>
                </Box>
              </Grid>
              <Grid item xs={12} style={{ fontWeight: "bold", marginTop: "5px" }}>
                <Box display="flex" justifyContent="center" alignItems="center">
                  <Button
                    disabled={isUpdate}
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
