import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Image, StatusBar, StyleSheet, Button} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import PlayerDetailsScreen from './src/components/details/playerDetails';
import PlayerScreen from './src/components/home/componentDidMount';
import MediaScreen from './src/components/media/media';

// Crear el stack de navegación
const Stack = createNativeStackNavigator();

// Componente principal
function App(): React.JSX.Element {
  const backgroundStyle = {
    backgroundColor: 'rgb(35, 56, 83)',
  };

  const Logo = () => (
    <Image source={require('./src/assets/img/logo.png')} style={styles.logo} />
  );

  return (
    <NavigationContainer>
      <StatusBar backgroundColor={backgroundStyle.backgroundColor} />
      <Stack.Navigator>
        {/* Pantalla de jugadores */}
        <Stack.Screen
          name="Players"
          component={PlayerScreen}
          options={{
            headerStyle: backgroundStyle,
            headerTintColor: Colors.white,
            headerTitleStyle: {fontWeight: 'bold', fontSize: 24},
            headerTitleAlign: 'center',
            headerLeft: Logo,
            title: 'Dribble Teach',
          }}
        />
        {/* Pantalla de detalles */}
        <Stack.Screen
          name="Details"
          component={PlayerDetailsScreen}
          options={({navigation}) => ({
            headerStyle: backgroundStyle,
            headerTintColor: Colors.white,
            headerTitleStyle: {fontWeight: 'bold', fontSize: 24},
            headerTitleAlign: 'center',
            title: 'Detalles del jugador',
            headerRight: () => (
              <Button
                title="Media"
                color={backgroundStyle.backgroundColor}
                onPress={() => navigation.navigate('Media')}
              />
            ),
          })}
        />
        {/* Pantalla de Multimedia */}
        <Stack.Screen
          name="Media"
          component={MediaScreen} // Registra la nueva pantalla
          options={{
            headerStyle: backgroundStyle,
            headerTintColor: Colors.white,
            headerTitleStyle: {fontWeight: 'bold', fontSize: 24},
            headerTitleAlign: 'center',
            title: 'Multimedia del jugador',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 45,
    height: 45,
  },
});

export default App;