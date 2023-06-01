import { expect, test } from '@playwright/test';

test('page should exist', async ({ page }) => {
	await page.goto('/');
	await expect(page).toBeTruthy()
});
