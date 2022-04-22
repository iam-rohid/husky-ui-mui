import { GetStaticProps } from "next";
import Link from "next/link";
import React from "react";

const HomePage = () => {
  return (
    <div>
      <Link href={`/demo-01`}>
        <a>Demo 01</a>
      </Link>
    </div>
  );
};

export default HomePage;

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  };
};
