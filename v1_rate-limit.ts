import crypto from 'crypto';
import { db } from './db';
import { env } from './env';

export function verifyWebhookSignature(rawBody: string, signature: string | null) {
  if (!signature) return false;

  const expected = crypto
    .createHmac('sha256', env.PAYMENT_WEBHOOK_SECRET)
    .update(rawBody)
    .digest('hex');

  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
}

export async function recordWebhookEvent({
  provider,
  providerEventId,
  eventType,
  payload,
  businessId
}: {
  provider: string;
  providerEventId: string;
  eventType: string;
  payload: unknown;
  businessId?: string;
}) {
  try {
    return await db.webhookEvent.create({
      data: {
        provider,
        providerEventId,
        eventType,
        payload: payload as object,
        businessId
      }
    });
  } catch {
    return db.webhookEvent.findUnique({
      where: { provider_providerEventId: { provider, providerEventId } }
    });
  }
}
