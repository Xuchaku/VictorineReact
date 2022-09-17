import React, { useState, ChangeEvent } from "react";
import Button from "../../UI/Button/Button";
import "./Menu.scss";
import { Categories } from "../../constants/constants";
import Categorie from "../../types/Categorie/Categorie";
import Settings from "../../types/Settings/Settings";
import Input from "../../UI/Input/Input";
import { isValidNumeric } from "../../utils";
import { generateRandomColor } from "../../utils";

const Menu = () => {
  const [settings, setSettings] = useState<Settings>({
    categorie: "",
    mode: false,
    players: "",
  });
  const [isError, setIsError] = useState(false);
  const [step, setStep] = useState(0);

  const stepHeader =
    step == 0
      ? "Выберите категорию"
      : step == 1
      ? "Выберите видимость игры"
      : step == 2
      ? "Введите количество игроков"
      : null;

  function settingsClickHandler(field: string, data: string | boolean) {
    setSettings({ ...settings, [field]: data });
    setStep(step + 1);
  }
  function settingsChangeHandler(event: ChangeEvent<HTMLInputElement>) {
    const userInput = event.target.value;
    setSettings({ ...settings, players: userInput });
  }
  function settingsSubmitHandler() {
    const { players } = settings;
    const isVaild = isValidNumeric(players, 2, 6);
    if (isVaild) {
      setStep(step + 1);
    } else {
      setIsError(true);
    }
  }

  return (
    <div className="Menu">
      <p>{stepHeader}</p>
      <div>
        {step == 0 &&
          Categories.map((categorie: Categorie) => {
            return (
              <Button
                background={generateRandomColor()}
                onClick={() => {
                  settingsClickHandler("categorie", categorie.type);
                }}
              >
                {categorie.text}
              </Button>
            );
          })}
        {step == 1 && (
          <div>
            <Button
              background={"#46F25D"}
              onClick={() => {
                settingsClickHandler("mode", true);
              }}
            >
              Публичный
            </Button>
            <Button
              background={"#405AF7"}
              onClick={() => {
                settingsClickHandler("mode", false);
              }}
            >
              Приватный
            </Button>
          </div>
        )}
        {step == 2 && (
          <div>
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
      </div>
      <span>{step} / 3</span>
    </div>
  );
};

export default Menu;
