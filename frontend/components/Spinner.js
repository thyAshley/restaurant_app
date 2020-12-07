import React from "react";
import { ActivityIndicator } from "react-native";
import colorScheme from "../util/color";

export default function Spinner({
  styles,
  color = colorScheme.white,
  size = 45,
}) {
  return <ActivityIndicator size={size} color={color} style={styles} />;
}
