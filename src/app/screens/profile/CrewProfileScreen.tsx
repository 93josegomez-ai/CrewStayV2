import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { useTheme } from '../../../theme';
import { Avatar } from '../../../components/Avatar';
import { Button } from '../../../components/Button';
import { useAuthStore } from '../../../store/useAuthStore';

export const CrewProfileScreen: React.FC = () => {
  const theme = useTheme();
  const user = useAuthStore((state) => state.user);
  const verification = useAuthStore((state) => state.verification);

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]} contentContainerStyle={styles.content}>
      <Avatar initials={user?.displayName?.slice(0, 2).toUpperCase() || 'CR'} size={80} />
      <Text style={[styles.name, { color: theme.colors.text }]}>{user?.displayName || 'Crew member'}</Text>
      <Text style={{ color: theme.colors.muted }}>{user?.email}</Text>
      <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Verification</Text>
      <Text style={{ color: theme.colors.muted }}>Status: {verification?.verificationStatus || 'pending'}</Text>
      {verification?.rejectionReason ? (
        <Text style={{ color: theme.colors.danger }}>Reason: {verification.rejectionReason}</Text>
      ) : null}
      <Button title="Manage verification" onPress={() => null} />
      <Button title="Sign out" variant="outline" onPress={() => useAuthStore.getState().reset()} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 16, alignItems: 'center' },
  name: { fontSize: 22, fontWeight: '700', marginTop: 12 },
  sectionTitle: { fontSize: 16, fontWeight: '600', marginTop: 16, marginBottom: 8 }
});
