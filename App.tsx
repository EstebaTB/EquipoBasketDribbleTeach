/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import { IPlayer } from './src/interface/IPlayer';
import { createPlayerSubscription } from './src/services/firebase';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [players, setPlayers] = useState<IPlayer[]>([]);

  useEffect(() => {
    const unsubscribe = createPlayerSubscription(setPlayers);
    return () => unsubscribe();
  }, []);


  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

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
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <FlatList
        data={players}
        keyExtractor={(item, index) => item.id || index.toString()} // Usar índice como respaldo
        renderItem={renderItem}
      />
    </SafeAreaView>
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


// const styles = StyleSheet.create({
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//   },
//   highlight: {
//     fontWeight: '700',
//   },
// });

export default App;
