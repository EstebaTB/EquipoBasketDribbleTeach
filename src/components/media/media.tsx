import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    FlatList,
    TouchableOpacity,
    View,
  } from 'react-native';
  import { IPlayer } from '../../interface/IPlayer';
import Video from 'react-native-video';
import { RouteProp } from '@react-navigation/native';

type PlayerDetailsRouteProp = RouteProp<{ params: { player: IPlayer } }, 'params'>;

export default function MediaScreen({
    route,
  }: {
    route: PlayerDetailsRouteProp;
  }): React.JSX.Element {

    // Almacena los datos del jugador
    const player = route.params?.player || {
        videos: ['https://jlgjgh-4200.csb.app/assets/video/jugada1.mp4'],
      };
    console.log('Datos recibidos en MediaScreen:', player); // Verifica los datos recibidos

    const [selectedVideo, setSelectedVideo] = useState<string | null>(null); // Almacena el video seleccionado
    const [isPlaying, setIsPlaying] = useState(false); // Controla la reproducción

    if (!player) {
        // Si no se recibe el jugador, muestra un mensaje de error
        return (
          <View style={styles.container}>
            <Text style={styles.errorText}>No se encontró información del jugador.</Text>
          </View>
        );
      }

    // Maneja la selección de un video
    const handleVideoSelect = (video) => {
        setSelectedVideo(video);
        setIsPlaying(true);
      };

    return(
        // -----------------------
<View style={styles.container}>
      <Text style={styles.title}>Lista de Videos</Text>

      {/* Lista de videos */}
      <FlatList
        data={player.videos || ['https://jlgjgh-4200.csb.app/assets/video/jugada1.mp4']} // usar un array vacío si no hay videos.
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.videoItem}
            onPress={() => handleVideoSelect(item)}
          >
            <Text style={styles.videoText}>{item}</Text>
          </TouchableOpacity>
        )}
      />

      {/* Video Player */}
      {selectedVideo && (
        <View style={styles.videoContainer}>
          <Video
            source={{ uri: selectedVideo }}
            style={styles.videoPlayer}
            controls={true} // Habilita los botones de reproducción
            paused={!isPlaying} // Controla si el video está pausado
            resizeMode="contain" // Ajusta el tamaño del video
            onEnd={() => setIsPlaying(false)} // Reinicia al finalizar
          />
          <Text style={styles.selectedVideoText}>Reproduciendo: {selectedVideo}</Text>
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
    errorText: {
      fontSize: 16,
    },
    videoContainer: {
      marginTop: 20,
    },
    videoPlayer: {
      width: '100%',
      height: 200,
    },
    selectedVideoText: {
      marginTop: 10,
      fontSize: 14,
      textAlign: 'center',
    },
  });