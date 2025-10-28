import React, { useMemo, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, View, Switch } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useTheme } from '../../../theme';
import { Card } from '../../../components/Card';
import { Button } from '../../../components/Button';
import { Rating } from '../../../components/Rating';
import { Tag } from '../../../components/Tag';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/RootNavigator';
import { useFiltersStore } from '../../../store/useFiltersStore';
import { EmptyState } from '../../../components/EmptyState';
import { useIsVerified } from '../../../store/useAuthStore';

const mockStays = [
  {
    id: 'stay1',
    title: 'Premium crew loft near JFK',
    nightlyRate: 120,
    currency: 'USD',
    rating: 4.9,
    reviewCount: 128,
    location: { latitude: 40.6413, longitude: -73.7781 },
    amenities: ['Wi-Fi', 'Crew lounge', 'Quiet hours'],
    safetyFeatures: ['Secure entry', 'On-site host']
  },
  {
    id: 'stay2',
    title: 'Heathrow crew haven',
    nightlyRate: 95,
    currency: 'GBP',
    rating: 4.8,
    reviewCount: 92,
    location: { latitude: 51.4706, longitude: -0.461941 },
    amenities: ['Lockers', 'Blackout shades'],
    safetyFeatures: ['CCTV', 'Female-only option']
  }
];

export const StaysScreen: React.FC = () => {
  const theme = useTheme();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [showMap, setShowMap] = useState(false);
  const filters = useFiltersStore((state) => state.filters);
  const isVerified = useIsVerified();

  const filteredStays = useMemo(() => {
    return mockStays.filter((stay) => {
      if (filters.airportCode && !stay.title.toLowerCase().includes(filters.airportCode.toLowerCase())) {
        return false;
      }
      if (filters.maxPrice && stay.nightlyRate > filters.maxPrice) {
        return false;
      }
      return true;
    });
  }, [filters]);

  const renderStay = ({ item }: { item: typeof mockStays[number] }) => (
    <Card elevated>
      <Text style={[styles.title, { color: theme.colors.text }]}>{item.title}</Text>
      <Text style={[styles.price, { color: theme.colors.text }]}>${item.nightlyRate} {item.currency}/night</Text>
      <Rating value={item.rating} count={item.reviewCount} />
      <View style={styles.tagRow}>
        {item.amenities.map((amenity) => (
          <Tag key={amenity} label={amenity} />
        ))}
      </View>
      <View style={styles.tagRow}>
        {item.safetyFeatures.map((feature) => (
          <Tag key={feature} label={feature} />
        ))}
      </View>
      <Button title="View details" onPress={() => navigation.navigate('StayDetail', { stayId: item.id })} />
      <Button
        title={isVerified ? 'Request booking' : 'Verify to book'}
        onPress={() =>
          isVerified
            ? navigation.navigate('Booking', { stayId: item.id })
            : navigation.navigate('Verification')
        }
      />
    </Card>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}> 
      <View style={styles.mapToggle}>
        <Text style={{ color: theme.colors.text }}>Map view</Text>
        <Switch value={showMap} onValueChange={setShowMap} />
      </View>
      {showMap ? (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 40.6413,
            longitude: -73.7781,
            latitudeDelta: 30,
            longitudeDelta: 30
          }}
        >
          {filteredStays.map((stay) => (
            <Marker
              key={stay.id}
              coordinate={stay.location}
              title={stay.title}
              description={`$${stay.nightlyRate} ${stay.currency}/night`}
              onCalloutPress={() => navigation.navigate('StayDetail', { stayId: stay.id })}
            />
          ))}
        </MapView>
      ) : filteredStays.length ? (
        <FlatList data={filteredStays} keyExtractor={(stay) => stay.id} renderItem={renderStay} contentContainerStyle={styles.listContent} />
      ) : (
        <EmptyState
          title="No stays match your filters"
          description="Save this search to get notified when new listings are published."
          actionLabel="Save search"
          onActionPress={() => useFiltersStore.getState().addSavedSearch(filters)}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  mapToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12
  },
  map: {
    flex: 1
  },
  listContent: {
    padding: 16
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4
  },
  price: {
    fontSize: 14,
    marginBottom: 8
  },
  tagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 4
  }
});
