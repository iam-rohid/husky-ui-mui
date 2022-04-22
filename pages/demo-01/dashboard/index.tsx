import { GetStaticProps } from "next";
import React from "react";

const HomePage = () => {
  return <div></div>;
};

export default HomePage;

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
    redirect: {
      destination: "/demo-01/dashboard/crm",
    },
  };
};
