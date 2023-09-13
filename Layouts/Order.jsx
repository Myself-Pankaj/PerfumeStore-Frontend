import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { RadioButton } from "react-native-paper";
import { getCartItems } from "../States/Cart/cartAction";
import Loader from "../Components/Loader";
import { createOrder } from "../States/Order/orderAction";


const Payment = ({ navigation }) => {
  const dispatch = useDispatch();

  const [totalPrice, setTotalPrice] = useState(0);

  const [paymentMethod, setPaymentMethod] = useState(null);

  const [disableBtn, setDisableBtn] = useState(false);

  const { loading, shippingInfo, cart } = useSelector(
    (state) => state.getFromCart
  );

  const { user } = useSelector((state) => state.auth);

  const { message, error } = useSelector((state) => state.Order);

  useEffect(() => {
    dispatch(getCartItems());
  }, [dispatch]);

  // Calculate the total price
  const calculateTotalPrice = () => {
    let total = 0;

    if (cart && cart.length > 0) {
      cart.forEach((item) => {
        item.product.forEach((product) => {
          total += product.price * item.quantity;
        });
      });
    }

    return total;
  };

  useEffect(() => {
    setTotalPrice(calculateTotalPrice());
  }, [cart]);

  //   console.log(totalPrice);

  const userDetails = `${shippingInfo.fullName},${shippingInfo.phoneNo},${shippingInfo.address}, ${shippingInfo.village},${shippingInfo.office},${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;

  const subTotal = totalPrice;

  const taxRate = 0.18; // 18% tax rate
  const tax = subTotal * taxRate;
  const shippingCharges = 100;
  const total = subTotal + tax + shippingCharges;
  const submitHandler = async (e) => {
    e.preventDefault();
    setDisableBtn(true); // Make sure this is correctly handled in your component

    if (paymentMethod === "COD") {
     
      const orderData = {
        shippingInfo,
        orderItems: cart.flatMap((cartItem) => {
          return cartItem.product.map((product) => ({
            name: product.name, 
            price: product.price,
            quantity: cartItem.quantity,
            image: product.images[0].url,
            product: cartItem._id,
            user: product.user,
          }));
        }),
        paymentMethod,
        itemsPrice: subTotal,
        taxPrice: tax,
        shippingCharges,
        totalAmount: total,
      };

      dispatch(createOrder(orderData));
      navigation.navigate("successOrder");
    }
  };

  useEffect(() => {
    // Assuming you have a state or prop named "message" which contains the success message
    if (message) {
      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Order Placed Successfully",
      });
    }
  }, [message]);

  useEffect(() => {
    // Assuming you have a state or prop named "message" which contains the success message
    if (error) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: error,
      });
    }
  }, [error]);
  if (loading) {
    return <Loader />;
  }

  const renderOrderItem = ({ item }) => (
    <View style={styles.orderItemContainer}>
      {item.product.map((product) => (
        <View key={product._id} style={styles.productContainer}>
          <Image
            source={{ uri: product.images[0].url }}
            style={styles.productImage}
          />
          <View style={styles.productDetails}>
            <Text style={styles.productName}>{product.name}</Text>
            <Text style={styles.productPrice}>Price: Rs.{product.price}</Text>
            <Text style={styles.productQuantity}>
              Quantity: {item.quantity}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );

  return (
    <View style={styles.confirmOrder}>
      <View style={styles.main}>
        <Text style={styles.heading}>Confirm Order</Text>

        {/* User Details */}
        <View style={styles.userDetailsContainer}>
          <Text style={styles.userDetailsHeading}>Shipping Details</Text>
          <Text style={styles.userDetailsText}>{shippingInfo.fullName}</Text>
          <Text style={styles.userDetailsText}>{shippingInfo.phoneNo}</Text>
          <Text style={styles.userDetailsText}>{shippingInfo.address}</Text>
          <Text style={styles.userDetailsText}>
            {shippingInfo.village}, {shippingInfo.office}, {shippingInfo.city}
          </Text>
          <Text style={styles.userDetailsText}>
            {shippingInfo.state} - {shippingInfo.pinCode}
          </Text>
          <Text style={styles.userDetailsText}>{shippingInfo.country}</Text>
        </View>

        {/* Order Items */}
        <Text style={styles.heading}>Order Items</Text>
        <FlatList
          data={cart}
          renderItem={renderOrderItem}
          keyExtractor={(item) => item._id}
        />
        <View style={styles.totalPriceContainer}>
          <Text style={styles.totalPriceText}>Sub Total</Text>
          <Text style={styles.totalPriceValue}>Rs. {subTotal}</Text>
        </View>
        <View style={styles.totalPriceContainer}>
          <Text style={styles.totalPriceText}>Tax</Text>
          <Text style={styles.totalPriceValue}>Rs. {tax}</Text>
        </View>
        <View style={styles.totalPriceContainer}>
          <Text style={styles.totalPriceText}>Shipping Charge</Text>
          <Text style={styles.totalPriceValue}>Rs. {shippingCharges}</Text>
        </View>
        <View style={styles.totalPriceContainer}>
          <Text style={styles.totalPriceText}>Total Price</Text>
          <Text style={styles.totalPriceValue}>Rs. {total}</Text>
        </View>

        {/* Payment Method */}
        <View style={styles.paymentOption}>
          <RadioButton
            value="COD"
            status={paymentMethod === "COD" ? "checked" : "unchecked"}
            onPress={() => setPaymentMethod("COD")}
            color="blue" // Change the color of the radio button when selected
          />
          <Text style={styles.optionText}>Cash On Delivery</Text>
        </View>

        {/* Place Order Button */}
        <TouchableOpacity
          style={[styles.button, !paymentMethod && styles.disabledButton]}
          onPress={submitHandler}
          disabled={!paymentMethod}
        >
          <Text style={styles.buttonText}>Place Order</Text>
        </TouchableOpacity>

        {/* ... (other components like Toast) */}
        <Toast />
      </View>
    </View>
  );
};

export default Payment;

const styles = StyleSheet.create({
  confirmOrder: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  main: {
    flex: 1,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  userDetailsContainer: {
    backgroundColor: "#f9f9f9",
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
  },
  userDetailsHeading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  userDetailsText: {
    fontSize: 16,
    marginBottom: 5,
  },
  orderItemContainer: {
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  productContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  productImage: {
    width: 80,
    height: 80,
    marginRight: 10,
  },
  productDetails: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 14,
    color: "#666",
  },
  productQuantity: {
    fontSize: 14,
    color: "#666",
  },
  paymentOption: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  optionText: {
    fontSize: 16,
    marginLeft: 10,
  },
  button: {
    backgroundColor: "#53a20e",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  disabledButton: {
    backgroundColor: "#ccc",
  },
  totalPriceContainer: {
    marginTop: 5,
    marginBottom: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  totalPriceText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#666",
  },
  totalPriceValue: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#53a20e",
  },
  totalPriceSection: {
    marginTop: "auto", // Move the section to the bottom
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    paddingTop: 10,
  },
});
