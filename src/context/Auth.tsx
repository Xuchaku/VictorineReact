import { createContext } from "react";
type AuthContext = {
  isAuth: boolean;
  setIsAuthWrapper: (data: boolean) => void;
};

const Auth = createContext<AuthContext>({
  isAuth: false,
  setIsAuthWrapper: () => {},
});
export default Auth;
