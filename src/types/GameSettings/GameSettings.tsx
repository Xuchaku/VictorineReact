import Settings from "../Settings/Settings";
type GameSettings = Settings & {
  host: string;
  imgUrl: string;
  uniqId: string;
  type: string;
};

export default GameSettings;
