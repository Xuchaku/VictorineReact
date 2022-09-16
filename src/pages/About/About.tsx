import React from "react";
import { Link } from "react-router-dom";
import "./About.scss";
const About = () => {
  return (
    <div className="About">
      <span>I know that!</span>
      <img></img>
      <p>Проверь себя на знание фильмов, игр, сериалов</p>
      <p>Участвуй с друзьями, покажи свою скорость!</p>
      <p>1 Фото, 10 секунд на размышление</p>
      <h1>
        <span>Who will win?</span>
      </h1>
      <p>
        <Link to="/menu">Меню</Link>
        <Link to="/game">Играть</Link>
      </p>
    </div>
  );
};

export default About;
