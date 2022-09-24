import React from "react";
import "./Room.scss";
import Button from "../../UI/Button/Button";
const Room = () => {
  return (
    <div className="Room">
      <div>
        <p>Никнейм</p>
        <img src="" alt="" />
      </div>
      <div>
        <p>Категория: Аниме</p>
        <p>Количество игроков: 3/6</p>
      </div>
      <Button onClick={() => {}}>Присоединиться</Button>
    </div>
  );
};

export default Room;
