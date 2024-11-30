import {IPlayer} from '@/src/interface/IPlayer';
import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {createPlayerSubscription} from '../../services/firebase';
import PlayerCard from './playerCard';

export default function PlayerScreen(): React.JSX.Element {
  const [players, setPlayers] = useState<IPlayer[]>([]);

  useEffect(() => {
    const unsubscribe = createPlayerSubscription(setPlayers);
    return () => unsubscribe();
  }, []);

  const renderItem = ({item}: {item: IPlayer}) => <PlayerCard {...item} />;

  return (
    <FlatList
      style={styles.flatList}
      data={players}
      keyExtractor={(item, index) => item.id || index.toString()} // Usar índice como respaldo
      renderItem={renderItem}
    />
  );
}

const styles = StyleSheet.create({
  flatList: {
    // backgroundColor:'red',
    // alignSelf: 'center',
    // width: '80%',
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
    width: 250,
    height: 250, // Ajusta según tus necesidades
    resizeMode: 'cover', // Opciones: 'cover', 'contain', 'stretch', etc.
  },
});
