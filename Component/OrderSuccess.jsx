import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // You can choose any icon library you prefer

const OrderSuccess = () => {
  return (
    <View style={styles.container}>
      <Icon name="check-circle" size={80} color="#4CAF50" />
      <Text style={styles.heading}>Order Placed Successfully</Text>
      <Text style={styles.text}>Thank you for shopping with us!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  heading: {
    marginTop: 20,
    fontSize: 24,
    fontWeight: 'bold',
  },
  text: {
    marginTop: 10,
    fontSize: 16,
    color: '#666666',
  },
});

export default OrderSuccess;
