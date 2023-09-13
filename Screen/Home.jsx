import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image,StatusBar } from "react-native";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllItems } from "../States/Product/productAction";
import ProductCard from "../Components/ProductCard";
import EntypoIcons from "react-native-vector-icons/Entypo";
import Loader from "../Components/Loader";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import CustomSearchBar from "../Layouts/SearchBar";
import Videos from "../Layouts/Video";

const Home = ({navigation}) => {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const { products, loading, error } = useSelector((state) => state.product);
 

  useEffect(() => {
    dispatch(getAllItems());
  }, [dispatch]);

  const isVerified = isAuthenticated && user.verified;

  const showVerifyToast = () => {
    Toast.show({
      type: "info",
      text1: "Verify Your Account",
      text2: "Please verify your account to access all features.",
    });
  };

  const showToast = () => {
    Toast.show({
      type: "info",
      text1: "Authentication Required",
      text2: "Please log in and verify your account to access all features.",
    });
  };
  useEffect(() => {
    if (isAuthenticated && !isVerified) {
      showVerifyToast();
    } else if (!isAuthenticated) {
      showToast();
    }
  }, [isAuthenticated, isVerified]);

  const handlePlayVideo = () => {
    setIsPlaying(true);
  };
  const handleCategoryClick = (keyword) => {
    navigation.navigate("SearchResults", { keyword });
  };

  return (
    <>
      {isAuthenticated && isVerified && (
        <>
          <View style={styles.mainContainer}>
            <View style={styles.headerbox}>
              <View style={styles.headerTextConatiner}>
                <Text style={styles.headerText}>M-Attar-Plazaa</Text>
              </View>
              <View style={styles.homeHeaderIconContainer}>
                <View style={styles.homeHeaderIconContainer}>
                  <TouchableOpacity onPress={() => navigation.navigate("cart")}>
                    <EntypoIcons
                      name="shopping-bag"
                      size={32}
                      color="#ff9800"
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <CustomSearchBar />

            <ScrollView showsVerticalScrollIndicator={false}>
              <View>
                <ScrollView
                  horizontal
                  contentContainerStyle={styles.container}
                  showsHorizontalScrollIndicator={false} // Make the scrollbar at the bottom invisible
                >
                  <View></View>
                  <View style={styles.splComponent}>
                    <Image
                      source={require("../assets/Category.png")}
                      style={styles.image}
                    />
                    <Text style={styles.componentText}>Categories</Text>
                  </View>

                  <View style={styles.componentStyle}>
                    <TouchableOpacity
                      onPress={() => handleCategoryClick("Attar")}
                    >
                      <View style={styles.component}>
                        <Image
                          source={require("../assets/CategoryAttar.jpg")}
                          style={styles.image}
                        />
                      </View>
                      <Text style={styles.componentText}>Attar</Text>
                    </TouchableOpacity>
                  </View>

                  <View style={styles.componentStyle}>
                    <TouchableOpacity
                      onPress={() => handleCategoryClick("Dhoop")}
                    >
                      <View style={styles.component}>
                        <Image
                          source={require("../assets/CategoryDhoop.jpg")}
                          style={styles.image}
                        />
                      </View>
                      <Text style={styles.componentText}>Loban Dhoop</Text>
                    </TouchableOpacity>
                  </View>

                  <View style={styles.componentStyle}>
                    <TouchableOpacity
                      onPress={() => handleCategoryClick("Surma")}
                    >
                      <View style={styles.component}>
                        <Image
                          source={require("../assets/Surma.jpg")}
                          style={styles.image}
                        />
                      </View>
                      <Text style={styles.componentText}>Surma</Text>
                    </TouchableOpacity>
                  </View>

                  <View style={styles.componentStyle}>
                    <TouchableOpacity
                      onPress={() => handleCategoryClick("M-special")}
                    >
                      <View style={styles.component}>
                        <Image
                          source={require("../assets/Special.png")}
                          style={styles.image}
                        />
                      </View>
                      <Text style={styles.componentText}>Featured Items</Text>
                    </TouchableOpacity>
                  </View>

                  <View style={styles.componentStyle}>
                    <TouchableOpacity
                      onPress={() => handleCategoryClick("Others")}
                    >
                      <View style={styles.component}>
                        <Image
                          source={require("../assets/Other.jpg")}
                          style={styles.image}
                        />
                      </View>
                      <Text style={styles.componentText}>Others</Text>
                    </TouchableOpacity>
                  </View>
                </ScrollView>
              </View>

              {/* //Poster Section */}

              <Videos />

              {/* //Products */}

              <View style={styles.productContainer}>
                {products && products.length > 0 ? (
                  <View style={styles.rowContainer}>
                    {products &&
                      products.map((product) => (
                        <View key={product._id} style={styles.columnContainer}>
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
              </View>
            </ScrollView>
          </View>
        </>
      )}

      {/* {isAuthenticated && !isVerified && <Verify />} */}

      {!isAuthenticated && (
        <>
          <View style={styles.mainContainer}>
            <View style={styles.headerbox}>
              <View style={styles.headerTextConatiner}>
                <Text style={styles.headerText}>M-Attar-Plazaa</Text>
              </View>
              <View style={styles.homeHeaderIconContainer}>
                <View style={styles.homeHeaderIconContainer}>
                  <TouchableOpacity onPress={() => navigation.navigate("cart")}>
                    <EntypoIcons
                      name="shopping-bag"
                      size={32}
                      color="#ff9800"
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <CustomSearchBar />

            <ScrollView showsVerticalScrollIndicator={false}>
              {/* //Scrollbar */}
              <View>
                <ScrollView
                  horizontal
                  contentContainerStyle={styles.container}
                  showsHorizontalScrollIndicator={false} 
                >
                  <View></View>
                  <View style={styles.splComponent}>
                    <Image
                      source={require("../assets/Category.png")}
                      style={styles.image}
                    />
                    <Text style={styles.componentText}>Categories</Text>
                  </View>

                  <View style={styles.componentStyle}>
                    <TouchableOpacity
                      onPress={() => handleCategoryClick("Attar")}
                    >
                      <View style={styles.component}>
                        <Image
                          source={require("../assets/CategoryAttar.jpg")}
                          style={styles.image}
                        />
                      </View>
                      <Text style={styles.componentText}>Attar</Text>
                    </TouchableOpacity>
                  </View>

                  <View style={styles.componentStyle}>
                    <TouchableOpacity
                      onPress={() => handleCategoryClick("Dhoop")}
                    >
                      <View style={styles.component}>
                        <Image
                          source={require("../assets/CategoryDhoop.jpg")}
                          style={styles.image}
                        />
                      </View>
                      <Text style={styles.componentText}>Loban Dhoop</Text>
                    </TouchableOpacity>
                  </View>

                  <View style={styles.componentStyle}>
                    <TouchableOpacity
                      onPress={() => handleCategoryClick("Surma")}
                    >
                      <View style={styles.component}>
                        <Image
                          source={require("../assets/Surma.jpg")}
                          style={styles.image}
                        />
                      </View>
                      <Text style={styles.componentText}>Surma</Text>
                    </TouchableOpacity>
                  </View>

                  <View style={styles.componentStyle}>
                    <TouchableOpacity
                      onPress={() => handleCategoryClick("M-special")}
                    >
                      <View style={styles.component}>
                        <Image
                          source={require("../assets/Special.png")}
                          style={styles.image}
                        />
                      </View>
                      <Text style={styles.componentText}>Featured Items</Text>
                    </TouchableOpacity>
                  </View>

                  <View style={styles.componentStyle}>
                    <TouchableOpacity
                      onPress={() => handleCategoryClick("Others")}
                    >
                      <View style={styles.component}>
                        <Image
                          source={require("../assets/Other.jpg")}
                          style={styles.image}
                        />
                      </View>
                      <Text style={styles.componentText}>Others</Text>
                    </TouchableOpacity>
                  </View>
                </ScrollView>
              </View>

              {/* //Poster Section */}

              <Videos />

              {/* //Products */}

              <View style={styles.productContainer}>
                {products && products.length > 0 ? (
                  <View style={styles.rowContainer}>
                    {products.slice(0, 20).map((product) => (
                      <View key={product._id} style={styles.columnContainer}>
                        <ProductCard
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
              </View>
            </ScrollView>
          </View>
        </>
      )}
    </>
  
  );
};

export default Home;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "#fff",
    flex: 1,
  },
  headerTextConatiner: {
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "600",
  },
  headerbox: {
    padding: 10,
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomColor: "white",
    elevation: 8,
    marginBottom: 5,
  },
  //scrolable component
  container: {
    paddingHorizontal: 8,
    flexDirection: "row",
    paddingVertical: 10,
    marginBottom: 20,
    height: 140,
  },
  component: {
    width: 100,
    height: 100,
    elevation: 2,
    borderRadius: 10,
    borderColor: "white",
    borderWidth: 2,
    marginHorizontal: 10,
    overflow: "hidden",
  },
  componentStyle: {},
  componentText: {
    fontSize: 14,
    color: "#003333",
    textAlign: "center",
  },
  splComponent: {
    width: 100,
    height: 100,
    marginHorizontal: 10,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
    overflow: "hidden",
  },

  productContainer: {
    flex: 1,
    padding: 16,
  },
  rowContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  columnContainer: {
    width: "49%",
    marginBottom: 16,
  },
});