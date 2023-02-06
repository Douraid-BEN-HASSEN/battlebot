import React from "react";
import Controller from "../Controller";
import Header from "../Header";
import { Grid } from "@mui/material";
import Footer from "../Footer";

interface mainComponentProps {}

const MainComponent: React.FC<mainComponentProps> = React.memo(({}) => {
  return (
    <>
      <Header />

      <Grid container spacing={1} style={{ width: "95%", marginLeft: "2.5px" }}>
        <Grid item xs={6}></Grid>
        <Grid item xs={6}>
          <Controller />
        </Grid>
      </Grid>

      <Footer />
    </>
  );
});

export default MainComponent;
