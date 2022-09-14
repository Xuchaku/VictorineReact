import React from "react";
import { Outlet } from "react-router-dom";
import "./Main.scss";
export default function Main() {
  return (
    <div className="Main">
      <div>Header</div>
      <div>Sidebar</div>
      <Outlet></Outlet>
      <div>Footer</div>
    </div>
  );
}
