import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Icon from "react-native-vector-icons/AntDesign";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import {
  deleteMyProfile,
  loadUser,
  logoutUser,
} from "../Redux/Actions/UserAction";
import { Toast } from "react-native-toast-message/lib/src/Toast";

const Profile = ({ navigation }) => {
  const { user } = useSelector((state) => state.auth);
  const { loading, message } = useSelector((state) => state.profile);
  const [displayMessage, setDisplayMessage] = React.useState(null);
  // console.log(user)
  React.useEffect(() => {
    if (message) {
      Toast.show({
        type: "success",
        text1: "Profile Deletion",
        text2: message,
        visibilityTime: 3000, // Duration to display the toast
      });
      dispatch({ type: "clearMessage" });
    }
  }, [message]);

  const dispatch = useDispatch();
  const logoutHandler = async () => {
    dispatch(logoutUser());
  };

  const deleteProfileHandler = async () => {
    try {
      await dispatch(deleteMyProfile());

      // Set the displayMessage state with the updated message
      setDisplayMessage(message);
    } catch (error) {
      console.log("Error deleting profile:", error);
    }
  };

  return (
    <View style={styles.mainContainer}>
      <Toast />
      <Text style={styles.heading}>MY PROFILE</Text>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.profileInfo}>
          <View style={styles.boxImg}>
            <Image
              source={{ uri: `${user.avatar.url}` }}
              style={styles.avatar}
            />
          </View>
        </View>
        <View style={styles.profileDetails}>
          <View>
            <Text style={styles.name}>{user.name}</Text>
            <Text style={styles.email}>{user.email}</Text>
          </View>

          <View>
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => navigation.navigate("edit-profile")}
            >
              <Icon name="edit" size={20} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.rowContainer}>
          <TouchableOpacity
            style={styles.columnItem}
            onPress={() => navigation.navigate("order")}
          >
            {/* Your component 1 */}
            {/* Example: */}
            <Icon name="edit" size={30} color="#0f4459" />
            <Text>My Orders</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.columnItem}
            onPress={() => navigation.navigate("cart")}
          >
            {/* Your component 2 */}
            {/* Example: */}
            <FontAwesome name="opencart" size={30} color="#0f4459" />
            <Text>My Cart</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.rowContainer}>
          <TouchableOpacity style={styles.columnItem}>
            {/* Your component 3 */}
            {/* Example: */}
            <MaterialCommunityIcons
              name="headphones-settings"
              size={30}
              color="#0f4459"
            />
            <Text>Help Center</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.columnItem}
            onPress={() => navigation.navigate("resetPasswd")}
          >
            {/* Your component 4 */}
            {/* Example: */}
            <MaterialCommunityIcons name="lock-reset" size={30} color="#0f4459" />
            <Text>Reset Password</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.logoutContainer}>
          <TouchableOpacity style={styles.logoutButton} onPress={logoutHandler}>
            <Text style={styles.logoutButtonText}>Log Out</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.deleteProfileContainer}>
          <TouchableOpacity
            style={[styles.deleteButton, { opacity: loading ? 0.5 : 1 }]}
            onPress={deleteProfileHandler}
            disabled={loading}
          >
            <Text style={styles.deleteButtonText}>Delete Account</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 40,
  },

  profileDetails: {
    flexDirection: "row",
    justifyContent: "space-between",

    alignItems: "center",

    backgroundColor: "white",
    borderRadius: 10,
    paddingVertical: 10,
    marginVertical: 20,
    elevation: 3,
    shadowColor: "black",
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },

  profileInfo: {
    alignItems: "center",
  },
  boxImg: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: "hidden",
    marginBottom: 10,
  },
  avatar: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  email: {
    fontSize: 16,
    marginBottom: 10,
  },
  editButton: {
    backgroundColor: "#ff9800",
    borderRadius: 20,
    padding: 10,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    width: "100%",
    marginBottom: 40,
  },
  columnItem: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    marginHorizontal: 5,
    elevation: 3,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  logoutButton: {
    backgroundColor: "#0f4459",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 20,
    marginBottom: 15,
  },
  deleteButton: {
    backgroundColor: "#900",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 20,
  },
  deleteButtonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
  },
  logoutButtonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
  },
});
