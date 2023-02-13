import React, { useEffect } from "react";
import { Button, Grid, List, ListItem, ListItemText } from "@mui/material";
import { TYPE_STYLE } from "../../Constantes/Types";
interface historiqueProps {
  datasHistory: Array<string>;
  handleClearHistory: (action: "add" | "clear", value: string, isInversed : boolean ) => void;
  hasChange: boolean;
  handleChangeBoolean: () => void;
  style: TYPE_STYLE;
}

const Historique: React.FC<historiqueProps> = React.memo(
  ({ datasHistory, handleClearHistory, hasChange, handleChangeBoolean, style  }) => {
    
    useEffect(() => {
      handleChangeBoolean();
    }, [datasHistory, hasChange]);

    return (
      <Grid
        container
        spacing={0}
        style={{
          border: style.borderWidth + " solid " + style.borderColor,
          borderRadius: style.borderRadius,
          padding: "5px",
          backgroundColor: style.backgroundColor,
        }}
      >
        <List
          sx={{
            width: "100%",
            bgcolor: style.backgroundColor,
            position: "relative",
            marginTop: "20px",
            overflow: "auto",
            maxHeight: "420px" ,
            "& ul": { padding: 0 },
          }}
        >
          {datasHistory.map((v: string, index: number) => {
            return (
              <ListItem
                style={{
                  border: "1px solid " + style.borderColor,
                  height: "50px",
                  textAlign: "center",
                  backgroundColor: index % 2 === 0 ? style.primaryBackgroundColorList : style.secondaryBackgroundColorList,
                  width: "100%",
                  fontSize: "20px",
                  fontWeight: "bold",
                }}
              >
                <ListItemText primary={v} />
              </ListItem>
            );
          })}
        </List>
        <Grid
          item
          xs={12}
          style={{
            borderTop: style.borderWidth + " solid " + style.borderColor,
            marginTop: "15px",
            paddingTop: "15px",
          }}
        >
          <Button
            onClick={() => {
              handleClearHistory("clear", "" , false);
            }}
            variant="contained"
            color="inherit"
            style={{
              width: "100%",
              border: style.borderWidthButton + " solid " + style.borderColorButton,
              backgroundColor:style.backgroundColorButton
            }}
          >
            Effacer
          </Button>
        </Grid>
      </Grid>
    );
  }
);

export default Historique;
