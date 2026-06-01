import { test, expect } from '@playwright/test';

// Every route must return a visible page — no blank screen, no 404
const allRoutes = [
  '/',
  '/admission',
  '/apply',
  '/english-language-courses',
  '/policies-english',
  '/higher-education',
  '/athe-level-4',
  '/athe-level-5',
  '/btec-hnd',
  '/further-education',
  '/athe-level-3',
  '/ncfe-maths-l1',
  '/ncfe-maths-l2',
  '/sia-door-supervisors',
  '/digital-skills',
  '/about',
  '/mission-values',
  '/study-centres',
  '/student-life',
  '/strategic-plan',
  '/carbon-reduction-plan',
  '/approvals',
  '/awarding-organisations',
  '/accreditations',
  '/approved-supplier-status',
  '/memberships',
  '/careers',
  '/news-events',
  '/complaint',
  '/contact',
  '/policies',
  '/marketing-executive',
  '/job-lecturer',
  '/job-teaching-assistant',
  '/job-student-support-officer',
  '/enquiry-form',
  '/enrolment-form',
  '/international-application',
  '/english-ielts-application',
  '/job-application',
  '/admin',
];

for (const route of allRoutes) {
  test(`Page loads without crashing: ${route}`, async ({ page }) => {
    const errors = [];
    page.on('pageerror', err => errors.push(err.message));
    await page.goto(route);
    await page.waitForLoadState('domcontentloaded');
    // Should not show blank page
    const body = await page.locator('body').innerHTML();
    expect(body.length).toBeGreaterThan(100);
    // No uncaught JS errors
    expect(errors).toHaveLength(0);
    // Should not show "Page Not Found" on valid routes
    if (route !== '/admin') {
      await expect(page.getByText('Page Not Found')).not.toBeVisible();
    }
  });
}

test('404 page shows for unknown route', async ({ page }) => {
  await page.goto('/this-does-not-exist-xyz');
  await expect(page.getByText('Page Not Found')).toBeVisible();
});
