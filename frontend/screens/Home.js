import React from "react";
import { Button, ScrollView, StyleSheet, Text, View } from "react-native";

import useAuth from "../auth/useAuth";
import Card from "../components/Card";
import SearchBar from "../components/SearchBar";
import colorScheme from "../util/color";

export default function Home() {
  const { login, logout } = useAuth();

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Hi, Yu Siang</Text>
      <SearchBar />
      <Card title="New Restaurants" />
      <Card title="Recommended for you" />
      <Button title="logout" onPress={logout} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colorScheme.background,
    flex: 1,
    padding: 20,
  },
  header: {
    color: colorScheme.primary,
    fontSize: 20,
  },
});
