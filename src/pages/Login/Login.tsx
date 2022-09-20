import React, { useState, ChangeEvent, useContext } from "react";
import { api } from "../../API";
import "./Login.scss";
import { useNavigate } from "react-router-dom";
import Button from "../../UI/Button/Button";
import Input from "../../UI/Input/Input";
import Auth from "../../context/Auth";
import { POINT_API_LOGIN } from "../../constants/constants";
export default function Login() {
  const { isAuth, setIsAuthWrapper } = useContext(Auth);
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({ login: "", password: "" });
  function loginDataChangeHandler(field: string) {
    return function (event: ChangeEvent<HTMLInputElement>) {
      setLoginData({ ...loginData, [field]: event.target.value });
    };
  }
  async function enterAccount() {
    const response = await api.post(POINT_API_LOGIN, loginData);
    console.log(response);
    setIsAuthWrapper(true);
    navigate("/menu");
  }
  return (
    <div className="Login">
      <p>Войти</p>
      <form onSubmit={(event) => event.preventDefault()}>
        <label htmlFor="">Логин</label>
        <Input
          type="text"
          value={loginData.login}
          placeholder="Ваш логин"
          onChange={loginDataChangeHandler("login")}
        ></Input>
        <label htmlFor="">Пароль</label>
        <Input
          type="password"
          value={loginData.password}
          placeholder="Ваш логин"
          onChange={loginDataChangeHandler("password")}
        ></Input>
        <Button onClick={enterAccount}>Войти</Button>
      </form>
    </div>
  );
}
