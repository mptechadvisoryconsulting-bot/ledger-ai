import { db } from './db';
import type { Invoice as LegacyInvoice, Product as LegacyProduct, ProductCategory, RecurringBillingSchedule } from '@/types/invoice';

export async function getInvoiceById(invoiceId: string) {
  return db.invoice.findUnique({
    where: { id: invoiceId },
    include: {
      customer: true,
      lineItems: true,
      business: true
    }
  });
}

export async function getInvoiceByBusinessAndNumber(businessId: string, invoiceNumber: string) {
  return db.invoice.findUnique({
    where: {
      businessId_invoiceNumber: {
        businessId,
        invoiceNumber
      }
    },
    include: {
      customer: true,
      lineItems: true,
      business: true
    }
  });
}

export function toLegacyInvoice(
  invoice: Awaited<ReturnType<typeof getInvoiceById>> extends infer T ? NonNullable<T> : never
): LegacyInvoice {
  return {
    id: invoice.id,
    number: invoice.invoiceNumber,
    customerName: invoice.customer.displayName,
    customerEmail: invoice.customer.email ?? '',
    customerState: invoice.customer.state ?? undefined,
    dueDate: invoice.dueDate.toISOString().slice(0, 10),
    status: mapInvoiceStatus(invoice.status),
    paidAt: invoice.paidAt?.toISOString().slice(0, 10),
    memo: invoice.notes ?? undefined,
    items: invoice.lineItems.map((item) => ({
      id: item.id,
      productId: item.productId ?? undefined,
      name: item.description,
      quantity: Number(item.quantity),
      unitAmount: item.unitPriceCents
    }))
  };
}

function mapInvoiceStatus(status: string): LegacyInvoice['status'] {
  switch (status) {
    case 'PAID':
      return 'paid';
    case 'OVERDUE':
      return 'overdue';
    case 'PARTIALLY_PAID':
      return 'partial';
    case 'DRAFT':
      return 'draft';
    default:
      return 'sent';
  }
}

export async function listInvoicesForBusiness(businessId: string) {
  const invoices = await db.invoice.findMany({
    where: { businessId },
    include: { customer: true, lineItems: true },
    orderBy: { createdAt: 'desc' }
  });

  return invoices.map((invoice) =>
    toLegacyInvoice({
      ...invoice,
      business: undefined as never
    } as Awaited<ReturnType<typeof getInvoiceById>> extends infer T ? NonNullable<T> : never)
  );
}

export async function listDashboardMetrics(businessId: string) {
  const [paid, outstanding, invoiceCount] = await Promise.all([
    db.invoice.aggregate({
      where: { businessId, status: 'PAID' },
      _sum: { amountPaidCents: true }
    }),
    db.invoice.aggregate({
      where: { businessId, status: { in: ['SENT', 'VIEWED', 'PARTIALLY_PAID', 'OVERDUE', 'DRAFT'] } },
      _sum: { totalCents: true }
    }),
    db.invoice.count({ where: { businessId, status: 'PAID' } })
  ]);

  const topProducts = await db.product.findMany({
    where: { businessId, active: true },
    include: {
      category: true,
      lineItems: true
    },
    orderBy: { createdAt: 'desc' },
    take: 8
  });

  const mappedProducts: LegacyProduct[] = topProducts.map((product) => {
    const unitsSold = product.lineItems.reduce((sum, lineItem) => sum + Number(lineItem.quantity), 0);
    const revenue = product.lineItems.reduce((sum, lineItem) => sum + lineItem.totalCents, 0);

    return {
      id: product.id,
      sku: product.sku ?? '',
      name: product.name,
      categoryId: product.categoryId ?? '',
      categoryName: product.category?.name ?? 'Uncategorized',
      description: product.description ?? '',
      unitPrice: product.priceCents,
      taxable: product.taxable,
      active: product.active,
      unitsSold,
      revenue
    };
  });

  return {
    totalRevenue: paid._sum.amountPaidCents ?? 0,
    outstandingRevenue: outstanding._sum.totalCents ?? 0,
    paidInvoices: invoiceCount,
    topProducts: mappedProducts.sort((a, b) => b.unitsSold - a.unitsSold).slice(0, 4),
    productRevenue: mappedProducts.reduce((sum, product) => sum + product.revenue, 0)
  };
}

export async function listProductsForBusiness(businessId: string) {
  const [categories, products] = await Promise.all([
    db.productCategory.findMany({
      where: { businessId },
      orderBy: { name: 'asc' }
    }),
    db.product.findMany({
      where: { businessId },
      include: { category: true, lineItems: true },
      orderBy: { name: 'asc' }
    })
  ]);

  const mappedCategories: ProductCategory[] = categories.map((category) => ({
    id: category.id,
    name: category.name,
    description: category.description ?? ''
  }));

  const mappedProducts: LegacyProduct[] = products.map((product) => {
    const unitsSold = product.lineItems.reduce((sum, lineItem) => sum + Number(lineItem.quantity), 0);
    const revenue = product.lineItems.reduce((sum, lineItem) => sum + lineItem.totalCents, 0);

    return {
      id: product.id,
      sku: product.sku ?? '',
      name: product.name,
      categoryId: product.categoryId ?? '',
      categoryName: product.category?.name ?? 'Uncategorized',
      description: product.description ?? '',
      unitPrice: product.priceCents,
      taxable: product.taxable,
      active: product.active,
      unitsSold,
      revenue
    };
  });

  return { categories: mappedCategories, products: mappedProducts };
}

export async function listSubscriptionsForBusiness(businessId: string) {
  const subscriptions = await db.subscription.findMany({
    where: { businessId },
    include: { customer: true, items: true },
    orderBy: { nextBillingDate: 'asc' }
  });

  const mapped: RecurringBillingSchedule[] = subscriptions.map((subscription) => ({
    id: subscription.id,
    customerId: subscription.customerId,
    customerName: subscription.customer.displayName,
    productName: subscription.name,
    amount: subscription.amountCents,
    interval: mapInterval(subscription.interval),
    nextInvoiceDate: subscription.nextBillingDate.toISOString().slice(0, 10),
    autopayEnabled: subscription.autopayEnabled,
    paymentMethod: 'card',
    status: subscription.status === 'ACTIVE' ? 'active' : subscription.status === 'PAUSED' ? 'paused' : 'cancelled'
  }));

  return mapped;
}

function mapInterval(interval: string): RecurringBillingSchedule['interval'] {
  switch (interval) {
    case 'week':
      return 'weekly';
    case 'quarter':
      return 'quarterly';
    case 'year':
      return 'yearly';
    default:
      return 'monthly';
  }
}
