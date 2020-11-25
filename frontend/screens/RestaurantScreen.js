import React, { useState } from "react";
import moment from "moment";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  Dimensions,
  Button,
  TouchableOpacity,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

import UserInputButton from "../components/UserInputButton";

export default function RestaurantScreen({ details, route }) {
  const [date, setDate] = useState(Date.now());
  const [time, setTime] = useState("");
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

  const { restaurant } = route.params;
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
      <Text>Selected Date: {moment(date).format("DD/MM/yyyy")}</Text>
      <Text>Selected Time: {moment(time).format("hh:mm")}</Text>
      <TouchableOpacity onPress={showDatepicker}>
        <Text>Select Date</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={showTimepicker}>
        <Text>Select Time</Text>
      </TouchableOpacity>
      <UserInputButton text="Book now" location="center" />
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChangeDate}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
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
