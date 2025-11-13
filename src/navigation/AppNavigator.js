import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Import our Auth screens
import SplashScreen from '../screens/SplashScreen';
import RegisterScreen from '../screens/RegisterScreen';
import LoginScreen from '../screens/LoginScreen';

// --- NEW ---
// Import our main app navigator
import MainTabNavigator from './MainTabNavigator';

const Stack = createStackNavigator();

export default function AppNavigator() {
  // Define routes as an explicit array and map to <Stack.Screen />.
  // This makes the navigator children explicit and avoids accidental
  // stray JSX/text nodes being inserted between screens.
  const routes = [
    { name: 'Splash', component: SplashScreen },
    { name: 'Register', component: RegisterScreen },
    { name: 'Login', component: LoginScreen },
    { name: 'App', component: MainTabNavigator },
  ];

  return (
    <NavigationContainer>
      <StatusBar style="dark" />
      <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
        {routes.map((r) => (
          <Stack.Screen key={r.name} name={r.name} component={r.component} />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
}