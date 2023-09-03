import { View, Text, StyleSheet, Image } from "react-native";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrderDetails } from "../Redux/Actions/OrderAction";
import { ScrollView } from "react-native";

const OrderDetails = ({ route }) => {
  const { orderId } = route.params;
  const { order, loading } = useSelector((state) => state.orderDetail);

  // console.log(order)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrderDetails(orderId));
  }, [orderId, dispatch]);

  return (

    <ScrollView contentContainerStyle={styles.container}>
      {order && (
        <>
          <Text style={styles.orderText}>
            Thanks for your Order,{" "}
            <Text style={styles.customerName}>
              {order.shippingInfo.fullName}
            </Text>
            !
          </Text>
          <View>
            {order.orderItems.map((item) => (
              <View key={item._id} style={styles.orderItem}>
                <Image
                  source={{ uri: item.image }}
                  style={styles.productImage}
                />
                <View style={styles.productInfo}>
                  <Text style={styles.productName}>{item.name}</Text>
                  <Text style={styles.productDetails}>
                    Qty: {item.quantity}
                  </Text>
                  <Text style={styles.productDetails}>Rs {item.price}</Text>
                </View>
              </View>
            ))}

            <View style={styles.orderDetails}>
              <Text style={styles.orderHeading}>Order Details</Text>

              <View style={styles.orderRow}>
                <Text style={styles.orderLabel}>Tax Price:</Text>
                <Text style={styles.orderValue}>₹ {order.taxPrice}</Text>
              </View>

              <View style={styles.addressSection}>
                <View style={styles.orderRow}>
                  <Text style={[styles.orderLabel, styles.addressLabel]}>
                    Deliver To:
                  </Text>
                  <View style={{ flex: 1, alignItems: "flex-end" }}>
                    <Text style={styles.orderValue}>
                      {order.shippingInfo.address}, {order.shippingInfo.city},{" "}
                      {order.shippingInfo.state}, {order.shippingInfo.country} -{" "}
                      {order.shippingInfo.pinCode}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles.orderRow}>
                <Text style={styles.orderLabel}>Phone No:</Text>
                <Text style={styles.orderValue}>
                  {order.shippingInfo.phoneNo}
                </Text>
              </View>
              <View style={styles.orderRow}>
                <Text style={styles.orderLabel}>Payment Mode:</Text>
                <Text style={styles.orderValue}>{order.paymentMethod}</Text>
              </View>

              <View style={styles.orderRow}>
                <Text style={styles.orderLabel}>Order Status:</Text>
                <Text style={styles.orderValue}>{order.orderStatus}</Text>
              </View>
            </View>

            <View style={styles.totalAmount}>
              <Text style={styles.totalText}>Total paid:</Text>
              <Text style={styles.totalValue}>₹ {order.totalAmount}</Text>
            </View>
          </View>
        </>
      )}
    </ScrollView>
  );
};

export default OrderDetails;


const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#f0f0f0",
    padding: 16,
  },
  orderText: {
    color: "#333",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  customerName: {
    color: "#ff6f61",
  },
  orderItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 16,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#333",
  },
  productDetails: {
    color: "#777",
    marginBottom: 4,
  },
  orderDetails: {
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    paddingTop: 16,
    marginBottom: 16,
  },
  orderHeading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#333",
  },
  orderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
  },
  orderLabel: {
    color: "#777",
    flex: 1,
  },
  orderValue: {
    fontWeight: "bold",
    color: "#333",
  },
  totalAmount: {
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "flex-end",
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  totalText: {
    color: "black",
    fontSize: 16,
    textTransform: "uppercase",
  },
  totalValue: {
    fontWeight: "bold",
    fontSize: 24,
  },
});
