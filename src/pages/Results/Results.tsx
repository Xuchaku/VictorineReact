import React, { useEffect, useMemo } from "react";
import "./Results.scss";
import { useContext } from "react";
import WebSocketContext from "../../context/WebSocketContext";
import { useAppSelector } from "./../../store/store";
import { generateRandomColor } from "../../utils";
const Results = () => {
  const socket = useContext(WebSocketContext);
  const { user } = useAppSelector((state) => state.user);
  const { uniqId } = useAppSelector((state) => state.questions);
  const { activeRooms } = useAppSelector((state) => state.rooms);
  const { id } = useAppSelector((state) => state.game);
  const grow = 40;
  const { results } = useAppSelector((state) => state.score);
  const topUsers = useMemo(() => {
    let top3 = [...results]
      .sort((a, b) => {
        return b.score - a.score;
      })
      .slice(0, 3);
    return top3;
  }, [results]);
  useEffect(() => {
    const findRoom = activeRooms.find((room) => {
      return room.uniqId == id;
    });
    if (findRoom?.host == user.login) {
      socket?.endGame(uniqId);
    }
  }, []);

  return (
    <div className="Results">
      <h1>Результаты</h1>
      <div className="Results-list">
        {results.map((result, key) => {
          return (
            <div className="Results-list-item" key={key}>
              <span>{result.score}</span>
              <div
                style={{
                  border:
                    result.user == topUsers[0].user
                      ? "2px solid gold"
                      : result.user == topUsers[1].user
                      ? "2px solid silver"
                      : result.user == topUsers[2].user
                      ? "2px solid peru"
                      : undefined,
                  height:
                    result.score == 0 ? "3px" : result.score * grow + "px",
                  backgroundColor: generateRandomColor(),
                }}
              ></div>
              <p>{result.user}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Results;
