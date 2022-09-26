import {
  POINT_WEBSOCKET,
  TYPE_WEBSOCKET_CREATE_ROOM,
  TYPE_WEBSOCKET_GET_ROOMS,
  TYPE_WEBSOCKET_ROOM_CONNECT,
  TYPE_WEBSOCKET_ROOM_EXIT,
  TYPE_WEBSOCKET_ROOM_LEAVE,
  TYPE_WEBSOCKET_ROOM_READY,
} from "../constants/constants";
import UserSocket from "../types/UserSocket/UserSocket";
import store from "../store/store";
import Player from "../types/Player/Player";
import {
  TYPE_WEBSOCKET_CONNECT,
  TYPE_WEBSOCKET_ONLINE,
  TYPE_WEBSOCKET_EXIT,
} from "../constants/constants";
import { findInStore, hashRoom } from "../utils";
import { setRoom, setRooms } from "../store/roomsSlice/roomsSlice";
import {
  setPlayer,
  deletePlayer,
  clearAllPlayers,
} from "../store/playersSlice/playersSlice";
import Settings from "../types/Settings/Settings";
import GameSettings from "../types/GameSettings/GameSettings";
class WebSocketApiService {
  private socket: WebSocket | null = null;
  private createdRoom: GameSettings | null = null;
  constructor() {
    this.socket = new WebSocket(POINT_WEBSOCKET);

    this.socket.onopen = (event) => {
      const { user } = store.getState().user;
      const connectUser: UserSocket = {
        type: TYPE_WEBSOCKET_CONNECT,
        login: user.login,
        imgUrl: user.imgUrl,
      };
      this.send(connectUser);
      this.send({ ...connectUser, type: TYPE_WEBSOCKET_GET_ROOMS });
    };

    this.socket.onmessage = (event) => {
      const data: any = JSON.parse(event.data);
      switch (data.type) {
        case TYPE_WEBSOCKET_CONNECT: {
          const findPlayer = findInStore(data.login);
          if (!findPlayer) {
            store.dispatch(setPlayer(data));
            const { user } = store.getState().user;
            const connectUser: UserSocket = {
              type: TYPE_WEBSOCKET_CONNECT,
              login: user.login,
              imgUrl: user.imgUrl,
            };
            this.send(connectUser);
          } else {
            const { user } = store.getState().user;
            const connectUser: UserSocket = {
              type: TYPE_WEBSOCKET_ONLINE,
              login: user.login,
              imgUrl: user.imgUrl,
            };
            this.send(connectUser);
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
          const findPlayer = findInStore(data.login);
          if (findPlayer) {
            store.dispatch(deletePlayer(data));
          }
          break;
        }
        case TYPE_WEBSOCKET_CREATE_ROOM: {
          const room = data.room as GameSettings;
          store.dispatch(setRoom(room));
          break;
        }
        case TYPE_WEBSOCKET_GET_ROOMS: {
          const rooms = data.rooms as GameSettings[];
          store.dispatch(setRooms(rooms));
          break;
        }
        default:
          break;
      }
    };

    this.socket.onclose = (event) => {};

    this.socket.onerror = (error) => {};
  }
  createRoom(settings: Settings, id: string) {
    const { user } = store.getState().user;
    this.createdRoom = {
      ...settings,
      host: user.login,
      countReadyForGame: 0,
      imgUrl: user.imgUrl,
      currentPlayers: [],
      countPlayer: 1,
      uniqId: id,
      type: TYPE_WEBSOCKET_CREATE_ROOM,
    };
    this.send(this.createdRoom);
  }
  closeRoom() {
    if (this.createdRoom) {
      this.socket?.close(1000, this.createdRoom?.uniqId);
      this.createdRoom = null;
    }
  }
  leaveLobby(uniqId: string) {
    const { user } = store.getState().user;
    const leaveFromUser: UserSocket = {
      login: user.login,
      imgUrl: user.imgUrl,
      id: uniqId,
      type: TYPE_WEBSOCKET_ROOM_LEAVE,
    };
    this.send(leaveFromUser);
  }
  readyGame(uniqId: string) {
    const { user } = store.getState().user;
    const readyForGameUser: UserSocket = {
      login: user.login,
      imgUrl: user.imgUrl,
      id: uniqId,
      type: TYPE_WEBSOCKET_ROOM_READY,
    };
    this.send(readyForGameUser);
  }
  exitLobby(uniqId: string) {
    if (this.createdRoom) {
      const { user } = store.getState().user;
      const exitLobby: UserSocket = {
        login: user.login,
        imgUrl: user.imgUrl,
        id: uniqId,
        type: TYPE_WEBSOCKET_ROOM_EXIT,
      };
      this.send(exitLobby);
      this.createdRoom = null;
    }
  }
  send(data: UserSocket | GameSettings) {
    this.socket?.send(JSON.stringify(data));
  }
  connectToRoom(id: string) {
    const { user } = store.getState().user;

    const connectUser: UserSocket = {
      type: TYPE_WEBSOCKET_ROOM_CONNECT,
      login: user.login,
      imgUrl: user.imgUrl,
      id,
    };
    this.send(connectUser);
  }
  exit() {
    const { user } = store.getState().user;

    const connectUser: UserSocket = {
      type: TYPE_WEBSOCKET_EXIT,
      login: user.login,
      imgUrl: user.imgUrl,
    };
    this.send(connectUser);
    store.dispatch(clearAllPlayers());
    this.closeRoom();
    //this.socket?.removeEventListener("open");
  }
}
export default WebSocketApiService;
