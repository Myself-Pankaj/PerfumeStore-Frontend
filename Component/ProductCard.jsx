import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

const ProductCard = ({ productId, name, avatar, price,description }) => {
  const navigation = useNavigation();
  const handleProductPress = () => {
    navigation.navigate("productdetail", { productId });
  };

  const originalPrice = price;
  const discountPercentage = Math.floor(Math.random() * 101);
  const discountedPrice = Math.round(originalPrice + (originalPrice * discountPercentage) / 100)

  return (
    <TouchableOpacity onPress={handleProductPress}>
      <View style={styles.card}>

        <Image source={{ uri: avatar }} style={styles.image} />
        <View style={styles.cardBody}>
          <Text numberOfLines={1} style={styles.title}>{name}</Text>
          <Text numberOfLines={1} style={styles.description}>{description}</Text>
          <Text style={styles.price}>
                <Text style={styles.productTag}>MRP : </Text>
                <Text style={styles.originalPrice}>₹{discountedPrice} </Text>
                <Text >₹{originalPrice}*</Text>
                <Text style={styles.productSubPrice}>({discountPercentage}% Off)</Text>
              </Text>

        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 3,
    marginBottom: 16,
    borderRadius: 3,
    marginBottom: 16,
    // borderWidth: 1,
    elevation:3,
    // borderColor: "#ddd",
  },
  image: {
    width: "100%",
    height: 180,
    resizeMode: "cover",
    backgroundColor: "white",
    borderBottomWidth:1,
    // borderBottomColor:"#ddd",
    borderRadius: 8,
    marginBottom: 6,
  },
  cardBody: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
    marginLeft:8,
    color: "#0f3a0e",
    textAlign:"left"
  },
  price: {
    fontSize: 14,
    marginBottom: 4,
    // textAlign:'center',
    fontWeight:'600',
    marginLeft:8,
    color: "#333333",
  },
  originalPrice: {
    fontSize: 10,
    marginBottom: 4,
    textDecorationLine: 'line-through',
    color: "#888",
  
  },
  productTag: {
    fontSize: 18,
    marginBottom: 8,
    fontWeight: "400",
  },
  productSubPrice: {
    color: "#e71410",
    fontSize: 10,
    fontWeight: "400",
  },
  description: {
    fontSize: 14,
    marginBottom: 4,
    marginLeft:8,
    color:'#003333',
  },
  category: {
    fontSize: 14,
    marginBottom: 4,
  },
});


