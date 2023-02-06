import React from "react";
import { Grid, List, ListItem, ListItemText } from "@mui/material";

interface historiqueProps {}

const Historique: React.FC<historiqueProps> = React.memo(({}) => {
  return (
    <Grid
      container
      spacing={0}
      style={{
        border: "2px solid #3f51b5",
        borderRadius: "4px",
        padding: "5px",
      }}
    >
      <List
        sx={{
          width: "100%",
          bgcolor: "background.paper",
          position: "relative",
          marginTop: "20px",
          overflow: "auto",
          maxHeight: '600px',
          "& ul": { padding: 0 },
        }}
      >
        {[
          "bonjour",
          "je",
          "m'appelle",
          "douraid",
          "bonjour",
          "je",
          "m'appelle",
          "douraid",
          "bonjour",
          "je",
          "m'appelle",
          "douraid",
          "bonjour",
          "je",
          "m'appelle",
          "douraid",
          "bonjour",
          "je",
          "m'appelle",
          "douraid",
          "bonjour",
          "je",
          "m'appelle",
          "douraid",
          "bonjour",
          "je",
          "m'appelle",
          "douraid",
    ].map((v: string, index: number) => {
          return (
            <ListItem
              style={{
                border: "1px solid black",
                height: "50px",
                textAlign: "center",
                backgroundColor: index % 2 === 0 ? "white" : "whitesmoke",
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
    </Grid>
  );
});

export default Historique;
