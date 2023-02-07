import React, { useState } from "react";
import Controller from "../Controller";
import Header from "../Header";
import { Button, Grid } from "@mui/material";
import Footer from "../Footer";
import Historique from "../Historique";
import { goBack, goFront, sendRequest, turnLeft, turnRight , stopp} from "./functions";

interface mainComponentProps {}

const customStyle = {
  backgroundColor : 'lightblue' ,
  borderColor : '#3f51b5' ,
  borderWidth: '2px' ,
  borderRadius : '4px' , 
  fontColor :'black' ,
  
}
const keyToAction = {
  z: "Ordre : Avance",
  q: "Ordre : Tourne à gauche",
  s: "Ordre : Recule ",
  d: "Ordre : Tourne à droite",
  o: "Ordre : Action 1",
  p: "Ordre : Action 2",
  a: "Ordre : S'arrêter",
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
    if (action === "clear") {
      setDatasHistory([]);
      setIsChange(true);
    } else if (action === "add") {
      if (value !== "r") {
        let tmp = datasHistory;
        if (tmp.length === 0 || (tmp.length > 0 && tmp.at(-1) !== keyToAction[value])) {
          if (value === "z") goFront(infosRequest.adresse, infosRequest.port, "/test");
          else if (value === "q") turnLeft(infosRequest.adresse, infosRequest.port, "/test");
          else if (value === "r") turnRight(infosRequest.adresse, infosRequest.port, "/test");
          else if (value === "s") goBack(infosRequest.adresse, infosRequest.port, "/test");
          else if (value === "a") stopp(infosRequest.adresse, infosRequest.port, "/test");

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
      <Header style={customStyle} />
      <Grid container spacing={1} style={{ width: "95%", marginLeft: "2.5px" }}>
        <Grid item xs={6}>
          <Historique
            style={customStyle}
            datasHistory={datasHistory}
            handleClearHistory={updateHistory}
            hasChange={isChange}
            handleChangeBoolean={() => setIsChange(false)}
          />
        </Grid>
        <Grid item xs={6}>
          <Controller handleAddHistory={updateHistory} style={customStyle} />
        </Grid>
      </Grid>
      <Footer handleChange={handleChangeInfosRequest}  style={customStyle} />
    </>
  );
});

export default MainComponent;
