import { test, expect } from '@playwright/test';

test.describe('Navbar — Desktop', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.setViewportSize({ width: 1440, height: 900 });
  });

  test('N-01: Navbar is visible and sticky', async ({ page }) => {
    await expect(page.locator('.navbar')).toBeVisible();
  });

  test('N-02: Desktop nav links visible, no hamburger', async ({ page }) => {
    await expect(page.locator('.navbar-desktop')).toBeVisible();
    await expect(page.locator('.mobile-toggle')).toBeHidden();
  });

  test('N-03: TEC logo visible and links to home', async ({ page }) => {
    const logo = page.locator('.navbar-logo img');
    await expect(logo).toBeVisible();
    await page.locator('.navbar-logo').click();
    await expect(page).toHaveURL('/');
  });

  test('N-04: Admission dropdown appears on hover', async ({ page }) => {
    await page.locator('.nav-item').filter({ hasText: 'Admission' }).hover();
    await expect(page.locator('.dropdown').first()).toBeVisible();
    await expect(page.locator('.dropdown-link').filter({ hasText: 'Enrolment' })).toBeVisible();
  });

  test('N-05: Higher Education dropdown appears on hover', async ({ page }) => {
    await page.locator('.nav-item').filter({ hasText: 'Higher Education Courses' }).hover();
    await expect(page.locator('.dropdown').first()).toBeVisible();
    await expect(page.locator('.dropdown-link').filter({ hasText: 'BTEC' })).toBeVisible();
  });

  test('N-06: About dropdown appears on hover', async ({ page }) => {
    await page.locator('.nav-item').filter({ hasText: 'About' }).hover();
    await expect(page.locator('.dropdown').first()).toBeVisible();
    await expect(page.locator('.dropdown-link').filter({ hasText: 'Mission' })).toBeVisible();
  });

  test('N-07: Policies nav link navigates correctly', async ({ page }) => {
    await page.locator('.nav-link').filter({ hasText: 'Policies' }).click();
    await expect(page).toHaveURL('/policies');
  });
});

test.describe('Navbar — Mobile', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.setViewportSize({ width: 375, height: 812 });
  });

  test('N-08: Hamburger visible, desktop nav hidden on mobile', async ({ page }) => {
    await expect(page.locator('.mobile-toggle')).toBeVisible();
    await expect(page.locator('.navbar-desktop')).toBeHidden();
  });

  test('N-09: Hamburger opens mobile menu', async ({ page }) => {
    await page.locator('.mobile-toggle').click();
    await expect(page.locator('.mobile-menu')).toBeVisible();
    await expect(page.locator('.mobile-link').first()).toBeVisible();
  });

  test('N-10: Mobile menu shows all 6 nav items', async ({ page }) => {
    await page.locator('.mobile-toggle').click();
    const items = page.locator('.mobile-link');
    await expect(items).toHaveCount(6);
  });

  test('N-11: Mobile menu closes on second click', async ({ page }) => {
    await page.locator('.mobile-toggle').click();
    await expect(page.locator('.mobile-menu')).toBeVisible();
    await page.locator('.mobile-toggle').click();
    await expect(page.locator('.mobile-menu')).toBeHidden();
  });

  test('N-12: Mobile sub-menu expands on click', async ({ page }) => {
    await page.locator('.mobile-toggle').click();
    await page.locator('.mobile-link').filter({ hasText: 'About' }).click();
    await expect(page.locator('.mobile-sub').first()).toBeVisible();
  });
});
