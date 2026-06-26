import type { Invoice } from "@/types/invoice";

export const invoices: Invoice[] = [
  {
    id: "inv_1001",
    number: "INV-1001",
    customerName: "Ledger AI Sample Client",
    customerEmail: "billing@sample-client.example",
    dueDate: "2026-07-15",
    status: "sent",
    items: [
      { id: "li_1", productId: "prod_ai_invoice", name: "AI invoice automation setup", quantity: 1, unitAmount: 29900 },
      { id: "li_2", productId: "prod_support", name: "Priority billing support", quantity: 2, unitAmount: 7500 }
    ]
  },
  {
    id: "inv_1002",
    number: "INV-1002",
    customerName: "Northstar Advisory",
    customerEmail: "ap@northstar-advisory.example",
    dueDate: "2026-07-22",
    status: "paid",
    paidAt: "2026-06-28",
    items: [
      { id: "li_3", productId: "prod_monthly", name: "Ledger AI monthly billing plan", quantity: 1, unitAmount: 9900 }
    ]
  },
  {
    id: "inv_1003",
    number: "INV-1003",
    customerName: "Blue Oak Studio",
    customerEmail: "finance@blueoak.example",
    dueDate: "2026-07-30",
    status: "overdue",
    items: [
      { id: "li_4", productId: "prod_deposit", name: "Invoice migration deposit", quantity: 1, unitAmount: 25000 },
      { id: "li_5", productId: "prod_ai_invoice", name: "AI invoice automation setup", quantity: 1, unitAmount: 29900 }
    ]
  }
];

export function invoiceTotal(invoice: Invoice) {
  return invoice.items.reduce((total, item) => total + item.quantity * item.unitAmount, 0);
}

export function getInvoice(invoiceId: string) {
  return invoices.find((invoice) => invoice.id === invoiceId);
}

export function totalRevenue() {
  return invoices
    .filter((invoice) => invoice.status === "paid")
    .reduce((sum, invoice) => sum + invoiceTotal(invoice), 0);
}

export function outstandingRevenue() {
  return invoices
    .filter((invoice) => invoice.status !== "paid")
    .reduce((sum, invoice) => sum + invoiceTotal(invoice), 0);
}

export function formatMoney(cents: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(cents / 100);
}
