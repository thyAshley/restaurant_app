import { useContext } from "react";
import jwtDecode from "jwt-decode";

import AuthContext from "../context/AuthContext";
import authStorage from "./authstorage";

const useAuth = () => {
  const { user, setUser, owner, setOwner } = useContext(AuthContext);

  const login = async (token) => {
    const decoded = await jwtDecode(token);
    console.log(decoded.isOwner);
    setUser(decoded.id);
    setOwner(decoded.isOwner);
    // console.log("added owner");
    authStorage.saveToken(token);
  };

  const logout = () => {
    setUser(null);
    authStorage.removeToken();
  };

  return { login, logout, owner, setOwner };
};

export default useAuth;
