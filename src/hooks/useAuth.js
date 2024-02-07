import { useContext, useDebugValue } from "react";
import AuthContext from "../context/AuthProvider";

const useAuth = () => {
  const { user } = useContext(AuthContext);
  useDebugValue(user, (user) => (user.email ? "logged in" : "logged out"));
  return useContext(AuthContext);
};

export default useAuth;
