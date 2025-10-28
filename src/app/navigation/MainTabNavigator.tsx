import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeFeedScreen } from '../screens/HomeFeedScreen';
import { StaysScreen } from '../screens/stays/StaysScreen';
import { MessagesScreen } from '../screens/messages/MessagesScreen';
import { SettingsScreen } from '../screens/settings/SettingsScreen';
import { CrewProfileScreen } from '../screens/profile/CrewProfileScreen';
import { useTheme } from '../../theme';

export type MainTabParamList = {
  Home: undefined;
  Stays: undefined;
  Messages: undefined;
  CrewProfile: undefined;
  Settings: undefined;
};

const Tab = createBottomTabNavigator<MainTabParamList>();

export const MainTabNavigator = () => {
  const theme = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.muted,
        tabBarStyle: { backgroundColor: theme.colors.card }
      }}
    >
      <Tab.Screen name="Home" component={HomeFeedScreen} />
      <Tab.Screen name="Stays" component={StaysScreen} />
      <Tab.Screen name="Messages" component={MessagesScreen} />
      <Tab.Screen name="CrewProfile" component={CrewProfileScreen} options={{ title: 'Profile' }} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
};
