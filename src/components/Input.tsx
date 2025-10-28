import React from 'react';
import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native';
import { useTheme } from '../theme';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
}

export const Input = React.forwardRef<TextInput, InputProps>(
  ({ label, error, style, ...props }, ref) => {
    const theme = useTheme();

    return (
      <View style={styles.container}>
        {label ? <Text style={[styles.label, { color: theme.colors.text }]}>{label}</Text> : null}
        <TextInput
          ref={ref}
          placeholderTextColor={theme.colors.muted}
          style={[
            styles.input,
            {
              borderColor: error ? theme.colors.danger : theme.colors.border,
              color: theme.colors.text
            },
            style
          ]}
          {...props}
        />
        {error ? <Text style={[styles.error, { color: theme.colors.danger }]}>{error}</Text> : null}
      </View>
    );
  }
);

Input.displayName = 'Input';

const styles = StyleSheet.create({
  container: {
    marginBottom: 16
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 6
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    fontSize: 16
  },
  error: {
    fontSize: 12,
    marginTop: 4
  }
});
