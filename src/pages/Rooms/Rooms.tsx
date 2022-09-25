import React from "react";
import "./Rooms.scss";
import Room from "../../components/Room/Room";
import { useAppSelector } from "../../store/store";
const Rooms = () => {
  const { activeRooms } = useAppSelector((state) => state.rooms);
  return (
    <div className="Rooms">
      <p>Активные публичные игры</p>
      <div>
        {activeRooms.map((room, key) => {
          return <Room roomSettings={room}></Room>;
        })}
      </div>
    </div>
  );
};

export default Rooms;
