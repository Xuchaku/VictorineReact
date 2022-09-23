import { createContext } from "react";
import WebSocketApiService from "../API/WebSocketApiService";

const WebSocketContext = createContext<null | WebSocketApiService>(null);
export default WebSocketContext;
