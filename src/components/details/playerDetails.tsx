import {IPlayer} from '@/src/interface/IPlayer';
import {RouteProp} from '@react-navigation/native';
import React from 'react';
import {Text, View} from 'react-native';

type PlayerDetailsRouteProp = RouteProp<{params: {player: IPlayer}}, 'params'>;

export default function PlayerDetailsScreen({
  route,
}: {
  route: PlayerDetailsRouteProp;
}): React.JSX.Element {
  const player = route.params as IPlayer;
  console.log(player);

  return (
    <View>
      <Text style={{fontSize: 25}}>{player.name}</Text>
    </View>
  );
}
