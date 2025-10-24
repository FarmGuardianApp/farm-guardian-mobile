import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowRight, Languages } from 'lucide-react-native';
import axios from 'axios';

// --- IMPORTANT ---
// Make sure this is your computer's actual local IP address.
const API_BASE_URL = 'http://192.168.1.12:3000/api';

export default function RegisterScreen({ navigation }) {
  // State for form inputs
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']); // Array for the 4 OTP digits
  
  // State for UI control
  const [otpSent, setOtpSent] = useState(false); // Controls if OTP fields are visible
  const [loading, setLoading] = useState(false); // Shows a loading indicator

  // Refs to auto-focus the next OTP input
  const otpInputs = React.useRef([]);

  const handleSendOtp = async () => {
    if (!name || !phoneNumber) {
      Alert.alert('Error', 'Please enter your name and phone number.');
      return;
    }
    setLoading(true);
    try {
      // Call the backend to generate and "send" the OTP
      const response = await axios.post(`${API_BASE_URL}/auth/register`, { name, phoneNumber });
      
      // FOR TESTING: The backend sends the OTP back. In a real app, this would be an SMS.
      Alert.alert('OTP Sent (for testing)', `Your OTP is: ${response.data.otp}`);
      
      setOtpSent(true); // Show the OTP input fields
    } catch (error) {
      Alert.alert('Error', 'Could not send OTP. Please try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    const fullOtp = otp.join('');
    if (fullOtp.length !== 4) {
      Alert.alert('Error', 'Please enter the complete 4-digit OTP.');
      return;
    }
    setLoading(true);
    try {
      // Call the backend to verify the OTP
      const response = await axios.post(`${API_BASE_URL}/auth/verify`, { phoneNumber, otp: fullOtp });
      
      // On success, the backend sends a token. For now, we'll just log it
      // and navigate to the home screen. In the future, we'd save this token.
      console.log('Authentication successful! Token:', response.data.token);
      navigation.navigate('Home');

    } catch (error) {
      Alert.alert('Verification Failed', 'The OTP you entered is incorrect or has expired.');
      console.error(error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };
  
  // Function to handle OTP input and auto-focus
  const handleOtpChange = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    // Move to next input if a digit is entered
    if (text && index < 3) {
      otpInputs.current[index + 1].focus();
    }
  };


  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
        <View className="flex-1">
          {/* Top Image Section */}
          <View className="relative h-1/3">
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1560706939-247493406363?q=80&w=2940&auto=format&fit=crop' }}
              className="w-full h-full"
            />
            <View className="absolute top-0 left-0 w-full h-full bg-black/30 rounded-b-3xl" />
            <Text className="absolute bottom-8 left-6 text-4xl font-bold text-white">
              Create{'\n'}Account
            </Text>
          </View>

          {/* Form Section */}
          <View className="p-6 space-y-4">
            <TextInput
              placeholder="Name"
              className="bg-gray-100 p-4 rounded-xl text-lg"
              value={name}
              onChangeText={setName}
              editable={!otpSent} // Disable after OTP is sent
            />
            <TextInput
              placeholder="Phone Number"
              keyboardType="phone-pad"
              className="bg-gray-100 p-4 rounded-xl text-lg"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              editable={!otpSent} // Disable after OTP is sent
            />

            {/* OTP section - only shows after OTP is sent */}
            {otpSent && (
              <View>
                <Text className="text-center text-gray-600 mb-2">Enter the 4-digit OTP sent to your number.</Text>
                <View className="flex-row justify-between">
                  {otp.map((digit, index) => (
                    <TextInput
                      key={index}
                      ref={ref => otpInputs.current[index] = ref}
                      className="bg-gray-100 p-4 rounded-xl text-lg w-1/5 text-center"
                      maxLength={1}
                      keyboardType="number-pad"
                      value={digit}
                      onChangeText={(text) => handleOtpChange(text, index)}
                    />
                  ))}
                </View>
              </View>
            )}

            {/* Location Access (UI only for now) */}
            <View className="flex-row justify-between items-center bg-gray-100 p-4 rounded-xl">
              <Text className="text-lg text-gray-500">Give Location Access</Text>
              <TouchableOpacity className="bg-green-200 p-2 rounded-lg">
                <Text className="font-bold text-green-800">Allow</Text>
              </TouchableOpacity>
            </View>

            {/* Conditional Button */}
            <TouchableOpacity 
              className="bg-[#9ae6b4] p-4 rounded-xl flex-row justify-center items-center shadow-md"
              onPress={otpSent ? handleVerifyOtp : handleSendOtp}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#2d3748" />
              ) : (
                <>
                  <Text className="text-xl font-bold text-gray-800 mr-2">
                    {otpSent ? 'Sign Up' : 'Send OTP'}
                  </Text>
                  <ArrowRight color="#2d3748" size={24} />
                </>
              )}
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
              onPress={() => navigation.navigate('Login')}
            >
              <Text className="text-lg font-bold text-gray-800">Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

