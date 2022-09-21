import React, { ChangeEvent } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Registration.scss";
import Button from "../../UI/Button/Button";
import Input from "../../UI/Input/Input";
import ErrorMessage from "../../UI/ErrorMessage/ErrorMessage";
import Register from "../../types/Registrer/Register";
import { isRegistrationDataValid } from "../../utils";
import { api } from "../../API";
import { POINT_API_REGISTRATE } from "../../constants/constants";
import Modal from "../../UI/Modal/Modal";
import Status from "../../types/Status/Status";

const Registration = () => {
  const navigate = useNavigate();
  const [registrationData, setRegistrationData] = useState<Register>({
    login: "",
    password: "",
    verifyPassword: "",
  });
  const [statusResponse, setStatusResponse] = useState<Status>({
    ok: true,
    text: "",
  });
  const [isError, setIsError] = useState(false);
  function registrationDataChangeHandler(field: string) {
    return function (event: ChangeEvent<HTMLInputElement>) {
      setRegistrationData({ ...registrationData, [field]: event.target.value });
    };
  }
  function statusResponseCloseHandler() {
    setStatusResponse({ ...statusResponse, ok: true });
  }
  async function registrateAccount() {
    const isValid = isRegistrationDataValid(registrationData);
    if (isValid) {
      const response = (await api.post(POINT_API_REGISTRATE, {
        ...registrationData,
        dataRegistrate: new Date(),
      })) as Status;
      if (response.ok) {
        navigate("/");
      } else {
        setStatusResponse({ ...response });
      }
      console.log(response);
    } else {
      setIsError(true);
    }
  }
  return (
    <div className={`Registration ${isError ? "error" : undefined}`}>
      {!statusResponse.ok && (
        <Modal
          type="error"
          statusResponseCloseHandler={statusResponseCloseHandler}
        >
          {statusResponse.text}
        </Modal>
      )}
      <p>Регистрация</p>
      <form onSubmit={(event) => event.preventDefault()}>
        <label htmlFor="">Логин</label>
        <Input
          type="text"
          onChange={registrationDataChangeHandler("login")}
          value={registrationData.login}
          placeholder="Ваш логин более"
        ></Input>
        <label htmlFor="">Пароль</label>
        <Input
          type="password"
          onChange={registrationDataChangeHandler("password")}
          value={registrationData.password}
          placeholder="Ваш пароль"
        ></Input>
        <label htmlFor="">Повторите пароль</label>
        <Input
          type="password"
          onChange={registrationDataChangeHandler("verifyPassword")}
          value={registrationData.verifyPassword}
          placeholder="Повторите пароль"
        ></Input>
        <Button onClick={registrateAccount}>Отправить</Button>
        {isError && (
          <ErrorMessage
            errors={[
              "Пароли должны совпадать",
              "Поля должны содержать более 5 символов",
              "Не должно быть запрещенных символов",
            ]}
          ></ErrorMessage>
        )}
      </form>
    </div>
  );
};

export default Registration;
