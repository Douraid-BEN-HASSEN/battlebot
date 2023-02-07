import React, { useState } from "react";
import Controller from "../Controller";
import Header from "../Header";
import { Button, Grid } from "@mui/material";
import Footer from "../Footer";
import Historique from "../Historique";
import { sendRequest } from "./functions";

interface mainComponentProps {}

const keyToAction = {
  z: "Ordre : Avance",
  q: "Ordre : Tourne à gauche",
  s: "Ordre : Recule ",
  d: "Ordre : Tourne à droite",
  o: "Ordre : Action 1",
  p: "Ordre : Action 2",
} as any;

type infos = {
  adresse: string;
  port: number;
};

const MainComponent: React.FC<mainComponentProps> = React.memo(({}) => {
  const [datasHistory, setDatasHistory] = useState<Array<string>>([]);

  const [isChange, setIsChange] = useState<boolean>(false);

  const [infosRequest, setInfosRequest] = useState<infos>({
    adresse: "",
    port: 0,
  });

  const updateHistory = (action: "add" | "clear", value: string) => {
    let tmp = datasHistory;

    if (action === "clear") {
      setDatasHistory([]);
      setIsChange(true);
    } else if (action === "add") {
      if (value !== "r") {
        let tmp = datasHistory;

        if (tmp.length === 0 || (tmp.length > 0 && tmp.at(-1) !== keyToAction[value])) {
          tmp.push(keyToAction[value]);
          setDatasHistory(tmp);
          setIsChange(true);
        }
      }
    }
  };

  const handleChangeInfosRequest = (field: "adresse" | "port", value: number | string) => {
    let tmp = infosRequest as infos;
    if (field === "adresse") tmp.adresse = value as string;
    else tmp.port = value as number;
    setInfosRequest(tmp);
  };

  return (
    <>
      <Button
        variant="contained"
        onClick={() =>
          sendRequest(infosRequest.adresse, infosRequest.port, "test", {
            name: "douraid",
            size: "26",
          })
        }
      >
        test
      </Button>
      <Header />
      <Grid container spacing={1} style={{ width: "95%", marginLeft: "2.5px" }}>
        <Grid item xs={6}>
          <Historique
            datasHistory={datasHistory}
            handleClearHistory={updateHistory}
            hasChange={isChange}
            handleChangeBoolean={() => setIsChange(false)}
          />
        </Grid>
        <Grid item xs={6}>
          <Controller handleAddHistory={updateHistory} />
        </Grid>
      </Grid>
      <Footer handleChange={handleChangeInfosRequest} />
    </>
  );
});

export default MainComponent;
