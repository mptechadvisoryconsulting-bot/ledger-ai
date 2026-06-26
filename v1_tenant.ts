import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';
import { db } from './db';
import { env } from './env';

export type SessionUser = {
  userId: string;
  businessId: string;
  role: 'OWNER' | 'ADMIN' | 'BILLING' | 'STAFF' | 'READ_ONLY';
  email: string;
};

export const COOKIE_NAME = 'invoice_platform_session';
const COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 7;

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}

export function signSession(user: SessionUser) {
  return jwt.sign(user, env.JWT_SECRET, { expiresIn: '7d' });
}

export function getSessionFromToken(token?: string): SessionUser | null {
  if (!token) return null;

  try {
    return jwt.verify(token, env.JWT_SECRET) as SessionUser;
  } catch {
    return null;
  }
}

export async function getSession(): Promise<SessionUser | null> {
  const token = cookies().get(COOKIE_NAME)?.value;
  return getSessionFromToken(token);
}

export async function requireSession(): Promise<SessionUser> {
  const session = await getSession();
  if (!session) {
    throw new Error('Unauthorized');
  }
  return session;
}

export function getSessionCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    path: '/',
    maxAge: COOKIE_MAX_AGE_SECONDS
  };
}

export async function createSessionCookie(token: string) {
  cookies().set(COOKIE_NAME, token, getSessionCookieOptions());
}

export async function clearSessionCookie() {
  cookies().set(COOKIE_NAME, '', {
    ...getSessionCookieOptions(),
    maxAge: 0
  });
}

export async function login(email: string, password: string) {
  const normalizedEmail = email.trim().toLowerCase();
  const user = await db.user.findFirst({ where: { email: normalizedEmail } });

  if (!user || !(await verifyPassword(password, user.passwordHash))) {
    return null;
  }

  return signSession({
    userId: user.id,
    businessId: user.businessId,
    role: user.role,
    email: user.email
  });
}
