import React, { useState } from "react";
import moment from "moment";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

import { instance } from "../config/axios";
import authStorage from "../auth/authstorage";
import UserInputButton from "../components/UserInputButton";
import colorScheme from "../util/color";

export default function RestaurantScreen({ details, route }) {
  const { restaurant } = route.params;
  const [date, setDate] = useState(Date.now());
  const [time, setTime] = useState(Date.now());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const onChangeDate = (event, selectedDate) => {
    setShow(Platform.OS === "ios");
    if (mode === "date") {
      const currentDate = selectedDate || date;
      setDate(currentDate);
    } else {
      const currentTime = selectedDate || time;
      setTime(currentTime);
    }
  };
  const makeBooking = async () => {
    console.log("making booking");
    try {
      const token = await authStorage.getToken();
      console.log("obtain token");
      console.log("calling API");
      const bookings = await instance.post(
        `/v1/api/Booking/${restaurant._id}`,
        {
          date: moment(date).format("yyyy-MM-DD"),
          time: moment(time).format("HH:mm"),
          numberOfPax: 2,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(bookings);
    } catch (error) {
      console.error(error.message);
    }
  };

  const showMode = (currentMode) => {
    if (currentMode === "date") {
      setShow(true);
      setMode("date");
    } else {
      setShow(true);
      setMode("time");
    }
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

  return (
    <View style={styles.container}>
      <View>
        <FlatList
          horizontal
          data={restaurant.images}
          keyExtractor={(restaurant, idx) => idx.toString()}
          renderItem={({ item }) => {
            return (
              item && (
                <Image
                  style={styles.image}
                  source={{
                    uri: `https://2a7d1824c57a.ngrok.io/restaurants/${item}`,
                  }}
                />
              )
            );
          }}
        />
      </View>
      <Text>{restaurant.name}</Text>
      <Text>{restaurant.address}</Text>
      <Text>{restaurant.cuisine}</Text>
      <Text>{restaurant.reviews}</Text>
      <Text>Opening Time:</Text>
      <View>
        <View style={styles.booking}>
          <Text style={styles.bookingText}>
            Booking Date: {moment(date).format("DD/MM/yyyy")}
          </Text>
          <TouchableOpacity onPress={showDatepicker}>
            <Text style={styles.btn}>Select Date</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.booking}>
          <Text style={styles.bookingText}>
            Booking Time: {moment(time).format("hh:mm A")}
          </Text>
          <TouchableOpacity onPress={showTimepicker}>
            <Text style={styles.btn}>Select Time</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity onPress={makeBooking}>
        <UserInputButton text="Book now" location="center" />
      </TouchableOpacity>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          minimumDate={Date.now()}
          onChange={onChangeDate}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  booking: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  bookingText: {
    color: colorScheme.secondary,
    fontSize: 16,
    fontWeight: "bold",
  },
  btn: {
    backgroundColor: colorScheme.secondary,
    borderRadius: 50,
    color: colorScheme.white,
    margin: 5,
    padding: 5,
    textAlign: "center",
    width: 120,
  },
  container: {
    flex: 1,
    margin: 10,
  },
  image: {
    height: 300,
    width: Dimensions.get("window").width,
    resizeMode: "stretch",
  },
});
