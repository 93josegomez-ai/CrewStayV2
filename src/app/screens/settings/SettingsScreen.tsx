import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import { useTheme } from '../../../theme';
import { useNotificationStore } from '../../../store/useNotificationStore';

export const SettingsScreen: React.FC = () => {
  const theme = useTheme();
  const preferences = useNotificationStore((state) => state.preferences);
  const togglePreference = useNotificationStore((state) => state.togglePreference);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}> 
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Notifications</Text>
        {(['stays', 'booking', 'verification'] as const).map((type) => (
          <View key={type} style={styles.row}>
            <Text style={{ color: theme.colors.text }}>{type === 'stays' ? 'New stays near base' : type === 'booking' ? 'Booking updates' : 'Verification updates'}</Text>
            <Switch value={preferences[type]} onValueChange={() => togglePreference(type)} />
          </View>
        ))}
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Security</Text>
        <Text style={{ color: theme.colors.muted }}>
          CrewStay enforces strict verification to keep the community exclusive to active airline crew. Report any suspicious activity immediately.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '700', marginBottom: 16 },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12
  }
});
