import React, { useEffect, useState } from 'react';
import { Button, ScrollView, StyleSheet, Text, View } from 'react-native';

import { instance } from '../config/axios';
import useAuth from '../auth/useAuth';
import Card from '../components/Card';
import SearchBar from '../components/SearchBar';
import colorScheme from '../util/color';
import authStorage from '../auth/authstorage';
import ErrorModal from '../components/ErrorModal';

export default function Home({ hide, setBook }) {
  const { login, logout } = useAuth();
  const [newRestaurant, setNewRestaurant] = useState([]);
  const [recommendationRestaurant, setRecommendation] = useState([]);
  const [error, setError] = useState('');
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const token = await authStorage.getToken();
        const user = await instance.post(
          '/v1/api/auth',
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        return user;
      } catch (error) {
        setError(error.response.data.error);
        hide(true);
        setShowError(true);
      }
    };
    const fetchRestaurant = async () => {
      try {
        const restaurant = await instance.get('/v1/api/restaurant?limit=5');
        const recommended = await instance.get('/v1/api/restaurant?limit=5');
        setNewRestaurant(restaurant.data);
        setRecommendation(recommended.data);
      } catch (err) {
        console.error(err);
        setError(err);
      }
    };
    if (checkSession()) {
      fetchRestaurant();
    }
  }, []);

  const onClose = () => {
    setError(false);
    setShowError(false);
    logout();
  };
  return (
    <View style={styles.container}>
      {showError && error ? (
        <ErrorModal error={error} onClose={onClose} />
      ) : null}
      <ScrollView style={styles.scrollContainer}>
        <Text style={styles.header}>Welcome Back,</Text>
        <SearchBar />
        <Card
          title="New Restaurants"
          restaurant={newRestaurant}
          setBook={setBook}
        />
        <Card
          title="Recommended for you"
          restaurant={recommendationRestaurant}
          setBook={setBook}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colorScheme.background,
    flex: 1,
  },
  header: {
    color: colorScheme.primary,
    fontSize: 20,
  },
  scrollContainer: {
    padding: 20,
  },
});
