import { describe, test, expect } from 'vitest';
import { render } from '../../test-setup';
import { Dashboard } from '.';
import { configure, takeSnapshot } from '@chromatic-com/vitest';

configure({ title: 'Pages/Dashboard' });

describe('Dashboard', () => {
  test('renders the dashboard page title', async () => {
    const screen = await render(<Dashboard />);
    await expect.element(screen.getByText('Dashboard')).toBeVisible();
    await takeSnapshot('Dashboard - title');
  });

  test('renders the key metrics section', async () => {
    const screen = await render(<Dashboard />);
    await expect.element(screen.getByText('Key Metrics')).toBeVisible();
    await takeSnapshot('Dashboard - key metrics');
  });

  test('renders all metric progress bars', async () => {
    const screen = await render(<Dashboard />);
    await expect.element(screen.getByText('Monthly Revenue')).toBeVisible();
    await expect.element(screen.getByText('User Retention')).toBeVisible();
    await expect.element(screen.getByText('System Health')).toBeVisible();
    await expect.element(screen.getByText('Task Completion')).toBeVisible();
    await takeSnapshot('Dashboard - progress bars');
  });

  test('renders the resource usage section', async () => {
    const screen = await render(<Dashboard />);
    await expect.element(screen.getByText('Resource Usage')).toBeVisible();
    await expect.element(screen.getByText('CPU Usage')).toBeVisible();
    await expect.element(screen.getByText('Memory Usage')).toBeVisible();
    await takeSnapshot('Dashboard - resource usage');
  });

  test('renders recent activity with user names', async () => {
    const screen = await render(<Dashboard />);
    await expect.element(screen.getByText('Alice Johnson')).toBeVisible();
    await expect.element(screen.getByText('Bob Smith')).toBeVisible();
    await expect.element(screen.getByText('Carol White')).toBeVisible();
    await takeSnapshot('Dashboard - activity');
  });

  test('renders recent updates accordion', async () => {
    const screen = await render(<Dashboard />);
    await expect.element(screen.getByText('Recent Updates')).toBeVisible();
    await expect
      .element(screen.getByText('System Update v1.2.0'))
      .toBeVisible();
    await takeSnapshot('Dashboard - updates accordion');
  });
});
