import { describe, test, expect } from 'vitest';
import { render } from '../../test-setup';
import { Settings } from '.';
import { configure, takeSnapshot } from '@chromatic-com/vitest';

configure({ title: 'Pages/Settings' });

describe('Settings', () => {
  test('renders the settings page title', async () => {
    const screen = await render(<Settings />);
    await expect.element(screen.getByRole('heading', { name: 'Settings', level: 1 })).toBeVisible();
    await takeSnapshot('Settings - title');
  });

  test('renders the account section', async () => {
    const screen = await render(<Settings />);
    await expect.element(screen.getByText('Account')).toBeVisible();
    await expect.element(screen.getByText('Username')).toBeVisible();
    await expect.element(screen.getByText('Current Password')).toBeVisible();
    await expect.element(screen.getByText('New Password')).toBeVisible();
    await takeSnapshot('Settings - account section');
  });

  test('renders the notifications section with toggles', async () => {
    const screen = await render(<Settings />);
    await expect.element(screen.getByText('Notifications', { exact: true })).toBeVisible();
    await expect.element(screen.getByText('Email alerts')).toBeVisible();
    await expect.element(screen.getByText('Push notifications')).toBeVisible();
    await expect.element(screen.getByText('Security alerts')).toBeVisible();
    await takeSnapshot('Settings - notifications');
  });

  test('renders the appearance section with theme options', async () => {
    const screen = await render(<Settings />);
    await expect.element(screen.getByText('Appearance')).toBeVisible();
    await expect.element(screen.getByText('Light')).toBeVisible();
    await expect.element(screen.getByText('Dark')).toBeVisible();
    await expect.element(screen.getByText('System')).toBeVisible();
    await takeSnapshot('Settings - appearance');
  });

  test('renders the language options', async () => {
    const screen = await render(<Settings />);
    await expect.element(screen.getByText('English')).toBeVisible();
    await expect.element(screen.getByText('Portuguese')).toBeVisible();
    await expect.element(screen.getByText('Spanish')).toBeVisible();
    await takeSnapshot('Settings - language');
  });

  test('renders the save settings button', async () => {
    const screen = await render(<Settings />);
    await expect
      .element(screen.getByRole('button', { name: 'Save Settings' }))
      .toBeVisible();
    await takeSnapshot('Settings - save button');
  });
});
