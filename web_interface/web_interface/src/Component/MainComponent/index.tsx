import React, { useState } from "react";
import Controller from "../Controller";
import Header from "../Header";
import { Grid } from "@mui/material";
import Footer from "../Footer";
import Historique from "../Historique";
import { goBack, goFront, turnLeft, turnRight, stopp } from "../../Functions/Request";
import { TYPE_STYLE, TYPE_INFOS_REQUEST } from "../../Constantes/Types";
import { KEY_TO_ACTION } from "../../Constantes/Values";
import { DEFAULT_INFOS_REQUEST } from "../../Constantes/Values";

interface mainComponentProps {}

const customStyle = {
  backgroundColor: "lightblue",
  borderColor: "#3f51b5",
  borderWidth: "2px",
  borderRadius: "4px",
  fontColor: "black",
} as TYPE_STYLE;

const MainComponent: React.FC<mainComponentProps> = React.memo(({}) => {
  const [datasHistory, setDatasHistory] = useState<Array<string>>([]);

  const [isChange, setIsChange] = useState<boolean>(false);

  const [infosRequest, setInfosRequest] = useState<TYPE_INFOS_REQUEST>(DEFAULT_INFOS_REQUEST);

  const updateHistory = (action: "add" | "clear", value: string) => {
    if (action === "clear") {
      setDatasHistory([]);
      setIsChange(true);
    } else if (action === "add") {
      if (value !== "r") {
        let tmp = datasHistory;
        if (tmp.length === 0 || (tmp.length > 0 && tmp.at(-1) !== KEY_TO_ACTION[value])) {
          if (value === "z") goFront(infosRequest.address, infosRequest.port, "/test");
          else if (value === "q") turnLeft(infosRequest.address, infosRequest.port, "/test");
          else if (value === "r") turnRight(infosRequest.address, infosRequest.port, "/test");
          else if (value === "s") goBack(infosRequest.address, infosRequest.port, "/test");
          else if (value === "a") stopp(infosRequest.address, infosRequest.port, "/test");

          tmp.push(KEY_TO_ACTION[value]);
          setDatasHistory(tmp);
          setIsChange(true);
        }
      }
    }
  };

  const handleChangeInfosRequest = (values: TYPE_INFOS_REQUEST) => {
    setInfosRequest(values);
  };

  const handleTest = () => {
    console.log("handle test ");
    let tmp = datasHistory;
    tmp.push("Test lancé sur " + infosRequest.address + ":" + infosRequest.port);
    setDatasHistory(tmp);
    setIsChange(true);
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
      <Footer
        handleTest={handleTest}
        values={infosRequest}
        handleChange={handleChangeInfosRequest}
        style={customStyle}
      />
    </>
  );
});

export default MainComponent;
