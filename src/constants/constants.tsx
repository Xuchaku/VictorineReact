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
];
export const TOTAL_STEP_MENU = 3;
