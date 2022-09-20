import Link from "../types/Link/Link";
import Categorie from "../types/Categorie/Categorie";
export const Links: Link[] = [
  { href: "/", text: "Главная" },
  { href: "/menu", text: "Меню" },
  { href: "/game", text: "Игра" },
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
export const TOTAL_STEP_MENU = 3;
export const POINT_API = "http://localhost:8000";
export const POINT_API_LOGIN = "/user/login";
export const POINT_API_REGISTRATE = "/user/registration";
export const POINT_API_LOGOUT = "/user/logout";
