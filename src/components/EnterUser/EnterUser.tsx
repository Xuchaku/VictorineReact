import React, { useContext, MouseEvent } from "react";
import { NavLink } from "react-router-dom";
import Auth from "../../context/Auth";
import "./EnterUser.scss";
const EnterUser = () => {
  const { isAuth, setIsAuthWrapper } = useContext(Auth);
  function logout(event: MouseEvent<HTMLAnchorElement>) {
    setIsAuthWrapper(false);
    event.preventDefault();
  }
  return (
    <div className="EnterUser">
      <NavLink to="/registration">Регистрация</NavLink>
      {!isAuth ? (
        <div>
          <NavLink to="/login">Вход</NavLink>
          <span>/</span>
        </div>
      ) : (
        <div className="User">
          <NavLink to="/login">
            <img></img>
          </NavLink>
          <div className="MiniMenu">
            <p>Имя</p>
            <div>
              <NavLink to="/user">Профиль</NavLink>
              <NavLink to="/" onClick={logout}>
                Выйти
              </NavLink>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnterUser;
