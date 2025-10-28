import fs from 'fs';

describe('Firestore security rules', () => {
  const rules = fs.readFileSync('firestore.rules', 'utf8');

  it('requires verification for stays writes', () => {
    expect(rules).toContain('allow create, update, delete: if isVerifiedUser()');
  });

  it('restricts bookings to verified users', () => {
    expect(rules).toContain("match /bookings/{bookingId}");
    expect(rules).toContain('allow create: if isVerifiedUser()');
  });
});
