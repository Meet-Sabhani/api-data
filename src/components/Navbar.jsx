import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <div>
      <Link to={"/"}>infinight scroll</Link>
      <Link to={"/pagination"}>pagination</Link>
    </div>
  );
};
