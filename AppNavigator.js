import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import OnboardScreen from './screens/OnboardScreen';
import HomeScreen from './screens/HomeScreen';
import ScheduleScreen from './screens/ScheduleScreen';
import CreditsScreen from './screens/CreditsScreen';
import CompanyScreen from './screens/CompanyScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName='Login'>
      <Stack.Screen name='Login' component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name='Onboard' component={OnboardScreen} options={{ title: 'Pick Your Company' }} />
      <Stack.Screen name='Home' component={HomeScreen} options={{ title: 'Home', headerLeft: () => null }} />
      <Stack.Screen name='Schedule' component={ScheduleScreen} options={{ title: 'Schedule Pickup' }} />
      <Stack.Screen name='Credits' component={CreditsScreen} options={{ title: 'My Credits' }} />
      <Stack.Screen name='Company' component={CompanyScreen} options={{ title: 'Company Dashboard' }} />
    </Stack.Navigator>
  );
}
