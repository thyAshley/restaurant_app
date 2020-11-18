import React, { useState } from "react";
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";

import UserInputBox from "../components/UserInputBox";
import UserInputButton from "../components/UserInputButton";
import colorScheme from "../util/color";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

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
        />
        <UserInputBox
          placeholder="Enter Password"
          icon="lock"
          secret={true}
          state={password}
          secret={true}
          setState={setPassword}
        />
        <TouchableOpacity onPress={() => setLoading(!loading)}>
          <UserInputButton
            text="login"
            icon="angle-double-right"
            showSpinner={loading}
            style={{ marginVertical: 30 }}
          />
        </TouchableOpacity>

        <Text style={styles.forgotPassword}>Forgot Password?</Text>
        <Text style={styles.newAccount}>Don't have an account?</Text>
        <UserInputButton
          text="create an account"
          location="center"
          color={colorScheme.secondary}
          style={{ marginVertical: 10 }}
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
  forgotPassword: {
    color: colorScheme.secondary,
    textAlign: "center",
    textDecorationLine: "underline",
    marginBottom: 30,
  },
  newAccount: {
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
  welcome: {
    color: colorScheme.primary,
    fontSize: 22,
    marginVertical: 20,
  },
});
