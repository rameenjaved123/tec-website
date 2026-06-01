import { test, expect } from '@playwright/test';

const pagesWithHero = [
  { path: '/admission',                title: /admission/i },
  { path: '/apply',                    title: /enrol|apply/i },
  { path: '/english-language-courses', title: /english/i },
  { path: '/policies-english',         title: /english/i },
  { path: '/higher-education',         title: /higher education/i },
  { path: '/athe-level-4',             title: /athe|level 4/i },
  { path: '/athe-level-5',             title: /athe|level 5/i },
  { path: '/btec-hnd',                 title: /btec|hnd/i },
  { path: '/further-education',        title: /further education/i },
  { path: '/athe-level-3',             title: /athe|level 3/i },
  { path: '/ncfe-maths-l1',            title: /ncfe|maths/i },
  { path: '/ncfe-maths-l2',            title: /ncfe|maths/i },
  { path: '/sia-door-supervisors',     title: /sia|door/i },
  { path: '/digital-skills',           title: /digital/i },
  { path: '/about',                    title: /about/i },
  { path: '/mission-values',           title: /mission/i },
  { path: '/study-centres',            title: /study centre/i },
  { path: '/student-life',             title: /student life/i },
  { path: '/strategic-plan',           title: /strategic/i },
  { path: '/carbon-reduction-plan',    title: /carbon/i },
  { path: '/approvals',                title: /approval/i },
  { path: '/awarding-organisations',   title: /awarding/i },
  { path: '/accreditations',           title: /accreditation/i },
  { path: '/approved-supplier-status', title: /approved|supplier/i },
  { path: '/memberships',              title: /membership/i },
  { path: '/careers',                  title: /career/i },
  { path: '/news-events',              title: /news|event/i },
  { path: '/complaint',                title: /complaint/i },
  { path: '/contact',                  title: /contact/i },
  { path: '/policies',                 title: /polic/i },
];

for (const { path, title } of pagesWithHero) {
  test(`PageHero visible on ${path}`, async ({ page }) => {
    await page.goto(path);
    await expect(page.locator('.ph-banner')).toBeVisible();
    const heading = page.locator('.ph-banner h1');
    await expect(heading).toBeVisible();
    await expect(heading).toHaveText(title);
  });
}
