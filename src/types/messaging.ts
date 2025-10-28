import { Timestamp, FirestoreDataConverter } from 'firebase/firestore';

export interface Message {
  id: string;
  threadId: string;
  senderId: string;
  recipientId: string;
  content: string;
  createdAt: Timestamp;
  readAt?: Timestamp;
  flagged?: boolean;
  reportReason?: string;
}

export interface Thread {
  id: string;
  participantIds: string[];
  bookingId?: string;
  lastMessagePreview?: string;
  lastMessageAt?: Timestamp;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  blockedParticipants?: string[];
}

export const messageConverter: FirestoreDataConverter<Message> = {
  toFirestore: (message) => message,
  fromFirestore: (snapshot) => snapshot.data() as Message
};

export const threadConverter: FirestoreDataConverter<Thread> = {
  toFirestore: (thread) => thread,
  fromFirestore: (snapshot) => snapshot.data() as Thread
};
