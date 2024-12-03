import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Image, StatusBar, StyleSheet} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import PlayerDetailsScreen from './src/components/details/playerDetails';
import PlayerScreen from './src/components/PlayerCard/playersScreen';

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
          }}
        />
        {/* Pantalla de detalles */}
        <Stack.Screen
          name="Details"
          component={PlayerDetailsScreen}
          options={{
            headerStyle: backgroundStyle,
            headerTintColor: Colors.white,
            headerTitleStyle: {fontWeight: 'bold', fontSize: 24},
            headerTitleAlign: 'center',
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