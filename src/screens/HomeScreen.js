import React from 'react';
import { Text } from 'react-native';
// --- FIX --- Updating the import to the correct library
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  return (
    <SafeAreaView className="flex-1 justify-center items-center">
      <Text className="text-2xl">Home Dashboard</Text>
    </SafeAreaView>
  );
}