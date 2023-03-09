import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { IconButton, Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import NetInfo from '@react-native-community/netinfo';

import { lightTheme, darkTheme } from './theme';

import Panel from './pages/Panel';
import Login from './pages/Login';
import Sale from './pages/Sale';
import CupomList from './pages/CupomList';
import CupomItem from './pages/CupomItem';
import { logout } from './services/auth';
import { Switch } from 'react-native-paper';
import { getData, storeData } from './services/storage';
import { getSync, pushSync } from './services/sync';
// import { create, select } from './schemas/persist';

const Stack = createStackNavigator();

export default function App() {
  const [mode, setMode] = useState('light');

  useEffect(() => {
    const handleConnection = async (state) => {
      if(state.isConnected){
        getSync();
        pushSync();
      }
    }
  
    const unsubscribe = NetInfo.addEventListener(handleConnection);

    // create('category', {id: 1, name: 'teste', store_id: 1});
    // select('category');

    return () => {
      unsubscribe();
    }
  }, []);

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
          onPress={() => logout()}
        />
      </View>
    );
  };

  useEffect(() => {
    initApp();
  }, []);

  const initApp = async () => {
    const mode = await getData('mode');
    setMode(mode);
  }

  return (
    <PaperProvider theme={mode === 'light' ? lightTheme : darkTheme}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen 
          name="Login" component={Login} options={{
            headerShown: false
          }}/>
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
          <Stack.Screen 
            name="CupomList" 
            options={{
              headerRight: rightButton
            }}
            component={CupomList} />
          <Stack.Screen 
            name="CupomItem" 
            options={{
              headerRight: rightButton
            }}
            component={CupomItem} />
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
