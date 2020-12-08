import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import Spinner from "../components/Spinner";
import { instance } from "../config/axios";
import AuthContext from "../context/AuthContext";

export default function RestaurantHome({ navigation }) {
  const { user, setRestaurant, restaurant } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getRestaurant = async () => {
      const response = await instance.get(`/v1/api/restaurant/owner/${user}`);
      setRestaurant(response.data);
    };
    getRestaurant();
  }, []);

  useEffect(() => {
    if (!restaurant) navigation.navigate("reg");
    setLoading(false);
  }, [restaurant]);

  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      {loading && (
        <Spinner style={{ color: "black" }} color="black" size={80} />
      )}
      {!restaurant ? (
        <TouchableWithoutFeedback onPress={() => navigation.navigate("reg")}>
          <Text>Register Your Restaurant now!</Text>
        </TouchableWithoutFeedback>
      ) : (
        <Text>Home</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({});
