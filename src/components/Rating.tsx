import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../theme';

interface RatingProps {
  value: number;
  count?: number;
}

const MAX_STARS = 5;

export const Rating: React.FC<RatingProps> = ({ value, count }) => {
  const theme = useTheme();
  const stars = Array.from({ length: MAX_STARS }).map((_, index) => {
    const filled = index + 1 <= Math.round(value);
    return (
      <Text key={index} style={[styles.star, { color: filled ? theme.colors.secondary : theme.colors.muted }]}>
        ★
      </Text>
    );
  });

  return (
    <View style={styles.container}>
      <View style={styles.starRow}>{stars}</View>
      {count !== undefined ? (
        <Text style={[styles.count, { color: theme.colors.muted }]}>({count})</Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  starRow: {
    flexDirection: 'row'
  },
  star: {
    fontSize: 14,
    marginRight: 2
  },
  count: {
    marginLeft: 4,
    fontSize: 12
  }
});
