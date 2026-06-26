import { db } from './db';
import type { SessionUser } from './auth';

export async function auditLog({
  session,
  action,
  entityType,
  entityId,
  metadata
}: {
  session: SessionUser;
  action: string;
  entityType: string;
  entityId?: string;
  metadata?: Record<string, unknown>;
}) {
  await db.auditLog.create({
    data: {
      businessId: session.businessId,
      userId: session.userId,
      action,
      entityType,
      entityId,
      metadata: metadata ?? {}
    }
  });
}
