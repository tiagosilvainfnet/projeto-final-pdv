import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { lightTheme, darkTheme } from './theme';

import Panel from './pages/Panel';
import Login from './pages/Login';
import Sale from './pages/Sale';

const Stack = createStackNavigator();

export default function App() {
  const [userIsLoggedIn, setUserIsLoggedIn] = useState(false);
  const [mode, setMode] = useState('light');

  return (
    <PaperProvider theme={mode === 'light' ? lightTheme : darkTheme}>
      <NavigationContainer>
      <Stack.Navigator>
        {
          userIsLoggedIn ? 
            <>
              <Stack.Screen name="Panel" component={Panel} />
              <Stack.Screen name="Sale" component={Sale} />
            </>
           : <Stack.Screen name="Login" component={Login} options={{
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
});
