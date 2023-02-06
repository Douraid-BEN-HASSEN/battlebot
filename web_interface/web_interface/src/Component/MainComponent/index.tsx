import React, { useState } from "react";
import Controller from "../Controller";
import Header from "../Header";
import { Grid } from "@mui/material";
import Footer from "../Footer";
import Historique from "../Historique";

interface mainComponentProps {}

const keyToAction = {
  z: "Ordre : Avance",
  q: "Ordre : Tourne à gauche",
  s: "Ordre : Recule ",
  d: "Ordre : Tourne à droite",
  o: "Ordre : Action 1",
  p: "Ordre : Action 2",
} as any;

const MainComponent: React.FC<mainComponentProps> = React.memo(({}) => {
  const [datasHistory, setDatasHistory] = useState<Array<string>>([]);

  const onClearHistory = () => {
    setDatasHistory([]);
  };

  const handleAddHistory = (value: string) => {
    console.log("value : ", value);
    let tmp = datasHistory as any;
    tmp.push(keyToAction[value]);
    setDatasHistory(tmp)
  };

  return (
    <>
      <Header />
      <Grid container spacing={1} style={{ width: "95%", marginLeft: "2.5px" }}>
        <Grid item xs={6}>
          <Historique datasHistory={datasHistory} handleClearHistory={onClearHistory} />
        </Grid>
        <Grid item xs={6}>
          <Controller handleAddHistory={handleAddHistory} />
        </Grid>
      </Grid>

      <Footer />
    </>
  );
});

export default MainComponent;
