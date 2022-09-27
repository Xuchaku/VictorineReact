import ws, { Server, WebSocket } from "ws";
import fs from "fs";
import UserSocket from "../types/UserSocket";
import GameSettings from "../types/GameSettings";
import {
  TYPE_WEBSOCKET_CONNECT,
  TYPE_WEBSOCKET_CREATE_ROOM,
  TYPE_WEBSOCKET_EXIT,
  TYPE_WEBSOCKET_GET_ROOMS,
  TYPE_WEBSOCKET_ONLINE,
  TYPE_WEBSOCKET_ROOM_CONNECT,
  TYPE_WEBSOCKET_ROOM_EXIT,
  TYPE_WEBSOCKET_ROOM_LEAVE,
  TYPE_WEBSOCKET_ROOM_READY,
} from "../constants/constants";
import Game from "../types/Game";
export class WebSocketServer {
  private wss: Server<WebSocket> | null = null;
  private rooms: GameSettings[] = [];
  private games: Game[] = [];
  constructor(port: number) {
    this.wss = new ws.Server({ port: port });
    this.wss.on("connection", (ws) => {
      ws.on("message", (message) => {
        const fromUser: any = JSON.parse(message.toString());
        switch (fromUser.type) {
          case TYPE_WEBSOCKET_CONNECT: {
            this.broadcastMessageExcludeOne(fromUser as UserSocket, ws);
            this.clearRoomByHost(fromUser as UserSocket);
            break;
          }
          case TYPE_WEBSOCKET_ONLINE:
            this.broadcastMessageExcludeOne(fromUser as UserSocket, ws);
            break;
          case TYPE_WEBSOCKET_EXIT:
            this.broadcastMessageExcludeOne(fromUser as UserSocket, ws);
            break;
          case TYPE_WEBSOCKET_CREATE_ROOM: {
            const roomSettings: GameSettings = fromUser as GameSettings;
            this.rooms.push(roomSettings);
            this.broadcastMessage({
              room: roomSettings,
              type: TYPE_WEBSOCKET_CREATE_ROOM,
            });
            break;
          }
          case TYPE_WEBSOCKET_GET_ROOMS: {
            ws.send(
              JSON.stringify({
                rooms: this.rooms,
                type: TYPE_WEBSOCKET_GET_ROOMS,
              })
            );
            break;
          }
          case TYPE_WEBSOCKET_ROOM_EXIT: {
            const user = fromUser as UserSocket;
            const findRoom = this.rooms.find((room) => {
              return room.uniqId == user.id;
            });
            if (findRoom) {
              const isHost = findRoom.host == user.login;
              if (isHost) {
                const roomsExcludeOne = this.rooms.filter((room) => {
                  return room.uniqId != user.id;
                });
                this.rooms = roomsExcludeOne;
                this.broadcastMessage({
                  rooms: this.rooms,
                  type: TYPE_WEBSOCKET_GET_ROOMS,
                });
              }
            }
            break;
          }
          case TYPE_WEBSOCKET_ROOM_LEAVE: {
            const user = fromUser as UserSocket;
            const purposeRoom = this.rooms.find((room) => {
              return room.uniqId == user.id;
            });
            if (purposeRoom) {
              if (purposeRoom.countPlayer == purposeRoom.countReadyForGame) {
                purposeRoom.countReadyForGame -= 1;
              }
              purposeRoom.countPlayer -= 1;
              purposeRoom.currentPlayers = purposeRoom.currentPlayers.filter(
                (player) => {
                  return player.login != user.login;
                }
              );
              this.broadcastMessage({
                rooms: this.rooms,
                type: TYPE_WEBSOCKET_GET_ROOMS,
              });
            }
            break;
          }
          case TYPE_WEBSOCKET_ROOM_READY: {
            const user = fromUser as UserSocket;
            const purposeRoom = this.rooms.find((room) => {
              return room.uniqId == user.id;
            });
            if (purposeRoom) {
              purposeRoom.countReadyForGame += 1;
            }
            if (
              purposeRoom?.countReadyForGame == Number(purposeRoom?.players)
            ) {
              const { data } = JSON.parse(
                fs.readFileSync(
                  __dirname + `/../fakeDataBase/${purposeRoom.categorie}.json`,
                  "utf8"
                )
              );
              const newGame: Game = {
                uniqId: purposeRoom.host + purposeRoom.uniqId,
                questions: data,
              };
              this.games.push(newGame);
              const dataForUser = [];
              for (const question of data) {
                const { imgUrl, mvpLogin, shortestTime, timeToThink } =
                  question;
                dataForUser.push({
                  imgUrl,
                  mvpLogin,
                  shortestTime,
                  timeToThink,
                });
              }

              this.broadcastMessage({
                dataForGame: dataForUser,
                uniqId: newGame.uniqId,
                type: "get/data/play",
              });
              break;
            }
            this.broadcastMessage({
              rooms: this.rooms,
              type: TYPE_WEBSOCKET_GET_ROOMS,
            });
            break;
          }
          case TYPE_WEBSOCKET_ROOM_CONNECT: {
            const user = fromUser as UserSocket;
            const loginsArr = this.rooms.map((room) => {
              return room.currentPlayers;
            });
            const logins = [];
            for (const loginArr of loginsArr) {
              logins.push(...loginArr);
            }
            const findUser = logins.find((currentLogin) => {
              return currentLogin.login == user.login;
            });
            if (findUser) {
            } else {
              const roomById = this.rooms.find((room) => {
                return room.uniqId == user.id;
              });
              if (
                roomById &&
                roomById.countPlayer != Number(roomById.players)
              ) {
                roomById.currentPlayers.push(user);
                roomById.countPlayer += 1;
                this.broadcastMessage({
                  rooms: this.rooms,
                  type: TYPE_WEBSOCKET_GET_ROOMS,
                });
              }
            }

            break;
          }
        }
      });
      ws.onclose = (event) => {
        switch (event.code) {
          case 1001: {
            break;
          }
          case 1000: {
            const uniqId = event.reason;
            const roomsExcludeOne = this.rooms.filter((room) => {
              return room.uniqId != uniqId;
            });
            this.rooms = roomsExcludeOne;
            this.broadcastMessage({
              rooms: this.rooms,
              type: TYPE_WEBSOCKET_GET_ROOMS,
            });
            break;
          }
          default:
            break;
        }
      };
    });
  }
  clearRoomByHost(user: UserSocket) {
    const roomsExcludeOne = this.rooms.filter((room) => {
      return user.login != room.host;
    });
    this.rooms = roomsExcludeOne;
    this.broadcastMessage({
      rooms: this.rooms,
      type: TYPE_WEBSOCKET_GET_ROOMS,
    });
  }
  broadcastMessage(data: any) {
    this.wss?.clients.forEach((client) => {
      client.send(JSON.stringify(data));
    });
  }
  broadcastMessageExcludeOne(data: any, ws: WebSocket) {
    this.wss?.clients.forEach((client) => {
      if (ws != client) {
        client.send(JSON.stringify(data));
      }
    });
  }
}
