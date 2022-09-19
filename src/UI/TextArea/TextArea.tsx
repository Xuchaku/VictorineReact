import React, { FC, ChangeEvent } from "react";
import "./TextArea.scss";

type TextAreaProps = {
  children: string;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
};
const TextArea: FC<TextAreaProps> = ({ children, ...props }) => {
  return (
    <textarea {...props} className="TextArea">
      {children}
    </textarea>
  );
};

export default TextArea;
