import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";

import { instance } from "../config/axios";
import AuthStorage from "../auth/authstorage";
import colorScheme from "../util/color";
import BookingCard from "../components/BookingCard";

export default function BookingScreen() {
  const [booking, setBooking] = useState([]);
  useEffect(() => {
    const getBooking = async () => {
      try {
        const token = await AuthStorage.getToken();
        const bookings = await instance.get(
          "https://83dadb7517cc.ngrok.io/v1/api/Booking",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setBooking(bookings.data);
      } catch (error) {
        console.error(error.message);
      }
    };
    getBooking();
  }, []);

  const cancelBookingHandler = (id) => {
    console.log(id);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Upcoming Booking</Text>
      <FlatList
        data={booking}
        keyExtractor={(booking) => booking._id}
        renderItem={({ item }) => (
          <BookingCard
            type="old"
            booking={item}
            cancel={cancelBookingHandler}
          />
        )}
      />
      <Text style={styles.text}>Past Booking</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 15,
  },
  text: {
    color: colorScheme.primary,
    fontSize: 23,
    letterSpacing: 1,
  },
});
