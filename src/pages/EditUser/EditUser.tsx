import React, { ChangeEvent, useId, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../UI/Button/Button";
import Input from "../../UI/Input/Input";
import TextArea from "../../UI/TextArea/TextArea";
import { readFileAsync } from "../../utils";
import "./EditUser.scss";
const EditUser = () => {
  const uniqId = useId();
  const refImg = useRef<HTMLImageElement>(null);
  const refImgMini = useRef<HTMLImageElement>(null);
  const navigate = useNavigate();

  function userInfoChangeHandler(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {}

  async function userAvatarChangeHandler(event: ChangeEvent<HTMLInputElement>) {
    const files = event.target.files;
    let file: File | null = null;
    if (files) {
      file = files[0];
      try {
        const data: string | null = await readFileAsync(file);
        if (
          data &&
          refImg &&
          refImg.current &&
          refImgMini &&
          refImgMini.current
        ) {
          refImg.current.src = data;
          refImgMini.current.src = data;
        }
      } catch (err) {}
    }
  }

  return (
    <div className="EditUser">
      <div className="Avatar">
        <h2>Аватар</h2>
        <div className="Imgs">
          <img ref={refImg}></img>
          <img ref={refImgMini}></img>
        </div>
        <div>
          <label htmlFor={uniqId}>Выбрать файл</label>
          <Input
            type="file"
            accept="image/png, image/jpeg"
            id={uniqId}
            onChange={userAvatarChangeHandler}
          ></Input>
        </div>
      </div>
      <div className="MainInfo">
        <div>
          <h2>Логин</h2>
          <Input
            type="text"
            value="value"
            placeholder="Введите новый логин"
            onChange={userInfoChangeHandler}
          ></Input>
        </div>
        <div>
          <h2>Ссылка</h2>
          <Input
            type="text"
            value="value"
            placeholder="Введите ссылку"
            onChange={userInfoChangeHandler}
          ></Input>
        </div>
        <div>
          <h2>О себе</h2>
          {/* <Input
            type="text"
            value="value"
            placeholder="Напишите о что-то о себе"
            onChange={userInfoChangeHandler}
          ></Input> */}
          <TextArea onChange={userInfoChangeHandler}>{"value"}</TextArea>
        </div>
        <Button background="#46F25D" onClick={() => {}}>
          Сохранить
        </Button>
        <Button
          background="#ff2400"
          onClick={() => {
            navigate(-1);
          }}
        >
          Отменить
        </Button>
      </div>
    </div>
  );
};

export default EditUser;
