import React, { useContext, useState } from "react";
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { instance } from "../config/axios";
import ErrorMessage from "../components/ErrorMessage";
import UserInputBox from "../components/UserInputBox";
import UserInputButton from "../components/UserInputButton";
import colorScheme from "../util/color";
import { authStorage } from "../auth/authstorage";
import AuthContext from "../context/AuthContext";
import useAuth from "../auth/useAuth";

export default function Login({ navigation }) {
  const { user, setUser } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();

  // const clearAll = async () => {
  //   setEmail("");
  //   setPassword("");
  //   setLoading(false);
  //   setError("");
  // };

  const submitHandler = async () => {
    setLoading(true);
    setError("");
    try {
      const result = await instance.post("/v1/api/login", {
        email: email,
        password: password,
      });
      if (result.data) {
        await login(result.data.token);
      }
    } catch (error) {
      setError("failed to login");
      setLoading(false);
    }
  };
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
        <ErrorMessage error={error} />
        <TouchableOpacity onPress={submitHandler}>
          <UserInputButton
            text="login"
            icon="angle-double-right"
            showSpinner={loading}
            style={{ marginVertical: 20 }}
          />
        </TouchableOpacity>

        <Text style={styles.forgotPassword}>Forgot Password?</Text>
        <Text style={styles.newAccount}>Don't have an account?</Text>
        <TouchableOpacity
          onPress={() => {
            clearAll();
            navigation.navigate("register");
          }}
        >
          <UserInputButton
            text="create an account"
            location="center"
            color={colorScheme.secondary}
            style={{ marginVertical: 10 }}
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
