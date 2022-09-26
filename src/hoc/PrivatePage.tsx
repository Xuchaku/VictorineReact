import React, { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAppSelector } from "../store/store";

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
