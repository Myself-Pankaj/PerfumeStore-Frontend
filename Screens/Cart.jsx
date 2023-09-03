import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Component/Loader";
import { getCartItems, updateCartItemQuantity } from "../Redux/Actions/CartAction";
import CartItem from "../Component/CartItem";
import HangOn from "../Component/HangOn";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { getAllItems } from "../Redux/Actions/ItemAction";
import ProductCard from "../Component/ProductCard";

const Cart = ({navigation}) => {
  const dispatch = useDispatch();
  const { loading, cart } = useSelector((state) => state.getFromCart);
  const { products } = useSelector((state) => state.items);
  // const quantities = cart.map(item => item.quantity);
  // console.log(quantities)
  const [totalPrice, setTotalPrice] = useState(0); 

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

  // Update the total price whenever the cart changes
  useEffect(() => {
    setTotalPrice(calculateTotalPrice());
  }, [cart]);

  // console.log(totalPrice)
  useEffect(() => {
    dispatch(getAllItems());
  }, [dispatch]);
  
  useEffect(() => {
    dispatch(getCartItems());
  }, [dispatch]);
  // console.log(cart)

  if (!cart) {
    return <Loader />;
  }

  if (typeof cart === "undefined") {
    return <HangOn />;
  }

  if (loading) {
    return <Loader />;
  }
  if (cart.length === 0) {
    return (
      <View style={Style.container}>
        <Text style={Style.title}>Cart</Text>
        <TouchableOpacity style={Style.emptyCart}>
          <MaterialCommunityIcons name="cart-minus" size={76} color="#0f4459" />
          <Text style={Style.emptyCartText}> YOUR CART IS EMPTY ... </Text>
        </TouchableOpacity>

        <Text style={Style.recommendationText}>
          {" "}
          PRODUCTS YOU MAY LIKE ...{" "}
        </Text>

        <ScrollView style={Style.productContainer} showsVerticalScrollIndicator={false}>
          {products && products.length > 0 ? (
            <View style={Style.rowContainer}>
              {products &&
                products.map((product) => (
                  <View key={product._id} style={Style.columnContainer}>
                    <ProductCard
                      // key={product._id}
                      productId={product._id}
                      name={product.name}
                      avatar={product.images[0].url}
                      price={product.price}
                      description={product.description}
                    />
                  </View>
                ))}
            </View>
          ) : (
            <Loader />
          )}
        </ScrollView>
      </View>
    );
  }
  // cart.forEach((cartItem) => {
  //   const quantity = cartItem.quantity; // Access the quantity property of each cart item
  //   // console.log(quantity);
  //   // increaseQuantity(cartItem.productId, quantity);
  // });
// Function to increase the quantity of the cart item
const increaseQuantity = async (productId, quantity) => {
  try {
    await dispatch(updateCartItemQuantity(productId, quantity, 'increase'));
    dispatch(getCartItems());
  } catch (error) {
    // Handle errors if needed
  }
};

// Function to decrease the quantity of the cart item
const decreaseQuantity = async (productId,quantity) => {
  try {
    await dispatch(updateCartItemQuantity(productId, quantity, 'decrease'));
    dispatch(getCartItems());
  } catch (error) {
    // Handle errors if needed
  }
};

  const handlePress = () => {
    navigation.navigate("Address");
  };
  // console.log(cart)

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cart</Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        {cart.map((item) => (
          <View key={item._id} style={styles.productContainer}>
            {item.product.map((product) => (
              <CartItem
                key={product._id}
                productId={product._id}
                name={product.name}
                avatar={product.images[0].url}
                price={product.price}
                quantity={item.quantity}
                loading={loading} // Pass the loading prop
                onIncrease={() => increaseQuantity(product._id, item.quantity)}
                onDecrease={() => decreaseQuantity(product._id, item.quantity)}
                style={styles.cartItem}
              />
            ))}
          </View>
        ))}
      </ScrollView>
      <>
      <View style={styles.buttonContainer}>
      <View style={styles.totalPriceContainer}>
        <Text style={styles.totalPriceText}>Cart Total</Text>
        <Text style={styles.totalPriceValue}>₹ {totalPrice}</Text>
      </View>
      <TouchableOpacity style={styles.checkoutButton} onPress={handlePress}>
        <MaterialCommunityIcons name="cart-check" size={26} color="white" />
        <Text style={styles.checkoutButtonText}>BUY NOW ..</Text>
      </TouchableOpacity>
    </View>
      </>
    </View>
  );
};

export default Cart;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "white",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 36,
    textAlign: "center",
    borderBottomColor: "black",
    // borderBottomWidth:1
  },
  productContainer: {
    fontSize: 18,
    marginBottom: 16,
    // borderWidth:1,
    // borderColor:'blue',
  },
  cartItems: {
    flex: 1,
  },
  cartItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  itemImage: {
    width: 80,
    height: 80,
    marginRight: 16,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  itemDescription: {
    marginBottom: 8,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  quantityInput: {
    width: 40,
    marginLeft: 8,
    borderWidth: 1,
    borderColor: "gray",
    padding: 4,
  },
  itemPrice: {
    fontSize: 16,
    marginBottom: 8,
  },

  // checkoutButton: {
  //   flexDirection: "row",
  //   backgroundColor: "#0f4459",
  //   paddingHorizontal: 16,
  //   paddingVertical: 12,
  //   borderRadius: 8,
  //   alignItems: "center",
  //   justifyContent: "center",
  //   elevation: 7,
  // },
  // checkoutButtonText: {
  //   fontSize: 18,
  //   color: "white",
  //   textAlign: "center",
  // },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  totalPriceContainer: {
   flexDirection: "column",
    alignItems: "center",
    // backgroundColor: "#0f4459",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
    alignSelf: "flex-end",
  },
  totalPriceText: {
    fontSize: 14,
    fontWeight: "bold",
  },
  totalPriceValue: {
    fontSize: 16,
  },
  checkoutButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0f4459",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
    alignSelf: "flex-end", // Align the button to the right
  },
  checkoutButtonText: {
    color: "white",
    fontSize: 18,
    marginLeft: 5,
  },
});
const Style = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  emptyCartText: {
    fontSize: 18,
    marginBottom: 8,
    fontWeight:"500",
    color:"#0f4459"

  },
  recommendationText: {
    fontSize: 15,
    marginTop: 16,
    marginBottom: 8,
    fontWeight:"700",
  },

  //Product Container
  productContainer: {
    flex: 1,
    // padding: 16,
  },
  rowContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  columnContainer: {
    width: "48%",
    marginBottom: 16,
  },
  emptyCart:{
    height:"30%",
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
});
