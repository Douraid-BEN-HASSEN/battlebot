import React from "react";
import { Button, Grid, List, ListItem, ListItemText } from "@mui/material";

interface historiqueProps {
  datasHistory: Array<string>;
  handleClearHistory: () => void;
}

const Historique: React.FC<historiqueProps> = React.memo(({ datasHistory, handleClearHistory }) => {
  return (
    <Grid
      container
      spacing={0}
      style={{
        border: "2px solid #3f51b5",
        borderRadius: "4px",
        padding: "5px", 
        backgroundColor:'lightblue'
      }}
    >
      <List
        sx={{
          width: "100%",
          bgcolor: "background.paper",
          position: "relative",
          marginTop: "20px",
          overflow: "auto",
          maxHeight: "600px",
          "& ul": { padding: 0 },
        }}
      >
        {datasHistory.map((v: string, index: number) => {
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
      <Grid
        item
        xs={12}
        style={{ borderTop: "2px solid #3f51b5", marginTop: "15px", paddingTop: "15px" }}
      >
        <Button onClick={handleClearHistory} variant="contained" color="inherit" style={{ width: "100%" }}>
          Effacer
        </Button>
      </Grid>
    </Grid>
  );
});

export default Historique;
