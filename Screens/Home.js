import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import NftList from './Elements/NftList';
import NftDetails from './Elements/NftDetails';

const Stack = createStackNavigator();

export default function Home() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="NftList">
      <Stack.Screen name="NftList" component={NftList} />
      <Stack.Screen name="NftDetails" component={NftDetails} />
    </Stack.Navigator>
  )
}