import { Box, Grid, Paper } from "@mui/material";
import { DashboardLayout } from "../src/layouts/dashboard-layout";
import { CustomNextPage } from "../src/types";

const Home: CustomNextPage = () => {
  return (
    <Box
      sx={{
        py: [4, 6],
      }}
    >
      <Grid container spacing={[4, 6]}>
        <Grid item xs={6} lg={3}>
          <Paper
            sx={{
              height: "160px",
            }}
          ></Paper>
        </Grid>
        <Grid item xs={6} lg={3}>
          <Paper
            sx={{
              height: "160px",
            }}
          ></Paper>
        </Grid>
        <Grid item xs={6} lg={3}>
          <Paper
            sx={{
              height: "160px",
            }}
          ></Paper>
        </Grid>
        <Grid item xs={6} lg={3}>
          <Paper
            sx={{
              height: "160px",
            }}
          ></Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;

Home.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
