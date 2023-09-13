// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   TextInput,
//   TouchableOpacity,
//   ImageBackground,
//   SafeAreaView,
//   StatusBar,
//   Platform,
// } from "react-native";
// import { Avatar, Button } from "react-native-paper";
// import { useDispatch, useSelector } from "react-redux";

// import mime from "mime";
// import { Toast } from "react-native-toast-message/lib/src/Toast";
// import { loadUser, register, verify } from "../States/Auth/authAction";

// const Register = ({ navigation, route }) => {
//   const { error, loading, message } = useSelector((state) => state.register);

//   const [avatar, setAvatar] = useState("");
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const [otp, setOtp] = useState('');
//   const { error:verifyError, message:verifyMessage ,loading:verifyLoading } = useSelector(state => state.verification);

//   const [registrationSuccess, setRegistrationSuccess] = useState(false);
//   const dispatch = useDispatch();

//   const handleImage = () => {
//     navigation.navigate("R_camera", {
//       updateProfile: false,
//     });
//   };
//   const verifyHandler = async () => {
//     await dispatch(verify(otp));
//     dispatch(loadUser());
//   };

//   useEffect(() => {
//     if (error) {
//       Toast.show({
//         type: 'error',
//         text1: 'Error',
//         text2: error,
//       });
//       dispatch({ type: "clearError" });
//     }
//     if (message) {
//         Toast.show({
//           type: 'success',
//           text1: 'Success',
//           text2: message,
//         });
//         dispatch({ type: "clearMessage" });
//       }
//   }, [error, dispatch,alert]);

//   const registerHandler = async () => {
//     const myForm = new FormData();
//     myForm.append("name", name);
//     myForm.append("email", email);
//     myForm.append("password", password);
//     myForm.append("avatar", {
//       uri: avatar,
//       type: mime.getType(avatar),
//       name: avatar.split("/").pop(),
//     });

//     try {
//       await dispatch(register(myForm));
//       setRegistrationSuccess(true)
//     } catch (error) {}
//   };

//   useEffect(() => {
//     if (route.params && route.params.image) {
//       setAvatar(route.params.image);
//     }
//   }, [route]);

//   return (
//     <View style={styles.container}>
//       <View style={styles.card}>
//         <Text style={styles.title}>REGISTRATION</Text>
//         <View style={styles.avatarContainer}>
//           <Avatar.Image
//             size={100}
//             source={{ uri: avatar ? avatar : null }}
//             style={styles.avatar}
//           />
//           <TouchableOpacity onPress={handleImage}>
//             <Text style={styles.changePhotoText}>Change Photo</Text>
//           </TouchableOpacity>
//         </View>

//         <View style={styles.formContainer}>
//           <TextInput
//             style={styles.input}
//             placeholder="Name"
//             value={name}
//             onChangeText={setName}
//           />
//           <TextInput
//             style={styles.input}
//             placeholder="Email"
//             value={email}
//             onChangeText={setEmail}
//           />
//           <TextInput
//             secureTextEntry
//             style={styles.input}
//             placeholder="Password"
//             value={password}
//             onChangeText={setPassword}
//           />
//            {registrationSuccess ? (

//           <TextInput
//             style={styles.input}
//             placeholder="OTP"
//             value={otp}
//             onChangeText={setOtp}
//           />

//       ) : null}
//         </View>

//         <Button
//           disabled={!email || !password || !name}
//           icon="account-plus"
//           style={styles.registerbtn}
//           onPress={registrationSuccess ? verifyOTP : registerHandler}
//           loading={loading}
//         >
//           {registrationSuccess ? "Verify OTP" : "Register"}
//         </Button>

//         <TouchableOpacity onPress={() => navigation.navigate("login")}>
//           <Text style={styles.loginText}>
//             Have an Account? <Text style={styles.loginButtonText}>Login</Text>
//           </Text>
//         </TouchableOpacity>
//       </View>
//       <Toast />
//     </View>
//   );
// };

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Avatar, Button } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import mime from "mime";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { loadUser, register, verify } from "../States/Auth/authAction";

const Register = ({ navigation, route }) => {
  const { error, loading, message } = useSelector((state) => state.register);

  const [avatar, setAvatar] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const {
    error: verifyError,
    message: verifyMessage,
    loading: verifyLoading,
  } = useSelector((state) => state.verification);

  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const dispatch = useDispatch();

  const handleImage = () => {
    navigation.navigate("R_camera", {
      updateProfile: false,
    });
  };

  useEffect(() => {
    if (error) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: error,
      });
      dispatch({ type: "clearError" });
    }
    if (message) {
      Toast.show({
        type: "success",
        text1: "Success",
        text2: message,
      });
      dispatch({ type: "clearMessage" });
    }
    // Handle verifyError and verifyMessage
    if (verifyError) {
      Toast.show({
        type: "error",
        text1: "Verification Error",
        text2: verifyError,
      });
      dispatch({ type: "clearVerifyError" });
    }
    if (verifyMessage) {
      Toast.show({
        type: "success",
        text1: "Verification Success",
        text2: verifyMessage,
      });

      dispatch({ type: "clearVerifyMessage" });
    }
  }, [error, message, verifyError, verifyMessage, dispatch]);

  const verifyHandler = async () => {
    await dispatch(verify(otp));
    dispatch(loadUser());
  };

  const registerHandler = async () => {
    const myForm = new FormData();
    myForm.append("name", name);
    myForm.append("email", email);
    myForm.append("password", password);
    myForm.append("avatar", {
      uri: avatar,
      type: mime.getType(avatar),
      name: avatar.split("/").pop(),
    });

    try {
      await dispatch(register(myForm));
      setRegistrationSuccess(true);
    } catch (error) {}
  };

  useEffect(() => {
    if (route.params && route.params.image) {
      setAvatar(route.params.image);
    }
  }, [route]);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>REGISTRATION</Text>
        <View style={styles.avatarContainer}>
          <Avatar.Image
            size={100}
            source={{ uri: avatar ? avatar : null }}
            style={styles.avatar}
          />
          <TouchableOpacity onPress={handleImage}>
            <Text style={styles.changePhotoText}>Change Photo</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            secureTextEntry
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
          />
          {registrationSuccess ? (
            <TextInput
              style={styles.input}
              placeholder="OTP"
              value={otp}
              keyboardType="numeric"
              onChangeText={setOtp}
            />
          ) : null}
        </View>

        <Button
          icon="account-plus"
          mode="contained"
          buttonColor="#ff9800"
          onPress={registrationSuccess ? verifyHandler : registerHandler}
          loading={loading || verifyLoading}
        >
          {registrationSuccess ? "Verify OTP" : "Register"}
        </Button>

        <TouchableOpacity onPress={() => navigation.navigate("auth")}>
          <Text style={styles.loginText}>
            Have an Account? <Text style={styles.loginButtonText}>Login</Text>
          </Text>
        </TouchableOpacity>
      </View>
      <Toast />
    </View>
  );
};
export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'linear-gradient(180deg, rgba(17,127,155,1) 0%, rgba(174,224,28,1) 100%)',
    justifyContent: "center",
  },

  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 10,
    padding: 20,
    width: "80%",
    alignSelf: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  avatarContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  avatar: {
    backgroundColor: "#ff9800",
  },
  changePhotoText: {
    color: "#900",
  },
  formContainer: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#999999",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  registerbtn: {
    backgroundColor: "#ff9800",
    borderRadius: 5,
    padding: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  loginText: {
    color: "#900",
    height: 30,
    margin: 20,
  },
  loginButtonText: {
    color: "#2196f3",
  },
});
