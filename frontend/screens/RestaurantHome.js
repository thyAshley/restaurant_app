import React, { useContext, useEffect, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import BookingCard from '../components/BookingCard';
import Spinner from '../components/Spinner';
import { instance, urlLink } from '../config/axios';
import AuthContext from '../context/AuthContext';
import colorScheme from '../util/color';

export default function RestaurantHome({ navigation }) {
  const { user, setRestaurant, restaurant } = useContext(AuthContext);
  const [bookings, setBookings] = useState();

  useEffect(() => {
    const getRestaurant = async () => {
      const response = await instance.get(`/v1/api/restaurant/owner/${user}`);
      setRestaurant(response.data);
    };
    getRestaurant();
  }, []);

  useEffect(() => {
    const getBookings = async () => {
      if (restaurant && restaurant._id) {
        const response = await instance.get(
          `/v1/api/booking/${restaurant._id}`,
        );
        setBookings(response.data.bookings);
      }
    };
    getBookings();
  }, [restaurant]);

  let allImages;
  if (restaurant) {
    allImages = [...restaurant.images, ...restaurant.ambienceSeats].filter(
      (arr) => arr !== null,
    );
  }

  return (
    <View style={styles.container}>
      {!restaurant ? (
        <View
          style={{
            justifyContent: 'center',
            flex: 1,
          }}
        >
          <Text style={styles.missing}>
            We notice that you have not register your restaurant yet
          </Text>
          <TouchableWithoutFeedback onPress={() => navigation.navigate('reg')}>
            <Text style={styles.regButton}>Register Your Restaurant now!</Text>
          </TouchableWithoutFeedback>
        </View>
      ) : (
        <View>
          {restaurant.images.length === 0 ? (
            <View>
              <Text style={styles.missing}>
                We notice that you have not uploaded any image for your
                restaurant.
              </Text>
              <TouchableWithoutFeedback
                onPress={() => navigation.navigate('addImage')}
              >
                <Text style={styles.regButton}>Upload Image</Text>
              </TouchableWithoutFeedback>
            </View>
          ) : (
            <View style={{ backgroundColor: 'white' }}>
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
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <View style={{ marginLeft: 10, padding: 10 }}>
                  <Text style={styles.text}>{restaurant.name}</Text>
                  <Text style={styles.text}>{restaurant.address}</Text>
                  <Text style={styles.text}>{restaurant.cuisine}</Text>
                </View>
                <View style={{ marginRight: 10, padding: 10 }}>
                  <Text style={styles.text}>
                    {restaurant.openingHours.startTime}:00 -{' '}
                    {restaurant.openingHours.stopTime}:00
                  </Text>
                </View>
              </View>
            </View>
          )}

          <Text
            style={{
              color: colorScheme.primary,
              fontSize: 30,
              fontWeight: 'bold',
              margin: 15,
              marginTop: 30,
            }}
          >
            Restaurant Bookings
          </Text>
          <View style={{ height: 250 }}>
            <FlatList
              data={bookings}
              keyExtractor={(bookings) => bookings._id}
              renderItem={({ item }) => {
                return <BookingCard type="new" booking={item} rest={true} />;
              }}
            />
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    color: colorScheme.secondary,
    fontSize: 16,
  },
  container: {
    flex: 1,
    margin: 20,
  },
  secContainer: {
    backgroundColor: colorScheme.background,
    marginVertical: 20,
    flex: 1,
    height: 400,
  },
  missing: {
    textAlign: 'center',
    color: colorScheme.primary,
    fontSize: 20,
    padding: 10,
    margin: 10,
  },
  regButton: {
    alignSelf: 'center',
    padding: 20,
    backgroundColor: colorScheme.primary,
    color: colorScheme.white,
  },
  image: {
    height: 200,
    width: Dimensions.get('window').width,
    resizeMode: 'stretch',
  },
});
