import React, { useContext, FC, useEffect } from "react";
import Auth from "../context/Auth";
import { useNavigate } from "react-router-dom";
type PrivatePageProps = {
  children: React.ReactElement;
};
const PrivatePage: FC<PrivatePageProps> = ({ children, ...props }) => {
  const { isAuth, setIsAuthWrapper } = useContext(Auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuth) navigate("/");
  }, []);
  return children;
};

export default PrivatePage;
