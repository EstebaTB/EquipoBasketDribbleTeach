import {IPlayer} from '@/src/interface/IPlayer';
import React, {useEffect} from 'react';
import {
  Animated,
  Image,
  StyleSheet,
  Text,
  useAnimatedValue,
  View,
} from 'react-native';
import BackgroundLogoImage from './backgroundLogoImage';

export default function PlayerCard(item: IPlayer): React.JSX.Element {
  console.log('imagePath', item.imagePath);

  const fadeAnim = useAnimatedValue(0);
  const imgCamiseta = require('../../assets/img/camiseta.png');

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <Animated.View style={[PlayersStyles.item, {opacity: fadeAnim}]}>
      <BackgroundLogoImage width={250} height={250} />
      <Image source={{uri: item.imagePath}} style={[PlayersStyles.img]} />
      <View style={PlayersStyles.imgCamisetaContainer}>
        <Image
          source={imgCamiseta}
          style={[PlayersStyles.img, PlayersStyles.imgCamiseta]}
        />
        <Text style={PlayersStyles.posicionText}>{item.jerseyNumber}</Text>
      </View>

      <View style={PlayersStyles.nombreContainer}>
        <Text style={PlayersStyles.nombreText}>
          {item.name} {item.surname}
        </Text>
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
    backgroundColor: '#edbb94',
    alignItems: 'center',
    paddingTop: 15,
  },
  img: {
    width: 200,
    height: 200,
    borderRadius: 25,
    resizeMode: 'contain',
  },
  imgCamisetaContainer: {
    position: 'absolute',
    width: 90,
    height: 90,
    left: 5,
    marginTop: 10,
  },
  imgCamiseta: {
    width: 90,
    height: 90,
  },
  nombreContainer: {
    borderBottomEndRadius: 25,
    borderBottomStartRadius: 25,
    width: '100%',
    padding: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  nombreText: {
    color: 'white',
    elevation: 5,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
  },
  posicionText: {
    position: 'absolute',
    fontSize: 16,
    color: 'white',
    left: 40,
    fontWeight: 'bold',
    top: 30,
  },
});
