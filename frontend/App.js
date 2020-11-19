import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";

import {
  AuthStackNavigator,
  TabStackNavigator,
} from "../frontend/navigator/navigator";
import AuthContext from "./context/AuthContext";
import authStorage from "./auth/authstorage";

//expo-image-picker
export default function App() {
  const [user, setUser] = useState("");
  useEffect(() => {
    restoreUser();
  }, []);

  const restoreUser = async () => {
    const user = await authStorage.getUser();
    if (user) {
      setUser(user);
    }
  };
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <NavigationContainer>
        {!user ? <AuthStackNavigator /> : <TabStackNavigator />}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
