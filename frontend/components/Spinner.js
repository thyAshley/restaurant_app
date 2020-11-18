import React from "react";
import { ActivityIndicator } from "react-native";
import colorScheme from "../util/color";

export default function Spinner({ styles }) {
  return (
    <ActivityIndicator size={45} color={colorScheme.white} style={styles} />
  );
}
