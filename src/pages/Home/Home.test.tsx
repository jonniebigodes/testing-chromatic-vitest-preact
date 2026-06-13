import { describe, test, expect } from 'vitest';
import { render } from '../../test-setup';
import { Home } from '.';
import { configure, takeSnapshot } from '@chromatic-com/vitest';

configure({ title: 'Pages/Home' });

describe('Home', () => {
  test('renders the application header', async () => {
    const screen = await render(<Home />);
    await expect.element(screen.getByText('Preact App', { exact: true })).toBeVisible();
    await takeSnapshot('Home - header');
  });

  test('renders the hero heading', async () => {
    const screen = await render(<Home />);
    await expect
      .element(screen.getByText('Build better apps, faster'))
      .toBeVisible();
    await takeSnapshot('Home - hero heading');
  });

  test('renders the Get Started button', async () => {
    const screen = await render(<Home />);
    await expect
      .element(screen.getByRole('button', { name: /^Get Started$/i }))
      .toBeVisible();
    await takeSnapshot('Home - CTA button');
  });

  test('renders the platform status section', async () => {
    const screen = await render(<Home />);
    await expect.element(screen.getByText('Platform Status')).toBeVisible();
    await expect.element(screen.getByText('Uptime')).toBeVisible();
    await expect.element(screen.getByText('Performance')).toBeVisible();
    await expect.element(screen.getByText('Satisfaction')).toBeVisible();
    await takeSnapshot('Home - platform status');
  });

  test('renders the FAQ section with accordion items', async () => {
    const screen = await render(<Home />);
    await expect
      .element(screen.getByText('Frequently Asked Questions'))
      .toBeVisible();
    await expect
      .element(screen.getByText('What is this application?'))
      .toBeVisible();
    await takeSnapshot('Home - FAQ section');
  });

  test('renders the footer copyright', async () => {
    const screen = await render(<Home />);
    await expect
      .element(screen.getByText('© 2025 Preact App. All rights reserved.'))
      .toBeVisible();
    await takeSnapshot('Home - footer');
  });
});
