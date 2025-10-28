import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { BookingScreen } from '../src/app/screens/booking/BookingScreen';
import { useAuthStore } from '../src/store/useAuthStore';

jest.mock('../src/theme', () => ({
  useTheme: () => ({
    colors: {
      background: '#fff',
      text: '#111',
      muted: '#666',
      success: '#0f0',
      danger: '#f00'
    }
  })
}));

describe('BookingScreen restrictions', () => {
  beforeEach(() => {
    useAuthStore.getState().reset();
  });

  it('shows verification lock for unverified users', () => {
    const route = { params: { stayId: 'stay1' } } as any;
    render(<BookingScreen route={route} navigation={undefined as any} />);

    expect(screen.getByText(/verification required before booking/i)).toBeTruthy();
    expect(screen.getByText(/Payments unavailable/i)).toBeTruthy();
  });

  it('allows verified users to submit request (but payment disabled)', () => {
    useAuthStore.setState({
      verification: {
        idVerified: true,
        employmentVerified: true,
        verificationStatus: 'approved',
        updatedAt: new Date().toISOString()
      }
    });
    const route = { params: { stayId: 'stay1' } } as any;
    render(<BookingScreen route={route} navigation={undefined as any} />);

    expect(screen.getByText(/Submit booking request/i)).toBeTruthy();
    expect(screen.getByText(/Payments unavailable/i)).toBeTruthy();
  });
});
