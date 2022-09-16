import React, { useState, ChangeEvent } from "react";
import "./Login.scss";
import Button from "../../UI/Button/Button";
import Input from "../../UI/Input/Input";
export default function Login() {
  const [loginData, setLoginData] = useState({ login: "", password: "" });
  function loginDataChangeHandler(field: string) {
    return function (event: ChangeEvent<HTMLInputElement>) {
      setLoginData({ ...loginData, [field]: event.target.value });
    };
  }
  function enterAccount() {}
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
