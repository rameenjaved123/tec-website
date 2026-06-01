import { test, expect } from '@playwright/test';

test.describe('Contact Page (/contact)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/contact');
  });

  test('CT-01: PageHero banner visible', async ({ page }) => {
    await expect(page.locator('.ph-banner')).toBeVisible();
  });

  test('CT-02: Phone number visible', async ({ page }) => {
    await expect(page.getByText(/1157950171/).first()).toBeVisible();
  });

  test('CT-03: Email address visible', async ({ page }) => {
    await expect(page.getByText('info@trenteducation.co.uk').first()).toBeVisible();
  });

  test('CT-04: All 5 study centres listed', async ({ page }) => {
    await expect(page.getByText(/Nottingham.*Head Office/i)).toBeVisible();
    await expect(page.getByText('Nottingham Study Centre 1')).toBeVisible();
    await expect(page.getByText('Nottingham Study Centre 2')).toBeVisible();
    await expect(page.getByText('Leicester Study Centre')).toBeVisible();
    await expect(page.getByText('Birmingham Study Centre')).toBeVisible();
  });

  test('CT-05: 4 social media links in follow us section', async ({ page }) => {
    const socialLinks = page.locator('a[href*="facebook.com"], a[href*="linkedin.com"], a[href*="youtube.com"], a[href*="instagram.com"]');
    const count = await socialLinks.count();
    expect(count).toBeGreaterThanOrEqual(4);
  });

  test('CT-06: Opening hours visible', async ({ page }) => {
    await expect(page.getByText(/Monday/i).first()).toBeVisible();
    await expect(page.getByText(/9:00/i).first()).toBeVisible();
  });

  test('CT-07: Social links open in new tab', async ({ page }) => {
    const fbLink = page.locator('a[href*="facebook.com"]').first();
    await expect(fbLink).toHaveAttribute('target', '_blank');
  });
});
