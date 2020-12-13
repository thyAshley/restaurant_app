import React, { useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome5 } from '@expo/vector-icons';

import Login from '../screens/Login';
import Register from '../screens/Register';
import Home from '../screens/Home';
import colorScheme from '../util/color';
import RestaurantScreen from '../screens/RestaurantScreen';
import BookingScreen from '../screens/BookingScreen';
import ReviewScreen from '../screens/ReviewScreen';
import RegisterOption from '../screens/RegisterOption';
import RestaurantHome from '../screens/RestaurantHome';
import NewRestaurant from '../screens/NewRestaurant';
import ImageScreen from '../screens/ImageScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Owner = createBottomTabNavigator();
const Restaurant = createStackNavigator();
const OwnerReg = createStackNavigator();
const Booking = createStackNavigator();

export const RestaurantNavigator = ({ hide, setBook }) => {
  const setBookingAlert = () => {
    return setBook(true);
  };
  return (
    <Restaurant.Navigator>
      <Restaurant.Screen
        name="home"
        children={() => <Home hide={hide} setBook={setBookingAlert} />}
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

export const AuthStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="login" component={Login} />
      <Stack.Screen
        name="register"
        component={RegisterOption}
        options={{
          headerShown: true,
          title: 'New User Registration',
          headerTitleAlign: 'center',
          headerTintColor: colorScheme.white,
          headerStyle: {
            backgroundColor: colorScheme.primary,
          },
          headerLeft: null,
        }}
      />
      <Stack.Screen
        name="regRest"
        component={Register}
        options={{
          headerShown: true,
          title: 'New Restaurant Registration',
          headerTitleAlign: 'center',
          headerTintColor: colorScheme.white,
          headerStyle: {
            backgroundColor: colorScheme.primary,
          },
          headerLeft: null,
        }}
      />
      <Stack.Screen
        name="registerDiner"
        component={Register}
        options={{
          headerShown: true,
          title: 'New User',
          headerTitleAlign: 'center',
          headerTintColor: colorScheme.white,
          headerStyle: {
            backgroundColor: colorScheme.primary,
          },
          headerLeft: null,
        }}
      />
    </Stack.Navigator>
  );
};

export const OwnerRegisterStack = () => {
  return (
    <OwnerReg.Navigator
      screenOptions={{
        headerShown: true,
        headerTintColor: colorScheme.white,
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: colorScheme.primary,
        },
      }}
    >
      <OwnerReg.Screen
        name="homeStack"
        component={OwnerStackNavigator}
        options={{ headerTitle: 'Home' }}
      />
      <OwnerReg.Screen
        name="reg"
        component={NewRestaurant}
        options={{
          headerLeft: null,
          headerTitle: 'Register Restaurant',
        }}
      />
      <OwnerReg.Screen
        name="addImage"
        component={ImageScreen}
        options={{
          headerLeft: null,
          headerTitle: 'Add Images',
        }}
      />
    </OwnerReg.Navigator>
  );
};

export const OwnerStackNavigator = () => {
  return (
    <Owner.Navigator
      screenOptions={{
        headerShown: true,
        headerTintColor: colorScheme.white,
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: colorScheme.primary,
        },
      }}
    >
      <Booking.Screen name="home" component={RestaurantHome} />
      <Booking.Screen name="account" component={RestaurantHome} />
    </Owner.Navigator>
  );
};
export const BookingStackNavigator = ({ book, setBook }) => {
  return (
    <Booking.Navigator
      screenOptions={{
        headerShown: true,
        headerTintColor: colorScheme.white,
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: colorScheme.primary,
        },
      }}
    >
      <Booking.Screen
        name="mybooking"
        children={() => <BookingScreen book={book} setBook={setBook} />}
      />
      <Booking.Screen
        name="reviews"
        children={() => <ReviewScreen />}
        options={{ headerTitle: 'Reviews' }}
      />
    </Booking.Navigator>
  );
};

export const TabStackNavigator = () => {
  const [hide, setHide] = useState(false);
  const [newBook, setNewBook] = useState(false);
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: colorScheme.primary,
        inactiveTintColor: colorScheme.secondary,
      }}
    >
      <Tab.Screen
        name="home"
        children={() => (
          <RestaurantNavigator hide={setHide} setBook={setNewBook} />
        )}
        options={{
          tabBarVisible: hide ? false : true,
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="home" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="booking"
        children={() => (
          <BookingStackNavigator setBook={setNewBook} book={newBook} />
        )}
        options={{
          tabBarLabel: 'Booking',
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="bookmark" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="account"
        component={Home}
        options={{
          tabBarLabel: 'Account',
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="user-alt" size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
