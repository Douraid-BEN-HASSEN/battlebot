import { Button, Grid } from "@mui/material";
import React, { useState } from "react";
import { CUSTOM_STYLE } from "../../Constantes/Style";
import { TYPE_STYLE } from "../../Constantes/Types";

interface switchModeProps {
  handleChangeMode: (mode: "avance" | "basique") => void;
}

const SwitchMode: React.FC<switchModeProps> = React.memo(({ handleChangeMode }) => {
  const [mode, setMode] = useState<"basique" | "avance">("avance");
  return (
    <Grid
      container
      spacing={0}
      style={{
        border: CUSTOM_STYLE.borderWidth + " solid " + CUSTOM_STYLE.borderColor,
        borderRadius: CUSTOM_STYLE.borderRadius,
        padding: "20px",
        marginBottom: "30px",
        backgroundColor: CUSTOM_STYLE.backgroundColor,
      }}
    >
      <Grid item xs={12}>
        <Button
          onClick={() => {
            if (mode === "avance") {
              setMode("basique");
              handleChangeMode("basique");
            } else {
              setMode("avance");
              handleChangeMode("avance");
            }
          }}
          variant="contained"
          color="inherit"
          style={{
            width: "100%",
            border: CUSTOM_STYLE.borderWidthButton + " solid " + CUSTOM_STYLE.borderColorButton,
            backgroundColor:CUSTOM_STYLE.backgroundColorButton
          }}
        >
          Passe en mode {mode === "avance" ? "Basique" : "Avancé"}
        </Button>
      </Grid>
    </Grid>
  );
});

export default SwitchMode;
