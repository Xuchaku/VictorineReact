import React, { ChangeEvent, FC } from "react";
import "./Input.scss";
type InputProps = {
  type: string;
  accept?: string;
  id?: string;
  extendClassName?: string;
  value?: string | number;
  placeholder?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
};
const Input: FC<InputProps> = (props) => {
  return <input className={`Input ${props.extendClassName}`} {...props} />;
};

export default Input;
