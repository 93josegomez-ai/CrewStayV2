import { Timestamp, FirestoreDataConverter } from 'firebase/firestore';

export interface StayLocation {
  latitude: number;
  longitude: number;
  city: string;
  airportCode: string; // IATA
  distanceFromBaseKm?: number;
}

export interface StayAmenity {
  key: string;
  label: string;
}

export interface Stay {
  id: string;
  hostId: string;
  title: string;
  description: string;
  nightlyRate: number;
  currency: 'USD' | 'EUR' | 'GBP' | 'CAD';
  maxGuests: number;
  photos: string[];
  amenities: StayAmenity[];
  safetyFeatures: string[];
  genderPreference?: 'Any' | 'Female only' | 'Male only';
  location: StayLocation;
  rating: number;
  reviewCount: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  verifiedOnly: boolean;
}

export const stayConverter: FirestoreDataConverter<Stay> = {
  toFirestore: (stay) => stay,
  fromFirestore: (snapshot) => snapshot.data() as Stay
};
