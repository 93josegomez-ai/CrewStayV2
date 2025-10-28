import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { useTheme } from '../../../theme';
import { Button } from '../../../components/Button';
import { useAuthStore } from '../../../store/useAuthStore';
import { firestore, storage } from '../../../lib/firebase';

export const VerificationScreen: React.FC = () => {
  const theme = useTheme();
  const user = useAuthStore((state) => state.user);
  const setVerification = useAuthStore((state) => state.setVerification);
  const [idUpload, setIdUpload] = useState<string | null>(null);
  const [employmentUpload, setEmploymentUpload] = useState<string | null>(null);

  const pickImage = async (type: 'id' | 'employment') => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 0.8
    });

    if (!result.canceled && result.assets[0]) {
      if (!user) {
        Alert.alert('Not signed in', 'Please login again.');
        return;
      }

      const asset = result.assets[0];
      const response = await fetch(asset.uri);
      const blob = await response.blob();
      const storageRef = ref(storage, `verifications/${user.uid}/${type}`);
      await uploadBytes(storageRef, blob);
      const url = await getDownloadURL(storageRef);

      if (type === 'id') {
        setIdUpload(url);
      } else {
        setEmploymentUpload(url);
      }
    }
  };

  const submitVerification = async () => {
    if (!user) {
      Alert.alert('Not signed in', 'Please login again.');
      return;
    }

    if (!idUpload || !employmentUpload) {
      Alert.alert('Uploads required', 'Submit both government ID and employment proof.');
      return;
    }

    try {
      await updateDoc(doc(firestore, 'crewProfiles', user.uid), {
        'verification.idVerified': true,
        'verification.employmentVerified': true,
        'verification.verificationStatus': 'pending',
        'verification.updatedAt': serverTimestamp(),
        'verification.idDocumentUrl': idUpload,
        'verification.employmentDocumentUrl': employmentUpload
      });
      setVerification({
        idVerified: true,
        employmentVerified: true,
        verificationStatus: 'pending',
        updatedAt: serverTimestamp() as any
      });
      Alert.alert('Submitted', 'Our security team will review your documents shortly.');
    } catch (error) {
      Alert.alert('Submission failed', 'Unable to submit verification. Try again later.');
    }
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]} contentContainerStyle={styles.content}>
      <Text style={[styles.title, { color: theme.colors.text }]}>Identity verification</Text>
      <Text style={{ color: theme.colors.muted }}>
        CrewStay is exclusive to active airline crew. Upload your government ID and airline employment proof. Documents are stored securely in Firebase Storage.
      </Text>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Step 1 — Government ID</Text>
        <Button title={idUpload ? 'ID uploaded' : 'Upload ID photo'} onPress={() => pickImage('id')} />
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Step 2 — Employment proof</Text>
        <Button
          title={employmentUpload ? 'Employment proof uploaded' : 'Upload badge or email letter'}
          onPress={() => pickImage('employment')}
        />
      </View>

      <Button title="Submit for review" onPress={submitVerification} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 16 },
  title: { fontSize: 24, fontWeight: '700', marginBottom: 12 },
  section: { marginTop: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '600', marginBottom: 8 }
});
