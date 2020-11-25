import React from "react";
import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";

import colorScheme from "../util/color";
import RestaurantCard from "./RestaurantCard";

export default function Card({ title, restaurant, setBook }) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={restaurant}
        keyExtractor={(restaurant) => restaurant._id}
        renderItem={({ item }) => {
          return <RestaurantCard restaurant={item} setBook={setBook} />;
        }}
      />
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
