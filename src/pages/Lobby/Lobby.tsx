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
  const { isReady } = useAppSelector((state) => state.questions);
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
    if (isReady) navigate("/game");
    if (!lobby && isInit) navigate("/");
    if (!isAuth) navigate("/");
  }, [lobby, isInit, isAuth, isReady]);

  return (
    <div className="Lobby">
      {lobby?.host == user.login ? (
        <Button background="red" onClick={exitLobbyHandler}>
          ?????????????? ??????????
        </Button>
      ) : (
        <Button background="red" onClick={leaveLobbyHandler}>
          ???????????????? ??????????
        </Button>
      )}
      <h2>???? ?????????????? ?????????????????? {lobby?.categorie}</h2>
      <img src={lobby?.imgUrl} />
      <div>
        <p>?????????????? ??????????????</p>
        <Loader></Loader>
        <div>
          {lobby?.currentPlayers.map((player) => {
            return (
              <img
                src={player.imgUrl}
                className={player.login == lobby?.host ? "host" : undefined}
              ></img>
            );
          })}
        </div>
        <p>
          {lobby?.countPlayer}/{lobby?.players}
        </p>
        <p>????????????????????</p>
        <p>
          {lobby?.countReadyForGame}/{lobby?.players}
        </p>
      </div>
      <div>
        <p>
          <span>{lobby?.mode == "public" ? "??????????????????" : "??????????????????"}</span>
        </p>
        <Button onClick={readyGameHandler}>??????????</Button>
      </div>
    </div>
  );
};

export default Lobby;
