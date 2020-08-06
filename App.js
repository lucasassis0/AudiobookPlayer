import 'react-native-gesture-handler'
import React from 'react';
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import List from './src/Pages/List'
import Player from './src/Pages/Player'

const Stack = createStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={"list"} screenOptions={{ headerShown: false }}>
        <Stack.Screen name="list" component={List} />
        <Stack.Screen name="player" component={Player} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
