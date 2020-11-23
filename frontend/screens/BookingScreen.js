import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView,
  Alert,
} from "react-native";

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

  const cancelBooking = async (id) => {
    try {
      const token = await AuthStorage.getToken();
      const bookings = await instance.delete(`/v1/api/Booking/${id}`, {
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
  const cancelBookingHandler = async (id) => {
    Alert.alert(
      "Cancel Booking",
      "Are you sure you want to cancel your booking?",
      [{ text: "Yes", onPress: () => cancelBooking(id) }, { text: "No" }],
      {
        cancelable: true,
      }
    );
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.text}>Upcoming Booking</Text>
        {newBooking.map((booking) => {
          return (
            <BookingCard
              key={booking._id}
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
              key={booking._id}
              type="old"
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
