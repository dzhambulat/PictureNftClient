import { useState } from "react";
import { StyleSheet, Text, View, Button } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import Home from './Screens/Home';
import Settings from './Screens/Settings';
import { AppContext } from "./context";

const MainTab = createBottomTabNavigator();

export default function App() {
  const [privateKey, setPrivateKey] = useState("");

  const dispatchKeyEvent = (actionType, payload) => {
    switch (actionType) {
      case 'CHANGE_KEY':
        setPrivateKey(payload);
        return;
      default:
        return;
    }
  };
  return (
    <AppContext.Provider value={{ privateKey, dispatchKeyEvent }}>
      <NavigationContainer style={styles.container}>
        <MainTab.Navigator screenOptions={({ route }) => (
          {
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === 'Home') {
                iconName = focused
                  ? 'ios-information-circle'
                  : 'ios-information-circle';
              } else if (route.name === 'Key') {
                iconName = focused ? 'ios-list' : 'ios-list';
              }
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: '#0a8258',
            headerStyle: {
              backgroundColor: '#0a8258',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            }
          })
        } >
          <MainTab.Screen name="Home" component={Home} />
          <MainTab.Screen name="Key" component={Settings} />
        </MainTab.Navigator>
      </NavigationContainer >
    </AppContext.Provider>
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
