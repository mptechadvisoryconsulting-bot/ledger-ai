import Stripe from 'stripe';
import { requireStripeSecretKey } from './env';

let stripeClient: Stripe | null = null;

export function getStripe() {
  if (stripeClient) {
    return stripeClient;
  }

  stripeClient = new Stripe(requireStripeSecretKey(), {
    apiVersion: '2025-06-30.basil'
  });

  return stripeClient;
}
