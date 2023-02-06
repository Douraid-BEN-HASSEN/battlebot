import { Toolbar, Grid, AppBar, Button, Stack, TextField } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";

interface footerProrps {}

const Footer: React.FC<footerProrps> = React.memo(({}) => {
  const [addresse, setAddresse] = useState<string>("");
  const [port, setPort] = useState<number>();

  return (
    <Box sx={{ flewGrow: 1 }} style={{ position: "fixed", left: "0", bottom: "0", width: "100%" }}>
      <AppBar
        position="sticky"
        style={{ backgroundColor: "lightblue", borderTop: "3px solid #3f51b5" , padding:'10px'}}
      >
        <Toolbar>
          <Grid container spacing={1} justifyContent="center">
            <Grid item xs={6} style={{ fontWeight: "bold" }}>
              <Box display="flex" justifyContent="center" alignItems="center">
                <TextField
                  style={{ width: "100%" }}
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
                  style={{ width: "100%"  }}
                  label="Port"
                  type={"number"}
                  onChange={(event: any) => {
                    setAddresse(event.target.value);
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
                    style={{ width: "95%", color: "black", fontWeight: "bold" }}
                  >
                    Modifier
                  </Button>
                </Box>
              </Grid>
              <Grid item xs={12} style={{ fontWeight: "bold" , marginTop:'5px'}}>
                <Box display="flex" justifyContent="center" alignItems="center">
                  <Button
                    color="inherit"
                    variant="contained"
                    style={{ width: "95%", color: "black", fontWeight: "bold" }}
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
