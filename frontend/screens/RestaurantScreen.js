import React, { useState } from 'react';
import moment from 'moment';
import { Picker } from '@react-native-community/picker';
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { AirbnbRating } from 'react-native-ratings';

import { instance } from '../config/axios';
import authStorage from '../auth/authstorage';
import UserInputButton from '../components/UserInputButton';
import colorScheme from '../util/color';
import { urlLink } from '../config/axios';

export default function RestaurantScreen({ details, route, navigation }) {
  const { restaurant, setBook } = route.params;
  const [date, setDate] = useState(Date.now());
  const [time, setTime] = useState(Date.now());
  const [pax, setPax] = useState(1);
  const [seat, setSeat] = useState(0);
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [error, setError] = useState(false);

  let errortemp = false;
  const onChangeDate = (event, selectedDate) => {
    setShow(Platform.OS === 'ios');
    if (mode === 'date') {
      const currentDate = selectedDate || date;
      setDate(currentDate);
    } else {
      const currentTime = selectedDate || time;
      setTime(currentTime);
    }
  };
  const makeBooking = async () => {
    errortemp = false;
    if (moment(time).hour() < restaurant.openingHours.startTime) {
      errortemp = true;
    }
    if (
      moment(time).hour() !== 0 &&
      moment(time).hour() > restaurant.openingHours.stopTime
    ) {
      errortemp = true;
    }
    if (moment(Date.now()).hour() > moment(time).hour()) {
      errortemp = true;
    }
    if (!errortemp) {
      setError(false);
      try {
        const token = await authStorage.getToken();
        const bookings = await instance.post(
          `/v1/api/Booking/${restaurant._id}`,
          {
            date: moment(date).format('yyyy-MM-DD'),
            time: moment(time).format('HH:mm').toString(),
            numberOfPax: pax,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        setBook(true);
        navigation.navigate('mybooking');
      } catch (error) {
        console.error(error.message);
      }
    } else {
      setError(true);
    }
  };

  const showMode = (currentMode) => {
    if (currentMode === 'date') {
      setShow(true);
      setMode('date');
    } else {
      setShow(true);
      setMode('time');
    }
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };
  const allImages = [...restaurant.images, ...restaurant.ambienceSeats].filter(
    (arr) => arr !== null,
  );

  return (
    <View style={styles.container}>
      <View>
        <FlatList
          horizontal
          data={allImages}
          keyExtractor={(restaurant, idx) => idx.toString()}
          renderItem={({ item }) => {
            return (
              item && (
                <Image
                  style={styles.image}
                  source={{
                    uri: `${urlLink.url}/restaurants/${item}`,
                  }}
                />
              )
            );
          }}
        />
      </View>

      <View style={styles.whitebackground}>
        <View>
          <Text style={styles.text}>{restaurant.name}</Text>
          <Text style={styles.text}>{restaurant.address}</Text>
          <Text style={styles.text}>{restaurant.cuisine}</Text>
          <Text style={styles.text}>Rating: {restaurant.review.rating}</Text>
          <Text style={styles.text}>
            Opening Hours:{' '}
            {moment(restaurant.openingHours.startTime, ['h']).format('HH:mm')} -{' '}
            {moment(restaurant.openingHours.stopTime, ['h']).format('HH:mm')}
          </Text>
        </View>
        <View style={{ position: 'absolute', right: 10, top: 20 }}>
          <AirbnbRating
            showRating={false}
            isDisabled
            defaultRating={restaurant.review.rating}
            size={10}
            selectedColor={colorScheme.primary}
          />
          {restaurant.ambience && (
            <Text style={styles.text}>Ambience Seatings</Text>
          )}
        </View>
      </View>
      <View
        style={{
          backgroundColor: colorScheme.background,
          margin: 10,
          padding: 10,
          borderRadius: 20,
        }}
      >
        <View style={styles.booking}>
          <View>
            <Text style={styles.textHeader}>Dine in Booking</Text>
            <View
              style={{
                flexDirection: 'row',
              }}
            >
              <View style={{ margin: 10 }}>
                <Text style={styles.bookingText}>
                  Date: {moment(date).format('DD/MM/yyyy')}
                </Text>
                <TouchableOpacity onPress={showDatepicker}>
                  <Text style={styles.btn}>Change Date</Text>
                </TouchableOpacity>
              </View>
              <View style={{ margin: 10, marginHorizontal: 25 }}>
                <Text style={styles.bookingText}>
                  Time: {moment(time).format('hh:mm A')}
                </Text>
                <TouchableOpacity onPress={showTimepicker}>
                  <Text style={styles.btn}>Change Time</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: 15,
          }}
        >
          <Text style={styles.text}>Number of Pax</Text>
          <Picker
            onValueChange={(itemValue) => setPax(itemValue)}
            selectedValue={pax}
            mode="dropdown"
            style={{
              position: 'absolute',
              right: 0,
              marginLeft: 20,
              width: '50%',
            }}
          >
            <Picker.Item label="1" value="1" />
            <Picker.Item label="2" value="2" />
            <Picker.Item label="3" value="3" />
            <Picker.Item label="4" value="4" />
            <Picker.Item label="5" value="5" />
          </Picker>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: 15,
          }}
        >
          {restaurant.ambience && (
            <>
              <Text style={styles.text}>Choice of Seatings</Text>

              <Picker
                onValueChange={(itemValue) => setSeat(itemValue)}
                selectedValue={seat}
                mode="dropdown"
                style={{
                  position: 'absolute',
                  right: 0,
                  marginLeft: 20,
                  width: '50%',
                }}
              >
                {restaurant.ambienceSeating.map((seats) => {
                  return (
                    <Picker.Item
                      label={seats.name}
                      key={seats.name}
                      value="1"
                    />
                  );
                })}
              </Picker>
            </>
          )}
        </View>
      </View>

      <View
        style={{
          backgroundColor: colorScheme.background,
          margin: 10,
          padding: 10,
          borderRadius: 20,
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}
      >
        <View>
          <Text
            style={{
              color: colorScheme.secondary,
              fontSize: 16,
              fontWeight: 'bold',
            }}
          >
            Menu Highlights
          </Text>
          {restaurant.menu &&
            restaurant.menu.map((menu, idx) => {
              return <Text key={idx}>{menu.name}</Text>;
            })}
        </View>
        <View>
          <Text
            style={{
              color: colorScheme.secondary,
              fontSize: 16,
              fontWeight: 'bold',
            }}
          >
            Price
          </Text>
          {restaurant.menu &&
            restaurant.menu.map((menu, idx) => {
              return <Text key={idx}>{menu.price}</Text>;
            })}
        </View>
      </View>
      {error && (
        <Text style={{ textAlign: 'center', color: colorScheme.primary }}>
          Invalid time and date input
        </Text>
      )}
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
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bookingText: {
    color: colorScheme.secondary,
    fontSize: 16,
    fontWeight: 'bold',
  },
  btn: {
    backgroundColor: colorScheme.secondary,
    borderRadius: 50,
    color: colorScheme.white,
    margin: 5,
    padding: 5,
    textAlign: 'center',
    width: 120,
  },
  container: {
    flex: 1,
    margin: 10,
  },
  image: {
    height: 200,
    width: Dimensions.get('window').width,
    resizeMode: 'stretch',
  },
  whitebackground: {
    backgroundColor: 'white',
    padding: 5,
    flexDirection: 'row',
  },
  text: {
    fontSize: 16,
    color: colorScheme.secondary,
  },
  textHeader: {
    color: colorScheme.primary,
    fontSize: 26,
    fontWeight: 'bold',
  },
});
