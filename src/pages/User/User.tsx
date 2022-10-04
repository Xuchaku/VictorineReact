import React from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { useAppSelector } from "../../store/store";
import "./User.scss";
import Button from "../../UI/Button/Button";
import { ReactComponent as Back } from "./../../assets/svg/back.svg";

export default function User() {
  const { user, isLoading } = useAppSelector((state) => state.user);
  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <div className="UserProfile">
      <Link to={"/"}>
        <Back></Back>
      </Link>
      <div className="Content">
        <img src={user.imgUrl}></img>
      </div>
      <div className="Content">
        <h2>{user.login}</h2>
        <p>
          <a href="/" target={"_blank"}>
            {user.link}
          </a>
        </p>
        <p>{format(new Date(user.dataRegistrate), "dd/mm/yyyy")}</p>
        <p>{user.about}</p>
        <div className="Actions">
          <Button onClick={() => {}}>
            <Link to="/edituser">Изменить</Link>
          </Button>
          <Button background="#ff2400" onClick={() => {}}>
            Удалить
          </Button>
        </div>
      </div>
    </div>
  );
}
