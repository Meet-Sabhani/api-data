import React from "react";
import { GlobalStyle } from "./style/GobalStyle";
import { Data } from "./components/Data";
import { Pagination } from "./components/Pagination";

export const App = () => {
  return (
    <>
      <GlobalStyle />
      {/* <Data /> */}
      <Pagination />
    </>
  );
};
