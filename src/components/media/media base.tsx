import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import Video from 'react-native-video';
import { WebView } from 'react-native-webview';
import { IPlayer } from '../../interface/IPlayer';

const MediaScreen = ({ route }: { route: { params: { player: IPlayer } } }) => {
  const player = route.params?.player;
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const isYouTubeVideo = (url: string) => {
    return url.includes('youtube.com') || url.includes('youtu.be');
  };

  const isMP4Video = (url: string) => {
    return url.endsWith('.mp4');
  };

  const handleVideoSelect = (video: string) => {
    setSelectedVideo(video);
    setIsPlaying(true);
  };

  // Función para obtener el ID del video de YouTube
  const getYouTubeEmbedURL = (url: string) => {
    const regex = /(?:youtube\.com\/(?:[^\/]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    if (match && match[1]) {
      return `https://www.youtube.com/embed/${match[1]}?autoplay=1`;
    }
    return null; // Si no se encuentra un ID válido
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Videos</Text>

      <FlatList
        data={player.videos || ['https://jlgjgh-4200.csb.app/assets/video/jugada1.mp4']}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.videoItem} onPress={() => handleVideoSelect(item)}>
            <Text style={styles.videoText}>{item}</Text>
          </TouchableOpacity>
        )}
      />

      {selectedVideo && (
        <View style={styles.videoContainer}>
          {isYouTubeVideo(selectedVideo) ? (
            <WebView
            source={{ uri: getYouTubeEmbedURL(selectedVideo) }}
            style={styles.videoPlayer}
            javaScriptEnabled={true} // Habilitar JavaScript
            domStorageEnabled={true} // Habilitar almacenamiento DOM
            mediaPlaybackRequiresUserAction={false} // Permitir reproducción automática
          />
          ) : isMP4Video(selectedVideo) ? (
            <Video
              source={{ uri: `https://jlgjgh-4200.csb.app/${selectedVideo}` }} // Construye la URL completa
              style={styles.videoPlayer}
              rate={1.0}
              volume={1.0}
              controls={true}
              paused={!isPlaying}
              resizeMode="contain"
              onEnd={() => setIsPlaying(false)}
            />
          ) : (
            <Text>Formato de video no compatible</Text>
          )}
          <Text>Video seleccionado: {selectedVideo}</Text>
        </View>
      )}
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
  videoContainer: {
    marginTop: 20,
  },
  videoPlayer: {
    width: '100%',
    height: 200,
  },
});

export default MediaScreen;
