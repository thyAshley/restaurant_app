import React, { Fragment, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Alert,
  LogBox,
} from "react-native";

import { instance } from "../config/axios";
import AuthStorage from "../auth/authstorage";
import colorScheme from "../util/color";
import BookingCard from "../components/BookingCard";
import { useRoute } from "@react-navigation/native";
LogBox.ignoreLogs([
  "Non-serializable values were found in the navigation state",
]);

export default function BookingScreen({ book, setBook }) {
  const { render } = useRoute().params || false;
  const [newBooking, setNewBooking] = useState([]);
  const [oldBooking, setOldBooking] = useState([]);
  console.log(render);
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
        setBook(false);
      } catch (error) {
        console.error(error.message);
      }
    };
    getBooking();
  }, [book, render]);

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
        <Text style={[styles.text, { marginVertical: 15 }]}>
          Upcoming Booking
        </Text>
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
        <Text style={[styles.text, { marginVertical: 15 }]}>Past Booking</Text>
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
    marginHorizontal: 15,
  },
  text: {
    color: colorScheme.primary,
    fontSize: 23,
    letterSpacing: 1,
  },
});
