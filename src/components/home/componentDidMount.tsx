import {IPlayer} from '../../interface/IPlayer';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Pressable,
  StyleSheet,
  View,
  ActivityIndicator,
  Text,
} from 'react-native';
import {createPlayerSubscription} from '../../services/firebase';
import PlayerCard from '../PlayerCard/playerCard';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

// Este es el componentDidMount

type StackParamList = {
  Players: undefined;
  Details: IPlayer;
};
type NavigationProp = NativeStackNavigationProp<StackParamList, 'Details'>;

export default function PlayersScreen(): React.JSX.Element {
  const [players, setPlayers] = useState<IPlayer[]>([]);
  const [isLoading, setIsLoading] = useState(true); // Estado para el indicador de carga
  const navigation = useNavigation<NavigationProp>();

  useEffect(() => {
    const unsubscribe = createPlayerSubscription((data) => {
      setPlayers(data);
      setIsLoading(false); // Desactiva la carga cuando los datos estén listos
    });
    return () => unsubscribe();
  }, []);

  const renderItem = ({item}: {item: IPlayer}) => (
    <Pressable onPress={() => navigation.navigate('Details', item)}>
      <PlayerCard {...item} />
    </Pressable>
  );

  if (isLoading) {
    // Mostrar pantalla de carga mientras se obtienen los datos
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>Cargando jugadores...</Text>
      </View>
    );
  }

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
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#333333',
  },
});
