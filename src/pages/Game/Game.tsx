import React, { useState } from "react";
import Button from "../../UI/Button/Button";
import Input from "../../UI/Input/Input";
import Progress from "../../UI/Progress/Progress";
import "./Game.scss";
const Game = () => {
  function sendAnswerHandler() {}
  return (
    <div className="Game">
      <p>Категория</p>
      <div>
        <img src="" />
        {}
        <p>Введите ваш ответ</p>
        <div>
          <Input type="text"></Input>
          <Button onClick={sendAnswerHandler}>Отправить</Button>
        </div>
      </div>
    </div>
  );
};

export default Game;
