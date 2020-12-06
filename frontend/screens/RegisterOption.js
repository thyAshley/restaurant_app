import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";

import UserInputButton from "../components/UserInputButton";
import colorScheme from "../util/color";

export default function RegisterOption({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Are you a business Owner or Diner</Text>
      <Text style={styles.text}>Sign up with us now!</Text>
      <TouchableWithoutFeedback
        onPress={() => navigation.navigate("registerDiner")}
      >
        <View style={styles.btnContainer}>
          <UserInputButton
            text="Register As A Diner"
            color={colorScheme.secondary}
            location="center"
          />
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback
        onPress={() => navigation.navigate("regRest", { isOwner: true })}
      >
        <View style={styles.btnContainer}>
          <UserInputButton
            text="Register As A Business Owner"
            color={colorScheme.secondary}
            location="center"
          />
        </View>
      </TouchableWithoutFeedback>
      <Image style={styles.image} source={require("../assets/Burger.png")} />

      <Text style={styles.hasAccount}>Already have an account?</Text>
      <TouchableWithoutFeedback onPress={() => navigation.navigate("login")}>
        <View style={styles.btnContainer}>
          <UserInputButton
            text="sign in"
            location="center"
            color={colorScheme.primary}
          />
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  btnContainer: {
    marginVertical: 15,
    width: "90%",
  },
  container: {
    flex: 1,
    margin: 25,
    alignItems: "center",
  },
  hasAccount: {
    marginTop: 30,
    color: colorScheme.secondary,
  },
  text: {
    color: colorScheme.primary,
    fontSize: 18,
    padding: 5,
  },
  image: {
    margin: 30,
  },
});
