import React from "react";
import { DashboardLayout } from "src/layouts/dashboard-layout";
import { CustomNextPage } from "src/types";

const AnalyticsPage: CustomNextPage = () => {
  return <div>AnalyticsPage</div>;
};

export default AnalyticsPage;

AnalyticsPage.getLayout = (page) => (
  <DashboardLayout title="Analytics" pageId="analytics">
    {page}
  </DashboardLayout>
);
