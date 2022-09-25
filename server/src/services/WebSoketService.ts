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
          case "connect":
            this.broadcastMessage(fromUser as UserSocket, ws);
            break;
          case "online":
            this.broadcastMessage(fromUser as UserSocket, ws);
            break;
          case "exit":
            this.broadcastMessage(fromUser as UserSocket, ws);
            break;
          case "create/room": {
            const roomSettings: GameSettings = fromUser as GameSettings;
            this.rooms.push(roomSettings);
            this.broadcastMessage(
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
    });
  }

  broadcastMessage(data: any, ws: WebSocket) {
    this.wss?.clients.forEach((client) => {
      if (ws != client) {
        client.send(JSON.stringify(data));
      }
    });
  }
}
