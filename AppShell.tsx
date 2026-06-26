export type Customer = {
  id: string;
  businessName: string;
  contactName: string;
  email: string;
  billingAddress: string;
  defaultPaymentMethod: "bank" | "card";
  autopayEnabled: boolean;
};

export type ProductCategory = {
  id: string;
  name: string;
  description: string;
};

export type Product = {
  id: string;
  sku: string;
  name: string;
  categoryId: string;
  categoryName: string;
  unitPrice: number;
  taxable: boolean;
  active: boolean;
  revenue: number;
};

export type Invoice = {
  id: string;
  number: string;
  customerName: string;
  dueDate: string;
  status: "draft" | "sent" | "paid" | "overdue";
  total: number;
};

export type Subscription = {
  id: string;
  customerName: string;
  productName: string;
  amount: number;
  interval: "monthly" | "quarterly" | "yearly";
  nextInvoiceDate: string;
  autopayEnabled: boolean;
  paymentMethod: "bank" | "card";
};

export const customers: Customer[] = [
  {
    id: "cust_1001",
    businessName: "Northwind Labs",
    contactName: "Avery Stone",
    email: "avery@northwindlabs.example",
    billingAddress: "201 Market Street, Austin, TX 78701",
    defaultPaymentMethod: "bank",
    autopayEnabled: true
  },
  {
    id: "cust_1002",
    businessName: "Summit Digital",
    contactName: "Jordan Lee",
    email: "jordan@summitdigital.example",
    billingAddress: "88 Congress Ave, Austin, TX 78704",
    defaultPaymentMethod: "card",
    autopayEnabled: false
  }
];

export const categories: ProductCategory[] = [
  { id: "cat_services", name: "AI Services", description: "AI setup, invoice automation, and workflow services." },
  { id: "cat_subscriptions", name: "Subscriptions", description: "Recurring monthly and annual Ledger AI plans." },
  { id: "cat_support", name: "Support", description: "Implementation, training, migration, and billing support." }
];

export const products: Product[] = [
  {
    id: "prod_1001",
    sku: "LEDGER-AI-SETUP",
    name: "AI invoice automation setup",
    categoryId: "cat_services",
    categoryName: "AI Services",
    unitPrice: 29900,
    taxable: false,
    active: true,
    revenue: 1255800
  },
  {
    id: "prod_1002",
    sku: "LEDGER-AI-MONTHLY",
    name: "Ledger AI monthly billing plan",
    categoryId: "cat_subscriptions",
    categoryName: "Subscriptions",
    unitPrice: 9900,
    taxable: false,
    active: true,
    revenue: 306900
  },
  {
    id: "prod_1003",
    sku: "LEDGER-AI-SUPPORT",
    name: "Priority billing support",
    categoryId: "cat_support",
    categoryName: "Support",
    unitPrice: 7500,
    taxable: false,
    active: true,
    revenue: 435000
  }
];

export const invoices: Invoice[] = [
  { id: "inv_1001", number: "INV-1001", customerName: "Northwind Labs", dueDate: "2026-07-02", status: "sent", total: 29900 },
  { id: "inv_1002", number: "INV-1002", customerName: "Summit Digital", dueDate: "2026-07-10", status: "draft", total: 9900 },
  { id: "inv_1003", number: "INV-1003", customerName: "Northwind Labs", dueDate: "2026-06-15", status: "paid", total: 7500 }
];

export const subscriptions: Subscription[] = [
  {
    id: "sub_1001",
    customerName: "Northwind Labs",
    productName: "Ledger AI monthly billing plan",
    amount: 9900,
    interval: "monthly",
    nextInvoiceDate: "2026-07-01",
    autopayEnabled: true,
    paymentMethod: "bank"
  },
  {
    id: "sub_1002",
    customerName: "Summit Digital",
    productName: "Priority billing support",
    amount: 7500,
    interval: "quarterly",
    nextInvoiceDate: "2026-08-01",
    autopayEnabled: false,
    paymentMethod: "card"
  }
];

export function formatMoney(cents: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  }).format(cents / 100);
}
