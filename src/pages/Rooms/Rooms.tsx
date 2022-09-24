import React from "react";
import "./Rooms.scss";
import Room from "../../components/Room/Room";
const Rooms = () => {
  return (
    <div className="Rooms">
      <p>Активные публичные игры</p>
      <div>
        <Room></Room>
        <Room></Room>
        <Room></Room>
        <Room></Room>
      </div>
    </div>
  );
};

export default Rooms;
