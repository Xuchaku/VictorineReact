import store from "../store/store";
import Register from "../types/Registrer/Register";
export const isRegistrationDataValid = (data: Register): boolean => {
  return (
    data.login.length > 5 &&
    data.password.length > 5 &&
    data.password == data.verifyPassword
  );
};
export const generateRandomColor = (): string => {
  const color = Math.floor(Math.random() * 65536);

  return "#" + color.toString(16);
};
export const isValidNumeric = (
  input: string,
  leftEdge: number,
  rightEdge: number
): boolean => {
  const num = Number(input);
  const isNum = !isNaN(num);
  return isNum && num >= leftEdge && num <= rightEdge;
};
export const readFileAsync = async (file: File) => {
  return new Promise<string | null>((resolve, reject) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      if (!reader.result) reject("Error upload file");
      if (typeof reader.result == "string") resolve(reader.result);
    };
  });
};
export const findInStore = (field: string) => {
  const { players } = store.getState().players;
  const findPlayer = players.find((player) => player.login == field);
  return findPlayer;
};
export const hashRoom = (login: string, date: Date) => {
  const hash = login + date.toString();
  return hash;
};
