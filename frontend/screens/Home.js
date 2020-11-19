import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";

import useAuth from "../auth/useAuth";

export default function Home() {
  const { login, logout } = useAuth();

  return (
    <View>
      <Text>Home</Text>
      <Button title="logout" onPress={logout} />
    </View>
  );
}

const styles = StyleSheet.create({});
