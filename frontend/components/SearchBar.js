import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

import colorScheme from "../util/color";

export default function SearchBar() {
  return (
    <View style={styles.searchBar}>
      <FontAwesome5 name="search" size={24} color={colorScheme.secondary} />
      <TextInput
        placeholder="What do you want to eat today?"
        placeholderTextColor={colorScheme.placeholder}
        style={styles.input}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    marginHorizontal: 20,
  },
  searchBar: {
    backgroundColor: colorScheme.white,
    borderRadius: 20,
    flexDirection: "row",
    marginVertical: 20,
    padding: 15,
  },
});
