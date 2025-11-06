import React, { useState, useEffect } from 'react';
import { Text, View, ActivityIndicator, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowRight, Wifi, Thermometer, Droplets, Wind, Beaker, BarChart } from 'lucide-react-native';
import axios from 'axios';

// --- IMPORTANT ---
// Make sure this is your computer's actual local IP address.
const API_BASE_URL = 'http://192.168.1.15:3000/api';

// A reusable component for our dashboard items
const MetricCard = ({ icon, label, value, unit }) => (
  <View className="bg-white p-4 rounded-2xl w-[48%] items-center shadow-sm">
    <View className="flex-row items-start justify-between w-full">
      {icon}
      <Text className="text-lg font-semibold text-gray-500">{label}</Text>
    </View>
    <View className="mt-4">
      <Text className="text-4xl font-bold text-gray-900">{value || '...'}</Text>
      <Text className="text-sm text-gray-500 text-right">{unit}</Text>
    </View>
  </View>
);

export default function HomeScreen({ navigation }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Function to fetch the latest sensor data
  const fetchSensorData = async () => {
    setLoading(true);
    try {
      // For the demo, we'll hard-code farmId=1
      const response = await axios.get(`${API_BASE_URL}/farms/1/sensor-data/latest`);
      setData(response.data);
    } catch (error) {
      console.error('Failed to fetch sensor data:', error);
      // In a real app, show an error message
    } finally {
      setLoading(false);
    }
  };

  // UseEffect to fetch data when the screen loads
  useEffect(() => {
    fetchSensorData();

    // Set up an interval to refresh the data every 10 seconds
    const interval = setInterval(fetchSensorData, 10000); // 10000ms = 10s

    // Clear the interval when the screen is unmounted
    return () => clearInterval(interval);
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      {/* Header */}
      <View className="p-6">
        <Text className="text-3xl font-bold text-gray-900">Hello, Ramesh!</Text>
        <Text className="text-lg text-gray-600">Welcome to your Farm Dashboard</Text>
      </View>

      {/* Main Content Area */}
      {loading && !data ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#2d3748" />
        </View>
      ) : (
        <View className="p-6 space-y-4">
          {/* Main Status Card */}
          <View className="bg-green-600 p-6 rounded-2xl shadow-lg">
            <View className="flex-row justify-between items-center">
              <Text className="text-2xl font-bold text-white">Farm Health</Text>
              <Wifi size={24} color="white" />
            </View>
            <Text className="text-5xl font-extrabold text-white mt-4">EXCELLENT</Text>
            <Text className="text-lg text-green-100 mt-1">Based on sensor data</Text>
          </View>

          {/* Sensor Data Grid */}
          <View className="flex-row flex-wrap justify-between gap-y-4">
            <MetricCard 
              icon={<Thermometer size={24} color="#ef4444" />}
              label="Temperature"
              value={data?.temperature?.toFixed(1)}
              unit="°C"
            />
            <MetricCard 
              icon={<Droplets size={24} color="#3b82f6" />}
              label="Humidity"
              value={data?.humidity?.toFixed(1)}
              unit="%"
            />
            <MetricCard 
              icon={<Wind size={24} color="#a855f7" />}
              label="Pressure"
              value={data?.pressure?.toFixed(1)}
              unit="hPa"
            />
            <MetricCard 
              icon={<BarChart size={24} color="#f97316" />}
              label="TDS"
              value={data?.tds}
              unit="ppm"
            />
             <MetricCard 
              icon={<Beaker size={24} color="#eab308" />}
              label="Water pH"
              value={data?.ph?.toFixed(1)}
              unit=""
            />
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}
