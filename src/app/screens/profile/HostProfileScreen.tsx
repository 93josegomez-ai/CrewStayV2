import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/RootNavigator';
import { useTheme } from '../../../theme';
import { Avatar } from '../../../components/Avatar';
import { Rating } from '../../../components/Rating';
import { Button } from '../../../components/Button';

const host = {
  id: 'host1',
  name: 'Alex Morgan',
  airline: 'Delta Air Lines',
  base: 'JFK',
  rating: 4.9,
  languages: ['English', 'Spanish'],
  badges: ['Top Host', 'Safety Champion']
};

export type HostProfileScreenProps = NativeStackScreenProps<RootStackParamList, 'HostProfile'>;

export const HostProfileScreen: React.FC<HostProfileScreenProps> = () => {
  const theme = useTheme();

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Avatar initials="AM" size={72} />
        <Text style={[styles.name, { color: theme.colors.text }]}>{host.name}</Text>
        <Text style={{ color: theme.colors.muted }}>{host.airline} • Base {host.base}</Text>
        <Rating value={host.rating} />
      </View>
      <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Languages</Text>
      <Text style={{ color: theme.colors.muted }}>{host.languages.join(', ')}</Text>
      <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Badges</Text>
      <Text style={{ color: theme.colors.muted }}>{host.badges.join(' • ')}</Text>
      <Button title="Report host" variant="outline" onPress={() => null} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 16 },
  header: { alignItems: 'center', marginBottom: 16 },
  name: { fontSize: 22, fontWeight: '700', marginTop: 12 },
  sectionTitle: { fontSize: 16, fontWeight: '600', marginTop: 16, marginBottom: 8 }
});
