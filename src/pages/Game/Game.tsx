import React, {
  ChangeEvent,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import WebSocketContext from "../../context/WebSocketContext";
import { useAppSelector } from "../../store/store";
import Button from "../../UI/Button/Button";
import Input from "../../UI/Input/Input";
import Progress from "../../UI/Progress/Progress";

import "./Game.scss";
import QuestionLocal from "../../types/QuestionLocal/QuestionLocal";
const Game = () => {
  const navigate = useNavigate();
  const socket = useContext(WebSocketContext);
  const { isReady, questions, uniqId, currentQuestionNumber } = useAppSelector(
    (state) => state.questions
  );
  const [currentDate, setCurrentDate] = useState<null | Date>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const { isAuth } = useAppSelector((state) => state.user);
  const [answer, setAnswer] = useState("");

  const currentQuestion: QuestionLocal | null = useMemo(() => {
    if (questions.length == currentSlide) {
      navigate("/results");
    }
    if (questions.length > 0) {
      setCurrentDate(new Date());
      return questions[currentSlide];
    } else return null;
  }, [currentSlide, questions]);

  const currentProgress = useMemo(() => {
    const uniqKey = Math.random();
    if (currentQuestion)
      return (
        <Progress
          key={uniqKey}
          time={Math.floor(currentQuestion.timeToThink / 1000)}
        ></Progress>
      );
    else return null;
  }, [currentSlide, currentQuestion]);

  function sendAnswerHandler() {
    if (answer && currentQuestion?.id) {
      if (currentDate) {
        const time = new Date().getTime() - currentDate.getTime();
        socket?.answer(uniqId, currentQuestion.id, answer, time);
      }
    }
  }
  function answerChangeHandler(event: ChangeEvent<HTMLInputElement>) {
    setAnswer(event.target.value);
  }
  useEffect(() => {
    const idTimeOut = setTimeout(() => {
      setCurrentSlide((prev) => prev + 1);
      clearTimeout(idTimeOut);
    }, currentQuestion?.timeToThink);
  }, [currentQuestion]);

  useEffect(() => {
    if (!isAuth || !isReady) navigate("/");
  }, [isAuth, isReady]);

  useEffect(() => {
    console.log(currentQuestionNumber);
  }, [currentQuestionNumber]);

  return currentQuestion ? (
    <div className="Game">
      <p>Категория</p>
      <div>
        <p>
          {currentSlide + 1}/{questions.length}
        </p>
        <img src={currentQuestion.imgUrl} />
        {currentProgress}
        <p>Введите ваш ответ</p>
        <div>
          <Input
            type="text"
            value={answer}
            onChange={answerChangeHandler}
          ></Input>
          <Button onClick={sendAnswerHandler}>Отправить</Button>
        </div>
      </div>
    </div>
  ) : null;
};

export default Game;
