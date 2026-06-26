import type { Product, ProductCategory } from "@/types/invoice";

export const categories: ProductCategory[] = [
  { id: "cat_services", name: "AI Services", description: "AI setup, invoice automation, and workflow services." },
  { id: "cat_subscriptions", name: "Subscriptions", description: "Recurring monthly and annual Ledger AI plans." },
  { id: "cat_support", name: "Support", description: "Implementation, training, migration, and billing support." },
  { id: "cat_fees", name: "Fees", description: "Deposits, late fees, setup fees, and other billing charges." }
];

export const products: Product[] = [
  {
    id: "prod_ai_invoice",
    sku: "LEDGER-AI-SETUP",
    name: "AI invoice automation setup",
    categoryId: "cat_services",
    categoryName: "AI Services",
    description: "One-time setup for Ledger AI invoice automation and customer payment workflows.",
    unitPrice: 29900,
    taxable: false,
    active: true,
    unitsSold: 42,
    revenue: 1255800
  },
  {
    id: "prod_monthly",
    sku: "LEDGER-AI-MONTHLY",
    name: "Ledger AI monthly billing plan",
    categoryId: "cat_subscriptions",
    categoryName: "Subscriptions",
    description: "Recurring monthly invoicing, payment links, customer portal, and billing automation.",
    unitPrice: 9900,
    taxable: false,
    active: true,
    unitsSold: 31,
    revenue: 306900
  },
  {
    id: "prod_support",
    sku: "LEDGER-AI-SUPPORT",
    name: "Priority billing support",
    categoryId: "cat_support",
    categoryName: "Support",
    description: "Implementation, training, migration, and billing operations support.",
    unitPrice: 7500,
    taxable: false,
    active: true,
    unitsSold: 58,
    revenue: 435000
  },
  {
    id: "prod_deposit",
    sku: "LEDGER-AI-DEPOSIT",
    name: "Invoice migration deposit",
    categoryId: "cat_fees",
    categoryName: "Fees",
    description: "Deposit collected before invoice migration, onboarding, or configuration work begins.",
    unitPrice: 25000,
    taxable: false,
    active: true,
    unitsSold: 12,
    revenue: 300000
  }
];

export function topMovingProducts(limit = 5) {
  return [...products].sort((a, b) => b.unitsSold - a.unitsSold).slice(0, limit);
}

export function productRevenueTotal() {
  return products.reduce((sum, product) => sum + product.revenue, 0);
}
