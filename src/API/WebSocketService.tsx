import { POINT_WEBSOCKET } from "../constants/constants";
class WebSocketService {
  private socket: WebSocket;
  private isInit: boolean = false;
  constructor(point: string) {
    this.socket = new WebSocket(point);
    this.socket.onopen = (event) => {
      console.log("open ws");
      this.isInit = true;
    };
    this.socket.onmessage = (event) => {
      console.log("data ws", event.data);
    };
    this.socket.onclose = (event) => {
      console.log("close ws");
    };
    this.socket.onerror = (error) => {};
  }
  send(data: any) {
    this.socket.send(JSON.stringify(data));
  }
}
export const webSocketApi = new WebSocketService(POINT_WEBSOCKET);
