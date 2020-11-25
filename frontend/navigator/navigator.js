import React, { useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome5 } from "@expo/vector-icons";

import Login from "../screens/Login";
import Register from "../screens/Register";
import Home from "../screens/Home";
import colorScheme from "../util/color";
import RestaurantScreen from "../screens/RestaurantScreen";
import BookingScreen from "../screens/BookingScreen";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Restaurant = createStackNavigator();
const Booking = createStackNavigator();

const RestaurantNavigator = ({ hide }) => {
  return (
    <Restaurant.Navigator>
      <Restaurant.Screen
        name="home"
        children={() => <Home hide={hide} />}
        options={{ headerShown: false }}
      />
      <Restaurant.Screen
        name="restaurantdetails"
        component={RestaurantScreen}
        options={({ route }) => ({ title: route.params.name })}
      />
    </Restaurant.Navigator>
  );
};

const AuthStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="login" component={Login} />
      <Stack.Screen name="register" component={Register} />
    </Stack.Navigator>
  );
};

const BookingStackNavigator = () => {
  return (
    <Booking.Navigator
      screenOptions={{
        headerShown: true,
        headerTintColor: colorScheme.white,
        headerTitleAlign: "center",
        headerStyle: {
          backgroundColor: colorScheme.primary,
        },
      }}
    >
      <Booking.Screen name="My Booking" component={BookingScreen} />
    </Booking.Navigator>
  );
};

const TabStackNavigator = () => {
  const [hide, setHide] = useState(false);
  console.log(hide);
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: colorScheme.primary,
        inactiveTintColor: colorScheme.secondary,
      }}
    >
      <Tab.Screen
        name="home"
        children={() => <RestaurantNavigator hide={setHide} />}
        options={{
          tabBarVisible: hide ? false : true,
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="home" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="booking"
        component={BookingStackNavigator}
        options={{
          tabBarLabel: "Booking",
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="bookmark" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="account"
        component={Home}
        options={{
          tabBarLabel: "Account",
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="user-alt" size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

module.exports = { AuthStackNavigator, TabStackNavigator };
