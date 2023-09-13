import { View, Text, StyleSheet, FlatList } from "react-native";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Video } from "expo-av";

import { useWindowDimensions } from "react-native";
import HangOn from "../Components/HangOn";
import { getAllMedia } from "../States/Media/mediaAction";

const Videos = () => {
  const dispatch = useDispatch();
  const { loading, videos } = useSelector((state) => state.media);
  const windowWidth = useWindowDimensions().width;
  const videoWidth = windowWidth - 35;

  useEffect(() => {
    dispatch(getAllMedia());
  }, [dispatch]);

  if (loading) {
    return <HangOn />;
  }

  return (
    <View style={styles.container}>
      {videos && videos.length > 0 ? (
        <FlatList
          data={videos}
          renderItem={({ item }) => (
            <View style={[styles.component, { width: videoWidth }]}>
              <Video
                source={{ uri: item.videoUrl }}
                style={[styles.video]}
                resizeMode="cover"
                shouldPlay
                isLooping
                isMuted
              />
            </View>
          )}
          keyExtractor={(item) => item._id}
          horizontal
          pagingEnabled
          decelerationRate="fast"
        />
      ) : (
        <Text>No videos available</Text>
      )}
    </View>
  );
};

export default Videos;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
    flexDirection: "row",
    paddingVertical: 10,
    marginBottom: 20,
  },
  component: {
    
    height: 200,
    backgroundColor: "#f2f2f2",
    marginHorizontal: 10,
  },
  video: {
    flex: 1, 
    height: null,
    resizeMode: "cover",
  },
});
