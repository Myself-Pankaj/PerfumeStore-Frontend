import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import Icon from "react-native-vector-icons/MaterialIcons";
import * as ImagePicker from "expo-image-picker"

const RegisterCamera = ({ navigation, route }) => {
    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(CameraType.back);
    const [camera, setCamera] = useState(null);
  
    useEffect(() => {
      (async () => {
        const { status } = await Camera.requestCameraPermissionsAsync();
        setHasPermission(status === 'granted');
      })();
    }, []);
  
    const openImagePickerAsync = async () => {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
  
      if (permissionResult.granted === false) {
        alert("Permission to access the camera roll is required!");
        return;
      }
  
      const data = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      if (data.assets.length > 0) {
        const selectedImageUri = data.assets[0].uri;
  
        if (route.params.updateProfile) {
          navigation.navigate("update", { image: selectedImageUri });
        } else {
          navigation.navigate("register", { image: selectedImageUri });
        }
      }
    };
  
    const clickPicture = async () => {
      const data = await camera.takePictureAsync();
  
      if (route.params.updateProfile) {
        navigation.navigate("update", { image: data.uri });
      } else {
        navigation.navigate("register", { image: data.uri });
      }
    };
  
    if (hasPermission === null) {
      return <View />;
    }
    if (hasPermission === false) {
      return <Text>No access to camera</Text>;
    }
  
    return (
      <View style={{ flex: 1 }}>
        <Camera type={type} style={{ flex: 1, aspectRatio: 1 }} ratio="1:1" ref={(e) => setCamera(e)} />
  
        <View
          style={{
            flexDirection: "row",
            position: "absolute",
            bottom: 10,
            justifyContent: "space-evenly",
            width: "100%",
          }}
        >
          <Icon name="image" size={40} color="#fff" onPress={openImagePickerAsync} />
          <Icon name="camera" size={40} color="#fff" onPress={clickPicture} />
  
          <Icon
            name="flip-camera-android"
            size={40}
            color="#fff"
            onPress={() =>
              setType(type === CameraType.back ? CameraType.front : CameraType.back)
            }
          />
        </View>
      </View>
    );
  };
  

export default RegisterCamera;