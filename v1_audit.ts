import { BusinessRole } from '@prisma/client';
import { requireSession, type SessionUser } from './auth';

const roleRank: Record<BusinessRole, number> = {
  OWNER: 5,
  ADMIN: 4,
  BILLING: 3,
  STAFF: 2,
  READ_ONLY: 1
};

export async function requireBusinessAccess(requiredRole: BusinessRole = 'READ_ONLY') {
  const session = await requireSession();
  assertRole(session, requiredRole);
  return session;
}

export function assertRole(session: SessionUser, requiredRole: BusinessRole) {
  if (roleRank[session.role] < roleRank[requiredRole]) {
    throw new Error('Forbidden');
  }
}

export function whereBusiness<T extends object>(session: SessionUser, where?: T) {
  return {
    ...where,
    businessId: session.businessId
  };
}
