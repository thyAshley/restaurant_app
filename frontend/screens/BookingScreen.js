import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList, ScrollView } from "react-native";

import { instance } from "../config/axios";
import AuthStorage from "../auth/authstorage";
import colorScheme from "../util/color";
import BookingCard from "../components/BookingCard";

export default function BookingScreen() {
  const [newBooking, setNewBooking] = useState([]);
  const [oldBooking, setOldBooking] = useState([]);
  useEffect(() => {
    const getBooking = async () => {
      try {
        const token = await AuthStorage.getToken();
        const bookings = await instance.get("/v1/api/Booking", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setNewBooking(bookings.data.booking.newbookings);
        setOldBooking(bookings.data.booking.oldbookings);
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
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.text}>Upcoming Booking</Text>
        {newBooking.map((booking) => {
          return (
            <BookingCard
              id={booking.id}
              type="new"
              booking={booking}
              cancel={cancelBookingHandler}
            />
          );
        })}
        <Text style={styles.text}>Past Booking</Text>
        {oldBooking.map((booking) => {
          return (
            <BookingCard
              id={booking.id}
              type="new"
              booking={booking}
              cancel={cancelBookingHandler}
            />
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 15,
  },
  text: {
    color: colorScheme.primary,
    fontSize: 23,
    letterSpacing: 1,
  },
});
