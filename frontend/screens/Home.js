import React, { useEffect, useState } from "react";
import { Button, ScrollView, StyleSheet, Text } from "react-native";

import { instance } from "../config/axios";
import useAuth from "../auth/useAuth";
import Card from "../components/Card";
import SearchBar from "../components/SearchBar";
import colorScheme from "../util/color";

export default function Home() {
  const { login, logout } = useAuth();
  const [newRestaurant, setNewRestaurant] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const restaurant = await instance.get("/v1/api/restaurant?limit=5");
        setNewRestaurant(restaurant.data);
      } catch (err) {
        console.error(err);
        setError(err);
      }
    };
    fetchRestaurant();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Hi, Yu Siang</Text>
      <SearchBar />
      <Card title="New Restaurants" restaurant={newRestaurant} />
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
