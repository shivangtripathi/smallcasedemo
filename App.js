import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import { LogBox } from 'react-native';

import HomeScreen from './src/screens/home';

const App = ()=> {
  LogBox.ignoreAllLogs();
  return (
    <SafeAreaView style={{flex:1}}>
      <StatusBar barStyle={'dark-content'} />
        <HomeScreen />
    </SafeAreaView>
  );
};

export default App;
