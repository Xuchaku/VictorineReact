import React from "react";
import { NavLink } from "react-router-dom";
import "./EnterUser.scss";
const EnterUser = () => {
  return (
    <div className="EnterUser">
      <div>
        <NavLink to="/login">Вход</NavLink>
        <span>/</span>
        <NavLink to="/registration">Регистрация</NavLink>
      </div>
      <div className="User">
        <NavLink to="/login">
          <img></img>
        </NavLink>
        <div className="MiniMenu">
          <p>Имя</p>
          <div>
            <NavLink to="/login">Профиль</NavLink>
            <NavLink to="/login">Выйти</NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnterUser;
