import React, { FC } from "react";
import "./ErrorMessage.scss";
type ErrorMessageProps = {
  errors: String[];
};

const ErrorMessage: FC<ErrorMessageProps> = (props) => {
  return (
    <div className="ErrorMessage">
      {props.errors.map((err) => {
        return <i>{err}</i>;
      })}
    </div>
  );
};

export default ErrorMessage;
