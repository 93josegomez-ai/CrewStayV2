import React, { useState } from 'react';
import { Alert, SafeAreaView, ScrollView, StyleSheet, Text } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { AuthStackParamList } from '../../navigation/AuthNavigator';
import { Input } from '../../../components/Input';
import { Button } from '../../../components/Button';
import { useTheme } from '../../../theme';
import { auth, firestore } from '../../../lib/firebase';
import { useAuthStore } from '../../../store/useAuthStore';
import { VerificationStatus } from '../../../types/user';

export type SignupScreenProps = NativeStackScreenProps<AuthStackParamList, 'Signup'>;

export const SignupScreen: React.FC<SignupScreenProps> = () => {
  const theme = useTheme();
  const setUser = useAuthStore((state) => state.setUser);
  const setVerification = useAuthStore((state) => state.setVerification);
  const setIsLoading = useAuthStore((state) => state.setIsLoading);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [airline, setAirline] = useState('');
  const [base, setBase] = useState('');

  const handleSignup = async () => {
    if (!email || !password || !name || !airline || !base) {
      Alert.alert('Missing information', 'Please fill in all fields to continue.');
      return;
    }

    try {
      setIsLoading(true);
      const credentials = await createUserWithEmailAndPassword(auth, email.trim(), password);
      await updateProfile(credentials.user, { displayName: name });

      const verification: VerificationStatus = {
        idVerified: false,
        employmentVerified: false,
        verificationStatus: 'pending',
        updatedAt: serverTimestamp() as any
      };

      await setDoc(doc(firestore, 'crewProfiles', credentials.user.uid), {
        uid: credentials.user.uid,
        name,
        airline,
        base,
        role: 'Flight Attendant',
        languages: [],
        badges: [],
        rating: 5,
        verification,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });

      setUser(credentials.user);
      setVerification(verification);
      Alert.alert('Almost there', 'Complete verification to unlock bookings and hosting.');
    } catch (error) {
      Alert.alert('Signup failed', 'Unable to create account. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}> 
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={[styles.title, { color: theme.colors.text }]}>Join CrewStay</Text>
        <Text style={[styles.subtitle, { color: theme.colors.muted }]}>
          Verification is required to access community features. Uploads happen in the verification flow after signup.
        </Text>
        <Input label="Full name" value={name} onChangeText={setName} autoCapitalize="words" />
        <Input label="Company Email" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
        <Input label="Airline" value={airline} onChangeText={setAirline} />
        <Input label="Base (IATA code)" value={base} onChangeText={setBase} autoCapitalize="characters" maxLength={3} />
        <Input label="Password" value={password} onChangeText={setPassword} secureTextEntry />
        <Button title="Create Account" onPress={handleSignup} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  content: {
    padding: 24
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 12
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 24
  }
});
