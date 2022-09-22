import React, { FC, useEffect } from "react";
import { useAppSelector } from "../store/store";
import { useNavigate } from "react-router-dom";
type PrivatePageProps = {
  children: React.ReactElement;
};
const PrivatePage: FC<PrivatePageProps> = ({ children, ...props }) => {
  const { isAuth, isLoading } = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuth) navigate("/");
  }, []);
  return children;
};

export default PrivatePage;
