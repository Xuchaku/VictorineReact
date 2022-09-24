import React from "react";
import "./Lobby.scss";
import Button from "../../UI/Button/Button";
import Loader from "../../UI/Loader/Loader";
const Lobby = () => {
  return (
    <div className="Lobby">
      <h2>Вы выбрали категорию Аниме</h2>
      <img src="" alt="" />
      <div>
        <p>Ожидаем игроков</p>
        <Loader></Loader>
        <p>3/6</p>
      </div>
      <div>
        <p>
          <span>Публичный</span>
        </p>
        <Button onClick={() => {}}>Готов</Button>
      </div>
    </div>
  );
};

export default Lobby;
