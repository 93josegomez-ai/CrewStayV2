import { useColorScheme } from 'react-native';

export const lightTheme = {
  colors: {
    background: '#FFFFFF',
    text: '#0B2545',
    primary: '#1E6FDB',
    secondary: '#F2A341',
    muted: '#D0D5DD',
    card: '#F7F9FC',
    border: '#E4E7EC',
    success: '#2BA84A',
    danger: '#D64545'
  }
};

export const darkTheme = {
  colors: {
    background: '#0B2545',
    text: '#F7F9FC',
    primary: '#4C8DF5',
    secondary: '#F2A341',
    muted: '#6B778C',
    card: '#13294B',
    border: '#1F2E4D',
    success: '#2BA84A',
    danger: '#F97066'
  }
};

export type Theme = typeof lightTheme;

export const useTheme = () => {
  const colorScheme = useColorScheme();
  return colorScheme === 'dark' ? darkTheme : lightTheme;
};
