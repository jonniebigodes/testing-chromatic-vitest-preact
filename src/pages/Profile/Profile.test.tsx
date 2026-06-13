import { describe, test, expect } from 'vitest';
import { render } from '../../test-setup';
import { Profile } from '.';
import { configure, takeSnapshot } from '@chromatic-com/vitest';

configure({ title: 'Pages/Profile' });

describe('Profile', () => {
  test('renders the profile page title', async () => {
    const screen = await render(<Profile />);
    await expect.element(screen.getByText('Profile')).toBeVisible();
    await takeSnapshot('Profile - title');
  });

  test('renders the user avatar with fallback initials', async () => {
    const screen = await render(<Profile />);
    await expect.element(screen.getByText('JD')).toBeVisible();
    await takeSnapshot('Profile - avatar');
  });

  test('renders user display name and email', async () => {
    const screen = await render(<Profile />);
    await expect.element(screen.getByText('Jane Doe')).toBeVisible();
    await expect.element(screen.getByText('jane.doe@example.com')).toBeVisible();
    await takeSnapshot('Profile - user info');
  });

  test('renders the personal information form', async () => {
    const screen = await render(<Profile />);
    await expect
      .element(screen.getByText('Personal Information'))
      .toBeVisible();
    await expect.element(screen.getByText('Full Name')).toBeVisible();
    await expect.element(screen.getByText('Email Address')).toBeVisible();
    await takeSnapshot('Profile - form');
  });

  test('renders the notifications section with toggles', async () => {
    const screen = await render(<Profile />);
    await expect.element(screen.getByText('Notifications', { exact: true })).toBeVisible();
    await expect
      .element(screen.getByText('Email notifications'))
      .toBeVisible();
    await expect.element(screen.getByText('Marketing emails')).toBeVisible();
    await takeSnapshot('Profile - notifications');
  });

  test('renders the save changes button', async () => {
    const screen = await render(<Profile />);
    await expect
      .element(screen.getByRole('button', { name: 'Save Changes' }))
      .toBeVisible();
    await takeSnapshot('Profile - save button');
  });
});
