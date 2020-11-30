import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, TextInput, View } from "react-native";

import { AirbnbRating } from "react-native-ratings";
import UserInputButton from "../components/UserInputButton";
import colorScheme from "../util/color";
import { instance } from "../config/axios";
import authStorage from "../auth/authstorage";

export default function ReviewScreen() {
  const { id } = useRoute().params;
  const navigation = useNavigation();
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const [comment, setComment] = useState("");

  const submitReviewHandler = async () => {
    setLoading(true);
    try {
      const token = await authStorage.getToken();
      const review = await instance.post(
        `/v1/api/reviews/${id}`,
        {
          rating: rating,
          comment: comment,
        },
        {
          headers: {
            Authorization: `bearer ${token}`,
          },
        }
      );
      if (review) {
        navigation.navigate("mybooking", { render: id });
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error.message);
    }
  };
  return (
    <View style={styles.container}>
      <AirbnbRating
        count={5}
        defaultRating={0}
        size={40}
        starStyle={styles.border}
        selectedColor={colorScheme.primary}
        reviewColor={colorScheme.primary}
        onFinishRating={(rating) => setRating(rating)}
      />
      <TextInput
        style={styles.input}
        multiline={true}
        numberOfLines={4}
        onChangeText={(text) => setComment(text)}
      />
      <TouchableOpacity onPress={submitReviewHandler}>
        <UserInputButton
          text="Submit Review"
          location="center"
          showSpinner={loading}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  border: {
    borderColor: colorScheme.primary,
    borderRadius: 20,
    borderWidth: 1,
  },
  container: {
    margin: 25,
  },
  input: {
    borderWidth: 1,
    borderColor: colorScheme.primary,
    textAlignVertical: "top",
    width: "100%",
    padding: 5,
    marginVertical: 20,
  },
});
