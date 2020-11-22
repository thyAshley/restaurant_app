import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  Dimensions,
} from "react-native";

import UserInputButton from "../components/UserInputButton";

export default function RestaurantScreen({ details, route }) {
  const { restaurant } = route.params;
  return (
    <View style={styles.container}>
      <View>
        <FlatList
          horizontal
          data={restaurant.images}
          keyExtractor={(restaurant, idx) => idx.toString()}
          renderItem={({ item }) => {
            return (
              <Image
                style={styles.image}
                source={{
                  uri: `https://83dadb7517cc.ngrok.io/restaurants/${item}`,
                }}
              />
            );
          }}
        />
      </View>
      <Text>{restaurant.name}</Text>
      <Text>{restaurant.address}</Text>
      <Text>{restaurant.cuisine}</Text>
      <Text>{restaurant.reviews}</Text>
      <Text>Opening Time:</Text>
      <UserInputButton text="Book now" location="center" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },
  image: {
    height: 300,
    width: Dimensions.get("window").width,
    resizeMode: "stretch",
  },
});
