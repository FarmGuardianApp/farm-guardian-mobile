import React from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowRight } from 'lucide-react-native';

// We pass in `navigation` as a prop, which is given to us by React Navigation
export default function SplashScreen({ navigation }) {
  return (
    <SafeAreaView className="flex-1 justify-center items-center bg-[#e6fffa]">
      {/* Logo and Brand Name */}
      <View className="items-center">
        <Image
          // --- THIS IS THE FIX ---
          // We are now loading the logo from the local assets folder.
          source={require('../../assets/logo.png')}
          className="w-36 h-36"
          resizeMode="contain"
        />
        <Text className="text-4xl font-bold text-gray-800 mt-4">FARM GUARDIAN</Text>
      </View>

      {/* Start Button */}
      <TouchableOpacity
        // When pressed, navigate to the "Register" screen
        onPress={() => navigation.navigate('Register')}
        className="absolute bottom-16 flex-row items-center justify-center bg-[#9ae6b4] p-4 rounded-full shadow-lg"
      >
        <Text className="text-xl font-bold text-gray-800 mr-2">Get Started</Text>
        <ArrowRight color="#2d3748" size={28} />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

