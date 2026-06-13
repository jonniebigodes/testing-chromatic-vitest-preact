import { describe, test, expect } from 'vitest';
import { render } from '../test-setup';
import { NotFound } from './_404';
import { configure, takeSnapshot } from '@chromatic-com/vitest';

configure({ title: 'Pages/NotFound' });

describe('NotFound', () => {
  test('renders the 404 error code', async () => {
    const screen = await render(<NotFound />);
    await expect.element(screen.getByText('404')).toBeVisible();
    await takeSnapshot('NotFound - error code');
  });

  test('renders the page not found heading', async () => {
    const screen = await render(<NotFound />);
    await expect.element(screen.getByText('Page not found')).toBeVisible();
    await takeSnapshot('NotFound - heading');
  });

  test('renders the description', async () => {
    const screen = await render(<NotFound />);
    await expect
      .element(
        screen.getByText(/doesn't exist or has been moved/),
      )
      .toBeVisible();
    await takeSnapshot('NotFound - description');
  });

  test('renders the Back to Home button', async () => {
    const screen = await render(<NotFound />);
    await expect
      .element(screen.getByRole('button', { name: 'Back to Home' }))
      .toBeVisible();
    await takeSnapshot('NotFound - back button');
  });

  test('renders the application header with navigation', async () => {
    const screen = await render(<NotFound />);
    await expect.element(screen.getByText('Preact App', { exact: true })).toBeVisible();
    await takeSnapshot('NotFound - header');
  });
});
