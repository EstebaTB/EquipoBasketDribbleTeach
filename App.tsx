/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {Image, StatusBar, StyleSheet} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import PlayerScreen from './src/components/home/playerScreen';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  // const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: 'rgb(35, 56, 83)',
  };
  const logo = () => (
    <Image source={require('./src/assets/img/logo.png')} style={styles.logo} />
  );

  return (
    <NavigationContainer>
        <StatusBar backgroundColor={backgroundStyle.backgroundColor} />
      <Stack.Navigator>
        <Stack.Screen
          name="Players"
          component={PlayerScreen}
          options={{
            headerStyle: backgroundStyle,
            headerTintColor: Colors.white,
            headerTitleStyle: {fontWeight: 'bold', fontSize: 24},
            headerTitleAlign: 'center',
            headerLeft: logo,
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
