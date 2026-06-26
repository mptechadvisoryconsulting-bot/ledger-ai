import type { Customer, RecurringBillingSchedule } from "@/types/invoice";

export const customers: Customer[] = [
  {
    id: "cus_1001",
    businessName: "Ledger AI Sample Client",
    contactName: "Maria Grant",
    email: "billing@sample-client.example",
    phone: "(555) 010-1020",
    billingAddress: "120 Market Street, Atlanta, GA 30303",
    defaultPaymentMethod: "bank",
    autopayEnabled: true
  },
  {
    id: "cus_1002",
    businessName: "Northstar Advisory",
    contactName: "Devon Lee",
    email: "ap@northstar-advisory.example",
    phone: "(555) 010-2020",
    billingAddress: "44 Lakeview Drive, Tampa, FL 33602",
    defaultPaymentMethod: "card",
    autopayEnabled: true
  },
  {
    id: "cus_1003",
    businessName: "Blue Oak Studio",
    contactName: "Tasha Moore",
    email: "finance@blueoak.example",
    phone: "(555) 010-3030",
    billingAddress: "901 Pine Road, Charlotte, NC 28202",
    defaultPaymentMethod: "bank",
    autopayEnabled: false
  }
];

export const recurringBillingSchedules: RecurringBillingSchedule[] = [
  {
    id: "sub_ledger_monthly",
    customerId: "cus_1002",
    customerName: "Northstar Advisory",
    productName: "Ledger AI monthly billing plan",
    amount: 9900,
    interval: "monthly",
    nextInvoiceDate: "2026-07-01",
    autopayEnabled: true,
    paymentMethod: "bank",
    status: "active"
  },
  {
    id: "sub_support",
    customerId: "cus_1001",
    customerName: "Ledger AI Sample Client",
    productName: "Priority billing support",
    amount: 14900,
    interval: "monthly",
    nextInvoiceDate: "2026-07-05",
    autopayEnabled: true,
    paymentMethod: "card",
    status: "active"
  }
];

export function getCustomer(customerId: string) {
  return customers.find((customer) => customer.id === customerId);
}
