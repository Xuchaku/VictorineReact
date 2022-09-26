import Link from "../types/Link/Link";
import Categorie from "../types/Categorie/Categorie";
export const Links: Link[] = [
  { href: "/", text: "Главная" },
  { href: "/menu", text: "Меню" },
  { href: "/rooms", text: "Игры" },
];
export const Categories: Categorie[] = [
  { type: "films", text: "Фильмы" },
  { type: "games", text: "Игры" },
  { type: "serials", text: "Сериалы" },
  { type: "akters", text: "Актеры" },
  { type: "anime", text: "Аниме" },
  { type: "cartoon", text: "Мультфильмы" },
  { type: "people", text: "Люди" },
];
export const BackgroundHashMap = {
  error: "red",
  default: "#07b1ca",
  help: "#6357a9",
};
export const TOTAL_STEP_MENU = 3;
export const POINT_API = "http://localhost:8000";
export const POINT_API_LOGIN = "/user/login";
export const POINT_API_REGISTRATE = "/user/registration";
export const POINT_API_LOGOUT = "/user/logout";
export const POINT_API_ONLINE = "/user/online";
export const POINT_API_GET_USER = "/user/info";
export const POINT_API_SET_USER = "/user/setinfo";

export const POINT_WEBSOCKET = "ws://localhost:7777";
export const TYPE_WEBSOCKET_CONNECT = "connect";
export const TYPE_WEBSOCKET_ONLINE = "online";
export const TYPE_WEBSOCKET_EXIT = "exit";
export const TYPE_WEBSOCKET_CREATE_ROOM = "create/room";
export const TYPE_WEBSOCKET_GET_ROOMS = "get/rooms";
export const TYPE_WEBSOCKET_ROOM_CONNECT = "connect/room";
export const TYPE_WEBSOCKET_ROOM_EXIT = "exit/room";
export const TYPE_WEBSOCKET_ROOM_LEAVE = "leave/room";
export const TYPE_WEBSOCKET_ROOM_READY = "ready/room";
