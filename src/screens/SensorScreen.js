import React, { useState, useEffect } from 'react';
import { Text, View, ActivityIndicator, ScrollView, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Thermometer, Droplets, Wind, Beaker, BarChart } from 'lucide-react-native';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

// --- IMPORTANT ---
// Make sure this is your computer's actual local IP address.
const API_BASE_URL = 'http://192.168.1.12:3000/api'; // <-- CHECK YOUR IP

// --- UPDATED MetricCard ---
// It now accepts a 'status' prop to change its color
const MetricCard = ({ icon, label, value, unit, status }) => {
  let bgColor = 'bg-white';
  let textColor = 'text-gray-900';
  let statusColor = 'text-gray-500';

  if (status && status.includes('warning')) {
    bgColor = 'bg-yellow-50'; // Light Yellow
    textColor = 'text-yellow-800';
    statusColor = 'text-yellow-600';
  } else if (status && status.includes('critical')) {
    bgColor = 'bg-red-50'; // Light Red
    textColor = 'text-red-800';
    statusColor = 'text-red-600';
  }

  return (
    <View className={`${bgColor} p-4 rounded-2xl w-[48%] items-center shadow-sm`}>
      <View className="flex-row items-start justify-between w-full">
        {icon}
        <Text className={`text-lg font-semibold ${statusColor}`}>{label}</Text>
      </View>
      <View className="mt-4">
        <Text className={`text-4xl font-bold ${textColor}`}>{value || '...'}</Text>
        <Text className={`text-sm ${statusColor} text-right`}>{unit}</Text>
      </View>
    </View>
  );
};

export default function SensorScreen() {
  const { t } = useTranslation();
  const [data, setData] = useState(null); // This will now hold the full ML result
  const [loading, setLoading] = useState(true);

  const fetchSensorData = async () => {
    setLoading(true);
    try {
      // This endpoint now returns the full ML prediction object
      const response = await axios.get(`${API_BASE_URL}/farms/1/sensor-data/latest`);
      setData(response.data);
    } catch (error) {
      console.error('Failed to fetch sensor data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSensorData();
    const interval = setInterval(fetchSensorData, 10000); // 10s refresh
    return () => clearInterval(interval);
  }, []);

  // We now get the values from the 'results' sub-object
  const sensorResults = data?.results;

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <ScrollView
        contentContainerStyle={{ padding: 24 }}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={fetchSensorData} />
        }
      >
        <Text className="text-3xl font-bold text-gray-900 mb-6">{t('sensors:title')}</Text>
        
        {loading && !data ? (
          <ActivityIndicator size="large" color="#2d3748" />
        ) : (
          <View className="flex-row flex-wrap justify-between gap-y-4">
            <MetricCard 
              icon={<Thermometer size={24} color="#ef4444" />}
              label={t('sensors:temperature')}
              value={sensorResults?.temperature?.value?.toFixed(1)}
              unit="°C"
              status={sensorResults?.temperature?.status}
            />
            <MetricCard 
              icon={<Droplets size={24} color="#3b82f6" />}
              label={t('sensors:humidity')}
              value={sensorResults?.humidity?.value?.toFixed(1)}
              unit="%"
              status={sensorResults?.humidity?.status}
            />
            <MetricCard 
              icon={<Wind size={24} color="#a855f7" />}
              label={t('sensors:pressure')}
              value={sensorResults?.pressure?.value?.toFixed(1)}
              unit="hPa"
              status={sensorResults?.pressure?.status}
            />
            <MetricCard 
              icon={<BarChart size={24} color="#f97316" />}
              label={t('sensors:tds')}
              value={sensorResults?.tds?.value}
              unit="ppm"
              status={sensorResults?.tds?.status}
            />
             <MetricCard 
              icon={<Beaker size={24} color="#eab308" />}
              label={t('sensors:ph')}
              value={sensorResults?.ph?.value?.toFixed(1)}
              unit=""
              status={sensorResults?.ph?.status}
            />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}