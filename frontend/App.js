import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";

import {
  AuthStackNavigator,
  TabStackNavigator,
  OwnerStackNavigator,
  OwnerRegisterStack,
} from "../frontend/navigator/navigator";
import AuthContext from "./context/AuthContext";

//expo-image-picker
export default function App() {
  const [user, setUser] = useState("");
  const [owner, setOwner] = useState(false);
  const [restaurant, setRestaurant] = useState(false);

  // useEffect(() => {
  //   restoreUser();
  // }, []);

  // const restoreUser = async () => {
  //   try {
  //     const token = await authStorage.getUser();
  //     const decoded = await jwtDecode(token);
  //     if (decoded.id) {
  //       setUser(decoded.id);
  //     }
  //   } catch (error) {}
  // };
  return (
    <AuthContext.Provider
      value={{ user, setUser, owner, setOwner, restaurant, setRestaurant }}
    >
      <NavigationContainer>
        {!user ? (
          <AuthStackNavigator />
        ) : owner ? (
          <OwnerRegisterStack />
        ) : (
          <TabStackNavigator />
        )}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
