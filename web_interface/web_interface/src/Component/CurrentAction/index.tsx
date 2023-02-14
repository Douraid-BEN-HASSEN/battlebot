import React from "react";
import { TYPE_STYLE } from "../../Constantes/Types";
import { Grid } from "@mui/material";
import { CUSTOM_STYLE } from "../../Constantes/Style";

interface currentActionProps {
  action: string;
}

const CurrentAction: React.FC<currentActionProps> = React.memo(({ action }) => {
  return (
    <Grid
      container
      spacing={0}
      style={{
        marginTop: "30px",
        border: CUSTOM_STYLE.borderWidth + " solid " + CUSTOM_STYLE.borderColor,
        borderRadius: CUSTOM_STYLE.borderRadius,
        padding: "20px",
        backgroundColor: CUSTOM_STYLE.backgroundColor,
        color: CUSTOM_STYLE.fontColor , 
        fontWeight:'bold'
      }}
    >
      <Grid item xs={12} style={{ fontWeight: "bold", fontSize: "20px" }}>
        Ordre actuel :
      </Grid>
      <Grid item xs={12} style={{ marginTop: "30px", fontWeight: "bold", fontSize: "20px" }}>
        {action}
      </Grid>
    </Grid>
  );
});

export default CurrentAction;