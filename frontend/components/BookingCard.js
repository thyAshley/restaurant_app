import React from "react";
import {
  StyleSheet,
  Image,
  View,
  Text,
  TouchableWithoutFeedback,
} from "react-native";
import colorScheme from "../util/color";
import moment from "moment";

export default function BookingCard({ type, booking, cancel }) {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={{
          uri: `https://2a7d1824c57a.ngrok.io/restaurants/${booking.restaurantId.images[0]}`,
        }}
      />
      <View style={styles.textContainer}>
        <Text style={styles.text}>{booking.restaurantId.name}</Text>
        <Text style={styles.text}>
          Date: {moment(booking.date).format("DD/MM/yyyy")}
        </Text>
        <Text style={styles.text}>Time: {booking.time}</Text>
        <Text style={styles.text}>Number of Pax: {booking.numberOfPax}</Text>
      </View>
      {type === "new" && (
        <TouchableWithoutFeedback onPress={() => cancel(booking._id)}>
          <View style={styles.btnContainer}>
            <Text style={styles.newbtn}>Cancel</Text>
          </View>
        </TouchableWithoutFeedback>
      )}
      {type === "old" && (
        <View style={styles.btnContainer}>
          {!booking.hasReview && (
            <TouchableWithoutFeedback onPress={() => cancel(booking._id)}>
              <Text style={styles.reviewbtn}>Review</Text>
            </TouchableWithoutFeedback>
          )}
          <TouchableWithoutFeedback onPress={() => cancel(booking._id)}>
            <Text style={styles.bookbtn}>Book Again</Text>
          </TouchableWithoutFeedback>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  newbtn: {
    backgroundColor: colorScheme.secondary,
    borderRadius: 20,
    color: "white",
    fontSize: 16,
    textAlign: "center",
    paddingVertical: 5,
    paddingHorizontal: 25,
  },
  reviewbtn: {
    backgroundColor: colorScheme.primary,
    borderRadius: 20,
    color: "white",
    fontSize: 14,
    paddingVertical: 5,
    paddingHorizontal: 15,
    textAlign: "center",
  },
  bookbtn: {
    backgroundColor: colorScheme.secondary,
    borderRadius: 20,
    color: "white",
    fontSize: 14,
    marginVertical: 2,
    paddingVertical: 5,
    paddingHorizontal: 15,
    textAlign: "center",
  },
  btnContainer: {
    margin: 10,
    position: "absolute",
    justifyContent: "flex-end",
    right: 0,
    bottom: 0,
  },
  container: {
    backgroundColor: colorScheme.white,
    borderBottomWidth: 1,
    borderBottomColor: colorScheme.secbackground,
    flexDirection: "row",
    marginBottom: 2,
  },
  image: {
    height: 100,
    resizeMode: "stretch",
    margin: 5,
    width: 100,
  },
  text: {
    color: colorScheme.secondary,
    fontSize: 14,
    marginVertical: 0.5,
  },
  textContainer: {
    justifyContent: "center",
    padding: 5,
  },
});
