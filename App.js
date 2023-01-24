/**
 * Finanças
 * 
 * expo install styled-components
 * expo install firebase@8.8.1
 * expo install @react-navigation/native
 * npx expo install react-native-screens react-native-safe-area-context
 * expo install @react-navigation/stack
 * expo install @react-navigation/drawer
 * npx expo install react-native-gesture-handler
 */
import 'react-native-gesture-handler';
import React from "react";
import { Cointainer } from "./src/styles";
import { View, StatusBar } from "react-native";
import firebase from './src/services/firebaseConnection';
import Routes from './src/routes';
import { NavigationContainer } from '@react-navigation/native';

export default function App(){
  return(
    <NavigationContainer>
      <StatusBar backgroundColor="#131313" barStyle="light-content" />
      <Routes />
    </NavigationContainer>
  )
}