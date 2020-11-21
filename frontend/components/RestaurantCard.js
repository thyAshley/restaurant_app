import React from "react";
import {
  StyleSheet,
  Image,
  View,
  Text,
  TouchableWithoutFeedback,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import { AirbnbRating } from "react-native-ratings";
import colorScheme from "../util/color";

export default function RestaurantCard({ rating, name }) {
  const navigation = useNavigation();
  return (
    <TouchableWithoutFeedback
      onPress={() => navigation.navigate("restaurantdetails", { name })}
    >
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={require("../assets/adaptive-icon.png")}
        />
        <View style={styles.contentContainer}>
          <View style={styles.content}>
            <Text style={styles.name}>{name}</Text>
            <AirbnbRating
              showRating={false}
              isDisabled
              defaultRating={rating}
              size={10}
              selectedColor={colorScheme.primary}
            />
          </View>
          <Text>12:00 PM - 10:00 PM</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colorScheme.white,
    margin: 15,
    height: 250,
    width: 250,
  },
  contentContainer: {
    margin: 5,
  },
  content: {
    flexDirection: "row",
  },
  image: {
    resizeMode: "cover",
    width: 250,
    height: 200,
  },
  name: {
    marginRight: 10,
  },
});
