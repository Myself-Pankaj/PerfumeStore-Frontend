import { View, Text, StyleSheet, Image } from "react-native";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { getMyOrders } from "../Redux/Actions/OrderAction";
import { FlatList } from "react-native";
import orderPng from "../assets/order.png";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import Loader from "./Loader";

const MyOrder = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { orders, loading, error } = useSelector((state) => state.myOrder);

  // console.log(orders);
  useEffect(() => {
    if (error) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: error,
      });
    }

    dispatch(getMyOrders());
  }, [dispatch, error]);

  const renderOrderItem = ({ item }) => {
    const createdAtDate = new Date(item.createdAt);
    const formattedCreatedAt = createdAtDate.toLocaleString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
    });
    const handleOrderPress = () => {
      // Navigate to OrderDetailsScreen with the order ID as a parameter
      navigation.navigate("OrderDetails", { orderId: item._id });
    };
    return (
      <>
        {loading ? (
          <Loader />
        ) : (
          
          <TouchableOpacity onPress={handleOrderPress}>
            <View style={styles.orderItem}>
              {/* <Image source={orderPng} style={styles.itemImage} /> */}
              <Text style={styles.boldText}>Order ID: <Text style={styles.heading}>{item._id}</Text></Text>
              <Text style={styles.boldText}>Name: <Text  style={styles.text}>{item.user.name}</Text></Text>
              <Text style={styles.boldText}>
                Total Amount: Rs. <Text  style={styles.text}>{item.totalAmount}</Text>
              </Text>
              <Text style={styles.boldText}>Order Date: <Text  style={styles.text}>{formattedCreatedAt}</Text></Text>

              {item.orderItems.map((product, index) => (
                <View key={index} style={styles.productItem}>
                  <Image
                    source={{ uri: product.image }}
                    style={styles.productImage}
                  />
                  <View style={styles.productDetails}>
                    <Text style={styles.productName}>{product.name}</Text>
                    
                    {/* Add more fields as needed */}
                  </View>
                </View>
              ))}
            </View>
          </TouchableOpacity>
        )}
      </>
    );
  };

  return (
    <View style={styles.container}>
    
      <FlatList
        data={orders}
        renderItem={renderOrderItem}
        keyExtractor={(item) => item._id}
      />
    
  </View>

  );
};

export default MyOrder;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    padding: 10,
  },
  orderItem: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 16,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  orderStatus: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  heading: {
    fontSize: 16,
    color: "#555",
    marginBottom: 6,
    fontWeight:400,
  },
  text: {
    fontSize: 14,
    color: "#555",
    marginBottom: 4,
    fontWeight:400,
  },
  boldText: {
    fontSize: 14,
    color: "#555",
    marginBottom: 4,
    fontWeight:800,
  },
  productItem: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#DDD",
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
  },
  productImage: {
    width: 80,
    height: 80,
    resizeMode: "cover",
    marginRight: 12,
  },
  productDetails: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 14,
    color: "#555",
  },
});
