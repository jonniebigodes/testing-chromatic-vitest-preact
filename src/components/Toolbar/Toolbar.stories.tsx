import type { Meta, StoryObj } from '@storybook/preact-vite';
import Toolbar from './Toolbar';
import Button from '../Button/Button';

const meta = {
  title: 'Components/Toolbar',
  component: Toolbar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'The orientation of the toolbar',
    },
    children: {
      control: false,
      description: 'Content to be rendered inside the toolbar',
    },
  },
} satisfies Meta<typeof Toolbar>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default toolbar with horizontal orientation
 */
export const Default: Story = {
  render: (args) => (
    <Toolbar {...args}>
      <Button label="Save" />
      <Button label="Edit" />
      <Button label="Delete" backgroundColor="#ef4444" />
    </Toolbar>
  ),
  args: {
    orientation: 'horizontal',
  },
};

/**
 * Toolbar with horizontal orientation
 */
export const Horizontal: Story = {
  render: (args) => (
    <Toolbar {...args}>
      <Button label="New" />
      <Button label="Open" />
      <Button label="Save" />
      <Button label="Save As" />
      <Button label="Close" />
    </Toolbar>
  ),
  args: {
    orientation: 'horizontal',
  },
};

/**
 * Toolbar with vertical orientation
 */
export const Vertical: Story = {
  render: (args) => (
    <Toolbar {...args}>
      <Button label="Cut" />
      <Button label="Copy" />
      <Button label="Paste" />
      <Button label="Delete" backgroundColor="#ef4444" />
    </Toolbar>
  ),
  args: {
    orientation: 'vertical',
  },
};

/**
 * Toolbar with different button sizes
 */
export const WithDifferentSizes: Story = {
  render: (args) => (
    <Toolbar {...args}>
      <Button label="Small" size="small" />
      <Button label="Medium" size="medium" />
      <Button label="Large" size="large" />
    </Toolbar>
  ),
  args: {
    orientation: 'horizontal',
  },
};

/**
 * Toolbar with custom styled buttons
 */
export const WithCustomButtons: Story = {
  render: (args) => (
    <Toolbar {...args}>
      <Button label="Primary" backgroundColor="#3b82f6" />
      <Button label="Success" backgroundColor="#10b981" />
      <Button label="Warning" backgroundColor="#f59e0b" />
      <Button label="Danger" backgroundColor="#ef4444" />
    </Toolbar>
  ),
  args: {
    orientation: 'horizontal',
  },
};

/**
 * Vertical toolbar with custom buttons
 */
export const VerticalWithCustomButtons: Story = {
  render: (args) => (
    <Toolbar {...args}>
      <Button label="Primary" backgroundColor="#3b82f6" />
      <Button label="Success" backgroundColor="#10b981" />
      <Button label="Warning" backgroundColor="#f59e0b" />
      <Button label="Danger" backgroundColor="#ef4444" />
    </Toolbar>
  ),
  args: {
    orientation: 'vertical',
  },
};

/**
 * Toolbar with many buttons
 */
export const WithManyButtons: Story = {
  render: (args) => (
    <Toolbar {...args}>
      <Button label="File" size="small" />
      <Button label="Edit" size="small" />
      <Button label="View" size="small" />
      <Button label="Insert" size="small" />
      <Button label="Format" size="small" />
      <Button label="Tools" size="small" />
      <Button label="Table" size="small" />
      <Button label="Help" size="small" />
    </Toolbar>
  ),
  args: {
    orientation: 'horizontal',
  },
};

/**
 * Toolbar with action buttons
 */
export const ActionToolbar: Story = {
  render: (args) => (
    <Toolbar {...args}>
      <Button label="Undo" />
      <Button label="Redo" />
      <div
        style={{ width: '1px', height: '24px', backgroundColor: '#d1d5db' }}
      />
      <Button label="Bold" />
      <Button label="Italic" />
      <Button label="Underline" />
      <div
        style={{ width: '1px', height: '24px', backgroundColor: '#d1d5db' }}
      />
      <Button label="Align Left" />
      <Button label="Align Center" />
      <Button label="Align Right" />
    </Toolbar>
  ),
  args: {
    orientation: 'horizontal',
  },
};

/**
 * Vertical toolbar with dividers
 */
export const VerticalWithDividers: Story = {
  render: (args) => (
    <Toolbar {...args}>
      <Button label="New" size="small" />
      <Button label="Open" size="small" />
      <Button label="Save" size="small" />
      <div
        style={{ width: '100%', height: '1px', backgroundColor: '#d1d5db' }}
      />
      <Button label="Cut" size="small" />
      <Button label="Copy" size="small" />
      <Button label="Paste" size="small" />
      <div
        style={{ width: '100%', height: '1px', backgroundColor: '#d1d5db' }}
      />
      <Button label="Undo" size="small" />
      <Button label="Redo" size="small" />
    </Toolbar>
  ),
  args: {
    orientation: 'vertical',
  },
};

/**
 * Empty toolbar
 */
export const Empty: Story = {
  args: {
    orientation: 'horizontal',
  },
};

/**
 * Toolbar with single button
 */
export const SingleButton: Story = {
  render: (args) => (
    <Toolbar {...args}>
      <Button label="Click Me" />
    </Toolbar>
  ),
  args: {
    orientation: 'horizontal',
  },
};

/**
 * Toolbar with mixed content
 */
export const WithMixedContent: Story = {
  render: (args) => (
    <Toolbar {...args}>
      <Button label="Action 1" />
      <span style={{ padding: '0 8px', color: '#6b7280', fontSize: '14px' }}>
        |
      </span>
      <span style={{ fontSize: '14px', color: '#374151' }}>Status: Active</span>
      <span style={{ padding: '0 8px', color: '#6b7280', fontSize: '14px' }}>
        |
      </span>
      <Button label="Action 2" />
    </Toolbar>
  ),
  args: {
    orientation: 'horizontal',
  },
};

/**
 * Responsive toolbar example
 */
export const Responsive: Story = {
  render: (args) => (
    <div style={{ width: '100%', maxWidth: '800px' }}>
      <Toolbar {...args}>
        <Button label="File" size="small" />
        <Button label="Edit" size="small" />
        <Button label="View" size="small" />
        <Button label="Insert" size="small" />
        <Button label="Format" size="small" />
        <Button label="Tools" size="small" />
      </Toolbar>
    </div>
  ),
  args: {
    orientation: 'horizontal',
  },
};

/**
 * Toolbar as a floating panel
 */
export const FloatingToolbar: Story = {
  render: (args) => (
    <div
      style={{
        position: 'relative',
        width: '600px',
        height: '400px',
        backgroundColor: '#f3f4f6',
        borderRadius: '8px',
        padding: '20px',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      >
        <Toolbar {...args}>
          <Button label="B" size="small" />
          <Button label="I" size="small" />
          <Button label="U" size="small" />
          <Button label="S" size="small" />
        </Toolbar>
      </div>
      <div style={{ marginTop: '60px', fontSize: '14px', color: '#374151' }}>
        This is a floating toolbar positioned at the top of the container.
      </div>
    </div>
  ),
  args: {
    orientation: 'horizontal',
  },
};

/**
 * Side toolbar
 */
export const SideToolbar: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: '16px' }}>
      <Toolbar {...args}>
        <Button label="Home" size="small" />
        <Button label="Search" size="small" />
        <Button label="Settings" size="small" />
        <Button label="Help" size="small" />
      </Toolbar>
      <div
        style={{
          flex: 1,
          padding: '20px',
          backgroundColor: '#f9fafb',
          borderRadius: '6px',
          border: '1px solid #e5e7eb',
        }}
      >
        <p style={{ margin: 0, fontSize: '14px', color: '#374151' }}>
          Main content area with a vertical toolbar on the side.
        </p>
      </div>
    </div>
  ),
  args: {
    orientation: 'vertical',
  },
};
