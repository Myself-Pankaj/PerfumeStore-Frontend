import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
} from "react-native";
import { Entypo } from "react-native-vector-icons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
const Dashboard = ({ navigation }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuAnimation = useRef(new Animated.Value(0)).current;

  const handleMenuPress = () => {
    setIsMenuOpen(true);
    Animated.timing(menuAnimation, {
      toValue: 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const handleCloseMenu = () => {
    Animated.timing(menuAnimation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start(() => {
      setIsMenuOpen(false);
    });
  };

  const menuTranslateX = menuAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [-300, 0],
  });

  return (
    <View style={styles.container}>
      <View style={styles.menuContainer}>
        <TouchableOpacity style={styles.menuOption} onPress={handleMenuPress}>
          <Entypo name="menu" size={32} color="black" />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Dashboard</Text>
        </View>
      </View>

      <ScrollView
        horizontal
        contentContainerStyle={styles.scrollViewContainer}
        showsHorizontalScrollIndicator={false}
      >
        {/* User */}
        <TouchableOpacity style={styles.component}>
          <Entypo name="user" size={32} color="black" />
          <Text>User</Text>
        </TouchableOpacity>

        {/* Items */}
        <TouchableOpacity style={styles.component}>
          <Entypo name="shopping-bag" size={32} color="black" />
          <Text>Items</Text>
        </TouchableOpacity>

        {/* Orders */}
        <TouchableOpacity style={styles.component}>
          <Entypo name="box" size={32} color="black" />
          <Text>Orders</Text>
        </TouchableOpacity>

        {/* Add more icons/components as needed */}
      </ScrollView>

      {/* Rest of the screen content */}
      <Text>Welcome to the Dashboard!</Text>

      {/* Menu Overlay */}
      {isMenuOpen && (
        <Animated.View
          style={[
            styles.menuOverlay,
            { transform: [{ translateX: menuTranslateX }] },
          ]}
        >
          <View style={styles.menuContainer1}>
            <View style={styles.menuHeader}>
              
              <Text style={styles.menuTitle}>M-Attar-Plazaa</Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={handleCloseMenu}
              >
                <Entypo name="cross" size={35} color="#ff9800" />
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("additem")}>
              <Text style={styles.menuItemText}>Add Items</Text>
              <MaterialIcons
                name="keyboard-arrow-right"
                size={22}
                color="grey"
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("addvedio")}>
              <Text style={styles.menuItemText}>Featured Video </Text>
              <MaterialIcons
                name="keyboard-arrow-right"
                size={22}
                color="grey"
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={handleCloseMenu}>
              <Text style={styles.menuItemText}>Option 3</Text>
              <MaterialIcons
                name="keyboard-arrow-right"
                size={22}
                color="grey"
              />
            </TouchableOpacity>
            {/* Add more menu items as needed */}
          </View>
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  menuOptionText: {
    fontSize: 18,
    marginLeft: 8,
  },
  scrollViewContainer: {
    paddingHorizontal: 8,
    marginBottom: 20,
  },
  component: {
    width: 100,
    height: 100,
    backgroundColor: "#f2f2f2",
    marginHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  menuOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "70%",
    height: "100%",
    backgroundColor: "#f2f2f2",
    flexDirection: "row",
    alignItems: "flex-start",
    paddingHorizontal: 16,
    paddingTop: 32,
  },
  

  //Menu bar
  menuContainer1: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    paddingVertical: 16,
  },
  menuContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 16,
    marginVertical: 8,
  },
  menuHeader: {
    flexDirection: "row",
    justifyContent:"space-between",
    alignItems:'center',
    marginBottom: 16,
  },

  menuTitle: {
    fontSize: 20,
    fontWeight: "bold", 
  },
  titleContainer: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  menuOption: {
    fontSize: 18,
    marginLeft: 8,
  },
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 8,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "black",
    alignItems: "center",
  },
  menuItemText:{
    fontSize:18,
    fontWeight:"500"
  },
});

export default Dashboard;
