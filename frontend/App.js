import React, { useContext, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";

import {
  AuthStackNavigator,
  TabStackNavigator,
  OwnerStackNavigator,
} from "../frontend/navigator/navigator";
import AuthContext from "./context/AuthContext";
import authStorage from "./auth/authstorage";
import jwtDecode from "jwt-decode";
import useAuth from "./auth/useAuth";

//expo-image-picker
export default function App() {
  const [user, setUser] = useState("");
  const [owner, setOwner] = useState(false);

  useEffect(() => {
    restoreUser();
  }, []);

  const restoreUser = async () => {
    try {
      const token = await authStorage.getUser();
      const decoded = await jwtDecode(token);
      if (decoded.id) {
        setUser(decoded.id);
      }
    } catch (error) {}
  };
  return (
    <AuthContext.Provider value={{ user, setUser, owner, setOwner }}>
      <NavigationContainer>
        {!user ? (
          <AuthStackNavigator />
        ) : owner ? (
          <OwnerStackNavigator />
        ) : (
          <TabStackNavigator />
        )}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
