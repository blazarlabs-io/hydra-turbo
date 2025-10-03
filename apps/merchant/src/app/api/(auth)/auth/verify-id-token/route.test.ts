import { describe, test, expect, vi } from 'vitest';
import { NextRequest } from 'next/server';

// Mock Firebase Admin with simple implementation
vi.mock('@/lib/firebase/admin', () => ({
  initAdmin: vi.fn().mockResolvedValue({}),
  getAdminAuth: vi.fn().mockReturnValue({
    verifyIdToken: vi.fn().mockImplementation((token) => {
      // Simple mock that rejects invalid tokens and accepts valid ones
      if (token.includes('invalid-signature')) {
        throw new Error('Invalid token');
      }
      return Promise.resolve({ uid: 'user123', email: 'test@example.com' });
    }),
  }),
}));

// Import after mocking
import { POST } from './route';

describe('POST /api/auth/verify-id-token', () => {

  test('returns 400 for missing Authorization header', async () => {
    const request = new NextRequest('http://localhost/api/auth/verify-id-token', {
      method: 'POST',
      headers: {},
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data).toEqual({
      error: 'Missing Authorization header'
    });
  });

  test('returns 400 for non-Bearer authorization', async () => {
    const request = new NextRequest('http://localhost/api/auth/verify-id-token', {
      method: 'POST',
      headers: {
        'Authorization': 'Basic token123'
      },
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data).toEqual({
      error: 'Authorization must use Bearer scheme'
    });
  });

  test('returns 400 for empty token', async () => {
    const request = new NextRequest('http://localhost/api/auth/verify-id-token', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer '
      },
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data).toEqual({
      error: 'Authorization must use Bearer scheme'
    });
  });

  test('returns 400 for invalid token format', async () => {
    const request = new NextRequest('http://localhost/api/auth/verify-id-token', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer invalid-token'
      },
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data).toEqual({
      error: 'Invalid token format'
    });
  });

  test('returns 401 for invalid token verification', async () => {
    // Use a JWT format that passes validation but will fail Firebase verification
    const invalidJwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.invalid-signature';

    const request = new NextRequest('http://localhost/api/auth/verify-id-token', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${invalidJwt}`
      },
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(401);
    expect(data).toEqual({
      error: 'Invalid or expired token'
    });
  });

  test('returns 200 for valid token', async () => {
    const validJwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
    const mockDecodedData = {
      uid: 'user123',
      email: 'test@example.com',
    };

    const request = new NextRequest('http://localhost/api/auth/verify-id-token', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${validJwt}`
      },
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toEqual({
      token: validJwt,
      decodedData: mockDecodedData
    });
  });

  test('handles token with whitespace correctly', async () => {
    const validJwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
    const mockDecodedData = { uid: 'user123', email: 'test@example.com' };

    const request = new NextRequest('http://localhost/api/auth/verify-id-token', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer   ${validJwt}   `
      },
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.token).toBe(validJwt); // Should be trimmed
    expect(data.decodedData).toEqual(mockDecodedData);
  });
});
