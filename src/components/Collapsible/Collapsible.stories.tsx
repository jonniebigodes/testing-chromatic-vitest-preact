import type { Meta, StoryObj } from '@storybook/preact-vite';
import { fn } from 'storybook/test';
import { useState } from 'preact/hooks';
import Collapsible from './Collapsible';

const meta = {
  title: 'Components/Collapsible',
  component: Collapsible,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    open: {
      control: 'boolean',
      description: 'The controlled open state of the collapsible',
    },
    onOpenChange: {
      description: 'Callback invoked when the open state changes',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the collapsible is disabled',
    },
    label: {
      control: 'text',
      description: 'Content to be rendered as the trigger/header',
    },
    children: {
      control: 'text',
      description: 'Content to be rendered inside the collapsible',
    },
  },
  args: {
    onOpenChange: fn(),
  },
  decorators: [
    (Story) => (
      <div style={{ width: '500px', maxWidth: '100%' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Collapsible>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default collapsible with basic content
 */
export const Default: Story = {
  args: {
    label: 'Click to expand',
    children: 'This is the collapsible content that can be shown or hidden.',
  },
};

/**
 * Collapsible in open state
 */
export const Open: Story = {
  args: {
    open: true,
    label: 'This collapsible is open',
    children:
      'This content is visible by default because the collapsible is in an open state.',
  },
};

/**
 * Collapsible in closed state
 */
export const Closed: Story = {
  args: {
    open: false,
    label: 'This collapsible is closed',
    children: 'This content is hidden by default.',
  },
};

/**
 * Disabled collapsible
 */
export const Disabled: Story = {
  args: {
    disabled: true,
    label: 'This collapsible is disabled',
    children:
      'This content cannot be toggled because the collapsible is disabled.',
  },
};

/**
 * Disabled and open collapsible
 */
export const DisabledOpen: Story = {
  args: {
    disabled: true,
    open: true,
    label: 'This is disabled and open',
    children:
      'This content is visible but cannot be toggled because the collapsible is disabled.',
  },
};

/**
 * Collapsible with custom label content
 */
export const CustomLabel: Story = {
  render: (args) => (
    <Collapsible
      {...args}
      label={
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: '#10b981',
            }}
          />
          <span style={{ fontWeight: '600' }}>Advanced Settings</span>
          <span
            style={{
              marginLeft: 'auto',
              fontSize: '12px',
              color: '#6b7280',
              fontWeight: 'normal',
            }}
          >
            5 options
          </span>
        </div>
      }
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div>Option 1: Enable feature A</div>
        <div>Option 2: Enable feature B</div>
        <div>Option 3: Enable feature C</div>
        <div>Option 4: Enable feature D</div>
        <div>Option 5: Enable feature E</div>
      </div>
    </Collapsible>
  ),
};

/**
 * Collapsible with rich content
 */
export const RichContent: Story = {
  args: {
    label: 'Product Details',
    children: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div>
          <strong>Name:</strong> Premium Widget
        </div>
        <div>
          <strong>Price:</strong> $99.99
        </div>
        <div>
          <strong>Description:</strong> A high-quality widget with advanced
          features and exceptional durability.
        </div>
        <div>
          <strong>Features:</strong>
          <ul style={{ margin: '8px 0 0 0', paddingLeft: '20px' }}>
            <li>Feature 1</li>
            <li>Feature 2</li>
            <li>Feature 3</li>
          </ul>
        </div>
      </div>
    ),
  },
};

/**
 * Collapsible with long content
 */
export const LongContent: Story = {
  args: {
    label: 'Terms and Conditions',
    children: (
      <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
        <p style={{ margin: '0 0 12px 0' }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>
        <p style={{ margin: '0 0 12px 0' }}>
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
          dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
          proident, sunt in culpa qui officia deserunt mollit anim id est
          laborum.
        </p>
        <p style={{ margin: '0' }}>
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem
          accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae
          ab illo inventore veritatis et quasi architecto beatae vitae dicta
          sunt explicabo.
        </p>
      </div>
    ),
  },
};

/**
 * Controlled collapsible with state management
 */
export const Controlled: Story = {
  render: () => {
    const ControlledCollapsible = () => {
      const [open, setOpen] = useState(false);

      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Collapsible
            open={open}
            onOpenChange={(details) => setOpen(details.open)}
            label={`Controlled Collapsible (${open ? 'Open' : 'Closed'})`}
          >
            <p style={{ margin: 0 }}>
              This collapsible is controlled by external state. The state is
              currently: <strong>{open ? 'open' : 'closed'}</strong>
            </p>
          </Collapsible>
          <button
            onClick={() => setOpen(!open)}
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

    return <ControlledCollapsible />;
  },
};

/**
 * Collapsible with onOpenChange handler
 */
export const WithChangeHandler: Story = {
  render: () => {
    const CollapsibleWithHandler = () => {
      const [message, setMessage] = useState('');

      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Collapsible
            label="Click to trigger the handler"
            onOpenChange={(details) => {
              setMessage(
                `Collapsible is now ${details.open ? 'open' : 'closed'}`
              );
            }}
          >
            <p style={{ margin: 0 }}>
              When you toggle this collapsible, a message will appear below
              showing the current state.
            </p>
          </Collapsible>
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

    return <CollapsibleWithHandler />;
  },
};

/**
 * Multiple collapsibles (accordion-like)
 */
export const MultipleCollapsibles: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <Collapsible label="Section 1" open>
        <p style={{ margin: 0 }}>Content for section 1</p>
      </Collapsible>
      <Collapsible label="Section 2">
        <p style={{ margin: 0 }}>Content for section 2</p>
      </Collapsible>
      <Collapsible label="Section 3">
        <p style={{ margin: 0 }}>Content for section 3</p>
      </Collapsible>
      <Collapsible label="Section 4 (Disabled)" disabled>
        <p style={{ margin: 0 }}>Content for section 4</p>
      </Collapsible>
    </div>
  ),
};

/**
 * FAQ-style collapsibles
 */
export const FAQ: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <Collapsible label="What is this component?">
        <p style={{ margin: 0 }}>
          This is a Collapsible component built with Ark UI. It allows you to
          show and hide content with smooth animations.
        </p>
      </Collapsible>
      <Collapsible label="How do I use it?">
        <p style={{ margin: 0 }}>
          Simply import the component and pass your content as children. You can
          control the open state and handle state changes with props.
        </p>
      </Collapsible>
      <Collapsible label="Can it be disabled?">
        <p style={{ margin: 0 }}>
          Yes! You can set the <code>disabled</code> prop to true to prevent the
          collapsible from being toggled.
        </p>
      </Collapsible>
      <Collapsible label="Is it accessible?">
        <p style={{ margin: 0 }}>
          Yes! Ark UI components are built with accessibility in mind, including
          proper ARIA attributes and keyboard navigation support.
        </p>
      </Collapsible>
    </div>
  ),
};

/**
 * Nested collapsibles
 */
export const Nested: Story = {
  render: () => (
    <Collapsible label="Parent Collapsible">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <p style={{ margin: '0 0 8px 0' }}>
          This is the parent content. Below are nested collapsibles:
        </p>
        <Collapsible label="Child Collapsible 1">
          <p style={{ margin: 0 }}>Content for child 1</p>
        </Collapsible>
        <Collapsible label="Child Collapsible 2">
          <p style={{ margin: 0 }}>Content for child 2</p>
        </Collapsible>
      </div>
    </Collapsible>
  ),
};

/**
 * Collapsible with form inside
 */
export const WithForm: Story = {
  render: () => (
    <Collapsible label="Edit Profile Settings">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          alert('Form submitted!');
        }}
        style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}
      >
        <div>
          <label
            htmlFor="username"
            style={{ display: 'block', marginBottom: '4px', fontSize: '12px' }}
          >
            Username
          </label>
          <input
            id="username"
            type="text"
            placeholder="Enter username"
            style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #d1d5db',
              borderRadius: '4px',
              fontSize: '14px',
            }}
          />
        </div>
        <div>
          <label
            htmlFor="email"
            style={{ display: 'block', marginBottom: '4px', fontSize: '12px' }}
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Enter email"
            style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #d1d5db',
              borderRadius: '4px',
              fontSize: '14px',
            }}
          />
        </div>
        <button
          type="submit"
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
          Save Changes
        </button>
      </form>
    </Collapsible>
  ),
};
