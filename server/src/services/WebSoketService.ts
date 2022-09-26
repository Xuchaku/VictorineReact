import ws, { Server, WebSocket } from "ws";
import UserSocket from "../types/UserSocket";
import GameSettings from "../types/GameSettings";
export class WebSocketServer {
  private wss: Server<WebSocket> | null = null;
  private rooms: GameSettings[] = [];
  constructor(port: number) {
    this.wss = new ws.Server({ port: port });
    this.wss.on("connection", (ws) => {
      ws.on("message", (message) => {
        const fromUser: any = JSON.parse(message.toString());
        switch (fromUser.type) {
          case "connect": {
            this.broadcastMessageExcludeOne(fromUser as UserSocket, ws);
            this.clearRoomByHost(fromUser as UserSocket);
            console.log("here");
            break;
          }
          case "online":
            this.broadcastMessageExcludeOne(fromUser as UserSocket, ws);
            break;
          case "exit":
            this.broadcastMessageExcludeOne(fromUser as UserSocket, ws);
            break;
          case "create/room": {
            const roomSettings: GameSettings = fromUser as GameSettings;
            this.rooms.push(roomSettings);
            this.broadcastMessage({ room: roomSettings, type: "create/room" });
            break;
          }
          case "get/rooms": {
            ws.send(JSON.stringify({ rooms: this.rooms, type: "get/rooms" }));
            //this.broadcastMessage({rooms: this.rooms, type: })
            break;
          }
          case "exit/room": {
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
                this.broadcastMessage({ rooms: this.rooms, type: "get/rooms" });
                // this.broadcastMessageExcludeOne(
                //   { rooms: this.rooms, type: "get/rooms" },
                //   ws
                // );
              }
            }
            break;
          }
          case "leave/room": {
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
              this.broadcastMessage({ rooms: this.rooms, type: "get/rooms" });
            }
            break;
          }
          case "ready/room": {
            const user = fromUser as UserSocket;
            const purposeRoom = this.rooms.find((room) => {
              return room.uniqId == user.id;
            });
            if (purposeRoom) {
              purposeRoom.countReadyForGame += 1;
            }
            this.broadcastMessage({ rooms: this.rooms, type: "get/rooms" });
            break;
          }
          case "connect/room": {
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
              // не добавлять
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
                this.broadcastMessage({ rooms: this.rooms, type: "get/rooms" });
              }
            }

            break;
          }
        }
      });
      ws.onclose = (event) => {
        console.log(event.code);
        switch (event.code) {
          case 1001: {
            break;
          }
          case 1000: {
            console.log("here", event.reason);
            const uniqId = event.reason;
            const roomsExcludeOne = this.rooms.filter((room) => {
              return room.uniqId != uniqId;
            });
            this.rooms = roomsExcludeOne;
            // this.broadcastMessageExcludeOne(
            //   { rooms: this.rooms, type: "get/rooms" },
            //   ws
            // );
            this.broadcastMessage({ rooms: this.rooms, type: "get/rooms" });
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
    this.broadcastMessage({ rooms: this.rooms, type: "get/rooms" });
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
