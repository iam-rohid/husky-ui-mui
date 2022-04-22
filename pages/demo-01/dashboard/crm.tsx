import { Box, Chip, Grid } from "@mui/material";
import { DashboardLayout } from "src/layouts/dashboard-layout";
import { CustomNextPage } from "src/types";
import faker from "@faker-js/faker";
import { GetStaticProps } from "next";
import StatCard from "src/components/stat-card";

type CRMProps = {
  salesToday: StatType;
  visitsToday: StatType;
  totalSales: StatType;
  totalEarnings: StatType;
};
const CRMPage: CustomNextPage<CRMProps> = ({
  salesToday,
  totalSales,
  totalEarnings,
  visitsToday,
}) => {
  return (
    <Box
      sx={{
        py: [4, 6],
      }}
    >
      <Grid container spacing={[4, 6]}>
        <Grid item xs={6} lg={3}>
          <StatCard
            title={salesToday.title}
            value={salesToday.value}
            percentage={salesToday.percentage}
            percentageText={salesToday.percentageText}
            ChipComponent={
              <Chip
                label="Today"
                variant="filled"
                size="small"
                color="primary"
              />
            }
          />
        </Grid>
        <Grid item xs={6} lg={3}>
          <StatCard
            title={visitsToday.title}
            value={visitsToday.value}
            percentage={visitsToday.percentage}
            percentageText={visitsToday.percentageText}
            ChipComponent={
              <Chip
                label="Today"
                color="primary"
                variant="filled"
                size="small"
              />
            }
          />
        </Grid>
        <Grid item xs={6} lg={3}>
          <StatCard
            title={totalSales.title}
            value={totalSales.value}
            percentage={totalSales.percentage}
            percentageText={totalSales.percentageText}
          />
        </Grid>
        <Grid item xs={6} lg={3}>
          <StatCard
            title={totalEarnings.title}
            value={totalEarnings.value}
            percentage={totalEarnings.percentage}
            percentageText={totalEarnings.percentageText}
            ChipComponent={
              <Chip
                label="Annual"
                color="secondary"
                variant="filled"
                size="small"
              />
            }
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default CRMPage;

CRMPage.getLayout = (page) => (
  <DashboardLayout title="CRM" pageId="crm">
    {page}
  </DashboardLayout>
);

type StatType = {
  title: string;
  value: string;
  percentage: number;
  percentageText: string;
};

export const getStaticProps: GetStaticProps<CRMProps> = async () => {
  const salesToday: StatType = {
    title: "Sales Today",
    value: faker.finance.amount(0, 100, 2, "$"),
    percentage: faker.random.number({ min: -50, max: 50 }),
    percentageText: "Since last month",
  };

  const visitsToday: StatType = {
    title: "Visits Today",
    value: faker.random.number({ min: 1000, max: 5000 }).toLocaleString(),
    percentage: faker.random.number({ min: -50, max: 50 }),
    percentageText: "Since last month",
  };

  const totalSales: StatType = {
    title: "Total Sales",
    value: faker.random.number({ min: 1000, max: 5000 }).toLocaleString(),
    percentage: faker.random.number({ min: -50, max: 50 }),
    percentageText: "Since last month",
  };

  const totalEarnings: StatType = {
    title: "Total Earnings",
    value: faker.finance.amount(0, 100, 2, "$"),
    percentage: faker.random.number({ min: -50, max: 50 }),
    percentageText: "Since last month",
  };

  return {
    props: {
      salesToday,
      visitsToday,
      totalSales,
      totalEarnings,
    },
  };
};
