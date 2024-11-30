import {IPlayer} from '@/src/interface/IPlayer';
import React, {useEffect, useState} from 'react';
import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import {createPlayerSubscription} from '../../services/firebase';

export default function PlayerScreen(): React.JSX.Element {
  const [players, setPlayers] = useState<IPlayer[]>([]);

  useEffect(() => {
    const unsubscribe = createPlayerSubscription(setPlayers);
    return () => unsubscribe();
  }, []);

  const renderItem = ({item}: {item: IPlayer}) => (
    <View style={PlayersStyles.item}>
      <Image source={{uri: item.imagePath}} style={PlayersStyles.foto} />
      <View>
        <Text style={PlayersStyles.nombre}>
          {item.name} {item.surname}
        </Text>
        <Text style={PlayersStyles.posicion}>{item.jerseyNumber}</Text>
      </View>
    </View>
  );

  return (
    <FlatList
      data={players}
      keyExtractor={(item, index) => item.id || index.toString()} // Usar índice como respaldo
      renderItem={renderItem}
    />
  );
}

const PlayersStyles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  foto: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  nombre: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  posicion: {
    fontSize: 16,
    color: 'gray',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  image: {
    width: 200,
    height: 200, // Ajusta según tus necesidades
    resizeMode: 'cover', // Opciones: 'cover', 'contain', 'stretch', etc.
  },
  video: {
    width: '90%', // Ancho del video
    height: 200, // Altura del video
  },
});
