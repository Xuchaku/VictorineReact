import React, { ChangeEvent, FC } from "react";
import "./Input.scss";
type InputProps = {
  type: string;
  value: string | number;
  placeholder: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};
const Input: FC<InputProps> = (props) => {
  return <input className="Input" {...props} />;
};

export default Input;
