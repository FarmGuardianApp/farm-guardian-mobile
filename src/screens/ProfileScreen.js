import React from 'react';
import { Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronRight, Settings, Bell, History, Droplet } from 'lucide-react-native';

// A reusable component for the list items
const ProfileMenuItem = ({ label, value, icon: Icon, isNav = false }) => (
  <TouchableOpacity 
    className="flex-row items-center justify-between py-4 border-b border-green-200"
    disabled={!isNav}
  >
    <View className="flex-row items-center">
      {Icon && <Icon size={20} color="#2f855a" className="mr-3" />}
      {label && <Text className="text-lg font-semibold text-gray-700">{label}</Text>}
    </View>
    <View className="flex-row items-center">
      <Text className="text-lg text-gray-600 mr-2">{value}</Text>
      {isNav && <ChevronRight size={20} color="#a0aec0" />}
    </View>
  </TouchableOpacity>
);

export default function ProfileScreen({ navigation }) {
  // Hard-coded data for the demo, just like the design
  const userData = {
    name: "Ramesh Sutar",
    phone: "+91 8756430912",
    location: "Bhagad, Maharashtra, India",
    cattleType: "Poultry",
    imageUrl: "https://images.unsplash.com/photo-1543466835-00a7907e964c?q=80&w=2869&auto=format&fit=crop" // Placeholder image
  };

  return (
    <SafeAreaView className="flex-1 bg-green-50">
      <ScrollView>
        {/* Header Section */}
        <View className="items-center pt-10 pb-6 bg-white shadow-sm rounded-b-3xl">
          <View className="w-32 h-32 rounded-full border-4 border-green-300 overflow-hidden">
            <Image
              source={{ uri: userData.imageUrl }}
              className="w-full h-full"
              resizeMode="cover"
            />
          </View>
          <Text className="text-3xl font-bold text-gray-900 mt-4">{userData.name}</Text>
        </View>

        {/* Info & Settings List */}
        <View className="p-6 mt-4">
          {/* User Info */}
          <View className="bg-white rounded-2xl p-4 shadow-sm">
            <ProfileMenuItem label="Phone Number" value={userData.phone} />
            <ProfileMenuItem label="Location" value={userData.location} />
            <ProfileMenuItem label="Cattle Type" value={userData.cattleType} />
          </View>

          {/* App Settings */}
          <View className="bg-white rounded-2xl p-4 shadow-sm mt-6">
            <ProfileMenuItem label="Appointment History" icon={History} isNav={true} />
            <ProfileMenuItem label="Notification Settings" icon={Bell} isNav={true} />
            <ProfileMenuItem label="Settings" icon={Settings} isNav={true} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}