import React from "react";
import { Outlet } from "react-router-dom";
import { Links } from "../../constants/constants";
import Navigation from "../../components/Navigation/Navigation";
import Sidebar from "../../components/Sidebar/Sidebar";
import Footer from "../../components/Footer/Footer";

import "./Main.scss";
export default function Main() {
  return (
    <div className="Main">
      <Navigation links={Links}></Navigation>
      <Sidebar></Sidebar>
      <Outlet></Outlet>
      <div></div>
      <Footer></Footer>
    </div>
  );
}
