import { describe, test, expect } from 'vitest';
import { render } from '../../test-setup';
import { Products } from '.';
import { configure, takeSnapshot } from '@chromatic-com/vitest';

configure({ title: 'Pages/Products' });

describe('Products', () => {
  test('renders the products page title', async () => {
    const screen = await render(<Products />);
    await expect.element(screen.getByText('Products')).toBeVisible();
    await takeSnapshot('Products - title');
  });

  test('renders all products by default', async () => {
    const screen = await render(<Products />);
    await expect.element(screen.getByText('Widget Pro')).toBeVisible();
    await expect.element(screen.getByText('Cloud License')).toBeVisible();
    await expect.element(screen.getByText('Legacy Adapter')).toBeVisible();
    await expect.element(screen.getByText('Support Plan', { exact: true })).toBeVisible();
    await takeSnapshot('Products - all products');
  });

  test('renders product descriptions', async () => {
    const screen = await render(<Products />);
    await expect
      .element(screen.getByText('High-performance widget for enterprise use.'))
      .toBeVisible();
    await takeSnapshot('Products - descriptions');
  });

  test('renders the category filter select', async () => {
    const screen = await render(<Products />);
    await expect
      .element(screen.getByText('Filter by category:'))
      .toBeVisible();
    await takeSnapshot('Products - filter bar');
  });

  test('renders product status pills', async () => {
    const screen = await render(<Products />);
    await expect.element(screen.getByText('In Stock')).toBeVisible();
    await expect.element(screen.getByText('Low Stock')).toBeVisible();
    await takeSnapshot('Products - status pills');
  });

  test('renders the footer', async () => {
    const screen = await render(<Products />);
    await expect
      .element(screen.getByText('© 2025 Preact App. All rights reserved.'))
      .toBeVisible();
    await takeSnapshot('Products - footer');
  });
});
