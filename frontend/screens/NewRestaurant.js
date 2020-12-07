import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import UserInputBox from "../components/UserInputBox";
import UserInputButton from "../components/UserInputButton";
import colorScheme from "../util/color";

export default function NewRestaurant() {
  const [page, setPage] = useState(1);
  return (
    <>
      {page === 0 && (
        <View style={styles.container}>
          <Text style={styles.input}>
            Please provide us with your restaurant details
          </Text>
          <View style={styles.inputContainer}>
            <View>
              <Text style={styles.inputText}>Restaurant Name</Text>
              <TextInput style={styles.inputField} />
            </View>
            <View>
              <Text style={styles.inputText}>Location</Text>
              <TextInput style={styles.inputField} />
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-evenly",
              }}
            >
              <View style={{ flexGrow: 1 }}>
                <Text style={styles.inputText}>Cuisine</Text>
                <TextInput style={styles.inputField} />
              </View>
              <View style={{ flexGrow: 1 }}>
                <Text style={styles.inputText}>Capacity</Text>
                <TextInput style={styles.inputField} />
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
                <TextInput style={styles.inputField} />
              </View>
              <View style={{ flexGrow: 1 }}>
                <Text style={styles.inputText}>End Time</Text>
                <TextInput style={styles.inputField} />
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
              <Text style={styles.selectBtn}>Yes</Text>
              <Text
                style={[
                  styles.selectBtn,
                  { borderColor: colorScheme.secondary },
                ]}
              >
                No
              </Text>
            </View>
          </View>
          <View style={{ width: "80%" }}>
            <UserInputButton
              color={colorScheme.secondary}
              location="center"
              text="Next"
            />
          </View>
        </View>
      )}
      {page === 1 && (
        <View>
          <Text>Hey</Text>
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
  inputContainer: {
    backgroundColor: colorScheme.background,
    borderRadius: 20,
    padding: 10,
    marginVertical: 30,
    width: "90%",
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
