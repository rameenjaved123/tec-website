import { test, expect } from '@playwright/test';

test.describe('Complaint Page (/complaint)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/complaint');
  });

  test('CO-01: PageHero banner visible', async ({ page }) => {
    await expect(page.locator('.ph-banner')).toBeVisible();
  });

  test('CO-02: "How to complain?" heading visible', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /how to complain/i })).toBeVisible();
  });

  test('CO-03: Complaints email address present', async ({ page }) => {
    await expect(page.getByText('complaints@trenteducation.co.uk').first()).toBeVisible();
  });

  test('CO-04: Online complaint form link present', async ({ page }) => {
    const formLink = page.getByRole('link', { name: /complaint form/i });
    await expect(formLink).toBeVisible();
    await expect(formLink).toHaveAttribute('target', '_blank');
  });

  test('CO-05: Three process cards visible', async ({ page }) => {
    await expect(page.getByText('Acknowledgement')).toBeVisible();
    await expect(page.getByText('Investigation')).toBeVisible();
    await expect(page.getByText('Resolution')).toBeVisible();
  });

  test('CO-06: Timeline — 3 working days mentioned', async ({ page }) => {
    await expect(page.getByText(/3 working days/).first()).toBeVisible();
  });

  test('CO-07: Timeline — 10 working days mentioned', async ({ page }) => {
    await expect(page.getByText(/10 working days/).first()).toBeVisible();
  });

  test('CO-08: Complaints Policy PDF link present', async ({ page }) => {
    const pdfLink = page.getByRole('link', { name: /complaints.*policy/i }).first();
    await expect(pdfLink).toBeVisible();
    const href = await pdfLink.getAttribute('href');
    expect(href).toContain('.pdf');
  });

  test('CO-09: "Contact Us" button links to /contact', async ({ page }) => {
    const contactBtn = page.getByRole('link', { name: /contact us/i });
    await expect(contactBtn).toBeVisible();
    await expect(contactBtn).toHaveAttribute('href', '/contact');
  });

  test('CO-10: Submit Complaint button present', async ({ page }) => {
    await expect(page.getByRole('link', { name: /submit a complaint/i })).toBeVisible();
  });
});
