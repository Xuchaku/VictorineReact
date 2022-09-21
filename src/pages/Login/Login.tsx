import React, { useState, ChangeEvent, useContext } from "react";
import { api } from "../../API";
import "./Login.scss";
import { loadUserAsync } from "../../store/userSlice/userSlice";
import { useNavigate } from "react-router-dom";
import Button from "../../UI/Button/Button";
import Input from "../../UI/Input/Input";
import Auth from "../../context/Auth";
import { POINT_API_LOGIN } from "../../constants/constants";
import Modal from "../../UI/Modal/Modal";
import Status from "../../types/Status/Status";
import { useAppDispatch } from "../../store/store";
export default function Login() {
  const { isAuth, setIsAuthWrapper } = useContext(Auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({ login: "", password: "" });
  const [statusResponse, setStatusResponse] = useState<Status>({
    ok: true,
    text: "",
  });
  function loginDataChangeHandler(field: string) {
    return function (event: ChangeEvent<HTMLInputElement>) {
      setLoginData({ ...loginData, [field]: event.target.value });
    };
  }
  function statusResponseCloseHandler() {
    setStatusResponse({ ...statusResponse, ok: true });
  }
  async function enterAccount() {
    const response = (await api.post(POINT_API_LOGIN, loginData)) as Status;
    if (response.ok) {
      setIsAuthWrapper(true);
      await dispatch(loadUserAsync());
      navigate("/menu");
    } else {
      setStatusResponse({ ...response });
    }
  }
  return (
    <div className={`Login ${!statusResponse.ok ? "error" : undefined}`}>
      {!statusResponse.ok && (
        <Modal
          statusResponseCloseHandler={statusResponseCloseHandler}
          type="error"
        >
          {statusResponse.text}
        </Modal>
      )}
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
