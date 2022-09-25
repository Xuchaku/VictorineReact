import React, { FC } from "react";
import "./Room.scss";
import Button from "../../UI/Button/Button";
import GameSettings from "../../types/GameSettings/GameSettings";
type RoomProps = {
  roomSettings: GameSettings;
};
const Room: FC<RoomProps> = ({ roomSettings, ...props }) => {
  return (
    <div className="Room">
      <div>
        <p>{roomSettings.host}</p>
        <img src={roomSettings.imgUrl} alt="" />
      </div>
      <div>
        <p>Категория: {roomSettings.categorie}</p>
        <p>Количество игроков: ???/{roomSettings.players}</p>
      </div>
      <Button onClick={() => {}}>Присоединиться</Button>
    </div>
  );
};

export default Room;
