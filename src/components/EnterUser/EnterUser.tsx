import React, { useContext, MouseEvent } from "react";
import { Link } from "react-router-dom";
import Auth from "../../context/Auth";
import { api } from "../../API";
import { POINT_API_LOGOUT } from "../../constants/constants";
import "./EnterUser.scss";
const EnterUser = () => {
  const { isAuth, setIsAuthWrapper } = useContext(Auth);
  async function logout(event: MouseEvent<HTMLAnchorElement>) {
    const response = await api.post(POINT_API_LOGOUT);
    if (response.ok) {
      setIsAuthWrapper(false);
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
            <img></img>
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
