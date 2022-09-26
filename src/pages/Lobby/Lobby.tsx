import React, { useEffect, useState, useContext, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";

import "./Lobby.scss";
import Button from "../../UI/Button/Button";
import WebSocketContext from "../../context/WebSocketContext";
import { useAppSelector } from "../../store/store";
import Loader from "../../UI/Loader/Loader";
import GameSettings from "./../../types/GameSettings/GameSettings";
import RoomWithPlayers from "../../types/RoomWithPlayers/RoomWithPlayers";

const Lobby = () => {
  const socket = useContext(WebSocketContext);
  const [isInit, setIsInit] = useState(false);
  const navigate = useNavigate();
  const { isAuth, user } = useAppSelector((state) => state.user);
  const { activeRooms } = useAppSelector((state) => state.rooms);
  const { id } = useAppSelector((state) => state.game);
  const [lobby, setLobby] = useState<GameSettings | null>(null);
  function exitLobbyHandler() {
    if (lobby?.uniqId && lobby.host == user.login) {
      socket?.exitLobby(lobby?.uniqId);
      navigate("/");
    }
  }
  function leaveLobbyHandler() {
    if (lobby?.uniqId) {
      socket?.leaveLobby(lobby?.uniqId);
      navigate("/");
    }
  }
  function readyGameHandler() {
    if (lobby?.uniqId) {
      socket?.readyGame(lobby?.uniqId);
    }
  }
  useEffect(() => {
    const findRoom = activeRooms.find((room) => {
      return room.uniqId == id;
    });
    if (findRoom) {
      setLobby(findRoom);
      setIsInit(true);
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
          setIsInit(true);
        } else {
          setLobby(null);
          setIsInit(true);
        }
      } else {
        setLobby(null);
      }
    }
  }, [activeRooms, id]);
  useLayoutEffect(() => {
    if (!lobby && isInit) navigate("/");
    if (!isAuth) navigate("/");
  }, [lobby, isInit, isAuth]);

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
        <p>Готовность</p>
        <p>
          {lobby?.countReadyForGame}/{lobby?.players}
        </p>
      </div>
      <div>
        <p>
          <span>{lobby?.mode}</span>
        </p>
        <Button onClick={readyGameHandler}>Готов</Button>
        {lobby?.host == user.login ? (
          <Button background="red" onClick={exitLobbyHandler}>
            Закрыть лобби
          </Button>
        ) : (
          <Button background="red" onClick={leaveLobbyHandler}>
            Покинуть лобби
          </Button>
        )}
      </div>
    </div>
  );
};

export default Lobby;
