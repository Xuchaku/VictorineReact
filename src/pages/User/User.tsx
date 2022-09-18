import React from "react";
import { Link } from "react-router-dom";
import "./User.scss";
import Button from "../../UI/Button/Button";
export default function User() {
  return (
    <div className="UserProfile">
      <div className="Content">
        <img></img>
      </div>
      <div className="Content">
        <h2>Имя пользователя</h2>
        <p>
          <a href="/" target={"_blank"}>
            Ссылка на себя
          </a>
        </p>
        <p>Когда зарегистрирован</p>
        <p>Моя информация вам точно понадобится для того чтобы жить</p>
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
