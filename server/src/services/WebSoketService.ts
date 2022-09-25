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
            this.broadcastMessageExcludeOne(
              { room: roomSettings, type: "create/room" },
              ws
            );
            break;
          }
          case "get/rooms": {
            ws.send(JSON.stringify({ rooms: this.rooms, type: "get/rooms" }));
            //this.broadcastMessage({rooms: this.rooms, type: })
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
            this.broadcastMessageExcludeOne(
              { rooms: this.rooms, type: "get/rooms" },
              ws
            );
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
