import React, { useContext, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import useAuth from '../auth/useAuth';
import UserInputButton from '../components/UserInputButton';
import { instance } from '../config/axios';
import AuthContext from '../context/AuthContext';
import colorScheme from '../util/color';

export default function AccountScreen() {
  const context = useContext(AuthContext);
  const { logout } = useAuth();
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Name</Text>
      <TextInput style={styles.input} placeholder="name" />
      <Text style={styles.label}>Password</Text>
      <TextInput style={styles.input} placeholder="name" />
      <View style={styles.btnContainer}>
        <TouchableOpacity onPress={logout}>
          <UserInputButton
            text="Update"
            location="center"
            color={colorScheme.secondary}
          />
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity onPress={logout}>
          <UserInputButton text="Logout" location="center" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  btnContainer: {
    marginVertical: 20,
  },
  container: {
    flex: 1,
    margin: 20,
    padding: 10,
  },
  label: {
    color: colorScheme.primary,
    fontSize: 16,
    margin: 5,
  },
  input: {
    backgroundColor: 'white',
    fontSize: 20,
    padding: 10,
    margin: 5,
  },
});
