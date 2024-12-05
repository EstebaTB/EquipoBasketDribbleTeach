import { IPlayer } from '../../interface/IPlayer';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState, useCallback } from 'react';
import {
  FlatList,
  Pressable,
  StyleSheet,
  View,
  ActivityIndicator,
  Text,
  TextInput,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { createPlayerSubscription } from '../../services/firebase';
import PlayerCard from '../PlayerCard/playerCard';
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
  const [position, setPosition] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation<NavigationProp>();

  useEffect(() => {
    const unsubscribe = createPlayerSubscription((data) => {
      setPlayers(data);
      setIsLoading(false); // Desactiva la carga cuando los datos estén listos
    });
    return () => unsubscribe();
  }, []);

  // Función para normalizar texto y eliminar acentos
  const removeAccents = (text: string) => {
    return text
      .normalize('NFD') // Normaliza el texto a una forma de texto con caracteres descompuestos.
      .replace(/[\u0300-\u036f]/g, ''); // Elimina los caracteres diacríticos (acentos, tildes, etc.)
  };

  useEffect(() => {
    setFilteredPlayers(
      players.filter((player) => {
        const matchesSearch =
          (removeAccents(player.name?.toLowerCase() || '').includes(removeAccents(search.toLowerCase())) || // Filtrar por nombre sin acentos
          removeAccents(player.surname?.toLowerCase() || '').includes(removeAccents(search.toLowerCase()))); // Filtrar por apellido sin acentos
        const matchesPosition =
          position === 'all' || player.position?.toLowerCase() === position.toLowerCase();
        return matchesSearch && matchesPosition;
      })
    );
  }, [search, position, players]);

  const renderItem = useCallback(
    ({ item }: { item: IPlayer }) => (
      <Pressable onPress={() => navigation.navigate('Details', item)}>
        <PlayerCard {...item} />
      </Pressable>
    ),
    [navigation]
  );

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>Cargando jugadores...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Filtros */}
      <View style={styles.filtersContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar por nombre o apellido"
          value={search}
          onChangeText={setSearch}
        />
        <Picker
          selectedValue={position}
          style={styles.picker}
          onValueChange={(itemValue) => setPosition(itemValue)}
        >
          <Picker.Item label="Todas las posiciones" value="all" />
          <Picker.Item label="Base" value="Base" />
          <Picker.Item label="Escolta" value="Escolta" />
          <Picker.Item label="Alero" value="Alero" />
          <Picker.Item label="Ala-Pívot" value="Ala-Pívot" />
          <Picker.Item label="Pívot" value="Pívot" />
        </Picker>
      </View>

      {/* Listado */}
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
    backgroundColor: '#f8f8f8',
  },
  filtersContainer: {
    marginBottom: 16, // Espaciado entre filtros y la lista
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 8, // Espaciado entre el TextInput y el Picker
    backgroundColor: '#fff',
  },
  picker: {
    height: 50,
    width: '100%',
    backgroundColor: '#fff',
  },
  flatList: {
    flex: 1,
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