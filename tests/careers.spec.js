import { test, expect } from '@playwright/test';

test.describe('Careers Page (/careers)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/careers');
  });

  test('CA-01: PageHero banner visible', async ({ page }) => {
    await expect(page.locator('.ph-banner')).toBeVisible();
  });

  test('CA-02: "Current Vacancies" heading visible', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /current vacancies/i })).toBeVisible();
  });

  test('CA-03: "Previous Vacancies" heading visible', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /previous vacancies/i })).toBeVisible();
  });

  test('CA-04: Open jobs have "Now Hiring" badge', async ({ page }) => {
    await expect(page.locator('.job-badge.open').first()).toBeVisible();
    await expect(page.locator('.job-badge.open').first()).toContainText('Now Hiring');
  });

  test('CA-05: Closed jobs have "Job Closed" badge', async ({ page }) => {
    await expect(page.locator('.job-badge.closed').first()).toBeVisible();
    await expect(page.locator('.job-badge.closed').first()).toContainText('Job Closed');
  });

  test('CA-06: Open jobs have Apply Here button', async ({ page }) => {
    const applyBtn = page.locator('.job-apply').first();
    await expect(applyBtn).toBeVisible();
    await expect(applyBtn).toContainText('Apply Here');
  });

  test('CA-07: Equal opportunities text present', async ({ page }) => {
    await expect(page.getByText(/equal opportunities/i)).toBeVisible();
  });
});
