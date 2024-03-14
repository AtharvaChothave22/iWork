import { Box, Container, Grid, Typography } from "@mui/material";
import React from "react";

const SideBar = () => {
  return (
    <div style={{ maxWidth: "10%" }}>
      <Container component="main" maxWidth={false}>
        <Box>
          <Grid container spacing={5}>
            <Grid item xs={2} sm={1}>
              <Typography variant="p" align="center">
                Options
              </Typography>
            </Grid>

            <Grid item xs={2} sm={1}>
              SOSme
            </Grid>

            <Grid item xs={2} sm={1}>
              Some
            </Grid>
          </Grid>
        </Box>
      </Container>
    </div>
  );
};
export default SideBar;
