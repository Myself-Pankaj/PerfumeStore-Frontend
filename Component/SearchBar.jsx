import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; 
import { useNavigation } from "@react-navigation/native";

const CustomSearchBar = () => {
  const [keyword, setSearchText] = useState("");

  const navigation = useNavigation();

  const handleResultClick = () => {
    // Navigate to a new page to show search results
    navigation.navigate("SearchResults", { keyword });
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Ionicons
          name="search"
          size={18}
          color="#888"
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.input}
          placeholder="Search"
          placeholderTextColor="#888"
          onChangeText={setSearchText}
          value={keyword}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleResultClick}>
        <Ionicons name="arrow-forward" size={18} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 20,
  },
  searchContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 35,
    color: "#333",
    fontSize: 16,
  },
  button: {
    padding: 8,
    borderRadius: 10,
    backgroundColor: "#888",
    marginLeft: 10,
  },
});

export default CustomSearchBar;
