import React, { FC } from "react";
import "./Button.scss";

type ButtonProps = {
  children: string;
  onClick: () => void;
};
const Button: FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <button className="Button" {...props}>
      {children}
    </button>
  );
};

export default Button;
