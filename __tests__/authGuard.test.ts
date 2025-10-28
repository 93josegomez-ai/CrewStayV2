import { act } from '@testing-library/react-native';
import { useIsVerified, useAuthStore } from '../src/store/useAuthStore';

describe('useIsVerified', () => {
  afterEach(() => {
    useAuthStore.getState().reset();
  });

  it('returns false when verification is pending', () => {
    act(() => {
      useAuthStore.setState({
        verification: {
          idVerified: true,
          employmentVerified: true,
          verificationStatus: 'pending',
          updatedAt: {} as any
        }
      });
    });

    expect(useIsVerified()).toBe(false);
  });

  it('returns true when verification approved', () => {
    act(() => {
      useAuthStore.setState({
        verification: {
          idVerified: true,
          employmentVerified: true,
          verificationStatus: 'approved',
          updatedAt: {} as any
        }
      });
    });

    expect(useIsVerified()).toBe(true);
  });
});
