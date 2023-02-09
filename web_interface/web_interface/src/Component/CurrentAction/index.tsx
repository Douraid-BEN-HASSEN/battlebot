import React from "react";
import { TYPE_STYLE } from "../../Constantes/Types";
import { Grid } from "@mui/material";

interface currentActionProps {
  action: string;
  style: TYPE_STYLE;
}

const CurrentAction: React.FC<currentActionProps> = React.memo(({ action, style }) => {
  console.log("re render current action")
  return (
    <Grid
      container
      spacing={0}
      style={{
        marginTop: "30px",
        border: style.borderWidth + " solid " + style.borderColor,
        borderRadius: style.borderRadius,
        padding: "20px",
        backgroundColor: style.backgroundColor,
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