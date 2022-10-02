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
import { useAppSelector, useAppDispatch } from "../../store/store";
import Button from "../../UI/Button/Button";
import Input from "../../UI/Input/Input";
import Progress from "../../UI/Progress/Progress";

import "./Game.scss";
import QuestionLocal from "../../types/QuestionLocal/QuestionLocal";
import { setQuestionNumber } from "../../store/questionsSlice/questionsSlice";
import { setStatus } from "../../store/scoreSlice/scoreSlice";
const Game = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const socket = useContext(WebSocketContext);
  const { isReady, questions, uniqId, currentQuestionNumber } = useAppSelector(
    (state) => state.questions
  );
  const { status } = useAppSelector((state) => state.score);
  const [currentDate, setCurrentDate] = useState<null | Date>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const { isAuth } = useAppSelector((state) => state.user);
  const [answer, setAnswer] = useState("");
  const [timeOut, setTimeOut] = useState<null | ReturnType<typeof setTimeout>>(
    null
  );

  const statusAnswer = useMemo(() => {
    if (status.type) {
      return <p className={status.type}>{status.text}</p>;
    } else {
      return null;
    }
  }, [status]);

  const currentQuestion: QuestionLocal | null = useMemo(() => {
    if (questions.length == currentQuestionNumber) {
      navigate("/results");
      socket?.result(uniqId);
    }
    if (questions.length > 0) {
      setCurrentDate(new Date());
      return questions[currentQuestionNumber];
    } else return null;
  }, [currentQuestionNumber, questions]);

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
  }, [currentQuestionNumber, currentQuestion]);

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
    setTimeOut(
      setTimeout(() => {
        dispatch(setQuestionNumber(currentQuestionNumber + 1));
        dispatch(setStatus({ type: "", text: "" }));
        setAnswer("");
        setCurrentSlide((prev) => prev + 1);
      }, currentQuestion?.timeToThink)
    );
  }, [currentQuestion, currentQuestionNumber]);
  useEffect(() => {
    if (currentQuestionNumber - currentSlide == 2 && timeOut) {
      setAnswer("");
      clearInterval(timeOut);
    }
  }, [currentQuestionNumber]);

  useEffect(() => {
    if (!isAuth || !isReady) navigate("/");
  }, [isAuth, isReady]);

  return currentQuestion ? (
    <div className="Game">
      <p>Категория</p>
      <div>
        <p>
          {currentQuestionNumber + 1}/{questions.length}
        </p>
        <img src={currentQuestion.imgUrl} />
        {currentProgress}
        <p>Введите ваш ответ</p>
        {statusAnswer}
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
