import React, { useState } from "react";
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import useAuth from "../auth/useAuth";

import ErrorMessage from "../components/ErrorMessage";

import UserInputBox from "../components/UserInputBox";
import UserInputButton from "../components/UserInputButton";
import { instance } from "../config/axios";
import colorScheme from "../util/color";

export default function Register({ navigation, route }) {
  const { login } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cfmPassword, setCfmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const clearAll = () => {
    setName("");
    setEmail("");
    setPassword("");
    setCfmPassword("");
    setLoading(false);
    setError("");
  };

  const submitHandler = async () => {
    setLoading(true);
    setError("");
    if (cfmPassword !== password) {
      setError("Entered Password Does Not Match");
      setLoading(false);
    }
    try {
      const isOwner = route.params.isOwner;
      const response = await instance.post("/v1/api/register", {
        name,
        email,
        password,
        isOwner,
      });
      login(response.data.token);
    } catch (error) {
      setError("Please check your inputs");
    }
    setLoading(false);
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <Text style={styles.appTitle}>Rest Assured</Text>
      <View style={styles.secondaryContainer}>
        <Text style={styles.header}>Create your account</Text>
        <UserInputBox
          placeholder="Name"
          icon="user-alt"
          state={name}
          setState={setName}
          colors={colorScheme.secondary}
        />
        <UserInputBox
          placeholder="Email"
          icon="mail-bulk"
          state={email}
          setState={setEmail}
          colors={colorScheme.secondary}
        />
        <UserInputBox
          placeholder="Password"
          icon="lock"
          state={password}
          setState={setPassword}
          colors={colorScheme.secondary}
          secret={true}
        />
        <UserInputBox
          placeholder="Confirm Password"
          icon="lock"
          state={cfmPassword}
          setState={setCfmPassword}
          colors={colorScheme.secondary}
          secret={true}
        />
        <ErrorMessage error={error} />
        <TouchableOpacity onPress={submitHandler}>
          <UserInputButton
            text="register"
            icon="angle-double-right"
            showSpinner={loading}
            style={{ marginBottom: 30, marginTop: 15 }}
            color={colorScheme.secondary}
          />
        </TouchableOpacity>
        <Text style={styles.hasAccount}>Already have an account?</Text>
        <TouchableOpacity
          onPress={() => {
            clearAll();
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
