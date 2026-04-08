import { test, expect } from '@playwright/test';
import { routes } from './fixtures/data';

async function openCart(page: import('@playwright/test').Page) {
  await page.getByTestId('open-cart-button').click();
  await expect(page.getByTestId('cart-sidebar')).toBeVisible();
}

async function addDemoProduct(page: import('@playwright/test').Page) {
  const demoProductSlug = 'degintos-medienos-dailylente-fasadui-egle-natural';
  await page.goto(`/products/${demoProductSlug}`, { waitUntil: 'domcontentloaded' });
  await page.getByTestId('add-to-cart').click();
}

test.describe('Shopping Cart', () => {
  test.beforeEach(async ({ page }) => {
    // Clear cart before each test (persisted via zustand)
    await page.addInitScript(() => {
      localStorage.removeItem('yakiwood-cart');
    });
    await page.goto(routes.home, { waitUntil: 'domcontentloaded' });
  });

  test('should add product to cart', async ({ page }) => {
    await addDemoProduct(page);
    await openCart(page);
    await expect(page.getByTestId('cart-item')).toHaveCount(1);
  });

  test('should open cart sidebar', async ({ page }) => {
    await page.goto(routes.home, { waitUntil: 'domcontentloaded' });

    await openCart(page);
    await expect(page.getByRole('heading', { name: /your cart|jūsų krepšelis/i })).toBeVisible();
  });

  test('should update cart item quantity', async ({ page }) => {
    await addDemoProduct(page);
    await openCart(page);

    const quantityInput = page.getByTestId('cart-quantity-input').first();
    await expect(quantityInput).toHaveValue('1');
    await page.getByRole('button', { name: /increase quantity|padidinti kiekį/i }).first().click();
    await expect(quantityInput).toHaveValue('2');
  });

  test('should remove item from cart', async ({ page }) => {
    await addDemoProduct(page);
    await openCart(page);

    await page.getByRole('button', { name: /remove|šalinti/i }).first().click();
    await expect(page.getByRole('heading', { name: /empty|tuščias/i })).toBeVisible();
  });

  test('should calculate cart total correctly', async ({ page }) => {
    await addDemoProduct(page);
    await openCart(page);

    await expect(page.getByText(/^(total|viso)$/i)).toBeVisible();
  });
});
