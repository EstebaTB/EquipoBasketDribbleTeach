import {IPlayer} from '@/src/interface/IPlayer';
import React from 'react';
import {Image, ImageBackground, StyleSheet, Text, View} from 'react-native';

export default function PlayerCard(item: IPlayer): React.JSX.Element {
  console.log('imagePath', item.imagePath);
  const imageBackgroundLogo = require('../../assets/img/logo.png');
  return (
    <View style={PlayersStyles.item}>
      <ImageBackground source={imageBackgroundLogo} resizeMode="cover">
        <Image source={{uri: item.imagePath}} style={[PlayersStyles.foto]} />
      </ImageBackground>
      <View>
        <Text style={PlayersStyles.nombre}>
          {item.name} {item.surname}
        </Text>
        <Text style={PlayersStyles.posicion}>{item.jerseyNumber}</Text>
      </View>
    </View>
  );
}

// export function AnimatedCard({item}: {item: IPlayer}){
//   const opacity =useRef(new Animated.Value(0)).current;

// }

const PlayersStyles = StyleSheet.create({
  item: {
    elevation: 5,
    borderRadius: 25,
    marginHorizontal: '10%',
    marginBottom: 10,
    backgroundColor: 'white',
    alignItems: 'center',
    padding: 15,

    // borderBottomWidth: 10,
    // borderBottomColor: 'trasparent',
  },
  foto: {
    width: 200,
    height: 200,
    borderRadius: 25,
    // marginRight: 15,
    resizeMode: 'contain',
    // backgroundColor: 'white',
  },
  nombre: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  posicion: {
    fontSize: 16,
    color: 'gray',
  },
});
