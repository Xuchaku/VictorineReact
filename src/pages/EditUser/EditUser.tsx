import React, { ChangeEvent, useId, useRef, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../store/store";
import { loadUserAsync } from "../../store/userSlice/userSlice";
import { useLayoutEffect, useEffect } from "react";
import { POINT_API_SET_USER } from "../../constants/constants";
import UserInfo from "../../types/UserInfo/UserInfo";
import { useNavigate } from "react-router-dom";
import Button from "../../UI/Button/Button";
import Input from "../../UI/Input/Input";
import TextArea from "../../UI/TextArea/TextArea";
import { readFileAsync } from "../../utils";
import "./EditUser.scss";
const EditUser = () => {
  const { isLoading, isAuth } = useAppSelector((state) => state.user);
  const uniqId = useId();
  const user: UserInfo = useAppSelector((state) => state.user.user);
  const [userLocal, setUserLocal] = useState<UserInfo>({
    login: "",
    dataRegistrate: "",
    imgUrl: "",
    link: "",
    about: "",
  });
  const dispatch = useAppDispatch();
  const refImg = useRef<HTMLImageElement>(null);
  const refImgMini = useRef<HTMLImageElement>(null);
  const navigate = useNavigate();
  useEffect(() => {
    setUserLocal({ ...user });
  }, [isLoading]);
  function userInfoChangeHandler(field: string) {
    return function (
      event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) {
      setUserLocal({ ...userLocal, [field]: event.target.value });
    };
  }
  function userInfoSetHandler() {
    dispatch(loadUserAsync(POINT_API_SET_USER, userLocal));
  }

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
          setUserLocal({ ...userLocal, data });
        }
      } catch (err) {}
    }
  }

  return (
    <div className="EditUser">
      <div className="Avatar">
        <h2>Аватар</h2>
        <span>Максимальный размер файла 1 Мб</span>
        <div className="Imgs">
          <img ref={refImg} src={userLocal.imgUrl}></img>
          <img ref={refImgMini} src={userLocal.imgUrl}></img>
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
            value={userLocal.login}
            placeholder="Введите новый логин"
            onChange={userInfoChangeHandler("login")}
          ></Input>
        </div>
        <div>
          <h2>Ссылка</h2>
          <Input
            type="text"
            value={userLocal.link}
            placeholder="Введите ссылку"
            onChange={userInfoChangeHandler("link")}
          ></Input>
        </div>
        <div>
          <h2>О себе</h2>
          <TextArea
            text={userLocal.about}
            onChange={userInfoChangeHandler("about")}
          ></TextArea>
        </div>
        <Button background="#46F25D" onClick={userInfoSetHandler}>
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
