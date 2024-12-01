import {IPlayer} from '@/src/interface/IPlayer';
import React from 'react';
import {Text, View} from 'react-native';

export default function PlayerDetailsScreen({route}): React.JSX.Element {
  const player = route.params as IPlayer;
  console.log(player);

  return (
    <View>
      <Text style={{fontSize: 25}}>{player.name}</Text>
    </View>
  );
}
