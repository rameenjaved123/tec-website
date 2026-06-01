import { test, expect } from '@playwright/test';

test.describe('Home Page (/)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('H-01: Page loads successfully', async ({ page }) => {
    await expect(page).toHaveURL('/');
    await expect(page.locator('body')).toBeVisible();
  });

  test('H-02: Hero slider is visible', async ({ page }) => {
    const slider = page.locator('.hero-slider, [class*="slider"], [class*="hero"]').first();
    await expect(slider).toBeVisible();
  });

  test('H-03: Navbar visible on home page', async ({ page }) => {
    await expect(page.locator('.navbar')).toBeVisible();
  });

  test('H-04: Footer visible on home page', async ({ page }) => {
    await expect(page.locator('footer, .footer')).toBeVisible();
  });

  test('H-05: Access and Participation Statement ticker visible', async ({ page }) => {
    await expect(page.getByText('Access and Participation Statement')).toBeVisible();
  });

  test('H-06: Page has no console errors', async ({ page }) => {
    const errors = [];
    page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()); });
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    expect(errors.filter(e => !e.includes('favicon'))).toHaveLength(0);
  });
});
