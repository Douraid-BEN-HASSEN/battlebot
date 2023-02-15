import React, { useMemo, useState } from "react";
import Controller from "../Controller";
import Header from "../Header";
import { Grid } from "@mui/material";
import Footer from "../Footer";
import Historique from "../Historique";
import {
  goBack,
  goFront,
  turnLeft,
  turnRight,
  stopp,
  upShovel,
  downShovel,
} from "../../Functions/Request";
import { TYPE_STYLE, TYPE_INFOS_REQUEST } from "../../Constantes/Types";
import { KEY_TO_ACTION } from "../../Constantes/Values";
import { DEFAULT_INFOS_REQUEST } from "../../Constantes/Values";
import CurrentAction from "../CurrentAction";
import SwitchMode from "../SwitchMode";
import { CUSTOM_STYLE } from "../../Constantes/Style";

interface mainComponentProps {}

const MainComponent: React.FC<mainComponentProps> = React.memo(({}) => {
  const [datasHistory, setDatasHistory] = useState<Array<string>>([]);
  const [showHelp, setShowHelp] = useState<boolean>(false);
  const [isChange, setIsChange] = useState<boolean>(false);
  const [infosRequest, setInfosRequest] = useState<TYPE_INFOS_REQUEST>(DEFAULT_INFOS_REQUEST);
  const [lastAction, setLastAction] = useState<string>("");
  const [mode, setMode] = useState<"basique" | "avance">("avance");
  const [powerValue, setPowerValue] = useState<number>(50);

  const updateHistory = (action: "add" | "clear", value: string, isInversed: boolean) => {
    console.log("main compoennt => updateHistory");
    if (action === "clear") {
      setDatasHistory([]);
      setLastAction("");
      setIsChange(true);
    } else if (action === "add") {
      if (value !== "r") {
        let tmp = datasHistory;
        if (tmp.length === 0 || (tmp.length > 0 && tmp.at(-1) !== KEY_TO_ACTION[value])) {
          if (value === "z") goFront();
          else if (value === "q") turnLeft(isInversed);
          else if (value === "d") turnRight(isInversed);
          else if (value === "s") goBack();
          else if (value === "a") stopp();
          else if (value === "o") downShovel();
          else if (value === "p") upShovel();
          tmp.push(KEY_TO_ACTION[value]);
          setDatasHistory(tmp);
          setLastAction(KEY_TO_ACTION[value].split(":")[1]);
        } else {
        }
      }
    }
  };

  const handleReleaseButton = (key: string) => {
    console.log("main component => handleReleaseButton : ", key);
    if (key === "z" || key === "q" || key === "s" || key === "d" || key === "o" || key === "p") {
      stopp();
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

  return (
    <div
      style={{
        height: "100%",
        position: "absolute",
        left: "0px",
        width: "100%",
        overflow: "hidden",
        backgroundColor: CUSTOM_STYLE.mainBackgroundColor,
      }}
    >
      <Header showHelp={showHelp} infosRequest={infosRequest} lastAction={lastAction} mode={mode} />
      <Grid container spacing={2} style={{ width: "98%", marginLeft: "1%" }}>
        <Grid item xs={mode === "basique" ? 12 : 6}>
          <Grid item xs={12}>
            <SwitchMode
              handleChangeMode={(mode: "avance" | "basique") => {
                setMode(mode);
              }}
            />
          </Grid>
          {mode === "avance" && (
            <Grid item xs={12}>
              <Historique
                datasHistory={datasHistory}
                handleClearHistory={updateHistory}
                hasChange={isChange}
                handleChangeBoolean={() => setIsChange(false)}
              />
            </Grid>
          )}
        </Grid>
        <Grid item xs={mode === "avance" ? 6 : 12}>
          <Grid item xs={12}>
            <Controller
              handleReleaseButton={(key: string) => {
                handleReleaseButton(key);
              }}
              handleChangePower={(value: number) => {
                setPowerValue(value);
              }}
              mode={mode}
              handleClickShowHelp={() => {
                if (showHelp) setShowHelp(false);
                else setShowHelp(true);
              }}
              handleAddHistory={updateHistory}
            />
          </Grid>
          {mode === "avance" && (
            <Grid item xs={12}>
              <CurrentAction action={lastAction} />
            </Grid>
          )}
        </Grid>
      </Grid>
      {mode === "avance" && (
        <Footer
          handleTest={handleTest}
          values={infosRequest}
          handleChange={handleChangeInfosRequest}
        />
      )}
    </div>
  );
});

export default MainComponent;
