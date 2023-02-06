import React, { useState } from "react";
import Controller from "../Controller";
import Header from "../Header";
import { Grid } from "@mui/material";
import Footer from "../Footer";
import Historique from "../Historique";

interface mainComponentProps {}

const MainComponent: React.FC<mainComponentProps> = React.memo(({}) => {
  const [datasHistory, setDatasHistory] = useState<Array<string>>([
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
  ]);

  const onClearHistory = () => {
    setDatasHistory([]);
  };

  return (
    <>
      <Header />

      <Grid container spacing={1} style={{ width: "95%", marginLeft: "2.5px" }}>
        <Grid item xs={6}>
          <Historique datasHistory={datasHistory} handleClearHistory={onClearHistory} />
        </Grid>
        <Grid item xs={6}>
          <Controller />
        </Grid>
      </Grid>

      <Footer />
    </>
  );
});

export default MainComponent;
