import React, { useState } from "react";

import {
  AuthStackNavigator,
  TabStackNavigator,
} from "../frontend/navigator/navigator";
import AuthContext from "./context/AuthContext";

//expo-image-picker
export default function App() {
  const [user, setUser] = useState("");
  console.log(user);
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {!user ? <AuthStackNavigator /> : <TabStackNavigator />}
    </AuthContext.Provider>
  );
}
