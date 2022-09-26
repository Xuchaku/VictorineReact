import Settings from "./Settings";
import UserSocket from "./UserSocket";
type GameSettings = Settings & {
  host: string;
  imgUrl: string;
  countPlayer: number;
  currentPlayers: UserSocket[];
  uniqId: string;
  type: string;
};
export default GameSettings;
