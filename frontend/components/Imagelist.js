import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colorScheme from "../util/color";

export default function Imagelist() {
  const [imagePermission, setImagePermission] = useState(false);
  const [image, setImage] = useState(null);
  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const {
          status,
        } = await ImagePicker.requestCameraRollPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, [imagePermission]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={pickImage}>
      <View style={styles.imageContainer}>
        {!image ? (
          <MaterialCommunityIcons
            name="camera"
            color={colorScheme.primary}
            size={40}
          />
        ) : (
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    alignItems: "center",
    backgroundColor: colorScheme.secbackground,
    borderRadius: 15,
    borderColor: colorScheme.primary,
    borderWidth: 2,
    height: 100,
    justifyContent: "center",
    marginHorizontal: 10,
    overflow: "hidden",
    width: 100,
  },
});
