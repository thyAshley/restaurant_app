import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import Login from "../screens/Login";
import Register from "../screens/Register";

const Stack = createStackNavigator();

const AuthStackNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="login" component={Login} />
        <Stack.Screen name="register" component={Register} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

module.exports = { AuthStackNavigator };
