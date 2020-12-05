import React, { useState, useContext } from "react";
import { SafeAreaView, Text, View, StyleSheet, StatusBar } from "react-native";

import AuthContext from "../context/AuthContext";

import CreateAccount from "../components/CreateAccount";
import CreateRestaurant from "../components/CreateRestaurant";

export default function RestaurantRegister({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [restaurant, setRestaurant] = useState("");
  const [location, setLocation] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [capacity, setCapacity] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [ambience, setAmbience] = useState("");

  const [showRegister, setShowRegister] = useState(true);
  const [showRestaurantDetails, setShowRestauranDetails] = useState(false);
  return (
    <View style={styles.container}>
      {showRegister && (
        <CreateAccount
          user={name}
          setUser={setName}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          navigation={navigation}
          next={setShowRestauranDetails}
          current={setShowRegister}
        />
      )}
      {showRestaurantDetails && (
        <CreateRestaurant
          restaurant={restaurant}
          setRestaurant={setRestaurant}
          location={location}
          setLocation={setLocation}
          cuisine={cuisine}
          setCuisine={setCuisine}
          capacity={capacity}
          setCapacity={setCapacity}
          startTime={startTime}
          setStartTime={setStartTime}
          endTime={endTime}
          setEndTime={setEndTime}
          ambience={ambience}
          setAmbience={setAmbience}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
