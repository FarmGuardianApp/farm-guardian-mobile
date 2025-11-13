import React, { useState, useEffect } from 'react';
import { Text, View, FlatList, ActivityIndicator, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Bell, AlertTriangle, CheckCircle } from 'lucide-react-native';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

// --- IMPORTANT ---
// Make sure this is your computer's actual local IP address.
const API_BASE_URL = 'http://192.168.1.12:3000/api'; // <-- CHECK YOUR IP

// Reusable component for an alert item
const AlertItem = ({ alert }) => {
  const isCritical = alert.status.includes('critical');
  const Icon = isCritical ? AlertTriangle : CheckCircle;
  const iconColor = isCritical ? '#ef4444' : '#f97316'; // Red or Orange

  return (
    <View className="bg-white p-4 rounded-xl shadow-sm mb-4 flex-row items-center">
      <Icon size={28} color={iconColor} />
      <View className="ml-4 flex-1">
        <Text className={`text-lg font-bold ${isCritical ? 'text-red-600' : 'text-orange-500'}`}>
          {alert.sensor.toUpperCase()} Alert
        </Text>
        <Text className="text-base text-gray-700">{alert.message}</Text>
        <Text className="text-xs text-gray-500 mt-1">
          {new Date(alert.created_at).toLocaleString()}
        </Text>
      </View>
    </View>
  );
};

export default function AlertScreen() {
  const { t } = useTranslation();
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAlerts = async () => {
    setLoading(true);
    try {
      // For the demo, we'll hard-code farmId=1
      const response = await axios.get(`${API_BASE_URL}/farms/1/alerts`);
      setAlerts(response.data);
    } catch (error) {
      console.error('Failed to fetch alerts:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlerts();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <View className="p-6">
        <Text className="text-3xl font-bold text-gray-900 mb-6">{t('home:alerts')}</Text>
        {loading && alerts.length === 0 ? (
          <ActivityIndicator size="large" color="#2d3748" />
        ) : (
          <FlatList
            data={alerts}
            renderItem={({ item }) => <AlertItem alert={item} />}
            keyExtractor={(item) => item.id.toString()}
            ListEmptyComponent={() => (
              <View className="items-center justify-center p-10">
                <Bell size={40} color="#a0aec0" />
                <Text className="text-lg text-gray-500 mt-4">No new alerts. Good job!</Text>
              </View>
            )}
            refreshControl={
              <RefreshControl refreshing={loading} onRefresh={fetchAlerts} />
            }
          />
        )}
      </View>
    </SafeAreaView>
  );
}