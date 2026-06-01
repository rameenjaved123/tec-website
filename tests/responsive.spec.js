import { test, expect } from '@playwright/test';

const viewports = [
  { name: 'mobile', width: 375, height: 812 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'desktop', width: 1440, height: 900 },
];

const pagesToTest = ['/', '/about', '/careers', '/contact', '/policies', '/complaint'];

for (const vp of viewports) {
  test.describe(`Responsive — ${vp.name} (${vp.width}px)`, () => {
    test.beforeEach(async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
    });

    for (const path of pagesToTest) {
      test(`R: No horizontal scroll on ${path} at ${vp.name}`, async ({ page }) => {
        await page.goto(path);
        await page.waitForLoadState('networkidle');
        const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
        const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
        expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 2); // 2px tolerance
      });
    }

    test(`R: Page body visible at ${vp.name}`, async ({ page }) => {
      await page.goto('/');
      await expect(page.locator('body')).toBeVisible();
    });

    if (vp.width <= 1280) {
      test(`R: Mobile hamburger visible at ${vp.width}px`, async ({ page }) => {
        await page.goto('/');
        await expect(page.locator('.mobile-toggle')).toBeVisible();
        await expect(page.locator('.navbar-desktop')).toBeHidden();
      });
    } else {
      test(`R: Desktop nav visible at ${vp.width}px`, async ({ page }) => {
        await page.goto('/');
        await expect(page.locator('.navbar-desktop')).toBeVisible();
        await expect(page.locator('.mobile-toggle')).toBeHidden();
      });
    }
  });
}
