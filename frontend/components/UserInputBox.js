import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

import colorScheme from "../util/color";

const UserInputBox = ({
  colors,
  placeholder,
  icon,
  secret = false,
  state,
  setState,
  keyboard,
}) => {
  return (
    <View
      style={[
        styles.container,
        { borderBottomColor: colors || colorScheme.primary },
      ]}
    >
      <FontAwesome5
        style={styles.icon}
        name={icon}
        size={30}
        color={colors || colorScheme.primary}
      />
      <TextInput
        style={[styles.input, { color: colors || colorScheme.primary }]}
        placeholderTextColor={colors || colorScheme.primary}
        placeholder={placeholder}
        autoCapitalize="none"
        autoCorrect={false}
        secureTextEntry={secret}
        value={state}
        onChangeText={(text) => setState(text)}
        keyboardType={keyboard}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    flexDirection: "row",
    paddingTop: 20,
    paddingBottom: 5,
    width: "100%",
  },
  icon: {
    paddingLeft: 10,
    width: 70,
  },
  input: {
    fontSize: 16,
    width: "90%",
  },
});

export default UserInputBox;
