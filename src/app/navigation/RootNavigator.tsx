import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthNavigator } from './AuthNavigator';
import { MainTabNavigator } from './MainTabNavigator';
import { StayDetailScreen } from '../screens/stays/StayDetailScreen';
import { BookingScreen } from '../screens/booking/BookingScreen';
import { HostProfileScreen } from '../screens/profile/HostProfileScreen';
import { VerificationScreen } from '../screens/verification/VerificationScreen';
import { useAuthStore, useIsVerified } from '../../store/useAuthStore';
import { View, ActivityIndicator } from 'react-native';
import { useTheme } from '../../theme';

export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
  StayDetail: { stayId: string };
  Booking: { stayId: string };
  HostProfile: { hostId: string };
  Verification: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  const { user, isLoading } = useAuthStore((state) => ({
    user: state.user,
    isLoading: state.isLoading
  }));
  const theme = useTheme();
  const isVerified = useIsVerified();

  if (isLoading) {
    return (
      <View
        style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: theme.colors.background }}
      >
        <ActivityIndicator color={theme.colors.primary} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          <Stack.Screen name="Main" component={MainTabNavigator} options={{ headerShown: false }} />
        ) : (
          <Stack.Screen name="Auth" component={AuthNavigator} options={{ headerShown: false }} />
        )}
        <Stack.Screen name="StayDetail" component={StayDetailScreen} options={{ title: 'Stay details' }} />
        <Stack.Screen
          name="Booking"
          component={BookingScreen}
          options={{
            title: isVerified ? 'Book stay' : 'Verify to book'
          }}
        />
        <Stack.Screen name="HostProfile" component={HostProfileScreen} options={{ title: 'Host profile' }} />
        <Stack.Screen name="Verification" component={VerificationScreen} options={{ title: 'Verification' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
