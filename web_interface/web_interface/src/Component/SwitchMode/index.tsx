import { Button, Grid } from "@mui/material";
import React, { useState } from "react";
import { TYPE_STYLE } from "../../Constantes/Types";

interface switchModeProps {
  style: TYPE_STYLE;
  handleChangeMode: (mode: "avance" | "basique") => void;
}

const SwitchMode: React.FC<switchModeProps> = React.memo(({ style, handleChangeMode }) => {
  const [mode, setMode] = useState<"basique" | "avance">("avance");
  return (
    <Grid
      container
      spacing={0}
      style={{
        border: style.borderWidth + " solid " + style.borderColor,
        borderRadius: style.borderRadius,
        padding: "20px",
        marginBottom: "30px",
        backgroundColor: style.backgroundColor,
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
            border: style.borderWidthButton + " solid " + style.borderColorButton,
          }}
        >
          Passe en mode {mode === "avance" ? "Basique" : "Avancé"}
        </Button>
      </Grid>
    </Grid>
  );
});

export default SwitchMode;
