import { View, Text, StyleSheet, FlatList, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllVideos } from '../Redux/Actions/FeaturedVideo';
import { Video } from "expo-av";

import { useWindowDimensions } from 'react-native';
import HangOn from './HangOn';

const Videos = () => {
  const dispatch = useDispatch();
  const { loading, videos } = useSelector((state) => state.allVideo);
  const windowWidth = useWindowDimensions().width;
  const videoWidth = windowWidth - 35;


  useEffect(() => {
    dispatch(getAllVideos());
  }, [dispatch]);

  if (loading) {
    return <HangOn/>;
  }

  return (
    <View style={styles.container}>
      {videos && videos.length > 0 ? (
        <FlatList
          data={videos}
          renderItem={({ item }) => (
            <View style={[styles.component,{ width: videoWidth }]}>
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

export default Videos

const styles = StyleSheet.create({
  // Scrollable component
  container: {
    paddingHorizontal: 8,
    flexDirection: 'row',
    paddingVertical: 10,
    marginBottom: 20,
  },
  component: {
    // Set the width to match the screen width
    height: 200,
    backgroundColor: '#f2f2f2',
    marginHorizontal: 10,
  },
  // Featured Video
  video: {
    flex: 1, // Set the video to take up all available space
    // width: null,
    height: null,
    resizeMode: 'cover',
  },
});
