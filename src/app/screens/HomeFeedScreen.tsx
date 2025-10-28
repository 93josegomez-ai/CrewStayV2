import React, { useMemo } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { Tag } from '../../components/Tag';
import { Rating } from '../../components/Rating';
import { useTheme } from '../../theme';
import { useAuthStore, useIsVerified } from '../../store/useAuthStore';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';

const crewPosts = [
  {
    id: '1',
    title: 'Crew dinner in JFK base next week',
    tags: ['Community', 'Meetup'],
    content: 'Join us for a casual dinner near the airport hotel district. RSVP in chat!',
    likes: 42,
    comments: 12
  },
  {
    id: '2',
    title: 'Safety tip: Verified-only stays',
    tags: ['Safety'],
    content:
      'Only verified crew can publish listings. Report suspicious activity via the Report button inside each stay.',
    likes: 89,
    comments: 18
  }
];

export const HomeFeedScreen: React.FC = () => {
  const theme = useTheme();
  const isVerified = useIsVerified();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const verificationStatus = useAuthStore((state) => state.verification?.verificationStatus);

  const header = useMemo(() => {
    if (isVerified) {
      return null;
    }

    return (
      <Card>
        <Text style={[styles.cardTitle, { color: theme.colors.text }]}>Verification required</Text>
        <Text style={[styles.cardContent, { color: theme.colors.muted }]}>
          To book stays and join private threads, complete the two-step verification process.
        </Text>
        <Button title="Verify Now" onPress={() => navigation.navigate('Verification')} />
        <Text style={[styles.cardContent, { color: theme.colors.muted }]}>
          Status: {verificationStatus === 'rejected' ? 'Rejected — update documents' : verificationStatus || 'pending'}
        </Text>
      </Card>
    );
  }, [isVerified, navigation, theme.colors.muted, theme.colors.text, verificationStatus]);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}> 
      <FlatList
        data={crewPosts}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={header}
        renderItem={({ item }) => (
          <Card elevated>
            <View style={styles.postHeader}>
              <Text style={[styles.postTitle, { color: theme.colors.text }]}>{item.title}</Text>
              <View style={styles.tagRow}>
                {item.tags.map((tag) => (
                  <Tag key={tag} label={tag} />
                ))}
              </View>
            </View>
            <Text style={[styles.cardContent, { color: theme.colors.muted }]}>{item.content}</Text>
            <View style={styles.postFooter}>
              <Rating value={4.9} count={item.likes} />
              <Text style={{ color: theme.colors.muted }}>{item.comments} comments</Text>
            </View>
          </Card>
        )}
        contentContainerStyle={styles.content}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  content: {
    padding: 16
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700'
  },
  cardContent: {
    marginVertical: 8,
    fontSize: 14
  },
  postHeader: {
    marginBottom: 8
  },
  postTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4
  },
  tagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  postFooter: {
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
});
