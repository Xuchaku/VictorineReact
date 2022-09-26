import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";

import "./Room.scss";
import Button from "../../UI/Button/Button";
import WebSocketContext from "../../context/WebSocketContext";
import GameSettings from "../../types/GameSettings/GameSettings";

type RoomProps = {
  roomSettings: GameSettings;
};
const Room: FC<RoomProps> = ({ roomSettings, ...props }) => {
  const socket = useContext(WebSocketContext);
  const navigate = useNavigate();
  function roomClickHandler() {
    socket?.connectToRoom(roomSettings.uniqId);
    navigate("/lobby");
  }
  return (
    <div className="Room">
      <div>
        <p>{roomSettings.host}</p>
        <img src={roomSettings.imgUrl} alt="" />
      </div>
      <div>
        <p>Категория: {roomSettings.categorie}</p>
        <p>
          Количество игроков: {roomSettings.countPlayer}/{roomSettings.players}
        </p>
      </div>
      <Button onClick={roomClickHandler}>Присоединиться</Button>
    </div>
  );
};

export default Room;
