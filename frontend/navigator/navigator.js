import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";

import Login from "../screens/Login";
import Register from "../screens/Register";
import Home from "../screens/Home";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

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

const TabStackNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="home" component={Home} />
        <Tab.Screen name="booking" component={Home} />
        <Tab.Screen name="account" component={Home} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

module.exports = { AuthStackNavigator, TabStackNavigator };
