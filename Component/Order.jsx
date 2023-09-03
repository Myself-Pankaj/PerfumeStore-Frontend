import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  TouchableHighlight,
  FlatList,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCartItems } from "../Redux/Actions/CartAction";
import Loader from "./Loader";
import { createOrder } from "../Redux/Actions/OrderAction";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { RadioButton } from "react-native-paper";

const Order = ({ navigation }) => {
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
      // Assuming you have the necessary variables defined (shippingInfo, cart, paymentMethod, etc.)
      const orderData = {
        shippingInfo,
        orderItems: cart.flatMap((cartItem) => {
          return cartItem.product.map((product) => ({
            name: product.name, // Assuming the product object has a "name" field
            price: product.price, // Assuming the product object has a "price" field
            quantity: cartItem.quantity,
            image: product.images[0].url, // Assuming the product object has an "image" field
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
    // console.log(orderData)
    // } else {
    //   // createorderonline
    //   // Assuming you have the necessary variables defined (shippingInfo, cartItems, paymentMethod, etc.)
    //   console.log("Started payment ");

    //   // try {
    //   //   const { data: { order, orderOptions } } = await axios.post(`${serverUrl}/place-online-order`, orderData, {
    //   //     headers: {
    //   //       "Content-Type": "application/json",
    //   //     },
    //   //   });
    //   //   const razorpayOptions = {
    //   //     description: 'Credited To Attar Plazaa',
    //   //     image: 'https://i.imgur.com/3g7nmJC.jpg',
    //   //     currency: 'INR',
    //   //     key: 'rzp_test_NuC2MQ7cfwDpJT', // Replace this with your actual Razorpay API key
    //   //     amount: parseInt(order.amount),
    //   //     name: 'M-ATTAR-PLAZAA',
    //   //     order_id: order.id,
    //   //     prefill: {
    //   //       email: 'm-attar-plazaa@gmail.com',
    //   //       contact: '9191919191',
    //   //       name: 'Pankaj '
    //   //     },
    //   //     theme: { color: '#53a20e' }
    //   //   }

    //   //   RazorpayCheckout.open(razorpayOptions).then(async (data) => {
    //   //     // handle success
    //   //     alert(`Success: ${data.razorpay_payment_id}`);
    //   //     console.log(`Success: ${data.razorpay_payment_id}`);
    //   //     // Call the Redux action to verify the payment on the server-side
    //   //     try {
    //   //       const verificationResult = await paymentVerification({
    //   //         razorpay_payment_id: data.razorpay_payment_id,
    //   //         razorpay_order_id: data.razorpay_order_id,
    //   //         razorpay_signature: data.razorpay_signature,
    //   //         orderOptions, // Pass the orderOptions received from the server
    //   //       });
    //   //       console.log(verificationResult); // Handle the verification result as needed
    //   //     } catch (error) {
    //   //       console.error(error);
    //   //       alert("Payment verification failed.");
    //   //     }
    //   //   }).catch((error) => {
    //   //     // handle failure
    //   //     alert(`Error: ${error.code} | ${error.description}`);
    //   //     console.log( `Error: ${error.code} | ${error.description}`)
    //   //   });

    //   // } catch (error) {
    //   //   console.error(error);
    //   // }
    // }
  };

  // const orderData = {
  //   shippingInfo,
  //   orderItems: cart.flatMap((cartItem) => {
  //     return cartItem.product.map((product) => ({
  //       name: product.name, // Assuming the product object has a "name" field
  //       price: product.price, // Assuming the product object has a "price" field
  //       quantity: cartItem.quantity,
  //       image: product.images[0].url, // Assuming the product object has an "image" field
  //       product: cartItem._id,
  //       user: product.user,
  //     }));
  //   }),
  //   paymentMethod,
  //   itemsPrice: subTotal,
  //   taxPrice: tax,
  //   shippingCharges,
  //   totalAmount: total,
  // };

  // const handlePayment = async () => {
  //   try {
  //     const response = await fetch(`${serverUrl}/place-online-order`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(orderData),
  //     });

  //     const responseData = await response.json();
  //     console.log(responseData);
  //     console.log(responseData.order.amount); // This should print: 198800
  //     console.log(responseData.order.id); // This should print: "order_MHydd0TAl0S0Y6"
  //     console.log(responseData.success);

  //     // Check if the order was placed successfully
  //     if (responseData.success) {
  //       // Use the order_id received from the server for Razorpay payment
  //       const options = {
  //         description: "Credits towards consultation",
  //         image: "https://i.imgur.com/3g7nmJC.jpg",
  //         currency: "INR",
  //         key: "zp_test_NuC2MQ7cfwDpJT",
  //         amount: responseData.order.amount, // Use responseData.order.amount for the amount
  //         name: "Acme Corp",
  //         order_id: responseData.order.id, // Use responseData.order.id for the order_id
  //         prefill: {
  //           email: "gaurav.kumar@example.com",
  //           contact: "9191919191",
  //           name: "Gaurav Kumar",
  //         },
  //         theme: { color: "#53a20e" },
  //       };
  //       console.log("Before RazorpayCheckout.open");
  //       RazorpayCheckout.open(options)
  //         .then((data) => {
  //           // handle success
  //           alert(`Success: ${data.razorpay_payment_id}`);
  //         })
  //         .catch((error) => {
  //           // handle failure
  //           alert(`Error: ${error.code} | ${error.description}`);
  //           console.log(error)
  //         });
  //     } else {
  //       // Show an error message to the user if order placement was not successful
  //       Alert.alert(
  //         "Error",
  //         "Failed to place the order. Please try again later."
  //       );
  //     }
  //   } catch (error) {
  //     console.error("Error placing the order:", error);
  //     // Show an error message to the user
  //     Alert.alert(
  //       "Error",
  //       "Failed to place the order. Please try again later."
  //     );
  //   }
  // };

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

export default Order;

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
