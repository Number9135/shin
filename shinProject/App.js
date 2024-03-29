import { StyleSheet, Text, View, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import DrawerNavigator from './src/navigator/DrawerNavigator';
import { Provider } from 'react-redux';
import { store } from './src/redux/Store';
import { useState, useEffect, useRef } from 'react';




export default function App() {

  

  return (
    <Provider store={store}>
    <NavigationContainer>
      <DrawerNavigator />
    </NavigationContainer>
    </Provider>
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
