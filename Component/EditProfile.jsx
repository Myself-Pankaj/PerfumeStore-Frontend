import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Button } from "react-native-paper";
import mime from "mime";
import { loadUser, updateProfile } from "../Redux/Actions/UserAction";
const EditProfile = ({ navigation, route }) => {
  const { user } = useSelector((state) => state.auth);

  const { loading } = useSelector((state) => state.profile);

  const [name, setName] = useState(user.name);
  const [avatar, setAvatar] = useState(user.avatar.url);

  const dispatch = useDispatch();

  const submitHandler = async () => {
    const myForm = new FormData();
    myForm.append("name", name);
    myForm.append("avatar", {
      uri: avatar,
      type: mime.getType(avatar),
      name: avatar.split("/").pop(),
    });

    try {
      await dispatch(updateProfile(myForm));
      dispatch(loadUser()).then(() => {
        navigation.navigate("profile");
      });
    } catch (error) {
      // Handle any errors that might occur during the update
      console.error("Error updating profile:", error);
    }
  };

  const handleImage = () => {
    navigation.navigate("camera", {
      updateProfile: true,
    });
  };

  useEffect(() => {
    if (route.params) {
      if (route.params.image) {
        setAvatar(route.params.image);
      }
    }
  }, [route]);
  return (
    <View style={Styles.Container}>
      <View style={Styles.avatarContainer}>
        <Avatar.Image
          size={100}
          source={{ uri: avatar ? avatar : null }}
          style={Styles.avatar}
        />
        {/* <TouchableOpacity onPress={handleImage}>
          <Text style={Styles.text1}>Change Photo</Text>
        </TouchableOpacity> */}
      </View>

      <View style={Styles.inputContainer}>
        <Text style={Styles.label}>Name</Text>
        <TextInput
          placeholder="Name"
          value={name}
          onChangeText={setName} // Update the state variable on change
        />
      </View>

      <Button
        disabled={!name}
        style={Styles.btn}
        loading={loading}
        onPress={submitHandler}
        icon="book-edit"
        mode="contained"
        buttonColor="black"
      >
        <Text style={Styles.text2}>Update</Text>
      </Button>
    </View>
  );
};

export default EditProfile;

const Styles = {
  Container: {
    flex: 1,
    justifyContent: "center",
    //   alignItems: "center",
    padding: 40,
  },
  avatarContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  avatar: {
    marginBottom: 10,
  },
  text1: {
    color: "blue",
    fontSize: 16,
  },
  label: {
    color: "black",
    backgroundColor: "#f1f1f1",
    position: "absolute",
    top: -12,
    left: 8,
    zIndex: 1,
    paddingHorizontal: 3,
  },
  inputContainer: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    marginTop: 10,
    marginBottom: 35,
  },
  btn: {
    marginBottom: 20,
  },
  text2: {
    color: "white",
    fontSize: 18,
  },
};
