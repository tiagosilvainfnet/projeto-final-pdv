import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { IconButton, Provider as PaperProvider } from 'react-native-paper';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { lightTheme, darkTheme } from './theme';

import Panel from './pages/Panel';
import Login from './pages/Login';
import Sale from './pages/Sale';
import { verifyUserIsLoggedIn, logout } from './services/auth';
import { Switch } from 'react-native-paper';
import { getData, storeData } from './services/storage';

const Stack = createStackNavigator();

export default function App() {
  const [userIsLoggedIn, setUserIsLoggedIn] = useState(false);
  const [mode, setMode] = useState('light');

  const rightButton = () => {
    return (
      <View style={styles.rightButtons}>
        <Switch 
          style={styles.rightElements}
          value={mode === 'dark'} 
          onValueChange={(event) => {
            let m = event ? 'dark' : 'light';
            setMode(m);
            storeData('mode', m)
          }
        } />
        <IconButton
          icon="exit-to-app"
          style={styles.rightElements}
          size={20}
          onPress={() => logout(setUserIsLoggedIn)}
        />
      </View>
    );
  };

  useEffect(() => {
    initApp();
  }, []);

  const initApp = async () => {
    const userIsLoggedIn = await verifyUserIsLoggedIn();
    setUserIsLoggedIn(userIsLoggedIn);

    const mode = await getData('mode');
    setMode(mode);
  }

  return (
    <PaperProvider theme={mode === 'light' ? lightTheme : darkTheme}>
      <NavigationContainer>
      <Stack.Navigator>
        {
          userIsLoggedIn ? 
            <>
              <Stack.Screen 
                name="Panel" 
                component={Panel} 
                options={{
                  headerRight: rightButton
                }}/>
              <Stack.Screen 
                name="Sale" 
                options={{
                  headerRight: rightButton
                }}
                component={Sale} />
            </>
           : <Stack.Screen 
           initialParams={{ setUserIsLoggedIn }}
           name="Login" component={Login} options={{
              headerShown: false
           }}/>
        }
      </Stack.Navigator>
    </NavigationContainer>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightButtons: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightElements: {
    marginRight: 10,
    marginLeft: 10,
  }
});
