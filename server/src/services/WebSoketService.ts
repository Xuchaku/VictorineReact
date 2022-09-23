import ws, { Server, WebSocket } from "ws";
import UserSocket from "../types/UserSocket";
export class WebSocketServer {
  private wss: Server<WebSocket> | null = null;
  constructor(port: number) {
    this.wss = new ws.Server({ port: port });
    this.wss.on("connection", (ws) => {
      ws.on("message", (message) => {
        const fromUser: UserSocket = JSON.parse(message.toString());
        switch (fromUser.type) {
          case "connect":
            this.broadcastMessage(fromUser, ws);
            break;
        }
      });
    });
  }

  broadcastMessage(data: UserSocket, ws: WebSocket) {
    this.wss?.clients.forEach((client) => {
      if (ws != client) {
        client.send(JSON.stringify(data));
      }
    });
  }
}
