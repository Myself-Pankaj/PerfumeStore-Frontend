import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Button } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { createNewItem } from "../Redux/Actions/ItemAction";
import { loadUser } from "../Redux/Actions/UserAction";
import mime from "mime";
import { Toast } from "react-native-toast-message/lib/src/Toast";

const AddItem = ({ route, navigation }) => {
  const [name, setName] = useState("");
  const [images, setImage] = useState([]);
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [Stock, setStock] = useState("");

  const dispatch = useDispatch();

  const { loading, error, message } = useSelector((state) => state.addItem);

  const handleImage = () => {
    navigation.navigate("camera", {
      addItem: true,
    });
  };

  const submitHandler = async () => {
    const myForm = new FormData();
    myForm.append("name", name);
    myForm.append("description", description);
    myForm.append("price", price);
    myForm.append("category", category);
    myForm.append("Stock", Stock);
    images.forEach((imageUri, index) => {
      myForm.append("images", {
        uri: imageUri,
        type: mime.getType(imageUri),
        name: `image_${index + 1}.${mime.getExtension(imageUri)}`,
      });
    });

    try {
      await dispatch(createNewItem(myForm));
      // dispatch(loadUser());

      navigation.navigate("additem");
    } catch (error) {}
  };

  useEffect(() => {
    if (error) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: error,
        position: "bottom",
      });
      dispatch({ type: "clearError" });
    }

    if (message) {
      Toast.show({
        type: "success",
        text1: "Success",
        text2: message,
        position: "bottom",
      });
      dispatch({ type: "clearMessage" });
      setName("");
      setImage([]);
      setDescription("");
      setPrice("");
      setCategory("");
      setStock("");
    }
  }, [dispatch, error, message]);

  useEffect(() => {
    if (route.params) {
      if (route.params.image) {
        setImage(route.params.image);
      }
    }
  }, [route]);

  return (
    <View style={styles.container}>
      <Toast />

      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        keyboardShouldPersistTaps="handled"
      >
        <ScrollView
          horizontal
          style={styles.imageContainer}
          showsHorizontalScrollIndicator={false}
        >
          {images &&
            images.map((imageUri, index) => (
              <View key={index} style={styles.imageWrapper}>
                <Image
                  key={index}
                  source={{ uri: imageUri }}
                  style={styles.image}
                />
              </View>
            ))}
        </ScrollView>

        <View style={styles.formContainer}>
          <Button
            icon="camera"
            mode="contained"
            onPress={handleImage}
            style={styles.addPhotoButton}
            buttonColor="black"
          >
            Click Here To Add Photos
          </Button>

          <TextInput
            style={styles.input}
            placeholder="Name"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.input}
            placeholder="Description"
            value={description}
            onChangeText={setDescription}
          />
          <TextInput
            style={styles.input}
            placeholder="Price"
            value={price}
            onChangeText={setPrice}
          />
          <TextInput
            style={styles.input}
            placeholder="Category"
            value={category}
            onChangeText={setCategory}
          />
          <TextInput
            mode="outlined"
            style={styles.input}
            placeholder="Stock"
            value={Stock}
            onChangeText={setStock}
          />
        </View>

        <View style={styles.buttonContainer}>
          <Button
            icon="post"
            mode="contained"
            loading={loading}
            onPress={submitHandler}
            style={styles.postButton}
            buttonColor="black"
          >
            Post
          </Button>
        </View>
      </ScrollView>
    </View>
  );
};

export default AddItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  scrollViewContent: {
    flexGrow: 1,
    padding: 20,
  },
  imageContainer: {
    flexDirection: "row",
    paddingHorizontal: 8,
    paddingVertical: 10,
    marginBottom: 20,
    borderTopWidth: 5,
    borderBottomWidth: 5,
    borderColor: "black",
  },
  image: {
    width: 200,
    height: 200,
    marginRight: 20,
    marginTop: 50,
    resizeMode: "cover",
    marginHorizontal: 8,
  },
  imageWrapper: {
    marginHorizontal: 20,
  },
  formContainer: {
    marginBottom: 20,
  },
  addPhotoButton: {
    marginBottom: 10,
  },
  input: {
    borderBottomWidth: 2,
    borderBottomColor: "grey",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  buttonContainer: {
    alignItems: "center",
  },
  postButton: {
    width: 150,
  },
});
