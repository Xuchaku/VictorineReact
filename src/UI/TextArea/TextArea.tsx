import React, { FC, ChangeEvent } from "react";
import "./TextArea.scss";

type TextAreaProps = {
  text: string;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
};
const TextArea: FC<TextAreaProps> = ({ text, ...props }) => {
  return <textarea {...props} className="TextArea" value={text}></textarea>;
};

export default TextArea;
