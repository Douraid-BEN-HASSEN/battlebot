import React, { useMemo, useState } from "react";
import Controller from "../Controller";
import Header from "../Header";
import { Grid } from "@mui/material";
import Footer from "../Footer";
import Historique from "../Historique";
import { goBack, goFront, turnLeft, turnRight, stopp } from "../../Functions/Request";
import { TYPE_STYLE, TYPE_INFOS_REQUEST } from "../../Constantes/Types";
import { KEY_TO_ACTION } from "../../Constantes/Values";
import { DEFAULT_INFOS_REQUEST } from "../../Constantes/Values";
import CurrentAction from "../CurrentAction";
import SwitchMode from "../SwitchMode";

interface mainComponentProps {}

const customStyle = {
  backgroundColor: "lightblue",
  borderColor: "#3f51b5",
  borderWidth: "4px",
  borderRadius: "4px",
  fontColor: "black",
  mainBackgroundColor: "lightgray",
  borderWidthButton: "2px",
  borderColorButton: "#3f51b5",
} as TYPE_STYLE;

const MainComponent: React.FC<mainComponentProps> = React.memo(({}) => {
  const [datasHistory, setDatasHistory] = useState<Array<string>>([]);
  const [showHelp, setShowHelp] = useState<boolean>(false);
  const [isChange, setIsChange] = useState<boolean>(false);
  const [infosRequest, setInfosRequest] = useState<TYPE_INFOS_REQUEST>(DEFAULT_INFOS_REQUEST);
  const [lastAction, setLastAction] = useState<string>("");
  const [mode, setMode] = useState<"basique" | "avance">("avance");

  const updateHistory = (action: "add" | "clear", value: string) => {
    if (action === "clear") {
      setDatasHistory([]);
      setLastAction("");
      setIsChange(true);
    } else if (action === "add") {
      if (value !== "r") {
        let tmp = datasHistory;
        if (tmp.length === 0 || (tmp.length > 0 && tmp.at(-1) !== KEY_TO_ACTION[value])) {
          console.log("infosRequest : ", infosRequest);
          if (value === "z") goFront(infosRequest.address, infosRequest.port, "/test");
          else if (value === "q") turnLeft(infosRequest.address, infosRequest.port, "/test");
          else if (value === "d") turnRight(infosRequest.address, infosRequest.port, "/test");
          else if (value === "s") goBack(infosRequest.address, infosRequest.port, "/test");
          else if (value === "a") stopp(infosRequest.address, infosRequest.port, "/test");
          tmp.push(KEY_TO_ACTION[value]);
          setLastAction(KEY_TO_ACTION[value].split(":")[1]);
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
    let tmp = datasHistory;
    tmp.push("Test lancé sur " + infosRequest.address + ":" + infosRequest.port);
    setDatasHistory(tmp);
    setIsChange(true);
  };

  const renderHistorique = useMemo(() => {
    return (
      <Grid item xs={6}>
        <Grid item xs={12}>
          <SwitchMode 
          handleChangeMode={(mode : 'avance'|'basique') =>  {
            setMode(mode)
          }}  
          style={customStyle} />
        </Grid>
        <Grid item xs={12}>
          <Historique
            style={customStyle}
            datasHistory={datasHistory}
            handleClearHistory={updateHistory}
            hasChange={isChange}
            handleChangeBoolean={() => setIsChange(false)}
          />
        </Grid>
      </Grid>
    );
  }, [datasHistory, isChange]);

  const renderController = useMemo(() => {
    return (
      <Grid item xs={6}>
        <Grid item xs={12}>
          <Controller
            handleClickShowHelp={() => {
              if (showHelp) setShowHelp(false);
              else setShowHelp(true);
            }}
            handleAddHistory={updateHistory}
            style={customStyle}
          />
        </Grid>
        <Grid item xs={12}>
          <CurrentAction style={customStyle} action={lastAction} />
        </Grid>
      </Grid>
    );
  }, [showHelp, lastAction]);

  const renderFooter = useMemo(() => {
    return (
      <Footer
        handleTest={handleTest}
        values={infosRequest}
        handleChange={handleChangeInfosRequest}
        style={customStyle}
      />
    );
  }, [infosRequest]);

  const renderHeader = useMemo(() => {
    return <Header style={customStyle} showHelp={showHelp} />;
  }, [showHelp]);

  return (
    <div
      style={{
        height: "100%",
        position: "absolute",
        left: "0px",
        width: "100%",
        overflow: "hidden",
        backgroundColor: customStyle.mainBackgroundColor,
      }}
    >
      {mode}
      {renderHeader}
      <Grid container spacing={1} style={{ width: "95%", marginLeft: "2.5px" }}>
        {renderHistorique}
        {renderController}
      </Grid>
      {renderFooter}
    </div>
  );
});

export default MainComponent;
