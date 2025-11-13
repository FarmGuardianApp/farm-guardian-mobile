import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, BarChart3, Bell, User } from 'lucide-react-native'; // --- UPDATED ---

// Import our screens
import HomeScreen from '../screens/HomeScreen';
import SensorScreen from '../screens/SensorScreen';
import AlertScreen from '../screens/AlertScreen'; // --- NEW ---
import ProfileScreen from '../screens/ProfileScreen';
// import EducationScreen from '../screens/EducationScreen'; // --- REMOVED ---

const Tab = createBottomTabNavigator();

export default function MainTabNavigator() {
  const activeColor = '#2d3748'; // Dark Gray
  const inactiveColor = '#a0aec0'; // Light Gray
  // Define tab routes as an explicit array and map to <Tab.Screen/>. This
  // keeps the navigator children explicit and avoids accidental stray nodes.
  const tabs = [
    { name: 'Dashboard', component: HomeScreen },
    { name: 'Sensors', component: SensorScreen },
    { name: 'Alerts', component: AlertScreen },
    { name: 'Profile', component: ProfileScreen },
  ];

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: activeColor,
        tabBarInactiveTintColor: inactiveColor,
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopWidth: 0,
          height: 60,
          paddingBottom: 5,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
        tabBarIcon: ({ color, size, focused }) => {
          let IconComponent;
          if (route.name === 'Dashboard') {
            IconComponent = Home;
          } else if (route.name === 'Sensors') {
            IconComponent = BarChart3;
          } else if (route.name === 'Alerts') { // --- UPDATED ---
            IconComponent = Bell;
          } else if (route.name === 'Profile') {
            IconComponent = User;
          }
          return <IconComponent color={color} size={focused ? 28 : 24} />;
        },
      })}
    >
      {tabs.map((t) => (
        <Tab.Screen key={t.name} name={t.name} component={t.component} />
      ))}
    </Tab.Navigator>
  );
}