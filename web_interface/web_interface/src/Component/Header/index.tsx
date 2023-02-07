import { AppBar, Box, Grid, Toolbar } from "@mui/material";
import React from "react";
import { Stack } from "@mui/system";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import PetsIcon from '@mui/icons-material/Pets';
import { TYPE_STYLE } from "../../Constantes/Types";
interface headerProps {
  style : TYPE_STYLE 
}

const Header: React.FC<headerProps> = React.memo(({
  style
}) => {
  return (
    <Box sx={{ flewGrow: 1 }}>
      <AppBar
        position="static"
        style={{ height: "60px", marginBottom: "60px", backgroundColor: style.backgroundColor , borderBottom:style.borderWidth + ' solid ' + style.borderColor }}
      >
        <Toolbar>
          <Grid container spacing={0} justifyContent="center">
            <Box display="flex" justifyContent="center" alignItems="center">
              <Grid
                item
                xs={12}
                style={{
                  fontWeight: "bold",
                  color: style.fontColor , 
                  fontSize:'30px'
                }}
              >
                <Stack direction="row" alignItems={"center"} gap={1}>
                  <LocalFireDepartmentIcon/><PetsIcon /> Jaw Breaker <PetsIcon /> <LocalFireDepartmentIcon/>
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
