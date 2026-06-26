import { expect, test } from '@playwright/test';

const founderEmail = process.env.FOUNDER_EMAIL ?? 'mp.techadvisory.consulting@gmail.com';
const founderPassword = process.env.FOUNDER_PASSWORD ?? 'DecodeEncode2026.';

test('founder free account can sign in and navigate core dashboard areas', async ({ page }) => {
  await page.goto('/login');

  await page.getByLabel('Email').fill(founderEmail);
  await page.getByLabel('Password').fill(founderPassword);
  await page.getByRole('button', { name: /sign in/i }).click();

  await expect(page).toHaveURL(/\/$/);
  await expect(page.getByText(/Revenue|Invoices|Dashboard/i).first()).toBeVisible();

  const protectedRoutes = [
    '/customers',
    '/products',
    '/invoices',
    '/subscriptions',
    '/billing',
    '/reporting'
  ];

  for (const route of protectedRoutes) {
    await page.goto(route);
    await expect(page).not.toHaveURL(/\/login/);
  }
});
