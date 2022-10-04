import React from "react";
import "./Results.scss";
import { useAppSelector } from "./../../store/store";
const Results = () => {
  const { results } = useAppSelector((state) => state.score);
  return (
    <div className="Results">
      <h1>Результаты</h1>
      <div>
        {results.map((result) => {
          return (
            <p>
              {result.score} ,{result.user}
            </p>
          );
        })}
      </div>
    </div>
  );
};

export default Results;
