import { useContext } from "react";
import jwtDecode from "jwt-decode";

import AuthContext from "../context/AuthContext";
import authStorage from "./authstorage";

const useAuth = () => {
  const { user, setUser } = useContext(AuthContext);

  const login = async (token) => {
    const decoded = await jwtDecode(token);
    setUser(decoded.id);
    authStorage.saveToken(token);
  };

  const logout = () => {
    setUser(null);
    authStorage.removeToken();
  };

  return { login, logout };
};

export default useAuth;