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
  console.log(color);
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
