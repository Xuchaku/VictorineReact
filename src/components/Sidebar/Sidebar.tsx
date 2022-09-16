import React, { useState, ChangeEvent } from "react";
import "./Sidebar.scss";
import Input from "../../UI/Input/Input";
const Sidebar = () => {
  const [search, setSearch] = useState("");
  function searchChangeHandler(event: ChangeEvent<HTMLInputElement>) {
    setSearch(event.target.value);
  }
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
      <div></div>
    </div>
  );
};

export default Sidebar;
