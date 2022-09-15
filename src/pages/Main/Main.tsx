import React from "react";
import { Outlet } from "react-router-dom";
import { Links } from "../../constants/constants";
import Navigation from "../../components/Navigation/Navigation";
import "./Main.scss";
export default function Main() {
  return (
    <div className="Main">
      <div>
        <Navigation links={Links}></Navigation>
      </div>
      <div>Sidebar</div>
      <Outlet></Outlet>
      <div>Footer</div>
    </div>
  );
}
