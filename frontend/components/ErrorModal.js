import React from "react";
import { StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import colorScheme from "../util/color";

export default function ErrorModal({ error, onClose }) {
  return (
    <View style={styles.container}>
      <View style={styles.overlay}>
        <Text style={styles.text}>{error}</Text>
        <TouchableWithoutFeedback onPress={onClose}>
          <Text style={styles.btn}>Sign In</Text>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: colorScheme.secondary,
    color: colorScheme.white,
    fontSize: 16,
    padding: 10,
    textAlign: "center",
    width: 100,
  },
  container: {
    backgroundColor: colorScheme.textLight,
    flex: 1,
    height: "100%",
    position: "absolute",
    width: "100%",
    zIndex: 2,
  },
  overlay: {
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: colorScheme.primary,
    bottom: 0,
    height: 100,
    position: "absolute",
    width: "100%",
  },
  text: {
    color: colorScheme.white,
    fontSize: 16,
    letterSpacing: 0.7,
    padding: 10,
    textAlign: "center",
  },
});
