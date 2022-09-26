import React, { useEffect, useState } from "react";
import "./Lobby.scss";
import Button from "../../UI/Button/Button";
import { useContext } from "react";
import WebSocketContext from "../../context/WebSocketContext";
import { useAppSelector } from "../../store/store";
import Loader from "../../UI/Loader/Loader";
import GameSettings from "./../../types/GameSettings/GameSettings";
import RoomWithPlayers from "../../types/RoomWithPlayers/RoomWithPlayers";
import { useNavigate } from "react-router-dom";
const Lobby = () => {
  const socket = useContext(WebSocketContext);
  const navigate = useNavigate();
  const { activeRooms } = useAppSelector((state) => state.rooms);
  const { user } = useAppSelector((state) => state.user);
  const { isAuth } = useAppSelector((state) => state.user);
  const { id } = useAppSelector((state) => state.game);
  const [lobby, setLobby] = useState<GameSettings | null>(null);
  function exitLobbyHandler() {
    if (lobby?.uniqId && lobby.host == user.login) {
      socket?.exitLobby(lobby?.uniqId);
      navigate("/");
    }
  }
  useEffect(() => {
    const findRoom = activeRooms.find((room) => {
      return room.uniqId == id;
    });
    if (findRoom) {
      setLobby(findRoom);
    } else {
      const roomsWithIdAndPlayers = activeRooms.map((room) => {
        const roomWithPlayers: RoomWithPlayers = {
          uniqId: room.uniqId,
          playersRoom: room.currentPlayers.map((user) => {
            return user.login;
          }),
        };
        return roomWithPlayers;
      });
      const findRoom = roomsWithIdAndPlayers.find((room) => {
        return room.playersRoom.includes(user.login);
      });
      if (findRoom) {
        const id = findRoom.uniqId;
        const roomForPlayer = activeRooms.find((room) => {
          return room.uniqId == id;
        });
        if (roomForPlayer) {
          setLobby(roomForPlayer);
        } else {
          setLobby(null);
        }
      }
    }
  }, [activeRooms, id]);

  return (
    <div className="Lobby">
      <h2>Вы выбрали категорию {lobby?.categorie}</h2>
      <img src="" />
      <div>
        <p>Ожидаем игроков</p>
        <Loader></Loader>
        <div>
          {<img src={lobby?.imgUrl}></img>}
          {lobby?.currentPlayers.map((player) => {
            return <img src={player.imgUrl}></img>;
          })}
        </div>
        <p>
          {lobby?.countPlayer}/{lobby?.players}
        </p>
      </div>
      <div>
        <p>
          <span>{lobby?.mode}</span>
        </p>
        <Button onClick={() => {}}>Готов</Button>
        <Button background="red" onClick={exitLobbyHandler}>
          Закрыть лобби
        </Button>
      </div>
    </div>
  );
};

export default Lobby;
