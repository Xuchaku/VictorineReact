import React, { FC, MouseEvent } from "react";
import "./Button.scss";

type ButtonProps = {
  children: string;
  background?: string;
  onClick: () => void;
};
const Button: FC<ButtonProps> = ({ children, ...props }) => {
  const style = {
    backgroundColor: props.background,
  };
  return (
    <button style={style} className="Button" {...props}>
      {children}
    </button>
  );
};

export default Button;
