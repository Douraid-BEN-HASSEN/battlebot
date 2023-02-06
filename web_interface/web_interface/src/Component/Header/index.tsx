import { AppBar, Box, Grid, Toolbar } from "@mui/material";
import React from "react";
import { Stack } from "@mui/system";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";

interface headerProps {}

const Header: React.FC<headerProps> = React.memo(({}) => {
  return (
    <Box sx={{ flewGrow: 1 }}>
      <AppBar
        position="static"
        style={{ height: "60px", marginBottom: "60px", backgroundColor: "lightblue" , borderBottom:'3px solid #3f51b5' }}
      >
        <Toolbar>
          <Grid container spacing={0} justifyContent="center">
            <Box display="flex" justifyContent="center" alignItems="center">
              <Grid
                item
                xs={12}
                style={{
                  fontWeight: "bold",
                }}
              >
                <Stack direction="row" alignItems={"center"} gap={1}>
                  <LocalFireDepartmentIcon /> Big Boi <LocalFireDepartmentIcon />
                </Stack>
              </Grid>
            </Box>
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  );
});

export default Header;
