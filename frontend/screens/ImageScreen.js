import React, { useContext, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Switch,
  ScrollView,
  TextInput,
} from 'react-native';

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
  const [ambience, setAmbience] = useState(false);
  const [tableOne, settableOne] = useState('');
  const [tableOnePax, settableOnePax] = useState('');
  const [tableTwo, settableTwo] = useState('');
  const [tableTwoPax, settableTwoPax] = useState('');
  const [tableThree, settableThree] = useState('');
  const [tableThreePax, settableThreePax] = useState('');
  const [tableFour, settableFour] = useState('');
  const [tableFourPax, settableFourPax] = useState('');
  const [tableFive, settableFive] = useState('');
  const [tableFivePax, settableFivePax] = useState('');

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
    setRestaurant(response.data);
  };

  const addimgToDB = async () => {
    await addImages();
    if (ambience) {
      const seatings = [];
      if (tableOne) {
        seatings.push({
          name: tableOne,
          pax: tableOnePax,
        });
      }
      if (tableTwo) {
        seatings.push({
          name: tableTwo,
          pax: tableTwoPax,
        });
      }
      if (tableThree) {
        seatings.push({
          name: tableThree,
          pax: tableThreePax,
        });
      }
      if (tableFour) {
        seatings.push({
          name: tableFour,
          pax: tableFourPax,
        });
      }
      if (tableFive) {
        seatings.push({
          name: tableFive,
          pax: tableFivePax,
        });
      }
      await addAmbience();
      console.log(seatings);
      await instance.post(
        `/v1/api/restaurant/${restaurant._id}/ambience`,
        {
          seatings: seatings,
          ambience: ambience,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
    }
    navigation.navigate('homeStack');
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.page2Input}>
        Please provide us with the pictures of your restaurant ambience/food.
      </Text>
      <View style={styles.imageContainer} horizontal>
        <Imagelist setImageUri={setImageUri} imageUri={imageUri} />
        <Imagelist setImageUri={setImageUri2} imageUri={imageUri2} />
        <Imagelist setImageUri={setImageUri3} imageUri={imageUri3} />
      </View>
      <View
        style={{
          width: '100%',
          margin: 15,
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
        }}
      >
        <Text
          style={{
            color: colorScheme.primary,
            fontSize: 16,
          }}
        >
          Does your restaurant have ambience seating?
        </Text>
        <Switch
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={ambience ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={setAmbience}
          value={ambience}
        />
      </View>
      {ambience && (
        <>
          <Text style={styles.page2Input}>
            Kindly upload a copy of the restaurant layout for diners. Please
            ensure that the layout is clearly labelled for ease of referencing
          </Text>
          <View style={styles.inputContainer}>
            <Text style={styles.inputText}>Ambience Layout</Text>
            <View style={styles.imageContainer} horizontal>
              <Imagelist setImageUri={setambienceUri} imageUri={ambienceUri} />
              <Imagelist
                setImageUri={setambienceUri2}
                imageUri={ambienceUri2}
              />
              <Imagelist
                setImageUri={setambienceUri3}
                imageUri={ambienceUri3}
              />
            </View>
            <View>
              <Text style={styles.inputText}>Seats</Text>
            </View>
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  width: '100%',
                }}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    width: '50%',
                    alignItems: 'center',
                  }}
                >
                  <Text>Table</Text>
                  <TextInput
                    style={styles.inputField}
                    onChangeText={settableOne}
                  />
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    width: '50%',
                    alignItems: 'center',
                  }}
                >
                  <Text>Capacity</Text>
                  <TextInput
                    style={styles.inputField}
                    onChangeText={settableOnePax}
                  />
                </View>
              </View>
            </View>
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  width: '100%',
                }}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    width: '50%',
                    alignItems: 'center',
                  }}
                >
                  <Text>Table</Text>
                  <TextInput
                    style={styles.inputField}
                    onChangeText={settableTwo}
                    value={tableTwo}
                  />
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    width: '50%',
                    alignItems: 'center',
                  }}
                >
                  <Text>Capacity</Text>
                  <TextInput
                    style={styles.inputField}
                    onChangeText={settableTwoPax}
                    value={tableTwoPax}
                  />
                </View>
              </View>
            </View>
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  width: '100%',
                }}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    width: '50%',
                    alignItems: 'center',
                  }}
                >
                  <Text>Table</Text>
                  <TextInput
                    style={styles.inputField}
                    onChangeText={settableThree}
                    value={tableThree}
                  />
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    width: '50%',
                    alignItems: 'center',
                  }}
                >
                  <Text>Capacity</Text>
                  <TextInput
                    style={styles.inputField}
                    onChangeText={settableThreePax}
                    value={tableThreePax}
                  />
                </View>
              </View>
            </View>
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  width: '100%',
                }}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    width: '50%',
                    alignItems: 'center',
                  }}
                >
                  <Text>Table</Text>
                  <TextInput
                    style={styles.inputField}
                    onChangeText={settableFour}
                    value={tableFour}
                  />
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    width: '50%',
                    alignItems: 'center',
                  }}
                >
                  <Text>Capacity</Text>
                  <TextInput
                    style={styles.inputField}
                    onChangeText={settableFourPax}
                    value={tableFourPax}
                  />
                </View>
              </View>
            </View>
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  width: '100%',
                }}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    width: '50%',
                    alignItems: 'center',
                  }}
                >
                  <Text>Table</Text>
                  <TextInput
                    style={styles.inputField}
                    onChangeText={settableFive}
                    value={tableFive}
                  />
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    width: '50%',
                    alignItems: 'center',
                  }}
                >
                  <Text>Capacity</Text>
                  <TextInput
                    style={styles.inputField}
                    onChangeText={settableFivePax}
                    value={tableFivePax}
                  />
                </View>
              </View>
            </View>
          </View>
        </>
      )}

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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
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
  container: {
    flex: 1,
    marginHorizontal: 20,
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
    marginVertical: 10,
    width: '100%',
  },
  page2Input: {
    color: colorScheme.primary,
    fontSize: 16,
    marginTop: 10,
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
    marginLeft: 5,
    width: '60%',
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
