import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetails, newReview } from "../Redux/Actions/ItemAction";
import Fontisto from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Loader from "./Loader";
import Carousel from "./Carousel";
import ProductFooter from "./ProductFooter";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { addToCart } from "../Redux/Actions/CartAction";

const ProductDetail = ({ route }) => {
  const { productId } = route.params;
  const dispatch = useDispatch();

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const { loading, product, error } = useSelector((state) => state.itemDetail);
  const { message } = useSelector((state) => state.addToCart);

  useEffect(() => {
    if (message) {
      Toast.show({
        type: "success",
        text1: "Success",
        text2: message,
      });
      dispatch({ type: "clearMessage" });
    }
  }, [message, dispatch]);
  const {
    loading: reviewLoading,
    success,
    error: reviewError,
  } = useSelector((state) => state.review);

  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => {
    if (product.Stock <= quantity) return;

    const qty = quantity + 1;
    setQuantity(qty);
  };

  const decreaseQuantity = () => {
    if (1 >= quantity) return;

    const qty = quantity - 1;
    setQuantity(qty);
  };
  useEffect(() => {
    dispatch(getProductDetails(productId));
  }, [dispatch, productId]);

  if (error) {
    return <Text>Error occurred while loading the product.</Text>;
  }

  if (!product) {
    return <Loader />;
  }

  const addToCartHandler = async () => {
    try {
      await dispatch(addToCart(productId, quantity));
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error adding item to cart",
        text2: error.message,
      });
    }
  };

  const originalPrice = product.price;
  const discountPercentage = Math.floor(Math.random() * 101);
  const discountedPrice = Math.round(originalPrice + (originalPrice * discountPercentage) / 100)

  const handleReviewSubmit = async () => {
    const reviewData = {
      rating,
      comment,
      productId,
    };

    try {
      await dispatch(newReview(reviewData));
      await dispatch(getProductDetails(productId)); // Fetch updated product details

      // Reset form fields
      setRating(0);
      setComment("");
    } catch (reviewError) {
      console.error(reviewError);
    }
  };

  const calculateOverallRating = (reviews) => {
    if (reviews.length === 0) {
      return 0; // Return 0 if there are no reviews
    }

    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    const overallRating = totalRating / reviews.length;

    return overallRating.toFixed(1); // Round the rating to one decimal place
  };

  // ...

  const overallRating = calculateOverallRating(product.reviews);



  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <View style={styles.container}>
          <Toast />
          <ScrollView
            contentContainerStyle={styles.scrollContentContainer}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.carouselContainer}>
              <Carousel images={product.images} />
            </View>
            <View style={styles.detailsContainer}>
              <Text style={styles.productName}>{product.name}</Text>
              <Text style={styles.productPrice}>
                <Text style={styles.productTag}>MRP : </Text>
                <Text style={styles.originalPrice}>₹{discountedPrice} </Text>
                <Text >₹{originalPrice}*</Text>
                <Text style={styles.productSubPrice}>({discountPercentage}% Off)</Text>
              </Text>
              <Text>
                Status:
                <Text
                  style={[
                    styles.status,
                    product.Stock < 1 ? styles.redColor : styles.greenColor,
                  ]}
                >
                  {product.Stock < 1 ? "OutOfStock" : "InStock"}
                </Text>
              </Text>
              <View style={styles.quantityContainer}>
                <Text style={styles.productTag}>Quantity : </Text>
                <TouchableOpacity
                  onPress={decreaseQuantity}
                  style={styles.quantityButton}
                >
                  <Text style={styles.quantityButtonText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.quantityText}>{quantity}</Text>
                <TouchableOpacity
                  onPress={increaseQuantity}
                  style={styles.quantityButton}
                >
                  <Text style={styles.quantityButtonText}>+</Text>
                </TouchableOpacity>
              </View>
              {/* Product description */}
              <View style={styles.descriptionContainer}>
                <Text style={styles.descriptionText}>
                  {product.description}
                </Text>
              </View>
            </View>

            {/* //Review Section */}

            <View style={styles.reviewsContainer}>
              <View style={styles.overallRatingContainer}>
                <Text style={styles.overallRatingText}>
                  Overall Rating: {overallRating}
                </Text>
                <View style={styles.starContainer}>
                  {Array.from(Array(Math.round(overallRating)), (_, index) => (
                    <FontAwesome
                      key={index}
                      name="star"
                      size={20}
                      color="#ffc107"
                      style={styles.starIcon}
                    />
                  ))}
                </View>
              </View>
              <Text style={styles.reviewsHeading}>Product Reviews</Text>
              {product.reviews.length === 0 ? (
                <Text style={styles.noReviewText}>No Reviews</Text>
              ) : (
                product.reviews.map((review) => (
                  <View key={review._id} style={styles.reviewItem}>
                    <Text style={styles.reviewAuthor}>{review.name}</Text>
                    <View style={styles.ratingContainer}>
                      <View style={styles.starContainer}>
                        <Text style={styles.reviewRating}>Rating: </Text>
                        {Array.from(Array(review.rating), (_, index) => (
                          <FontAwesome
                            key={index}
                            name="star"
                            size={20}
                            color="#ffc107"
                            style={styles.starIcon}
                          />
                        ))}
                      </View>
                    </View>
                    <Text style={styles.reviewComment}>{review.comment}</Text>
                  </View>
                ))
              )}
              {/* <View style={styles.userReviewContainer}>
                <Text style={styles.userReviewHeading}>Write a Review</Text>
                <TextInput
                  style={styles.commentInput}
                  placeholder="Your Comment"
                  value={comment}
                  onChangeText={setComment}
                />
                <View style={styles.ratingContainer}>
                  <Text style={styles.reviewRating}>Rating: </Text>
                  <View style={styles.starContainer}>
                    {[1, 2, 3, 4, 5].map((index) => (
                      <TouchableOpacity
                        key={index}
                        onPress={() => setRating(index)}
                      >
                        <FontAwesome
                          name={index <= rating ? 'star' : 'star-o'}
                          size={24}
                          color={index <= rating ? '#ffc107' : '#ccc'}
                          style={styles.starIcon}
                        />
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
                <Button
                  style={styles.submitButton}
                  onPress={handleReviewSubmit}
                  disabled={rating === 0 || comment === ''}
                  loading={reviewLoading}
                >
                  <Text style={styles.submitButtonText}>Submit Review</Text>
                </Button>
              </View> */}
            </View>
            {/* //Product Footer  */}
            <ProductFooter />
          </ScrollView>
          {/* Add to Bag Button */}
          <TouchableOpacity
            disabled={product.Stock < 1}
            onPress={addToCartHandler}
            style={[
              styles.addToCartButton,
              product.Stock < 1 && styles.disabledButton,
            ]}
          >
            <Text style={styles.addToCartButtonText}>
              <Fontisto
                style={styles.cartIcon}
                name="shopping"
                size={25}
                color="#ff9800"
              />
              ADD TO BAG
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

export default ProductDetail;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F4F4",
    padding: 16,
  },
  detailBlock: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 16,
  },
  carouselContainer: {
    marginBottom: 16,
    marginTop:34,
   
  },
  carouselImage: {
    width: 200,
    height: 180,
    borderWidth:5,
    borderColor:'red',
    resizeMode: "cover",
    borderRadius: 8,
  },
  detailsContainer: {
    marginBottom: 16,
  },
  productName: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#0f3a0e",
  },
  originalPrice: {
    fontSize: 15,
    marginBottom: 4,
    textDecorationLine: 'line-through',
    color: "#888",
  
  },
  productPrice: {
    fontSize: 18,
    marginBottom: 8,
    fontWeight: "700",
  },
  productTag: {
    fontSize: 18,
    marginBottom: 8,
    fontWeight: "400",
  },
  productSubPrice: {
    color: "#e71410",
    fontSize: 15,
    fontWeight: "400",
  },
  status: {
    fontWeight: "bold",
    marginLeft: 8,
  },
  redColor: {
    color: "red",
  },
  greenColor: {
    color: "green",
  },
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
  addToCartButton: {
    backgroundColor: "#0f4459",
    paddingVertical: 12,
    borderRadius: 8,
  },
  addToCartButtonText: {
    fontSize: 18,
    // fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  disabledButton: {
    backgroundColor: "#C0C0C0",
  },
  cartIcon: {
    // Add your cart icon styles
  },
  descriptionText: {
    fontSize: 18,
  },

  //Review Section
  reviewsContainer: {
    marginTop: 20,
    backgroundColor: "white",
    // elevation:4,
    padding: 4,
    borderRadius: 4,
    marginBottom: 4,
  },
  reviewsHeading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  noReviewText: {
    fontStyle: "italic",
    textAlign: "center",
    marginBottom: 10,
  },
  reviewItem: {
    marginBottom: 15,
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#F0F0F0",
  },
  reviewAuthor: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  reviewRating: {
    marginBottom: 5,
  },
  reviewComment: {
    lineHeight: 20,
  },
  starContainer: {
    flexDirection: "row",
  },
});
