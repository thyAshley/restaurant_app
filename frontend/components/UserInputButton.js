import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

import colorScheme from "../util/color";
import Spinner from "./Spinner";
const UserInputButton = ({
  text,
  color,
  location,
  icon,
  showSpinner,
  style,
}) => {
  return (
    <View
      style={[
        styles.container,
        { backgroundColor: color || colorScheme.primary },
        { ...style },
      ]}
    >
      <Text style={[styles.btn, { textAlign: location || "left" }]}>
        {text}
      </Text>
      {showSpinner ? (
        <Spinner styles={styles.icon} />
      ) : (
        icon && (
          <FontAwesome5
            name={icon}
            size={20}
            color={colorScheme.white}
            style={styles.icon}
          />
        )
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  btn: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    padding: 15,
    flex: 1,
    textTransform: "uppercase",
  },
  container: {
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    position: "absolute",
    right: 20,
  },
});

export default UserInputButton;
