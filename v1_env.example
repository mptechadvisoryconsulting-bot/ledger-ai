import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const founderEmail = process.env.FOUNDER_EMAIL ?? 'mp.techadvisory.consulting@gmail.com';
const founderPassword = process.env.FOUNDER_PASSWORD ?? 'set-this-locally-only';

async function main() {
  const passwordHash = await bcrypt.hash(founderPassword, 12);

  const founderWorkspace = await prisma.business.upsert({
    where: { slug: 'ledger-ai-founder' },
    update: {
      name: 'Ledger AI',
      legalName: 'Ledger AI',
      platformPlan: 'FREE'
    },
    create: {
      name: 'Ledger AI',
      slug: 'ledger-ai-founder',
      legalName: 'Ledger AI',
      invoicePrefix: 'INV',
      defaultPaymentTerms: 14,
      platformPlan: 'FREE',
      users: {
        create: {
          email: founderEmail,
          name: 'Ledger AI Founder',
          role: 'OWNER',
          passwordHash,
          emailVerifiedAt: new Date()
        }
      },
      categories: {
        create: [
          { name: 'AI Services', description: 'AI setup, invoice automation, and workflow services' },
          { name: 'Subscriptions', description: 'Monthly and annual recurring Ledger AI plans' },
          { name: 'Support', description: 'Implementation, training, migration, and billing support' },
          { name: 'Fees', description: 'Deposits, setup fees, late fees, and other invoice charges' }
        ]
      },
      customers: {
        create: [
          {
            displayName: 'Ledger AI Sample Client',
            companyName: 'Ledger AI Sample Client',
            email: 'billing@sample-client.example',
            autopayEnabled: true
          },
          {
            displayName: 'Northstar Advisory',
            companyName: 'Northstar Advisory',
            email: 'ap@northstar-advisory.example',
            autopayEnabled: true
          }
        ]
      }
    },
    include: { users: true, categories: true, customers: true }
  });

  await prisma.user.upsert({
    where: {
      businessId_email: {
        businessId: founderWorkspace.id,
        email: founderEmail
      }
    },
    update: {
      passwordHash,
      role: 'OWNER',
      emailVerifiedAt: new Date()
    },
    create: {
      businessId: founderWorkspace.id,
      email: founderEmail,
      name: 'Ledger AI Founder',
      role: 'OWNER',
      passwordHash,
      emailVerifiedAt: new Date()
    }
  });

  const aiServices = founderWorkspace.categories.find((category) => category.name === 'AI Services');
  const subscriptions = founderWorkspace.categories.find((category) => category.name === 'Subscriptions');
  const support = founderWorkspace.categories.find((category) => category.name === 'Support');

  if (aiServices) {
    await prisma.product.upsert({
      where: { businessId_sku: { businessId: founderWorkspace.id, sku: 'LEDGER-AI-SETUP' } },
      update: {},
      create: {
        businessId: founderWorkspace.id,
        categoryId: aiServices.id,
        sku: 'LEDGER-AI-SETUP',
        name: 'AI invoice automation setup',
        description: 'One-time setup for Ledger AI invoice automation and customer payment workflows.',
        priceCents: 29900,
        taxable: false,
        active: true
      }
    });
  }

  if (subscriptions) {
    await prisma.product.upsert({
      where: { businessId_sku: { businessId: founderWorkspace.id, sku: 'LEDGER-AI-MONTHLY' } },
      update: {},
      create: {
        businessId: founderWorkspace.id,
        categoryId: subscriptions.id,
        sku: 'LEDGER-AI-MONTHLY',
        name: 'Ledger AI monthly billing plan',
        description: 'Recurring monthly invoicing, payment links, customer portal, and billing automation.',
        priceCents: 9900,
        taxable: false,
        active: true
      }
    });
  }

  if (support) {
    await prisma.product.upsert({
      where: { businessId_sku: { businessId: founderWorkspace.id, sku: 'LEDGER-AI-SUPPORT' } },
      update: {},
      create: {
        businessId: founderWorkspace.id,
        categoryId: support.id,
        sku: 'LEDGER-AI-SUPPORT',
        name: 'Priority billing support',
        description: 'Implementation, training, migration, and billing operations support.',
        priceCents: 7500,
        taxable: false,
        active: true
      }
    });
  }

  await prisma.auditLog.create({
    data: {
      businessId: founderWorkspace.id,
      action: 'ledger_ai.founder_seeded',
      entityType: 'workspace',
      entityId: founderWorkspace.id,
      metadata: {
        source: 'prisma/seed.ts',
        accountType: 'founder',
        platformPlan: 'FREE'
      }
    }
  });

  console.log(`Ledger AI founder account ready: ${founderEmail}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
