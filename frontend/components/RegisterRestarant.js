import React, { Fragment, useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableWithoutFeedback } from "react-native";
import { TextInput, ScrollView } from "react-native-gesture-handler";

import UserInputButton from "../components/UserInputButton";
import colorScheme from "../util/color";

export default function RegisterRestarant({ page, setPage }) {
  const [addMore, setAddMore] = useState(false);
  const [restaurantName, setRestaurantName] = useState("");
  const [address, setAddress] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [pax, setPax] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [ambience, setAmbience] = useState(false);

  const firstPageHandler = () => {
    setPage(1);
  };
  return (
    <Fragment>
      {page === 0 && (
        <View style={styles.container}>
          <Text style={styles.input}>
            Please provide us with your restaurant details
          </Text>
          <View style={styles.inputContainer}>
            <View>
              <Text style={styles.inputText}>Restaurant Name</Text>
              <TextInput
                style={styles.inputField}
                value={restaurantName}
                onChangeText={setRestaurantName}
              />
            </View>
            <View>
              <Text style={styles.inputText}>Location</Text>
              <TextInput
                style={styles.inputField}
                value={address}
                onChangeText={setAddress}
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-evenly",
              }}
            >
              <View style={{ flexGrow: 1 }}>
                <Text style={styles.inputText}>Cuisine</Text>
                <TextInput
                  style={styles.inputField}
                  value={cuisine}
                  onChangeText={setCuisine}
                />
              </View>
              <View style={{ flexGrow: 1 }}>
                <Text style={styles.inputText}>Capacity</Text>
                <TextInput
                  style={styles.inputField}
                  value={pax}
                  onChangeText={setPax}
                />
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-evenly",
              }}
            >
              <View style={{ flexGrow: 1 }}>
                <Text style={styles.inputText}>Start Time</Text>
                <TextInput
                  style={styles.inputField}
                  value={startTime}
                  onChangeText={setStartTime}
                />
              </View>
              <View style={{ flexGrow: 1 }}>
                <Text style={styles.inputText}>End Time</Text>
                <TextInput
                  style={styles.inputField}
                  value={endTime}
                  onChangeText={setEndTime}
                />
              </View>
            </View>
          </View>
          <View>
            <Text style={styles.inputText}>
              Does your restaurant have Ambience Setting?
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                marginBottom: 20,
              }}
            >
              <TouchableWithoutFeedback onPress={() => setAmbience(true)}>
                <Text
                  style={[styles.selectBtn, ambience ? styles.selected : null]}
                >
                  Yes
                </Text>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={() => setAmbience(false)}>
                <Text
                  style={[styles.selectBtn, !ambience ? styles.selected : null]}
                >
                  No
                </Text>
              </TouchableWithoutFeedback>
            </View>
          </View>
          <TouchableWithoutFeedback onPress={firstPageHandler}>
            <View style={{ width: "80%" }}>
              <UserInputButton
                color={colorScheme.secondary}
                location="center"
                text="Next"
              />
            </View>
          </TouchableWithoutFeedback>
        </View>
      )}
      {page === 1 && (
        <View style={styles.container}>
          <Text style={styles.input}>
            Please provide us with the highlights of your restaurant menu
          </Text>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={[styles.inputContainer, { paddingVertical: 20 }]}
          >
            <View>
              <View>
                <Text style={styles.inputText}>MENU LISTING 1</Text>
                <TextInput style={styles.inputField} />
              </View>
              <View>
                <Text style={styles.inputText}>ITEM PRICING</Text>
                <TextInput style={styles.inputField} />
              </View>
            </View>

            <View>
              <View>
                <Text style={styles.inputText}>MENU LISTING 2</Text>
                <TextInput style={styles.inputField} />
              </View>
              <View>
                <Text style={styles.inputText}>ITEM PRICING</Text>
                <TextInput style={styles.inputField} />
              </View>
            </View>
            <View>
              <View>
                <Text style={styles.inputText}>MENU LISTING 3</Text>
                <TextInput style={styles.inputField} />
              </View>
              <View>
                <Text style={styles.inputText}>ITEM PRICING</Text>
                <TextInput style={styles.inputField} />
              </View>
            </View>
            {!addMore && (
              <TouchableWithoutFeedback onPress={() => setAddMore(true)}>
                <View
                  style={{
                    flex: 1,
                    alignItems: "flex-end",
                    width: "90%",
                    margin: 10,
                  }}
                >
                  <Text
                    style={{ color: colorScheme.secondary, fontWeight: "bold" }}
                  >
                    Add More...
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            )}
            {addMore && (
              <>
                <View>
                  <View>
                    <Text style={styles.inputText}>MENU LISTING 4</Text>
                    <TextInput style={styles.inputField} />
                  </View>
                  <View>
                    <Text style={styles.inputText}>ITEM PRICING</Text>
                    <TextInput style={styles.inputField} />
                  </View>
                </View>
                <View style={{ marginBottom: 40 }}>
                  <View>
                    <Text style={styles.inputText}>MENU LISTING 5</Text>
                    <TextInput style={styles.inputField} />
                  </View>
                  <View>
                    <Text style={styles.inputText}>ITEM PRICING</Text>
                    <TextInput style={styles.inputField} />
                  </View>
                </View>
              </>
            )}
          </ScrollView>
          <View style={{ width: "80%", flexDirection: "row" }}>
            <TouchableWithoutFeedback onPress={() => setPage(0)}>
              <View style={{ flexGrow: 1, marginRight: 5 }}>
                <UserInputButton
                  color={colorScheme.primary}
                  location="center"
                  text="back"
                />
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => setPage(2)}>
              <View style={{ flexGrow: 1, marginLeft: 5 }}>
                <UserInputButton
                  color={colorScheme.secondary}
                  location="center"
                  text="Next"
                />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
      )}
    </Fragment>
  );
}
const styles = StyleSheet.create({
  selected: {
    backgroundColor: colorScheme.primary,
    color: "white",
  },
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
