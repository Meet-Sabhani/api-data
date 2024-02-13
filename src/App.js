import React from "react";
import { GlobalStyle } from "./style/GobalStyle";
import { Data } from "./components/Data";
import { Pagination } from "./components/Pagination";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import AntPagination from "./components/AntPagination";

export const App = () => {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Data />} />
          <Route path="/pagination" element={<Pagination />} />
          <Route path="/pagination/:pageNumber" element={<Pagination />} />
          {/* <Route path="/antPagination" element={<AntPagination />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
};
