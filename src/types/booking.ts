import { Timestamp, FirestoreDataConverter } from 'firebase/firestore';

export type BookingStatus = 'pending' | 'confirmed' | 'cancelled' | 'declined' | 'awaiting-verification';

export interface Booking {
  id: string;
  stayId: string;
  guestId: string;
  hostId: string;
  checkIn: Timestamp;
  checkOut: Timestamp;
  totalPrice: number;
  currency: 'USD' | 'EUR' | 'GBP' | 'CAD';
  status: BookingStatus;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  verificationRequired: boolean;
}

export const bookingConverter: FirestoreDataConverter<Booking> = {
  toFirestore: (booking) => booking,
  fromFirestore: (snapshot) => snapshot.data() as Booking
};
