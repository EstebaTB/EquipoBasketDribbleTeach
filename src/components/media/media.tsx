import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Dimensions, Modal, Button } from 'react-native';
import Video from 'react-native-video';
import { WebView } from 'react-native-webview';
import { IPlayer } from '../../interface/IPlayer';

const MediaScreen = ({ route }: { route: { params: { player: IPlayer } } }) => {
  const player = route.params?.player;
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [screenWidth, setScreenWidth] = useState(Dimensions.get('window').width);
  const [screenHeight, setScreenHeight] = useState(Dimensions.get('window').height);

  // Escuchar cambios en las dimensiones de la pantalla
  useEffect(() => {
    const handleDimensionsChange = () => {
      const { width, height } = Dimensions.get('window');
      setScreenWidth(width);
      setScreenHeight(height);
    };

    const subscription = Dimensions.addEventListener('change', handleDimensionsChange);
    return () => subscription?.remove();
  }, []);

  const isYouTubeVideo = (url: string) => {
    return url.includes('youtube.com') || url.includes('youtu.be');
  };

  const isMP4Video = (url: string) => {
    return url.endsWith('.mp4');
  };

  const handleVideoSelect = (video: string) => {
    setSelectedVideo(video);
    setIsPlaying(true);
    setModalVisible(true); // Abrir modal
  };

  const handleModalClose = () => {
    setModalVisible(false);
    setIsPlaying(false);
  };

  const getYouTubeEmbedURL = (url: string) => {
    const regex = /(?:youtube\.com\/(?:[^\/]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    if (match && match[1]) {
      //return `https://www.youtube.com/embed/${match[1]}?rel=0&autoplay=1&showinfo=0`;
      return `https://www.youtube.com/watch?v=${match[1]}`;
    }
    return null;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Videos</Text>

      <FlatList
        data={player.videos || []}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.videoItem} onPress={() => handleVideoSelect(item)}>
            <Text style={styles.videoText}>{item}</Text>
          </TouchableOpacity>
        )}
      />

      {/* Modal para el video */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        onRequestClose={handleModalClose}
        transparent={false}
      >
        <View style={[styles.modalContainer, { width: screenWidth, height: screenHeight }]}>
          <TouchableOpacity style={styles.closeButton} onPress={handleModalClose}>
            <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>

          {selectedVideo && (
            <>
              {isYouTubeVideo(selectedVideo) ? (
                <WebView
                  source={{ uri: getYouTubeEmbedURL(selectedVideo) }}
                  style={{ width: screenWidth, height: screenHeight }}
                  javaScriptEnabled={true}
                  domStorageEnabled={true}
                  mediaPlaybackRequiresUserAction={false}
                  allowsInlineMediaPlayback={true}
                />
              ) : isMP4Video(selectedVideo) ? (
                <Video
                  source={{ uri: `https://jlgjgh-4200.csb.app/${selectedVideo}` }}
                  style={{ width: screenWidth, height: screenHeight }}
                  rate={1.0}
                  volume={1.0}
                  controls={true}
                  resizeMode="contain"
                  paused={!isPlaying}
                  onEnd={() => setIsPlaying(false)}
                />
              ) : (
                <Text>Formato de video no compatible</Text>
              )}
            </>
          )}
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  videoItem: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  videoText: {
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 1,
    backgroundColor: '#fff',
    borderRadius: 50,
    padding: 10,
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default MediaScreen;
