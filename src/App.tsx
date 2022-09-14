import React from "react";
import { Routes, Route } from "react-router-dom";

import "./App.scss";
import Game from "./pages/Game/Game";
import Login from "./pages/Login/Login";
import Main from "./pages/Main/Main";
import Menu from "./pages/Menu/Menu";
import User from "./pages/User/User";
import Error from "./pages/Error/Error";
import About from "./pages/About/About";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main></Main>}>
        <Route path="/" element={<About></About>}></Route>
        <Route path="menu" element={<Menu></Menu>}></Route>
        <Route path="game" element={<Game></Game>}></Route>
      </Route>
      <Route path="user" element={<User></User>}></Route>
      <Route path="login" element={<Login></Login>}></Route>
      <Route path="*" element={<Error></Error>}></Route>
    </Routes>
  );
}

export default App;
