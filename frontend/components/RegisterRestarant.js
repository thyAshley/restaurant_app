import React, { Fragment, useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableWithoutFeedback } from "react-native";
import { TextInput, ScrollView } from "react-native-gesture-handler";

import AuthStorage from "../auth/authstorage";
import UserInputButton from "../components/UserInputButton";
import { instance } from "../config/axios";
import AuthContext from "../context/AuthContext";
import colorScheme from "../util/color";

export default function RegisterRestarant({ page, setPage }) {
  const [addMore, setAddMore] = useState(false);
  const [restaurantName, setRestaurantName] = useState("");
  const [menu, setMenu] = useState([]);
  const [menuOne, setmenuOne] = useState("");
  const [menuOnePrice, setmenuOnePrice] = useState("");
  const [menuTwo, setmenuTwo] = useState("");
  const [menuTwoPrice, setmenuTwoPrice] = useState("");
  const [menuThree, setmenuThree] = useState("");
  const [menuThreePrice, setmenuThreePrice] = useState("");
  const [menuFour, setmenuFour] = useState("");
  const [menuFourPrice, setmenuFourPrice] = useState("");
  const [menuFive, setmenuFive] = useState("");
  const [menuFivePrice, setmenuFivePrice] = useState("");

  const [restaurantError, setrestaurantError] = useState("");
  const [address, setAddress] = useState("");
  const [addressError, setaddressError] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [cuisineError, setcuisineError] = useState("");
  const [pax, setPax] = useState("");
  const [paxError, setpaxError] = useState("");
  const [startTime, setStartTime] = useState("");
  const [startTimeError, setstartTimeError] = useState("");
  const [endTime, setEndTime] = useState("");
  const [endTimeError, setendTimeError] = useState("");
  const [ambience, setAmbience] = useState(false);
  const [errors, setErrors] = useState("initial");

  const firstPageHandler = () => {
    setErrors(false);
    setrestaurantError("");
    setaddressError("");
    setcuisineError("");
    setpaxError("");
    setstartTimeError("");
    setendTimeError("");
    const validpax = Number(pax);
    const validstart = Number(startTime);
    const validstop = Number(endTime);
    if (!restaurantName) {
      setErrors(true);
      setrestaurantError("invalid restaurant name");
    }
    if (!address) {
      setErrors(true);
      setaddressError("invalid address given");
    }
    if (!cuisine) {
      setErrors(true);
      setcuisineError("invalid cuisine given");
    }
    if (!validpax || validpax > 5 || validpax < 1) {
      setErrors(true);
      setpaxError("invalid capacity");
    }
    if (!validstart || validstart > 24 || validstart < 0) {
      setErrors(true);
      setstartTimeError("invalid start time");
    }
    if (!validstop || validstop > 24 || validstop < 0) {
      setErrors(true);
      setendTimeError("invalid stop time");
    }
    if (!errors) {
      setPage(1);
    }
  };

  const secondPageHandler = async () => {
    if (menuOne) {
      setMenu([
        ...menu,
        {
          name: menuOne,
          price: menuOnePrice,
        },
      ]);
    }
    if (menuTwo) {
      setMenu([
        ...menu,
        {
          name: menuTwo,
          price: menuTwoPrice,
        },
      ]);
    }
    if (menuThree) {
      setMenu([
        ...menu,
        {
          name: menuThree,
          price: menuThreePrice,
        },
      ]);
    }
    if (menuFour) {
      setMenu([
        ...menu,
        {
          name: menuFour,
          price: menuFourPrice,
        },
      ]);
    }
    if (menuFive) {
      setMenu([
        ...menu,
        {
          name: menuFive,
          price: menuFivePrice,
        },
      ]);
    }

    const token = await AuthStorage.getToken();
    const id = await AuthStorage.getUser().id;
    try {
      const response = await instance.post(
        "/v1/api/restaurant",
        {
          name: restaurantName,
          location: address,
          cuisine: cuisine,
          capacity: pax,
          openingHours: {
            startTime: startTime,
            stopTime: endTime,
          },
          ambience,
          menu,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.message === "success") {
        setPage(2);
      }
    } catch (error) {
      console.log(error.message);
    }
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
              {restaurantError ? (
                <Text style={styles.errorText}>{restaurantError}</Text>
              ) : (
                <Text style={styles.errorText} />
              )}
            </View>
            <View>
              <Text style={styles.inputText}>Location</Text>
              <TextInput
                style={styles.inputField}
                value={address}
                onChangeText={setAddress}
              />
              {addressError ? (
                <Text style={styles.errorText}>{addressError}</Text>
              ) : (
                <Text style={styles.errorText} />
              )}
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
                {cuisineError ? (
                  <Text style={styles.errorText}>{cuisineError}</Text>
                ) : (
                  <Text style={styles.errorText} />
                )}
              </View>
              <View style={{ flexGrow: 1 }}>
                <Text style={styles.inputText}>Capacity</Text>
                <TextInput
                  style={styles.inputField}
                  value={pax}
                  onChangeText={setPax}
                />
                {paxError ? (
                  <Text style={styles.errorText}>{paxError}</Text>
                ) : (
                  <Text style={styles.errorText} />
                )}
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
                {startTimeError ? (
                  <Text style={styles.errorText}>{startTimeError}</Text>
                ) : (
                  <Text style={styles.errorText} />
                )}
              </View>
              <View style={{ flexGrow: 1 }}>
                <Text style={styles.inputText}>End Time</Text>
                <TextInput
                  style={styles.inputField}
                  value={endTime}
                  onChangeText={setEndTime}
                />
                {endTimeError ? (
                  <Text style={styles.errorText}>{endTimeError}</Text>
                ) : (
                  <Text style={styles.errorText} />
                )}
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
                <TextInput
                  style={styles.inputField}
                  onChangeText={setmenuOne}
                  value={menuOne}
                />
              </View>
              <View>
                <Text style={styles.inputText}>ITEM PRICING</Text>
                <TextInput
                  style={styles.inputField}
                  onChangeText={setmenuOnePrice}
                  value={menuOnePrice}
                />
              </View>
            </View>

            <View>
              <View>
                <Text style={styles.inputText}>MENU LISTING 2</Text>
                <TextInput
                  style={styles.inputField}
                  onChangeText={setmenuTwo}
                  value={menuTwo}
                />
              </View>
              <View>
                <Text style={styles.inputText}>ITEM PRICING</Text>
                <TextInput
                  style={styles.inputField}
                  onChangeText={setmenuTwoPrice}
                  value={menuTwoPrice}
                />
              </View>
            </View>
            <View>
              <View>
                <Text style={styles.inputText}>MENU LISTING 3</Text>
                <TextInput
                  style={styles.inputField}
                  onChangeText={setmenuThree}
                  value={menuThree}
                />
              </View>
              <View>
                <Text style={styles.inputText}>ITEM PRICING</Text>
                <TextInput
                  style={styles.inputField}
                  onChangeText={setmenuThreePrice}
                  value={menuThreePrice}
                />
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
                    <TextInput
                      style={styles.inputField}
                      onChangeText={setmenuFour}
                      value={menuFour}
                    />
                  </View>
                  <View>
                    <Text style={styles.inputText}>ITEM PRICING</Text>
                    <TextInput
                      style={styles.inputField}
                      onChangeText={setmenuFourPrice}
                      value={menuFourPrice}
                    />
                  </View>
                </View>
                <View style={{ marginBottom: 40 }}>
                  <View>
                    <Text style={styles.inputText}>MENU LISTING 5</Text>
                    <TextInput
                      style={styles.inputField}
                      onChangeText={setmenuFive}
                      value={menuFive}
                    />
                  </View>
                  <View>
                    <Text style={styles.inputText}>ITEM PRICING</Text>
                    <TextInput
                      style={styles.inputField}
                      onChangeText={setmenuFivePrice}
                      value={menuFivePrice}
                    />
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
            <TouchableWithoutFeedback onPress={secondPageHandler}>
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
  errorText: {
    color: colorScheme.secondary,
    marginHorizontal: 20,
  },
});
