import { AppBar, Box, Grid, Toolbar } from "@mui/material";
import React from "react";
import { Stack } from "@mui/system";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import PetsIcon from '@mui/icons-material/Pets';

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
                  color:'black' , 
                  fontSize:'30px'
                }}
              >
                <Stack direction="row" alignItems={"center"} gap={1}>
                  <LocalFireDepartmentIcon/><PetsIcon /> Pussy Slayer <PetsIcon /> <LocalFireDepartmentIcon/>
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
