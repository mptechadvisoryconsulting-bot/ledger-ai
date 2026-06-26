import { db } from './db';

export async function getNextInvoiceNumber(businessId: string) {
  return db.$transaction(async (tx) => {
    const business = await tx.business.update({
      where: { id: businessId },
      data: { nextInvoiceNumber: { increment: 1 } },
      select: { invoicePrefix: true, nextInvoiceNumber: true }
    });

    const number = business.nextInvoiceNumber - 1;
    return `${business.invoicePrefix}-${String(number).padStart(6, '0')}`;
  });
}
