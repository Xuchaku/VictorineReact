import React, { useState, ChangeEvent } from "react";
import Button from "../../UI/Button/Button";
import "./Menu.scss";
import { Categories } from "../../constants/constants";
import Categorie from "../../types/Categorie/Categorie";
import Settings from "../../types/Settings/Settings";
import Input from "../../UI/Input/Input";
import { isValidNumeric } from "../../utils";
import { generateRandomColor } from "../../utils";
import ErrorMessage from "../../UI/ErrorMessage/ErrorMessage";
import { TOTAL_STEP_MENU } from "../../constants/constants";

const Menu = () => {
  const [settings, setSettings] = useState<Settings>({
    categorie: "",
    mode: false,
    players: "",
  });
  const [isError, setIsError] = useState(false);
  const [step, setStep] = useState(0);
  const LEFT_EDGE = 2,
    RIGHT_EDGE = 6;
  const stepHeader =
    step == 0
      ? "Выберите категорию"
      : step == 1
      ? "Выберите видимость игры"
      : step == 2
      ? "Введите количество игроков"
      : null;

  function settingsClickHandler(field: string, data: string | boolean) {
    return function () {
      setSettings({ ...settings, [field]: data });
      setStep(step + 1);
    };
  }
  function settingsChangeHandler(event: ChangeEvent<HTMLInputElement>) {
    const userInput = event.target.value;
    setSettings({ ...settings, players: userInput });
  }
  function settingsSubmitHandler() {
    const { players } = settings;
    const isVaild = isValidNumeric(players, LEFT_EDGE, RIGHT_EDGE);
    if (isVaild) {
      setIsError(false);
      setStep(step + 1);
    } else {
      setIsError(true);
    }
  }

  return (
    <div className="Menu">
      <p>{stepHeader}</p>
      <div className="Action">
        {step == 0 && (
          <div>
            {Categories.map((categorie: Categorie, key: number) => {
              return (
                <Button
                  key={key}
                  background={generateRandomColor()}
                  onClick={settingsClickHandler("categorie", categorie.type)}
                >
                  {categorie.text}
                </Button>
              );
            })}
          </div>
        )}
        {step == 1 && (
          <div className="Action">
            <Button
              background={"#46F25D"}
              onClick={settingsClickHandler("mode", true)}
            >
              Публичный
            </Button>
            <Button
              background={"#405AF7"}
              onClick={settingsClickHandler("mode", false)}
            >
              Приватный
            </Button>
          </div>
        )}
        {step == 2 && (
          <div className="Action">
            <Input
              onChange={settingsChangeHandler}
              type="text"
              extendClassName={isError ? "error" : undefined}
              value={settings.players}
              placeholder="Количество игроков 2-6"
            ></Input>
            <Button onClick={settingsSubmitHandler}>Создать</Button>
          </div>
        )}
        {isError && (
          <ErrorMessage
            errors={[
              "Проверьте правильность ввода",
              "В поле должно быть число от 2 до 6",
              "Не должно быть запрещенных символов",
            ]}
          ></ErrorMessage>
        )}
      </div>
      <span>
        {step} / {TOTAL_STEP_MENU}
      </span>
    </div>
  );
};

export default Menu;
