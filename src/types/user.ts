import { Timestamp, FirestoreDataConverter } from 'firebase/firestore';

export type CrewRole = 'Captain' | 'First Officer' | 'Flight Attendant' | 'Purser' | 'Dispatcher';

export interface VerificationStatus {
  idVerified: boolean;
  employmentVerified: boolean;
  verificationStatus: 'pending' | 'approved' | 'rejected';
  rejectionReason?: string;
  updatedAt: Timestamp;
}

export interface CrewProfile {
  uid: string;
  name: string;
  airline: string;
  base: string;
  role: CrewRole;
  bio?: string;
  languages: string[];
  badges: string[];
  rating: number;
  avatarUrl?: string;
  genderPreference?: 'Any' | 'Female only' | 'Male only';
  verification: VerificationStatus;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export const crewProfileConverter: FirestoreDataConverter<CrewProfile> = {
  toFirestore: (profile) => profile,
  fromFirestore: (snapshot) => snapshot.data() as CrewProfile
};
