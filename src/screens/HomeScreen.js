import React from 'react';
import { Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Bell, Camera, Book, Beaker } from 'lucide-react-native';

// Reusable Quick Access Button Component
const QuickAccessButton = ({ label, icon, color, borderColor, onPress }) => {
  const IconComponent = icon;
  return (
    <TouchableOpacity 
      onPress={onPress}
      className={`w-[48%] p-4 rounded-2xl border-2 ${borderColor} bg-white`}
      style={{
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 3,
      }}
    >
      <View className="flex-row items-center">
        <View className={`p-2 rounded-full ${color}`}>
          <IconComponent size={20} color="black" />
        </View>
        <Text className="text-base font-bold text-gray-800 ml-3">{label}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default function HomeScreen({ navigation }) {
  const [time, setTime] = React.useState(new Date());

  React.useEffect(() => {
    // Update the time every minute
    const timer = setInterval(() => setTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);
  
  const formattedTime = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <ScrollView>
        {/* Header */}
        <View className="p-6">
          <Text className="text-lg text-gray-500">{formattedTime}</Text>
          <Text className="text-3xl font-bold text-gray-900 mt-1">Hello Ramesh ji!!</Text>
        </View>

        {/* Farm Health Score Card */}
        <View className="px-6">
          <View className="bg-green-100 rounded-2xl p-6 shadow-sm">
            <Text className="text-xl font-bold text-gray-800 text-center mb-4">Farm Health Score</Text>
            <View className="items-center justify-center">
              {/* Simple Circle for the score */}
              <View className="w-36 h-36 rounded-full border-8 border-green-400 items-center justify-center bg-white">
                <Text className="text-4xl font-extrabold text-gray-900">100</Text>
                <Text className="text-lg font-semibold text-gray-500">/100</Text>
              </View>
              <Text className="text-2xl font-bold text-green-700 mt-4">EXCELLENT</Text>
            </View>
            <View className="flex-row justify-around mt-6">
              <View className="items-center">
                <Text className="text-2xl font-bold text-gray-900">12 Days</Text>
                <Text className="text-base font-semibold text-green-600">Safe</Text>
              </View>
              <View className="items-center">
                <Text className="text-2xl font-bold text-gray-900">95%</Text>
                <Text className="text-base font-semibold text-blue-600">Compliance</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Appointment Schedule Card */}
        <View className="px-6 mt-6">
          <View className="border-2 border-dashed border-yellow-500 bg-yellow-50 rounded-2xl p-4">
            <Text className="text-lg font-bold text-yellow-800">Appointment on 20 Sept, 2025</Text>
            <Text className="text-base text-gray-700 mt-1">You have your appointment scheduled on 20th of Sept 2025 for pig vaccination.</Text>
          </View>
        </View>

        {/* Quick Access Grid */}
        <View className="px-6 mt-6">
          <Text className="text-2xl font-bold text-gray-900 mb-4">Quick Access</Text>
          <View className="flex-row flex-wrap justify-between gap-y-4">
            <QuickAccessButton 
              label="Risk Assesment" 
              icon={Beaker} 
              color="bg-blue-100" 
              borderColor="border-blue-300" 
            />
            <QuickAccessButton 
              label="Farm Photo" 
              icon={Camera} 
              color="bg-green-100" 
              borderColor="border-green-300" 
            />
            <QuickAccessButton 
              label="Alerts" 
              icon={Bell} 
              color="bg-yellow-100" 
              borderColor="border-yellow-300"
              onPress={() => navigation.navigate('Alerts')}
            />
            <QuickAccessButton 
              label="Training" 
              icon={Book} 
              color="bg-purple-100" 
              borderColor="border-purple-300" 
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}