import React, { useState, useContext } from "react";
import { SafeAreaView, Text, View, StyleSheet, StatusBar } from "react-native";

import useAuth from "../auth/useAuth";
import AuthContext from "../context/AuthContext";
import UserInputBox from "../components/UserInputBox";
import UserInputButton from "../components/UserInputButton";
import colorScheme from "../util/color";

export default function RestaurantRegister() {
  const { user, setUser } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <Text style={styles.appTitle}>Rest Assured</Text>
      <View style={styles.secondaryContainer}>
        <Text style={styles.welcome}>Welcome Back</Text>
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
    flex: 1,
    padding: 30,
  },
  header: {
    color: colorScheme.secondary,
    fontSize: 22,
    marginVertical: 20,
  },
});
