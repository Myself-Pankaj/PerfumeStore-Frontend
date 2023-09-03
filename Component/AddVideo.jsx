import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, ScrollView } from "react-native";
import { Button } from "react-native-paper";
import * as DocumentPicker from "expo-document-picker";
import { createNewVideo } from "../Redux/Actions/FeaturedVideo";
import { useDispatch, useSelector } from "react-redux";
import { Video } from "expo-av";
import mime from "mime";

const AddVideo = ({navigation}) => {
    const [vedioUrl, setVideoUri] = useState();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    
    const { loading, error, message } = useSelector((state) => state.addVideo);
    const dispatch = useDispatch();
  
    const pickDocument = async () => {
      try {
        const result = await DocumentPicker.getDocumentAsync({
          type: 'video/*',
          copyToCacheDirectory: false,
          multiple: false,
        });
    
        if (result.type === 'success') {
          setVideoUri(result.uri);
        }

      } catch (error) {
        console.log('Error selecting video:', error);
      }
    };
    
    const submitHandler = async () => {
      if (!vedioUrl) {
        console.log("No video selected");
        return;
      }
  
      const myForm = new FormData();
      myForm.append("title", title);
      myForm.append("description", description);
      myForm.append("vedioUrl", {
        uri: vedioUrl,
        type: mime.getType(vedioUrl),
        name: vedioUrl.split("/").pop(),
      });
      
    
      try {
        await dispatch(createNewVideo(myForm));
      } catch (error) {
        console.log("Error in uploading video:", error);
      }
    };
  
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <ScrollView
          horizontal
          style={styles.videoContainer}
          showsHorizontalScrollIndicator={false}
        >
          {vedioUrl && (
            <Video
              source={{ uri: vedioUrl }}
              style={styles.video}
              resizeMode="cover"
              shouldPlay
              isLooping
              isMuted
            />
          )}
        </ScrollView>
  
        <View style={styles.formContainer}>
          <Button
            icon="camera"
            mode="contained"
            onPress={pickDocument}
            style={styles.addVideoButton}
            color="black"
          >
            Select Video
          </Button>
  
          <TextInput
            style={styles.input}
            placeholder="Title"
            value={title}
            onChangeText={setTitle}
          />
          <TextInput
            style={styles.input}
            placeholder="Description"
            value={description}
            onChangeText={setDescription}
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
    );
  };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
  },
  videoContainer: {
    height: 200,
    marginBottom: 20,
  },
  video: {
    flex: 1,
    width: 300,
    height: 600,
    borderRadius: 10,
  },
  formContainer: {
    marginBottom: 20,
  },
  addVideoButton: {
    marginBottom: 10,
    backgroundColor: "black",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  buttonContainer: {
    alignItems: "center",
  },
  postButton: {
    backgroundColor: "black",
  },
});

export default AddVideo;
