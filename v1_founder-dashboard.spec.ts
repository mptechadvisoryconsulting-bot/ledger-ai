generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

enum PlatformPlan {
  FREE
  STARTER
  PRO
  BUSINESS
  ENTERPRISE
}

enum BusinessRole {
  OWNER
  ADMIN
  BILLING
  STAFF
  READ_ONLY
}

enum InvoiceStatus {
  DRAFT
  SENT
  VIEWED
  PARTIALLY_PAID
  PAID
  OVERDUE
  VOID
  REFUNDED
}

enum PaymentStatus {
  PENDING
  AUTHORIZED
  SUCCEEDED
  FAILED
  REFUNDED
  DISPUTED
  CANCELLED
}

enum PaymentMethodType {
  CARD
  BANK_ACCOUNT
}

enum SubscriptionStatus {
  ACTIVE
  PAUSED
  CANCELLED
  PAST_DUE
}

enum WebhookStatus {
  RECEIVED
  PROCESSED
  FAILED
  DUPLICATE
}

model Business {
  id                    String   @id @default(cuid())
  name                  String
  slug                  String   @unique
  legalName             String?
  ein                   String?
  logoUrl               String?
  addressLine1          String?
  addressLine2          String?
  city                  String?
  state                 String?
  postalCode            String?
  country               String   @default("US")
  currency              String   @default("USD")
  timezone              String   @default("America/New_York")
  defaultPaymentTerms   Int      @default(30)
  platformPlan          PlatformPlan @default(FREE)
  platformPlanStartedAt DateTime @default(now())
  invoicePrefix         String   @default("INV")
  nextInvoiceNumber     Int      @default(1)
  createdAt             DateTime @default(now())
  updatedAt             DateTime @updatedAt

  users                 User[]
  customers             Customer[]
  products              Product[]
  categories            ProductCategory[]
  invoices              Invoice[]
  payments              Payment[]
  paymentMethods        PaymentMethod[]
  subscriptions         Subscription[]
  webhookEvents         WebhookEvent[]
  auditLogs             AuditLog[]
}

model User {
  id              String       @id @default(cuid())
  businessId      String
  business        Business     @relation(fields: [businessId], references: [id], onDelete: Cascade)
  email           String
  passwordHash    String
  name            String?
  role            BusinessRole @default(STAFF)
  emailVerifiedAt DateTime?
  createdAt       DateTime     @default(now())
  updatedAt       DateTime     @updatedAt

  auditLogs       AuditLog[]

  @@unique([businessId, email])
  @@index([businessId])
}

model Customer {
  id                     String   @id @default(cuid())
  businessId             String
  business               Business @relation(fields: [businessId], references: [id], onDelete: Cascade)
  displayName            String
  companyName            String?
  email                  String?
  phone                  String?
  billingAddressLine1    String?
  billingAddressLine2    String?
  city                   String?
  state                  String?
  postalCode             String?
  country                String   @default("US")
  taxExempt              Boolean  @default(false)
  autopayEnabled         Boolean  @default(false)
  defaultPaymentMethodId String?
  notes                  String?
  createdAt              DateTime @default(now())
  updatedAt              DateTime @updatedAt

  invoices               Invoice[]
  paymentMethods         PaymentMethod[]
  subscriptions          Subscription[]

  @@index([businessId])
}

model ProductCategory {
  id          String   @id @default(cuid())
  businessId  String
  business    Business @relation(fields: [businessId], references: [id], onDelete: Cascade)
  name        String
  description String?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  products    Product[]

  @@unique([businessId, name])
}

model Product {
  id          String   @id @default(cuid())
  businessId  String
  business    Business @relation(fields: [businessId], references: [id], onDelete: Cascade)
  categoryId  String?
  category    ProductCategory? @relation(fields: [categoryId], references: [id], onDelete: SetNull)
  sku         String?
  name        String
  description String?
  unitType    String   @default("service")
  priceCents  Int
  costCents   Int?
  taxable     Boolean  @default(true)
  active      Boolean  @default(true)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  lineItems   InvoiceLineItem[]

  @@unique([businessId, sku])
  @@index([businessId])
}

model Invoice {
  id              String        @id @default(cuid())
  businessId      String
  business        Business      @relation(fields: [businessId], references: [id], onDelete: Cascade)
  customerId      String
  customer        Customer      @relation(fields: [customerId], references: [id])
  invoiceNumber   String
  status          InvoiceStatus @default(DRAFT)
  issueDate       DateTime      @default(now())
  dueDate         DateTime
  subtotalCents   Int           @default(0)
  discountCents   Int           @default(0)
  taxCents        Int           @default(0)
  feeCents        Int           @default(0)
  totalCents      Int           @default(0)
  amountPaidCents Int           @default(0)
  notes           String?
  viewedAt        DateTime?
  sentAt          DateTime?
  paidAt          DateTime?
  createdAt       DateTime      @default(now())
  updatedAt       DateTime      @updatedAt

  lineItems       InvoiceLineItem[]
  payments        Payment[]

  @@unique([businessId, invoiceNumber])
  @@index([businessId, status])
}

model InvoiceLineItem {
  id            String  @id @default(cuid())
  invoiceId     String
  invoice       Invoice @relation(fields: [invoiceId], references: [id], onDelete: Cascade)
  productId     String?
  product       Product? @relation(fields: [productId], references: [id], onDelete: SetNull)
  description   String
  quantity      Decimal @default(1)
  unitPriceCents Int
  taxable       Boolean @default(true)
  totalCents    Int
}

model PaymentMethod {
  id                  String            @id @default(cuid())
  businessId           String
  business             Business          @relation(fields: [businessId], references: [id], onDelete: Cascade)
  customerId           String
  customer             Customer          @relation(fields: [customerId], references: [id], onDelete: Cascade)
  type                 PaymentMethodType
  provider             String
  providerReferenceId  String
  displayLabel         String
  authorizedAt         DateTime?
  createdAt            DateTime          @default(now())

  payments             Payment[]

  @@index([businessId, customerId])
}

model Payment {
  id                  String        @id @default(cuid())
  businessId           String
  business             Business      @relation(fields: [businessId], references: [id], onDelete: Cascade)
  invoiceId            String?
  invoice              Invoice?      @relation(fields: [invoiceId], references: [id], onDelete: SetNull)
  paymentMethodId      String?
  paymentMethod        PaymentMethod? @relation(fields: [paymentMethodId], references: [id], onDelete: SetNull)
  provider             String
  providerPaymentId    String?
  amountCents          Int
  feeCents             Int           @default(0)
  status               PaymentStatus @default(PENDING)
  failureReason        String?
  paidAt               DateTime?
  createdAt            DateTime      @default(now())
  updatedAt            DateTime      @updatedAt

  @@index([businessId, status])
}

model Subscription {
  id                 String             @id @default(cuid())
  businessId          String
  business            Business           @relation(fields: [businessId], references: [id], onDelete: Cascade)
  customerId          String
  customer            Customer           @relation(fields: [customerId], references: [id], onDelete: Cascade)
  status              SubscriptionStatus @default(ACTIVE)
  name                String
  interval            String             @default("month")
  amountCents         Int
  nextBillingDate     DateTime
  autopayEnabled      Boolean            @default(true)
  createdAt           DateTime           @default(now())
  updatedAt           DateTime           @updatedAt

  items               SubscriptionItem[]

  @@index([businessId, status])
}

model SubscriptionItem {
  id              String       @id @default(cuid())
  subscriptionId  String
  subscription    Subscription @relation(fields: [subscriptionId], references: [id], onDelete: Cascade)
  description     String
  quantity        Decimal      @default(1)
  unitPriceCents  Int
}

model WebhookEvent {
  id                  String        @id @default(cuid())
  businessId           String?
  business             Business?     @relation(fields: [businessId], references: [id], onDelete: SetNull)
  provider             String
  providerEventId      String
  eventType            String
  status               WebhookStatus @default(RECEIVED)
  payload              Json
  error                String?
  receivedAt           DateTime      @default(now())
  processedAt          DateTime?

  @@unique([provider, providerEventId])
  @@index([businessId, status])
}

model AuditLog {
  id          String   @id @default(cuid())
  businessId  String
  business    Business @relation(fields: [businessId], references: [id], onDelete: Cascade)
  userId      String?
  user        User?    @relation(fields: [userId], references: [id], onDelete: SetNull)
  action      String
  entityType  String
  entityId    String?
  metadata    Json?
  createdAt   DateTime @default(now())

  @@index([businessId, createdAt])
}
