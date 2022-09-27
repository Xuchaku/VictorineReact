import React, { FC } from "react";
import "./Progress.scss";

type ProgressProps = {
  time: number;
};
const Progress: FC<ProgressProps> = ({ time, ...props }) => {
  return (
    <div
      style={{ animation: `progress ${time}s 1 linear` }}
      className="Progress"
    ></div>
  );
};

export default Progress;
