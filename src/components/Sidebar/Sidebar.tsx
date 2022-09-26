import React, { useState, ChangeEvent, useMemo } from "react";

import "./Sidebar.scss";
import { useAppSelector } from "../../store/store";
import Input from "../../UI/Input/Input";
const Sidebar = () => {
  const { players } = useAppSelector((state) => state.players);
  const [search, setSearch] = useState("");
  function searchChangeHandler(event: ChangeEvent<HTMLInputElement>) {
    setSearch(event.target.value);
  }
  const searchedPlayers = useMemo(() => {
    if (!search) return players;
    else
      return players.filter((player) => {
        return player.login.toLowerCase().includes(search.toLowerCase());
      });
  }, [players, search]);
  return (
    <div className="Sidebar">
      <div>
        <h2>Пользователи онлайн</h2>
      </div>
      <Input
        type="text"
        value={search}
        onChange={searchChangeHandler}
        placeholder="Поиск..."
      ></Input>
      <div>
        {searchedPlayers.map((player, key) => {
          return (
            <div key={key} className="Player">
              <div>
                <img src={player.imgUrl}></img>
                <span></span>
              </div>
              <p>{player.login}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
