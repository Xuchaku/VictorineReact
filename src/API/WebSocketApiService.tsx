import { POINT_WEBSOCKET } from "../constants/constants";
import UserSocket from "../types/UserSocket/UserSocket";
import store from "../store/store";
import Player from "../types/Player/Player";
import {
  TYPE_WEBSOCKET_CONNECT,
  TYPE_WEBSOCKET_ONLINE,
  TYPE_WEBSOCKET_EXIT,
} from "../constants/constants";
import { findInStore } from "../utils";
import {
  setPlayer,
  deletePlayer,
  clearAllPlayers,
} from "../store/playersSlice/playersSlice";
class WebSocketApiService {
  private socket: WebSocket | null = null;
  constructor() {
    this.socket = new WebSocket(POINT_WEBSOCKET);

    this.socket.onopen = (event) => {
      console.log("init");
      this.send(TYPE_WEBSOCKET_CONNECT);
    };

    this.socket.onmessage = (event) => {
      const data: Player = JSON.parse(event.data);
      switch (data.type) {
        case TYPE_WEBSOCKET_CONNECT: {
          const findPlayer = findInStore(data.login);
          if (!findPlayer) {
            store.dispatch(setPlayer(data));
            this.send(TYPE_WEBSOCKET_CONNECT);
          } else {
            this.send(TYPE_WEBSOCKET_ONLINE);
          }
          break;
        }
        case TYPE_WEBSOCKET_ONLINE: {
          const findPlayer = findInStore(data.login);
          if (!findPlayer) {
            store.dispatch(setPlayer(data));
          }
          break;
        }
        case TYPE_WEBSOCKET_EXIT: {
          console.log("DELETE");
          const findPlayer = findInStore(data.login);
          if (findPlayer) {
            store.dispatch(deletePlayer(data));
          }
          break;
        }
        default:
          break;
      }
    };

    this.socket.onclose = (event) => {};

    this.socket.onerror = (error) => {};
  }
  send(type: string) {
    const { user } = store.getState().user;
    const connectUser: UserSocket = {
      type,
      login: user.login,
      imgUrl: user.imgUrl,
    };
    console.log(type, connectUser);
    this.socket?.send(JSON.stringify(connectUser));
  }
  exit() {
    this.send(TYPE_WEBSOCKET_EXIT);
    store.dispatch(clearAllPlayers());
    this.socket?.close();
  }
}
export default WebSocketApiService;
