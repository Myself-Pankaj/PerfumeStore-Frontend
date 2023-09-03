import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { getCartItems, removeFromCart } from "../Redux/Actions/CartAction";
import { useDispatch, useSelector } from "react-redux";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const CartItem = ({
  productId,
  name,
  avatar,
  price,
  quantity,
  onIncrease,
  onDecrease,
  loading
}) => {
  const dispatch = useDispatch();
  const { message } = useSelector((state) => state.addToCart);

  const [localQuantity, setLocalQuantity] = useState(quantity);

  useEffect(() => {
    if (message) {
      dispatch({ type: "clearMessage" });
    }
  }, [message, dispatch]);
  const navigation = useNavigation();

  const handleProductPress = () => {
    navigation.navigate("productdetail", { productId });
  };

  const removeFromCartHandler = async () => {
    try {
      await dispatch(removeFromCart(productId));
      dispatch(getCartItems());
      setTimeout(() => {
        Toast.show({
          type: "success",
          text1: "Success",
          text2: "Item Removed From your Cart Successfully",
        });
      }, 2000); // Adjust the delay as needed
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: error,
      });
    }
  };
  const handleIncrease = async () => {
    if (loading) return; // Don't do anything if the cart is updating
    const newQuantity = localQuantity + 1;
    setLocalQuantity(newQuantity);
    try {
      await onIncrease(productId, newQuantity);
    } catch (error) {
      setLocalQuantity(quantity); // Reset local quantity on error
    }
  };

  const handleDecrease = async () => {
    if (loading || localQuantity <= 1) return; // Don't do anything if the cart is updating or quantity is already 1
    const newQuantity = localQuantity - 1;
    setLocalQuantity(newQuantity);
    try {
      await onDecrease(productId, newQuantity);
    } catch (error) {
      setLocalQuantity(quantity); // Reset local quantity on error
    }
  };


  useEffect(() => {
    // Update localQuantity whenever the quantity prop changes
    setLocalQuantity(quantity);
  }, [quantity]);
  return (
    <>
      <TouchableOpacity onPress={handleProductPress}>
        <View style={styles.container}>
          <View>
            <Image source={{ uri: avatar }} style={styles.avatar} />
          </View>
          <View>
            <Text style={styles.itemName}>{name}</Text>
            <Text>{productId}</Text>
            <Text style={styles.itemPrice}>Price: ₹{price}</Text>
            {/* <Text style={styles.itemQuantity}>Quantity: {quantity}</Text> */}
            <View style={styles.quantityContainer}>
              <Text style={styles.productTag}>Quantity : </Text>
              <TouchableOpacity
                onPress={handleDecrease}
                disabled={quantity <= 1 || loading}

                style={styles.quantityButton}
              >
                <Text style={styles.quantityButtonText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.quantityText}>{localQuantity}</Text>
              <TouchableOpacity
                onPress={handleIncrease}
                style={styles.quantityButton}
                disabled={loading}
              >
                <Text style={styles.quantityButtonText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.removeButtonContainer}
        onPress={removeFromCartHandler}
      >
        <View style={styles.removeButton}>
          <MaterialIcons
            name="remove-shopping-cart"
            size={16}
            color="#0f4459"
            style={styles.removeButtonIcon}
          />
          <Text style={styles.removeButtonText}>Remove</Text>
        </View>
      </TouchableOpacity>

      <Toast />
    </>
  );
};

export default CartItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Customize the shadow properties as per your preference
    borderRadius: 8,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 5,
    marginRight: 10,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#0f3a0e",
  },
  itemPrice: {
    fontSize: 14,
    color: "#888",
    marginBottom: 5,
  },
  itemQuantity: {
    fontSize: 14,
    color: "#888",
  },
  //quantity constainer
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    marginTop: 8,
  },
  quantityButton: {
    backgroundColor: "#DDDDDD",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  quantityButtonText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  quantityText: {
    fontSize: 18,
    marginHorizontal: 8,
  },
  //remove button text
  removeButton: {
    flexDirection: "row",
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  removeButtonText: {
    color: "#0f3a0e",
    fontWeight: "bold",
    fontSize: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  removeButtonIcon: {
    margin: 2,
  },
  removeButtonContainer: {
    flexDirection: "row",
    backgroundColor: "white",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 34,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
    backgroundColor: "white",
  },
});
