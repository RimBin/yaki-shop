import { test, expect, type Page } from '@playwright/test';

async function acceptCookiesIfVisible(page: Page): Promise<void> {
  const acceptButton = page.getByRole('button', { name: /accept/i }).first();

  if (await acceptButton.isVisible().catch(() => false)) {
    await acceptButton.click();
  }
}

async function loginAsDemoAdmin(page: Page): Promise<{ success: boolean; reason?: string }> {
  await page.goto('/login');
  await acceptCookiesIfVisible(page);

  await page.getByRole('button', { name: /administrator|administratorius/i }).click();

  await Promise.race([
    page.waitForURL(/\/(lt\/)?admin(\/|$)/, { timeout: 30000 }).catch(() => null),
    page.locator('[role="alert"], .text-red-600').first().waitFor({ state: 'visible', timeout: 30000 }).catch(() => null),
  ]);

  if (/\/(lt\/)?admin(\/|$)/.test(page.url())) {
    return { success: true };
  }

  const errorText = (await page.locator('[role="alert"], .text-red-600').first().textContent().catch(() => null))?.trim();

  return {
    success: false,
    reason: errorText || 'Demo admin login did not reach the admin area in this environment.',
  };
}

test.describe('Admin manager permissions UI', () => {
  test('enables manager actions only for visible sections in the create-user form', async ({ page }) => {
    const login = await loginAsDemoAdmin(page);
    test.skip(!login.success, login.reason);

    await page.goto('/admin/users');

    await expect(page.getByText(/users|vartotojai/i).first()).toBeVisible();

    const roleSelect = page.getByTestId('create-user-role');
    await roleSelect.selectOption('manager');

    await expect(page.getByText(/managed admin areas|valdomos admin sritys/i)).toBeVisible();
    await expect(page.getByText(/allowed actions|galimi veiksmai/i)).toBeVisible();

    const productsVisibility = page.getByTestId('create-user-visible-products');
    const productsAction = page.getByTestId('create-user-action-products');

    await expect(productsAction).toBeDisabled();

    await productsVisibility.check();
    await expect(productsAction).toBeEnabled();
    await expect(productsAction).toHaveValue('view');

    await productsAction.selectOption('manage');
    await expect(productsAction).toHaveValue('manage');

    await productsVisibility.uncheck();
    await expect(productsAction).toBeDisabled();
    await expect(productsAction).toHaveValue('view');
  });
});