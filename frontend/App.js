import React, { useState } from "react";

import { AuthStackNavigator } from "../frontend/navigator/navigator";
import AuthContext from "./context/AuthContext";

//expo-image-picker
export default function App() {
  const [user, setUser] = useState("123");
  return (
    <AuthContext.Provider value={[user, setUser]}>
      <AuthStackNavigator />
    </AuthContext.Provider>
  );
}
