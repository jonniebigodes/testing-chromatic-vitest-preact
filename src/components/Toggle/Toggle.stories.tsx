import type { Meta, StoryObj } from '@storybook/preact-vite';
import { fn } from 'storybook/test';
import { useState } from 'preact/hooks';
import Toggle from './Toggle';

const meta = {
  title: 'Components/Toggle',
  component: Toggle,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    onPressedChange: {
      description: 'Event handler called when the pressed state changes',
    },
    pressed: {
      control: 'boolean',
      description: 'The controlled pressed state of the toggle',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the toggle is disabled',
    },
    required: {
      control: 'boolean',
      description: 'Whether the toggle is required',
    },
    name: {
      control: 'text',
      description: 'The name attribute for form submission',
    },
    children: {
      control: 'text',
      description: 'Label content to be rendered next to the toggle',
    },
  },
  args: {
    onPressedChange: fn(),
  },
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default toggle switch without a label
 */
export const Default: Story = {
  args: {},
};

/**
 * Toggle in pressed (on) state
 */
export const Pressed: Story = {
  args: {
    pressed: true,
  },
};

/**
 * Toggle in unpressed (off) state
 */
export const Unpressed: Story = {
  args: {
    pressed: false,
  },
};

/**
 * Disabled toggle in off state
 */
export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

/**
 * Disabled toggle in on state
 */
export const DisabledPressed: Story = {
  args: {
    disabled: true,
    pressed: true,
  },
};

/**
 * Toggle with a label
 */
export const WithLabel: Story = {
  args: {
    children: 'Enable notifications',
  },
};

/**
 * Toggle with required attribute
 */
export const Required: Story = {
  args: {
    required: true,
    children: 'Accept terms and conditions',
  },
};

/**
 * Toggle with name attribute for form submission
 */
export const WithName: Story = {
  args: {
    name: 'notifications-enabled',
    children: 'Email notifications',
  },
};

/**
 * Toggle with custom label content
 */
export const CustomChildren: Story = {
  args: {
    children: (
      <span style={{ fontWeight: 'bold', color: '#1f2937' }}>Dark Mode</span>
    ),
  },
};

/**
 * Controlled toggle with state management
 */
export const Controlled: Story = {
  render: () => {
    const ControlledToggle = () => {
      const [pressed, setPressed] = useState(false);

      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Toggle pressed={pressed} onPressedChange={setPressed}>
            Feature {pressed ? 'enabled' : 'disabled'}
          </Toggle>
          <div
            style={{
              padding: '12px',
              backgroundColor: '#f3f4f6',
              borderRadius: '6px',
              fontSize: '14px',
            }}
          >
            <strong>State:</strong> {pressed ? 'ON' : 'OFF'}
          </div>
          <button
            onClick={() => setPressed(!pressed)}
            style={{
              padding: '8px 16px',
              backgroundColor: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500',
            }}
          >
            Toggle from outside
          </button>
        </div>
      );
    };

    return <ControlledToggle />;
  },
};

/**
 * Toggle with onPressedChange handler
 */
export const WithChangeHandler: Story = {
  render: () => {
    const ToggleWithHandler = () => {
      const [message, setMessage] = useState('');

      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Toggle
            onPressedChange={(pressed) => {
              setMessage(`Toggle is now ${pressed ? 'ON' : 'OFF'}`);
            }}
          >
            Click to toggle
          </Toggle>
          {message && (
            <div
              style={{
                padding: '12px',
                backgroundColor: '#e0f2fe',
                color: '#0c4a6e',
                borderRadius: '4px',
                fontSize: '14px',
              }}
            >
              {message}
            </div>
          )}
        </div>
      );
    };

    return <ToggleWithHandler />;
  },
};

/**
 * Multiple toggles for different settings
 */
export const MultipleToggles: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        padding: '20px',
        border: '1px solid #e5e7eb',
        borderRadius: '8px',
        minWidth: '300px',
      }}
    >
      <h3 style={{ margin: '0 0 8px 0', fontSize: '16px' }}>Settings</h3>
      <Toggle>Email notifications</Toggle>
      <Toggle>Push notifications</Toggle>
      <Toggle>SMS notifications</Toggle>
      <Toggle disabled>Marketing emails (unavailable)</Toggle>
    </div>
  ),
};

/**
 * Toggle in a form with submission
 */
export const InForm: Story = {
  render: () => (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData);
        alert(JSON.stringify(data, null, 2));
      }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        padding: '20px',
        border: '1px solid #e5e7eb',
        borderRadius: '8px',
        maxWidth: '400px',
      }}
    >
      <h3 style={{ margin: '0 0 8px 0', fontSize: '16px' }}>
        Notification Preferences
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <Toggle name="email-notifications">Email notifications</Toggle>
        <Toggle name="push-notifications">Push notifications</Toggle>
        <Toggle name="sms-notifications">SMS notifications</Toggle>
        <Toggle name="newsletter" required>
          Subscribe to newsletter (required)
        </Toggle>
      </div>
      <button
        type="submit"
        style={{
          padding: '10px 16px',
          backgroundColor: '#3b82f6',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '14px',
          fontWeight: '500',
        }}
      >
        Save Preferences
      </button>
    </form>
  ),
};

/**
 * Toggle with long label text
 */
export const LongLabel: Story = {
  args: {
    children:
      'Enable automatic synchronization of data across all your devices',
  },
};

/**
 * Dark mode toggle example
 */
export const DarkModeToggle: Story = {
  render: () => {
    const DarkMode = () => {
      const [isDark, setIsDark] = useState(false);

      return (
        <div
          style={{
            padding: '24px',
            backgroundColor: isDark ? '#1f2937' : '#ffffff',
            color: isDark ? '#ffffff' : '#000000',
            borderRadius: '8px',
            transition: 'all 0.3s ease',
            minWidth: '300px',
          }}
        >
          <Toggle pressed={isDark} onPressedChange={setIsDark}>
            {isDark ? '🌙 Dark Mode' : '☀️ Light Mode'}
          </Toggle>
          <p style={{ marginTop: '16px', fontSize: '14px' }}>
            This is sample content that changes based on the theme.
          </p>
        </div>
      );
    };

    return <DarkMode />;
  },
};
