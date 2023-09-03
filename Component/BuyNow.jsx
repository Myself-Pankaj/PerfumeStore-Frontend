import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import query from "india-pincode-search";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { useDispatch } from "react-redux";
import { saveShippingInfo } from "../Redux/Actions/CartAction";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const ShippingInfo = ({navigation}) => {
  const dispatch = useDispatch();

  //Contact Details

  const [fullName, setFullName] = useState("");
  const [phoneNo, setPhoneNo] = useState("");

  //Address
  const [address, setAddress] = useState("");
  const [pinCode, setPostalCode] = useState("");

  const [city, setCity] = useState("");
  const [state, setState] = useState("");

  const [village, setVillage] = useState("");
  const [office, setOffice] = useState("");

  const [country, setCountry] = useState("");

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const handleFindLocation = async () => {
    try {
      const results = await query.search(pinCode);
      if (results.length === 0) {
        Toast.show({
          type: "error",
          text1: "Location not found",
          text2: "No location found for the given postal code.",
        });
        return;
      }
      const [
        { city, office: officeResult, pincode, state, village: villageResult },
      ] = results;
      setCity(city);
      setState(state);
      setCity(city);
      setOffice(officeResult);
      setPostalCode(pincode);
      setState(state);
      setVillage(villageResult);
      setCountry("India");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // Function to check if all required fields are filled
    const checkIfFieldsAreFilled = () => {
      // Add your own validation logic here.
      // For example, if you want to check if all fields are non-empty:
      if (fullName &&  phoneNo.length === 10 && pinCode && address && village && city && state) {
        setIsButtonDisabled(false);
      } else {
        setIsButtonDisabled(true);
      }
    };

    // Call the checkIfFieldsAreFilled function whenever any of the relevant state variables change
    checkIfFieldsAreFilled();
  }, [fullName, phoneNo, pinCode, address, village, city, state]);

  useEffect(() => {
    // Only search for location when the pinCode has 6 digits
    if (pinCode.length === 6) {
      handleFindLocation();
    }
  }, [pinCode]);

  const handleSaveShippingInfo = () => {
    if (phoneNo.length !== 10) {
      Toast.show({
        type: "error",
        text1: "Location not found",
        text2: "Phone number must be exactly 10 digits..",
      });
      return;
    }
    // Create an object with the shipping information you want to save
    const shippingInfoData = {
      fullName,
      phoneNo,
      address,
      pinCode,
      city,
      state,
      village,
      office,
      country,
    };

    // Dispatch the saveShippingInfo action with the data
    dispatch(saveShippingInfo(shippingInfoData));
    navigation.navigate("Payment");
  };

  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          {/* ... your other code ... */}

          <View style={styles.contactDetailSection}>
            <Text style={styles.contactText}>CONTACT DETAILS</Text>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Name .</Text>
              <TextInput
                placeholder="Enter full name"
                value={fullName}
                onChangeText={setFullName} // Update the state variable on change
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Phone No .</Text>
              <TextInput
                placeholder="Enter phone number"
                value={phoneNo}
                onChangeText={setPhoneNo} // Update the state variable on change
                keyboardType="numeric" // This ensures the keyboard only shows numeric input
              />
            </View>
          </View>

          <View style={styles.contactDetailSection}>
            <Text style={styles.contactText}>YOUR ADDRESS</Text>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Postal Code</Text>
              <TextInput
                placeholder="Enter postal code"
                value={pinCode}
                onChangeText={setPostalCode} // Update the state variable on change
                keyboardType="numeric" // This ensures the keyboard only shows numeric input
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>
                Address (House No, Building, Street).
              </Text>
              <TextInput
                placeholder="Enter address"
                value={address}
                onChangeText={setAddress} // Update the state variable on change
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Area .</Text>
              <TextInput
                placeholder="Area"
                value={village}
                onChangeText={setVillage} // Update the state variable on change
              />
            </View>

            {/* Display city and state in a row inside a box */}
            {city && state && (
              <View style={styles.cityStateContainer}>
                <Text style={styles.cityStateText}>{city},</Text>
                <Text style={styles.cityStateText}>{state}</Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity
        style={[styles.procedButton, isButtonDisabled ? styles.disabledButton : styles.activeButton]}
        onPress={handleSaveShippingInfo}
        disabled={isButtonDisabled} 
      >
        <MaterialIcons
            style={styles.cartIcon}
            name="payment"
            size={25}
            color="white"
          />
        <Text style={styles.procedButtonText}>
          
          PAYMENT
        </Text>
      </TouchableOpacity>
      
    </>
  );
};

export default ShippingInfo;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    justifyContent: "center",
    padding: 20,
  },
  contactDetailSection: {
    backgroundColor: "#f1f1f1",
    borderRadius: 8,
    padding: 15,
    marginBottom: 30,
  },
  contactText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    padding: 5,
    borderRadius: 8,
    backgroundColor: "white",
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
  cityStateContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    paddingVertical: 10,
    backgroundColor: "#f1f1f1",
    borderRadius: 8,
  },
  cityStateText: {
    fontSize: 16,
    fontWeight: "bold",
    marginHorizontal: 5,
  },
  procedButton: {
    backgroundColor: "#0f4459",
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 10,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
  },
  procedButtonText: {
    fontSize: 18,
    // fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginVertical:2,
  },
  disabledButton: {
    backgroundColor: '#bdc3c7', // A dull color for the disabled state
  },
  activeButton: {
    backgroundColor: '#3498db',
  },
});
