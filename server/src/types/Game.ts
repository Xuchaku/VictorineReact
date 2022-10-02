import Question from "./Question";
import Results from "./Results";

type Game = {
  uniqId: string;
  questions: Question[];
  categorie: string;
  results: Results[];
};
export default Game;
