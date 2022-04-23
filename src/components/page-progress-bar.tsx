import { LinearProgress } from "@mui/material";
import Router from "next/router";
import React, { useState } from "react";

const PageProgressBar = () => {
  const [isLoading, setIsLoading] = useState(false);
  Router.events.on("routeChangeStart", () => setIsLoading(true));
  Router.events.on("routeChangeComplete", () => setIsLoading(false));
  Router.events.on("routeChangeError", () => setIsLoading(false));
  return isLoading ? (
    <LinearProgress
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 99999,
      }}
    />
  ) : null;
};

export default PageProgressBar;
