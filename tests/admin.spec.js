import { test, expect } from '@playwright/test';

const PASSWORD = 'tec-admin-2024';

test.describe('Admin Page (/admin)', () => {
  test('ADM-01: Login screen shown at /admin', async ({ page }) => {
    await page.goto('/admin');
    await expect(page.locator('.adm-login-wrap')).toBeVisible();
  });

  test('ADM-02: No navbar on admin page', async ({ page }) => {
    await page.goto('/admin');
    await expect(page.locator('.navbar')).not.toBeVisible();
  });

  test('ADM-03: No footer on admin page', async ({ page }) => {
    await page.goto('/admin');
    await expect(page.locator('footer, .footer')).not.toBeVisible();
  });

  test('ADM-04: Wrong password shows error', async ({ page }) => {
    await page.goto('/admin');
    await page.locator('input[type="password"]').fill('wrongpassword');
    await page.locator('.adm-login-btn').click();
    await expect(page.locator('.adm-login-error')).toBeVisible();
  });

  test('ADM-05: Login form has password field', async ({ page }) => {
    await page.goto('/admin');
    await expect(page.locator('input[type="password"]')).toBeVisible();
    await expect(page.locator('.adm-login-btn')).toBeVisible();
  });

  test('ADM-06: Correct password logs in and shows sidebar', async ({ page }) => {
    await page.goto('/admin');
    await page.locator('input[type="password"]').fill(PASSWORD);
    await page.locator('.adm-login-btn').click();
    await expect(page.locator('.adm-sidebar')).toBeVisible({ timeout: 10000 });
  });

  test('ADM-07: Admin scroll — main content has overflow-y auto', async ({ page }) => {
    await page.goto('/admin');
    await page.locator('input[type="password"]').fill(PASSWORD);
    await page.locator('.adm-login-btn').click();
    await expect(page.locator('.adm-sidebar')).toBeVisible({ timeout: 10000 });
    const overflow = await page.locator('.adm-main').evaluate(el => window.getComputedStyle(el).overflowY);
    expect(overflow).toBe('auto');
  });

  test('ADM-08: Stat cards visible after login', async ({ page }) => {
    await page.goto('/admin');
    await page.locator('input[type="password"]').fill(PASSWORD);
    await page.locator('.adm-login-btn').click();
    await expect(page.locator('.adm-stats')).toBeVisible({ timeout: 10000 });
  });

  test('ADM-09: Logout button visible after login', async ({ page }) => {
    await page.goto('/admin');
    await page.locator('input[type="password"]').fill(PASSWORD);
    await page.locator('.adm-login-btn').click();
    await expect(page.locator('.adm-logout')).toBeVisible({ timeout: 10000 });
  });
});
