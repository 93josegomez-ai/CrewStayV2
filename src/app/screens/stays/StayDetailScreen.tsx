import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/RootNavigator';
import { useTheme } from '../../../theme';
import { Button } from '../../../components/Button';
import { Tag } from '../../../components/Tag';
import { Rating } from '../../../components/Rating';
import { useIsVerified } from '../../../store/useAuthStore';

const stay = {
  id: 'stay1',
  title: 'Premium crew loft near JFK',
  description:
    'Designed exclusively for airline crew. Secure entry, 24/7 quiet hours, and blackout rooms to guarantee your rest between rotations.',
  nightlyRate: 120,
  currency: 'USD',
  hostId: 'host1',
  amenities: ['Wi-Fi', 'Crew lounge', 'Quiet hours'],
  safetyFeatures: ['Secure entry', 'On-site host'],
  rating: 4.9,
  reviewCount: 128
};

export type StayDetailScreenProps = NativeStackScreenProps<RootStackParamList, 'StayDetail'>;

export const StayDetailScreen: React.FC<StayDetailScreenProps> = ({ navigation }) => {
  const theme = useTheme();
  const isVerified = useIsVerified();

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]} contentContainerStyle={styles.content}>
      <Text style={[styles.title, { color: theme.colors.text }]}>{stay.title}</Text>
      <Rating value={stay.rating} count={stay.reviewCount} />
      <Text style={[styles.price, { color: theme.colors.text }]}>${stay.nightlyRate} {stay.currency}/night</Text>
      <Text style={[styles.description, { color: theme.colors.muted }]}>{stay.description}</Text>
      <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Amenities</Text>
      <View style={styles.tagRow}>
        {stay.amenities.map((amenity) => (
          <Tag key={amenity} label={amenity} />
        ))}
      </View>
      <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Safety</Text>
      <View style={styles.tagRow}>
        {stay.safetyFeatures.map((feature) => (
          <Tag key={feature} label={feature} />
        ))}
      </View>
      <Button title="Contact host" onPress={() => navigation.navigate('HostProfile', { hostId: stay.hostId })} />
      <Button
        title={isVerified ? 'Request booking' : 'Verify to book'}
        onPress={() =>
          isVerified ? navigation.navigate('Booking', { stayId: stay.id }) : navigation.navigate('Verification')
        }
      />
      {!isVerified ? (
        <Text style={[styles.notice, { color: theme.colors.danger }]}>Booking is locked until verification is approved.</Text>
      ) : null}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  content: {
    padding: 16
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 12
  },
  price: {
    fontSize: 16,
    marginVertical: 12
  },
  description: {
    fontSize: 14,
    marginBottom: 16
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginTop: 16,
    marginBottom: 8
  },
  tagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12
  },
  notice: {
    marginTop: 12,
    fontSize: 12
  }
});
