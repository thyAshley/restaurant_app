import React, { useContext, useState } from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native';

import Imagelist from '../components/Imagelist';
import colorScheme from '../util/color';
import UserInputButton from '../components/UserInputButton';
import { instance } from '../config/axios';
import AuthContext from '../context/AuthContext';
import authStorage from '../auth/authstorage';

export default function ImageScreen({ navigation }) {
  const { restaurant, setRestaurant } = useContext(AuthContext);
  const token = authStorage.getToken();
  const [imageUri, setImageUri] = useState('');
  const [imageUri2, setImageUri2] = useState('');
  const [imageUri3, setImageUri3] = useState('');
  const [ambienceUri, setambienceUri] = useState('');
  const [ambienceUri2, setambienceUri2] = useState('');
  const [ambienceUri3, setambienceUri3] = useState('');

  const addImages = async () => {
    const data = new FormData();
    if (imageUri) {
      data.append('file', {
        name: `image 1`,
        type: 'image/jpeg',
        uri: imageUri,
      });
    }
    if (imageUri2) {
      data.append('file', {
        name: `image 2`,
        type: 'image/jpeg',
        uri: imageUri2,
      });
    }
    if (imageUri3) {
      data.append('file', {
        name: `image 3`,
        type: 'image/jpeg',
        uri: imageUri3,
      });
    }

    response = await instance.post(
      `/v1/api/restaurant/${restaurant._id}/upload`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    console.log('add image');
  };
  const addAmbience = async () => {
    const ambienceData = new FormData();
    if (ambienceUri) {
      ambienceData.append('file', {
        name: `image 1`,
        type: 'image/jpeg',
        uri: ambienceUri,
      });
    }
    if (ambienceUri2) {
      ambienceData.append('file', {
        name: `image 2`,
        type: 'image/jpeg',
        uri: ambienceUri2,
      });
    }
    if (ambienceUri3) {
      ambienceData.append('file', {
        name: `image 3`,
        type: 'image/jpeg',
        uri: ambienceUri3,
      });
    }

    response = await instance.post(
      `/v1/api/restaurant/${restaurant._id}/uploadambience`,
      ambienceData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    console.log('add ambience');
    setRestaurant(response.data);
  };

  const addimgToDB = async () => {
    await addImages();
    await addAmbience();
    navigation.navigate('homeStack');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.page2Input}>
        Please provide us with the pictures of your restaurant ambience/food.
      </Text>
      <View style={styles.imageContainer} horizontal>
        <Imagelist setImageUri={setImageUri} imageUri={imageUri} />
        <Imagelist setImageUri={setImageUri2} imageUri={imageUri2} />
        <Imagelist setImageUri={setImageUri3} imageUri={imageUri3} />
      </View>
      <Text style={styles.page2Input}>
        Kindly upload a copy of the restaurant layout for diners. Please ensure
        that the layout is clearly labelled for ease of referencing
      </Text>
      <View style={styles.inputContainer}>
        <Text style={styles.inputText}>Ambience Layout</Text>
        <View style={styles.imageContainer} horizontal>
          <Imagelist setImageUri={setambienceUri} imageUri={ambienceUri} />
          <Imagelist setImageUri={setambienceUri2} imageUri={ambienceUri2} />
          <Imagelist setImageUri={setambienceUri3} imageUri={ambienceUri3} />
        </View>
      </View>
      <View style={{ width: '80%', flexDirection: 'row', margin: 20 }}>
        <TouchableWithoutFeedback onPress={addimgToDB}>
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    margin: 20,
  },
  imageContainer: {
    backgroundColor: colorScheme.white,
    borderColor: colorScheme.primary,
    borderWidth: 1,
    borderRadius: 25,
    flexDirection: 'row',
    padding: 5,
    width: '100%',
  },
  inputContainer: {
    backgroundColor: colorScheme.background,
    borderRadius: 20,
    padding: 10,
    marginVertical: 50,
    width: '100%',
  },
  page2Input: {
    color: colorScheme.primary,
    fontSize: 16,
    marginTop: 30,
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
    alignSelf: 'center',
    padding: 5,
    paddingHorizontal: 20,
    width: '90%',
  },
  inputText: {
    color: colorScheme.primary,
    fontSize: 16,
    fontWeight: 'bold',
    padding: 10,
  },
  selectBtn: {
    borderColor: colorScheme.primary,
    borderWidth: 1,
    color: 'black',
    width: '30%',
    textAlign: 'center',
    padding: 10,
  },
});
