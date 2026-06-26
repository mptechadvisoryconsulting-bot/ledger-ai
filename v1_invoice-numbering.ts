import { z } from 'zod';

export const customerCreateSchema = z.object({
  displayName: z.string().min(1),
  companyName: z.string().optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  billingAddressLine1: z.string().optional(),
  billingAddressLine2: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  postalCode: z.string().optional(),
  taxExempt: z.boolean().default(false),
  autopayEnabled: z.boolean().default(false)
});

export const productCreateSchema = z.object({
  categoryId: z.string().optional(),
  sku: z.string().optional(),
  name: z.string().min(1),
  description: z.string().optional(),
  unitType: z.string().default('service'),
  priceCents: z.number().int().nonnegative(),
  costCents: z.number().int().nonnegative().optional(),
  taxable: z.boolean().default(true),
  active: z.boolean().default(true)
});

export const invoiceCreateSchema = z.object({
  customerId: z.string().min(1),
  dueDate: z.string().datetime(),
  notes: z.string().optional(),
  lineItems: z.array(z.object({
    productId: z.string().optional(),
    description: z.string().min(1),
    quantity: z.number().positive(),
    unitPriceCents: z.number().int().nonnegative(),
    taxable: z.boolean().default(true)
  })).min(1)
});

export const subscriptionCreateSchema = z.object({
  customerId: z.string().min(1),
  name: z.string().min(1),
  interval: z.enum(['week', 'month', 'quarter', 'year']).default('month'),
  amountCents: z.number().int().positive(),
  nextBillingDate: z.string().datetime(),
  autopayEnabled: z.boolean().default(true)
});
