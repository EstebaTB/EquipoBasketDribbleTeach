import {IPlayer} from '@/src/interface/IPlayer';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState, useCallback} from 'react';
import {FlatList, Pressable, StyleSheet, Text, View, TextInput} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {createPlayerSubscription} from '../../services/firebase';
import PlayerCard from './playerCard';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type StackParamList = {
  Players: undefined;
  Details: IPlayer;
};
type NavigationProp = NativeStackNavigationProp<StackParamList, 'Details'>;

export default function PlayersScreen(): React.JSX.Element {
  const [players, setPlayers] = useState<IPlayer[]>([]);
  const [filteredPlayers, setFilteredPlayers] = useState<IPlayer[]>([]);
  const [search, setSearch] = useState('');
  const [position, setPosition] = useState('');
  const navigation = useNavigation<NavigationProp>();

  useEffect(() => {
    const unsubscribe = createPlayerSubscription(setPlayers);
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    setFilteredPlayers(
      players.filter(player =>
        player.name?.toLowerCase().includes(search.toLowerCase()) &&
        (position === '' || player.position?.toLowerCase() === position.toLowerCase())
      )
    );
  }, [search, position, players]);

  const renderItem = useCallback(({ item }: { item: IPlayer }) => (
    <Pressable onPress={() => navigation.navigate('Details', item)}>
      <PlayerCard {...item} />
    </Pressable>
  ), [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Jugadores</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar por nombre"
        value={search}
        onChangeText={setSearch}
      />
      <Picker
        selectedValue={position}
        style={styles.picker}
        onValueChange={(itemValue) => setPosition(itemValue)}
      >
        <Picker.Item label="Todas las posiciones" value="" />
        <Picker.Item label="Base" value="Base" />
        <Picker.Item label="Escolta" value="Escolta" />
        <Picker.Item label="Alero" value="Alero" />
        <Picker.Item label="Ala-Pívot" value="Ala-Pívot" />
        <Picker.Item label="Pívot" value="Pívot" />
      </Picker>
      <FlatList
        style={styles.flatList}
        data={filteredPlayers}
        keyExtractor={(item, index) => item.id || index.toString()}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 16,
  },
  flatList: {
    flex: 1,
  },
});