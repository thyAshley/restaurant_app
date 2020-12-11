import React, { useContext, useEffect, useState } from "react";
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import BookingCard from "../components/BookingCard";
import Spinner from "../components/Spinner";
import { instance, urlLink } from "../config/axios";
import AuthContext from "../context/AuthContext";
import colorScheme from "../util/color";

export default function RestaurantHome({ navigation }) {
  const { user, setRestaurant, restaurant } = useContext(AuthContext);
  const [bookings, setBookings] = useState();

  useEffect(() => {
    const getRestaurant = async () => {
      const response = await instance.get(`/v1/api/restaurant/owner/${user}`);
      setRestaurant(response.data);
    };
    getRestaurant();
  }, []);

  useEffect(() => {
    const getBookings = async () => {
      if (restaurant._id) {
        const response = await instance.get(
          `/v1/api/booking/${restaurant._id}`
        );
        setBookings(response.data.bookings);
      }
    };
    getBookings();
  }, [restaurant]);
  return (
    <View style={styles.container}>
      {!restaurant ? (
        <View
          style={{
            justifyContent: "center",
            flex: 1,
          }}
        >
          <Text style={styles.missing}>
            We notice that you have not register your restaurant yet
          </Text>
          <TouchableWithoutFeedback onPress={() => navigation.navigate("reg")}>
            <Text style={styles.regButton}>Register Your Restaurant now!</Text>
          </TouchableWithoutFeedback>
        </View>
      ) : (
        <View>
          {restaurant.images.length === 0 ? (
            <View>
              <Text style={styles.missing}>
                We notice that you have not uploaded any image for your
                restaurant.
              </Text>
              <TouchableWithoutFeedback
                onPress={() => navigation.navigate("addImage")}
              >
                <Text style={styles.regButton}>Upload Image</Text>
              </TouchableWithoutFeedback>
            </View>
          ) : (
            <View>
              <Image
                style={styles.image}
                source={{
                  uri: `${urlLink.url}/restaurants/${restaurant.images[0]}`,
                }}
              />
            </View>
          )}

          <Text
            style={{
              color: colorScheme.primary,
              fontSize: 20,
              fontWeight: "bold",
              margin: 15,
              marginTop: 30,
            }}
          >
            Upcoming Restaurant Bookings
          </Text>

          <View>
            {bookings &&
              bookings.map((booking) => {
                return (
                  <View key={booking._id}>
                    <BookingCard type="new" booking={booking} rest={true} />
                  </View>
                );
              })}
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
  },
  secContainer: {
    backgroundColor: colorScheme.background,
    marginVertical: 20,
    flex: 1,
    height: 400,
  },
  missing: {
    textAlign: "center",
    color: colorScheme.primary,
    fontSize: 20,
    padding: 10,
    margin: 10,
  },
  regButton: {
    alignSelf: "center",
    padding: 20,
    backgroundColor: colorScheme.primary,
    color: colorScheme.white,
  },
  image: {
    height: 200,
    resizeMode: "stretch",
    margin: 5,
    width: "100%",
  },
});
