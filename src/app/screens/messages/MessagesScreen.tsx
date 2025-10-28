import React from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../../../theme';
import { Button } from '../../../components/Button';
import { Card } from '../../../components/Card';

const threads = [
  {
    id: 'thread1',
    title: 'JFK Loft Booking',
    preview: 'Host: Looking forward to hosting you this weekend!',
    unread: 2
  },
  {
    id: 'thread2',
    title: 'Crew meetup chat',
    preview: 'Captain Lee: See you all at crew lounge 5B.',
    unread: 0
  }
];

export const MessagesScreen: React.FC = () => {
  const theme = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}> 
      <FlatList
        data={threads}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.content}
        renderItem={({ item }) => (
          <Card>
            <View style={styles.row}>
              <View style={{ flex: 1 }}>
                <Text style={[styles.title, { color: theme.colors.text }]}>{item.title}</Text>
                <Text style={{ color: theme.colors.muted }}>{item.preview}</Text>
              </View>
              {item.unread > 0 ? (
                <View style={[styles.badge, { backgroundColor: theme.colors.primary }]}> 
                  <Text style={styles.badgeText}>{item.unread}</Text>
                </View>
              ) : null}
            </View>
            <View style={styles.actions}>
              <Button title="Open" onPress={() => null} />
              <Button title="Report" variant="outline" onPress={() => null} />
            </View>
          </Card>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 16 },
  row: { flexDirection: 'row', alignItems: 'center' },
  title: { fontSize: 16, fontWeight: '600', marginBottom: 4 },
  badge: { borderRadius: 12, paddingHorizontal: 8, paddingVertical: 4 },
  badgeText: { color: '#fff', fontWeight: '700' },
  actions: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 12 }
});
