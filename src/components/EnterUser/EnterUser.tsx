import React, { useContext, MouseEvent } from "react";
import { Link } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../store/store";
import { setIsAuth } from "../../store/userSlice/userSlice";
import { api } from "../../API";
import { POINT_API_LOGOUT } from "../../constants/constants";
import WebSocketContext from "../../context/WebSocketContext";
import "./EnterUser.scss";

const EnterUser = () => {
  const socket = useContext(WebSocketContext);
  const { isAuth, user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  async function logout(event: MouseEvent<HTMLAnchorElement>) {
    const response = await api.post(POINT_API_LOGOUT);
    if (response.ok) {
      socket?.exit();
      dispatch(setIsAuth(false));
    }
    event.preventDefault();
  }
  return (
    <div className="EnterUser">
      {!isAuth ? (
        <div>
          <Link to="/login">Вход</Link>
          <span>/</span>
          <Link to="/registration">Регистрация</Link>
        </div>
      ) : (
        <div className="User">
          <Link to="/login">
            <img src={user.imgUrl}></img>
          </Link>
          <div className="MiniMenu">
            <p>Имя</p>
            <div>
              <Link to="/user">Профиль</Link>
              <Link to="/" onClick={logout}>
                Выйти
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnterUser;
