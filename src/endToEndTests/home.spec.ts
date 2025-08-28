import { expect, test } from '@playwright/test';

test('Home page loads and navigates to tasks', async ({ page }) => {
  // Start from the homepage
  await page.goto('http://localhost:3000');

  // Check that the HeroBanner title is visible
  await expect(page.getByText('Task Management')).toBeVisible();

  // Click the "View Tasks" button
  await page.getByRole('button', { name: 'View Tasks' }).click();

  // Expect navigation to /tasks
  await expect(page).toHaveURL(/\/tasks/);
});
