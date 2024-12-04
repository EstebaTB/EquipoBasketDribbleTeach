import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  Button,
} from 'react-native';
import StarRating from './starrating';
import { IPlayer } from '../../interface/IPlayer';
import { RouteProp } from '@react-navigation/native';

type PlayerDetailsRouteProp = RouteProp<{ params: { player: IPlayer } }, 'params'>;

export default function PlayerDetailsScreen({
  route
}: {
  route: PlayerDetailsRouteProp;
}): React.JSX.Element {
  const player = route.params as IPlayer;
  const [isModalVisible, setModalVisible] = useState(false);

  return (
    <ScrollView style={styles.container}>
      {/* Encabezado con imagen */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Image
            source={{
              uri: player.imagePath || 'https://via.placeholder.com/150',
            }}
            style={styles.playerImage}
          />
        </TouchableOpacity>
        <View style={styles.headerInfo}>
          <Text style={styles.name}>
            {player.name} {player.surname}
          </Text>
          <Text style={styles.position}>
            {player.position} #{player.jerseyNumber}
          </Text>
        </View>
      </View>

      {/* Modal para mostrar imagen ampliada */}
      <Modal
        transparent={true}
        visible={isModalVisible}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <TouchableOpacity style={styles.modalClose} onPress={() => setModalVisible(false)}>
            <Text style={styles.closeText}>X</Text>
          </TouchableOpacity>
          <Image
            source={{
              uri: player.imagePath || 'https://via.placeholder.com/150',
            }}
            style={styles.modalImage}
          />
        </View>
      </Modal>

      {/* Resto de la información */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Información Personal</Text>
        <Text style={styles.infoText}>Nacionalidad: {player.nationality}</Text>
        <Text style={styles.infoText}>Nacimiento: {player.fechaNacimiento}</Text>
        <Text style={styles.infoText}>Altura: {player.height} cm</Text>
        <Text style={styles.infoText}>Antigüedad: {player.seniority}</Text>
      </View>
    {/* Estadísticas */}
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Estadísticas</Text>
      <Text style={styles.infoText}>Partidos jugados: {player.gamesPlayed}</Text>
      <Text style={styles.infoText}>Puntos último partido: {player.pointsLastGame}</Text>
      <Text style={styles.infoText}>Media puntos últimos 10 partidos: {player.points}</Text>
      <Text style={styles.infoText}>Total faltas: {player.totalFouls}</Text>
      <Text style={styles.infoText}>Faltas último partido: {player.foulsLastGame}</Text>
    </View>

    {/* Habilidades */}
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Habilidades</Text>
      <Text style={styles.infoText}>Interior: {player.interior}</Text>
      <Text style={styles.infoText}>Exterior: {player.exterior}</Text>
      <Text style={styles.infoText}>Diestro: {player.rightHanded}</Text>
      <Text style={styles.infoText}>Zurdo: {player.leftHanded}</Text>
      <Text style={styles.infoText}>Coordinación: <StarRating rating={player.coordinated} /></Text>
      <Text style={styles.infoText}>Fuerza: <StarRating rating={player.strong} /></Text>
      <Text style={styles.infoText}>Trabajo: <StarRating rating={player.hardworking} /></Text>
      <Text style={styles.infoText}>Competitivo: <StarRating rating={player.competitive} /></Text>
    </View>


    {/* Anotaciones técnicas */}
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Anotaciones Técnicas</Text>
      <Text style={styles.infoText}>
        Descripción técnica: {player.technicalDescription}
      </Text>
      <Text style={styles.infoText}>
        Descripción táctica: {player.tacticalDescription}
      </Text>
      <Text style={styles.infoText}>
        Descripción defensiva: {player.defensiveDescription}
      </Text>
    </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    paddingHorizontal: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  playerImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 15,
  },
  headerInfo: {
    flex: 1,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  position: {
    fontSize: 16,
    color: '#777',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalImage: {
    width: '90%',
    height: '70%',
    resizeMode: 'contain',
  },
  modalClose: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 1,
  },
  closeText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#555',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 5,
  },
  infoText: {
    fontSize: 14,
    marginVertical: 2,
    color: '#444',
  },
});
