import { useContext } from "react";
import jwtDecode from "jwt-decode";

import AuthContext from "../context/AuthContext";
import authStorage from "./authstorage";

const useAuth = () => {
  const { user, setUser, owner, setOwner } = useContext(AuthContext);

  const login = async (token) => {
    const decoded = await jwtDecode(token);
    await authStorage.saveToken(token);
    setOwner(decoded.isOwner);
    setUser(decoded.id);
  };

  const logout = async () => {
    setUser(null);
    await authStorage.removeToken();
  };

  return { login, logout, owner, setOwner };
};

export default useAuth;
