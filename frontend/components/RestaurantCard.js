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
import { urlLink } from "../config/axios";

export default function RestaurantCard({ restaurant, setBook }) {
  const navigation = useNavigation();
  const imageFile = `${urlLink.url}/restaurants/${restaurant.images[0]}`;
  return (
    restaurant && (
      <TouchableWithoutFeedback
        onPress={() =>
          navigation.navigate("restaurantdetails", {
            name: restaurant.name,
            restaurant: restaurant,
            setBook,
          })
        }
      >
        <View style={styles.container}>
          {restaurant.images[0] && (
            <Image
              style={[styles.image]}
              source={{
                uri: imageFile,
              }}
            />
          )}
          <View style={styles.contentContainer}>
            <View style={styles.content}>
              <Text style={styles.name}>{restaurant.name}</Text>
              <AirbnbRating
                showRating={false}
                isDisabled
                defaultRating={restaurant.review.rating}
                size={10}
                selectedColor={colorScheme.primary}
              />
            </View>
            <Text>12:00 PM - 10:00 PM</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    )
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
    resizeMode: "stretch",
    width: 250,
    height: 200,
  },
  name: {
    marginRight: 10,
  },
});
