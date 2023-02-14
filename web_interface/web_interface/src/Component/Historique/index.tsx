import React, { useEffect } from "react";
import { Button, Grid, List, ListItem, ListItemText } from "@mui/material";
import { TYPE_STYLE } from "../../Constantes/Types";
import { CUSTOM_STYLE } from "../../Constantes/Style";
interface historiqueProps {
  datasHistory: Array<string>;
  handleClearHistory: (action: "add" | "clear", value: string, isInversed: boolean) => void;
  hasChange: boolean;
  handleChangeBoolean: () => void;
}

const Historique: React.FC<historiqueProps> = React.memo(
  ({ datasHistory, handleClearHistory, hasChange, handleChangeBoolean }) => {
    useEffect(() => {
      handleChangeBoolean();
    }, [datasHistory, hasChange]);

    return (
      <Grid
        container
        spacing={0}
        style={{
          border: CUSTOM_STYLE.borderWidth + " solid " + CUSTOM_STYLE.borderColor,
          borderRadius: CUSTOM_STYLE.borderRadius,
          padding: "5px",
          backgroundColor: CUSTOM_STYLE.backgroundColor,
        }}
      >
        <List
          sx={{
            width: "100%",
            bgcolor: CUSTOM_STYLE.backgroundColor,
            position: "relative",
            marginTop: "20px",
            overflow: "auto",
            maxHeight: "420px",
            "& ul": { padding: 0 },
          }}
        >
          {datasHistory.map((v: string, index: number) => {
            return (
              <ListItem
                key={index}
                style={{
                  border: "1px solid " + CUSTOM_STYLE.borderColor,
                  height: "50px",
                  textAlign: "center",
                  backgroundColor:
                    index % 2 === 0
                      ? CUSTOM_STYLE.primaryBackgroundColorList
                      : CUSTOM_STYLE.secondaryBackgroundColorList,
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
            borderTop: CUSTOM_STYLE.borderWidth + " solid " + CUSTOM_STYLE.borderColor,
            marginTop: "15px",
            paddingTop: "15px",
          }}
        >
          <Button
            onClick={() => {
              handleClearHistory("clear", "", false);
            }}
            variant="contained"
            color="inherit"
            style={{
              width: "100%",
              border: CUSTOM_STYLE.borderWidthButton + " solid " + CUSTOM_STYLE.borderColorButton,
              backgroundColor: CUSTOM_STYLE.backgroundColorButton,
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
