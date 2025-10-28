import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../theme';

interface TagProps {
  label: string;
}

export const Tag: React.FC<TagProps> = ({ label }) => {
  const theme = useTheme();
  return (
    <View style={[styles.tag, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}> 
      <Text style={[styles.text, { color: theme.colors.text }]}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  tag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
    marginRight: 8,
    marginBottom: 8
  },
  text: {
    fontSize: 12,
    fontWeight: '600'
  }
});
