import React from "react";
import { Link } from "react-router-dom";
import { NavbarStyle } from "../style/NavbarStyle";

export const Navbar = () => {
  return (
    <NavbarStyle>
      <Link to={"/"}>infinight scroll</Link>
      <Link to={"/pagination"}>pagination</Link>
      <Link to={"/antPagination"}>Ant pagination</Link>
    </NavbarStyle>
  );
};
