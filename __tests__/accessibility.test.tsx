import React from 'react';
import { render } from '@testing-library/react-native';
import { Button } from '../src/components/Button';

jest.mock('../src/theme', () => ({
  useTheme: () => ({
    colors: {
      primary: '#000',
      secondary: '#fff',
      text: '#000'
    }
  })
}));

describe('Button accessibility', () => {
  it('exposes accessibility label', () => {
    const { getByA11yLabel } = render(
      <Button title="Verify Now" onPress={() => null} accessibilityLabel="Verify profile" />
    );

    expect(getByA11yLabel('Verify profile')).toBeTruthy();
  });
});
