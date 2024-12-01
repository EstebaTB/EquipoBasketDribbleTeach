import { IPlayer } from '@/src/interface/IPlayer';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { FlatList, Pressable, StyleSheet } from 'react-native';
import { createPlayerSubscription } from '../../services/firebase';
import PlayerCard from './playerCard';

type StackParamList = {
  Players: undefined;
  Details: IPlayer;
};
type NavigationProp = NativeStackNavigationProp<StackParamList, 'Players'>;

export default function PlayersScreen(): React.JSX.Element {
  const [players, setPlayers] = useState<IPlayer[]>([]);
  const navigation = useNavigation<NavigationProp>();

  useEffect(() => {
    const unsubscribe = createPlayerSubscription(setPlayers);
    return () => unsubscribe();
  }, []);

  const renderItem = ({item}: {item: IPlayer}) => (
    <Pressable onPress={() => navigation.navigate('Details', item)}>
      <PlayerCard {...item} />
    </Pressable>
  );

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
