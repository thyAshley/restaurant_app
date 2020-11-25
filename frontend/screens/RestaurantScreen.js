import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  Dimensions,
  Button,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

import UserInputButton from "../components/UserInputButton";

export default function RestaurantScreen({ details, route }) {
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
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
      <Button onPress={showDatepicker} title="Show date picker!" />
      <Button onPress={showTimepicker} title="Show time picker!" />
      <UserInputButton text="Book now" location="center" />
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
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
