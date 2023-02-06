import React from "react";
import Controller from "../Controller";

interface mainComponentProps {}

const MainComponent: React.FC<mainComponentProps> = React.memo(({}) => {
  return <>
    <Controller/>
  </>
});

export default MainComponent;
