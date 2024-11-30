import {IPlayer} from '@/src/interface/IPlayer';
import React, { useEffect } from 'react';
import {Animated, Image, StyleSheet, Text, useAnimatedValue, View} from 'react-native';

export default function PlayerCard(item: IPlayer): React.JSX.Element {
  console.log('imagePath', item.imagePath);
  const imageBackgroundLogo = require('../../assets/img/logo.png');
  const fadeAnim = useAnimatedValue(0);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

  }, [fadeAnim]);

  return (
    <Animated.View style={[PlayersStyles.item, {opacity:fadeAnim}]}>
      <Image
        source={imageBackgroundLogo}
        resizeMode="cover"
        style={ PlayersStyles.imageBackground}
      />
      <Image source={{uri: item.imagePath}} style={[PlayersStyles.img]} />

      <View>
        <Text style={PlayersStyles.nombre}>
          {item.name} {item.surname}
        </Text>
        <Text style={PlayersStyles.posicion}>{item.jerseyNumber}</Text>
      </View>
    </Animated.View>
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
  img: {
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
  imageBackground: {
    width: 250,
    height: 250,
    filter: ' grayscale(80%)',
    position: 'absolute',
  },
});
