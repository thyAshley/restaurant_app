import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import colorScheme from "../util/color";
import RestaurantCard from "./RestaurantCard";

export default function Card({ title }) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <RestaurantCard rating={3} name="Random Food" />
        <RestaurantCard rating={5} name="Burgers" />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colorScheme.secbackground,
    borderRadius: 10,
    marginBottom: 20,
  },
  title: {
    color: colorScheme.secondary,
    fontSize: 18,
    padding: 10,
  },
});
