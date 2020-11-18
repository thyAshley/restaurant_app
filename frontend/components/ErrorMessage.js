import React from "react";
import { StyleSheet, Text, View } from "react-native";
import colorScheme from "../util/color";

export default function ErrorMessage({ error }) {
  return (
    <View style={styles.errorContainer}>
      <Text style={styles.errorText}>{error}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  errorContainer: {
    height: 20,
  },
  errorText: {
    color: colorScheme.primary,
    fontSize: 12,
    padding: 10,
  },
});
