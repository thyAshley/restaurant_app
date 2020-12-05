import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import UserInputBox from "../components/UserInputBox";
import UserInputButton from "../components/UserInputButton";
import colorScheme from "../util/color";

export default function CreateRestaurant({
  restaurant,
  setRestaurant,
  location,
  setLocation,
  cuisine,
  setCuisine,
  capacity,
  setCapacity,
  startTime,
  setStartTime,
  endTime,
  setEndTime,
  ambience,
  setAmbience,
}) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <Text style={styles.appTitle}>Rest Assured</Text>
      <View style={styles.secondaryContainer}>
        <Text style={{ color: colorScheme.primary }}>
          Please provide us with your restaurant Details
        </Text>
        <UserInputBox
          placeholder="Restaurant Name"
          state={restaurant}
          setState={setRestaurant}
          keyboard="email-address"
        />
        <UserInputBox
          placeholder="Location"
          state={location}
          setState={setLocation}
          keyboard="email-address"
        />
        <UserInputBox
          placeholder="Cuisine"
          state={cuisine}
          setState={setCuisine}
        />
        <UserInputBox
          placeholder="Capacity"
          state={capacity}
          setState={setCapacity}
        />
        <UserInputBox
          placeholder="Start Time"
          state={startTime}
          setState={setStartTime}
        />
        <UserInputBox
          placeholder="End Time"
          state={endTime}
          setState={setEndTime}
        />
        <UserInputBox
          placeholder="Ambience"
          state={ambience}
          setState={setAmbience}
        />
        <TouchableWithoutFeedback>
          <View style={styles.btnContainer}>
            <UserInputButton
              text="Next"
              location="left"
              icon="angle-double-right"
              color={colorScheme.secondary}
            />
          </View>
        </TouchableWithoutFeedback>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  appTitle: {
    color: colorScheme.primary,
    fontSize: 26,
    textAlign: "center",
  },
  btnContainer: {
    flex: 1,
    margin: 20,
  },
  container: {
    backgroundColor: colorScheme.background,
    flex: 1,
  },
  hasAccount: {
    color: colorScheme.textLight,
    textAlign: "center",
    margin: 5,
  },
  secondaryContainer: {
    backgroundColor: colorScheme.white,
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
    marginTop: 50,
    flex: 1,
    padding: 30,
  },
  header: {
    color: colorScheme.secondary,
    fontSize: 22,
    marginVertical: 20,
  },
});
