import Register from "../types/Registrer/Register";
export const isRegistrationDataValid = (data: Register) => {
  return (
    data.login.length > 5 &&
    data.password.length > 5 &&
    data.password == data.verifyPassword
  );
};
