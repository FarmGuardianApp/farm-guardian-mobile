import React from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowRight, Languages } from 'lucide-react-native';

// The navigation prop is passed in from our AppNavigator
export default function LoginScreen({ navigation }) {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1">
          {/* Top Image Section - using a different image for variety */}
          <View className="relative h-1/3">
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1587200502153-03b9a5310e0c?q=80&w=2940&auto=format&fit=crop' }}
              className="w-full h-full"
            />
            <View className="absolute top-0 left-0 w-full h-full bg-black/30 rounded-b-3xl" />
            <Text className="absolute bottom-8 left-6 text-4xl font-bold text-white">
              Log In to{'\n'}your Account
            </Text>
          </View>

          {/* Form Section */}
          <View className="p-6 space-y-4 mt-8">
            <TextInput
              placeholder="Phone Number"
              keyboardType="phone-pad"
              className="bg-gray-100 p-4 rounded-xl text-lg"
            />
            {/* OTP Boxes */}
            <View className="flex-row justify-between">
              <TextInput className="bg-gray-100 p-4 rounded-xl text-lg w-1/5 text-center" maxLength={1} keyboardType="number-pad" />
              <TextInput className="bg-gray-100 p-4 rounded-xl text-lg w-1/5 text-center" maxLength={1} keyboardType="number-pad" />
              <TextInput className="bg-gray-100 p-4 rounded-xl text-lg w-1/5 text-center" maxLength={1} keyboardType="number-pad" />
              <TextInput className="bg-gray-100 p-4 rounded-xl text-lg w-1/5 text-center" maxLength={1} keyboardType="number-pad" />
            </View>

            {/* Sign In Button */}
            <TouchableOpacity className="bg-[#9ae6b4] p-4 rounded-xl flex-row justify-center items-center shadow-md mt-4">
              <Text className="text-xl font-bold text-gray-800 mr-2">Sign In</Text>
              <ArrowRight color="#2d3748" size={24} />
            </TouchableOpacity>
          </View>

          {/* Bottom Navigation */}
          <View className="flex-grow" />
          <View className="flex-row justify-between items-center p-6">
            <TouchableOpacity className="flex-row items-center">
              <Languages color="#2d3748" size={24} />
              <Text className="ml-2 text-lg font-semibold">Language</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              className="bg-gray-200 p-4 rounded-full"
              // When pressed, this will navigate back to the Register screen
              onPress={() => navigation.navigate('Register')}
            >
              <Text className="text-lg font-bold text-gray-800">Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

