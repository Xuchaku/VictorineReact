import Settings from "../Settings/Settings";
import UserSocket from "../UserSocket/UserSocket";
type GameSettings = Settings & {
  host: string;
  countPlayer: number;
  currentPlayers: UserSocket[];
  imgUrl: string;
  uniqId: string;
  type: string;
  countReadyForGame: number;
};

export default GameSettings;
