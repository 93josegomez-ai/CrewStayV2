import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../theme';

interface AvatarProps {
  uri?: string | null;
  initials: string;
  size?: number;
}

export const Avatar: React.FC<AvatarProps> = ({ uri, initials, size = 48 }) => {
  const theme = useTheme();
  return uri ? (
    <Image source={{ uri }} style={{ width: size, height: size, borderRadius: size / 2 }} />
  ) : (
    <View
      style={[
        styles.fallback,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: theme.colors.primary
        }
      ]}
    >
      <Text style={[styles.initials, { color: '#fff', fontSize: size / 2 }]}>{initials}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  fallback: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  initials: {
    fontWeight: '700'
  }
});
