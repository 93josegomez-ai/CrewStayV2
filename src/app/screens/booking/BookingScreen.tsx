import React from 'react';
import { Alert, ScrollView, StyleSheet, Text } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/RootNavigator';
import { useTheme } from '../../../theme';
import { Button } from '../../../components/Button';
import { useIsVerified } from '../../../store/useAuthStore';

export type BookingScreenProps = NativeStackScreenProps<RootStackParamList, 'Booking'>;

export const BookingScreen: React.FC<BookingScreenProps> = ({ route }) => {
  const theme = useTheme();
  const isVerified = useIsVerified();

  const handleUnavailable = () => {
    Alert.alert('Payments unavailable', 'In-app payment processing is unavailable (future update).');
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]} contentContainerStyle={styles.content}>
      <Text style={[styles.title, { color: theme.colors.text }]}>Booking summary</Text>
      <Text style={{ color: theme.colors.muted }}>Stay ID: {route.params.stayId}</Text>
      <Text style={[styles.price, { color: theme.colors.text }]}>$120 USD / night</Text>
      <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Verification status</Text>
      <Text style={{ color: isVerified ? theme.colors.success : theme.colors.danger }}>
        {isVerified ? 'Verified crew member — booking requests allowed.' : 'Verification required before booking.'}
      </Text>
      <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Payment</Text>
      <Text style={{ color: theme.colors.muted }}>
        Secure crew-only payments are not yet enabled inside Expo Go. Stripe integration will arrive in a future native build.
      </Text>
      <Button
        title={isVerified ? 'Submit booking request' : 'Verify to book'}
        onPress={isVerified ? handleUnavailable : handleUnavailable}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 16 },
  title: { fontSize: 20, fontWeight: '700', marginBottom: 8 },
  price: { fontSize: 16, marginVertical: 12 },
  sectionTitle: { fontSize: 16, fontWeight: '600', marginTop: 16, marginBottom: 4 }
});
