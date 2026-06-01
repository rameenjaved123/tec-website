import { test, expect } from '@playwright/test';

test.describe('Footer', () => {
  test('F-01: Footer visible on all main pages', async ({ page }) => {
    for (const path of ['/', '/about', '/contact', '/careers', '/policies']) {
      await page.goto(path);
      await expect(page.locator('footer, .footer, [class*="footer"]').first()).toBeVisible();
    }
  });

  test('F-02: Footer not shown on /admin', async ({ page }) => {
    await page.goto('/admin');
    await expect(page.locator('footer, .footer')).not.toBeVisible();
  });

  test('F-03: Social media links in footer', async ({ page }) => {
    await page.goto('/');
    const footer = page.locator('footer, .footer, [class*="footer"]').first();
    const socialLinks = footer.locator('a[href*="facebook"], a[href*="linkedin"], a[href*="youtube"], a[href*="instagram"]');
    await expect(socialLinks).toHaveCount(4);
  });

  test('F-04: Footer contains TEC contact info', async ({ page }) => {
    await page.goto('/');
    const footer = page.locator('footer, .footer, [class*="footer"]').first();
    await expect(footer.getByText(/trenteducation/i).first()).toBeVisible();
  });
});
