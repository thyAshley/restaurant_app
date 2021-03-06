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

export default function CreateAccount({
  user,
  setUser,
  email,
  setEmail,
  password,
  setPassword,
  navigation,
  next,
  current,
}) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <Text style={styles.appTitle}>Rest Assured</Text>
      <View style={styles.secondaryContainer}>
        <UserInputBox
          placeholder="Enter Name"
          icon="user-alt"
          state={user}
          setState={setUser}
          keyboard="email-address"
        />
        <UserInputBox
          placeholder="Enter Email"
          icon="user-alt"
          state={email}
          setState={setEmail}
          keyboard="email-address"
        />
        <UserInputBox
          placeholder="Enter Password"
          icon="lock"
          secret={true}
          state={password}
          secret={true}
          setState={setPassword}
        />

        <TouchableWithoutFeedback
          onPress={() => {
            if (user && email && password) {
              current(false);
              next(true);
            } else {
              console.log("nothing");
            }
          }}
        >
          <View style={styles.btnContainer}>
            <UserInputButton
              text="Next"
              location="left"
              icon="angle-double-right"
              color={colorScheme.secondary}
            />
          </View>
        </TouchableWithoutFeedback>

        <Text style={styles.hasAccount}>Already have an account?</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("login");
          }}
        >
          <UserInputButton
            text="sign in"
            location="center"
            color={colorScheme.primary}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  appTitle: {
    color: colorScheme.primary,
    fontSize: 26,
    textAlign: "center",
    marginVertical: 50,
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
