import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableWithoutFeedback } from "react-native";
import { TextInput, ScrollView } from "react-native-gesture-handler";
import Imagelist from "../components/Imagelist";
import RegisterRestarant from "../components/RegisterRestarant";

import UserInputButton from "../components/UserInputButton";
import colorScheme from "../util/color";

export default function NewRestaurant() {
  const [page, setPage] = useState(0);

  const [imageUri, setImageUri] = useState([]);

  return (
    <>
      <RegisterRestarant page={page} setPage={setPage} />
      {page === 2 && (
        <View style={styles.container}>
          <Text style={styles.page2Input}>
            Please provide us with the pictures of your restaurant
            ambience/food.
          </Text>
          <View style={styles.imageContainer} horizontal>
            <Imagelist setImageUri={setImageUri} imageUri={imageUri} />
            <Imagelist setImageUri={setImageUri} imageUri={imageUri} />
            <Imagelist setImageUri={setImageUri} imageUri={imageUri} />
          </View>
          <Text style={styles.page2Input}>
            Kindly upload a copy of the restaurant layout for diners. Please
            ensure that the layout is clearly labelled for ease of referencing
          </Text>
          {/* <View style={styles.inputContainer}>
            <Text style={styles.inputText}>Ambience Layout</Text>
            <Imagelist ambience />
          </View> */}
          <View style={{ width: "80%", flexDirection: "row" }}>
            <TouchableWithoutFeedback onPress={() => setPage(0)}>
              <View style={{ flexGrow: 1, marginRight: 5 }}>
                <UserInputButton
                  color={colorScheme.secondary}
                  location="center"
                  text="Submit"
                />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    margin: 20,
  },
  imageContainer: {
    backgroundColor: colorScheme.white,
    borderColor: colorScheme.primary,
    borderWidth: 2,
    borderRadius: 25,
    flexDirection: "row",
    margin: 5,
    padding: 5,
    width: "100%",
  },
  inputContainer: {
    backgroundColor: colorScheme.background,
    borderRadius: 20,
    padding: 10,
    marginVertical: 30,
    width: "90%",
  },
  page2Input: {
    color: colorScheme.primary,
    fontSize: 16,
    letterSpacing: 1,
  },
  input: {
    color: colorScheme.primary,
  },
  inputField: {
    borderWidth: 1,
    backgroundColor: colorScheme.white,
    borderColor: colorScheme.primary,
    borderRadius: 10,
    alignSelf: "center",
    padding: 5,
    paddingHorizontal: 20,
    width: "90%",
  },
  inputText: {
    color: colorScheme.primary,
    fontSize: 16,
    fontWeight: "bold",
    padding: 10,
  },
  selectBtn: {
    borderColor: colorScheme.primary,
    borderWidth: 1,
    color: "black",
    width: "30%",
    textAlign: "center",
    padding: 10,
  },
});
