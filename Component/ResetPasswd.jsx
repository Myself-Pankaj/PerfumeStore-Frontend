import { View, Text, TextInput } from "react-native";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../Redux/Actions/UserAction";
import { Appbar, useTheme, Button } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import { Toast } from "react-native-toast-message/lib/src/Toast";

const ResetPasswd = ({ navigation }) => {
  const { loading, message, error } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const theme = useTheme();

  const handleResetPassword = () => {
    dispatch(resetPassword(oldPassword, newPassword));
  };
  React.useEffect(() => {
    if (message) {
      Toast.show({
        type: "success",
        text1: "Successful",
        text2: message,
        visibilityTime: 3000, // Duration to display the toast
      });
      dispatch({ type: "clearMessage" });

      setTimeout(() => {
        navigation.navigate('profile'); // Navigate to the profile screen
      }, 8000);// Navigate to the profile screen
    } else if (error) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Old password is incorrect.",
        visibilityTime: 3000, // Duration to display the toast
      });
      dispatch({ type: "clearError" }); // Assuming you have a "clearError" action
    }
  }, [message, error]);
  return (
    <View style={{ flex: 1 }}>
    <Toast />
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <MaterialCommunityIcons
        name="shield-lock"
        size={80}
        color='black'
        style={{ marginBottom: 20 }}
      />
      <TextInput
        placeholder="Old Password"
        value={oldPassword}
        onChangeText={setOldPassword}
        secureTextEntry
        style={{
          width: "80%",
          borderBottomColor: 'black',
          borderBottomWidth: 1,
          marginBottom: 20,
          paddingVertical: 10,
          fontSize: 16,
          backgroundColor: "#f1f1f1", // Background color
          borderRadius: 8, // Border radius
          paddingHorizontal: 10, // Horizontal padding
        }}
      />
  
      <TextInput
        placeholder="New Password"
        value={newPassword}
        onChangeText={setNewPassword}
        secureTextEntry
        style={{
          width: "80%",
          borderBottomColor: theme.colors.primary,
          borderBottomWidth: 1,
          marginBottom: 20,
          paddingVertical: 10,
          fontSize: 16,
          backgroundColor: "#f1f1f1", // Background color
          borderRadius: 8, // Border radius
          paddingHorizontal: 10, // Horizontal padding
        }}
      />
      {/* Use Paper Button */}
      <Button
        mode="contained"
        onPress={handleResetPassword}
        disabled={!oldPassword || !newPassword}
        style={{ width: "80%", borderRadius: 8 }} // Button styling
        loading={loading}
        icon="book-edit"
    
        buttonColor="black"
      >
        Reset Password
      </Button>
    </View>
  </View>
  
  
  
  );
};

export default ResetPasswd;

const styles = {
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