import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../navigation/AuthNavigator';
import { Input } from '../../../components/Input';
import { Button } from '../../../components/Button';
import { useTheme } from '../../../theme';
import { auth } from '../../../lib/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useAuthStore } from '../../../store/useAuthStore';

export type LoginScreenProps = NativeStackScreenProps<AuthStackParamList, 'Login'>;

export const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const theme = useTheme();
  const setUser = useAuthStore((state) => state.setUser);
  const setIsLoading = useAuthStore((state) => state.setIsLoading);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Missing credentials', 'Enter both email and password.');
      return;
    }

    try {
      setIsLoading(true);
      const result = await signInWithEmailAndPassword(auth, email.trim(), password);
      setUser(result.user);
    } catch (error) {
      Alert.alert('Login failed', 'Please check your credentials and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}> 
      <View style={styles.header}> 
        <Text style={[styles.title, { color: theme.colors.text }]}>CrewStay</Text>
        <Text style={[styles.subtitle, { color: theme.colors.muted }]}>Exclusive lodging for airline crew.</Text>
      </View>
      <View>
        <Input label="Company Email" value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" />
        <Input label="Password" value={password} onChangeText={setPassword} secureTextEntry />
        <Button title="Sign In" onPress={handleLogin} />
        <Button
          title="Need an account? Join"
          variant="outline"
          onPress={() => navigation.navigate('Signup')}
        />
      </View>
      <Text style={[styles.notice, { color: theme.colors.muted }]}>
        By continuing, you agree to our security-first community standards. Access is restricted to verified airline crew members only.
      </Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center'
  },
  header: {
    marginBottom: 32
  },
  title: {
    fontSize: 32,
    fontWeight: '800'
  },
  subtitle: {
    fontSize: 16,
    marginTop: 8
  },
  notice: {
    marginTop: 24,
    fontSize: 12,
    textAlign: 'center'
  }
});
