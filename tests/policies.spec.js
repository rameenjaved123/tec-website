import { test, expect } from '@playwright/test';

test.describe('Policies Page (/policies)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/policies');
  });

  test('PO-01: PageHero banner visible', async ({ page }) => {
    await expect(page.locator('.ph-banner')).toBeVisible();
  });

  test('PO-02: At least 20 policies listed', async ({ page }) => {
    const policyItems = page.locator('.policy-item');
    const count = await policyItems.count();
    expect(count).toBeGreaterThanOrEqual(20);
  });

  test('PO-03: All "View PDF" links present', async ({ page }) => {
    const pdfLinks = page.getByRole('link', { name: /view pdf/i });
    const count = await pdfLinks.count();
    expect(count).toBeGreaterThanOrEqual(20);
  });

  test('PO-04: PDF links open in new tab', async ({ page }) => {
    const firstPdf = page.getByRole('link', { name: /view pdf/i }).first();
    await expect(firstPdf).toHaveAttribute('target', '_blank');
    const href = await firstPdf.getAttribute('href');
    expect(href).toContain('.pdf');
  });

  test('PO-05: Key policies present', async ({ page }) => {
    await expect(page.getByText(/Admissions Policy/i).first()).toBeVisible();
    await expect(page.getByText(/Complaints and Appeals Policy/i).first()).toBeVisible();
    await expect(page.getByText(/Academic Misconduct/i).first()).toBeVisible();
    await expect(page.getByText(/Terms and Conditions/i).first()).toBeVisible();
  });
});
