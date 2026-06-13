import type { Meta, StoryObj } from '@storybook/preact-vite';
import { fn } from 'storybook/test';
import { useState } from 'preact/hooks';
import Select, { type SelectItem } from './Select';

const meta = {
  title: 'Components/Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['single', 'multiple'],
      description: 'The type of select - single or multiple selection',
    },
    value: {
      control: 'object',
      description: 'The current value of the select as an array',
    },
    onValueChange: {
      description: 'Event handler called when the select value changes',
    },
    open: {
      control: 'boolean',
      description: 'Whether the select dropdown is open',
    },
    onOpenChange: {
      description: 'Event handler called when the open state changes',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the select is disabled',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text when no value is selected',
    },
    name: {
      control: 'text',
      description: 'The name attribute for form submission',
    },
    required: {
      control: 'boolean',
      description: 'Whether the select is required',
    },
    items: {
      control: 'object',
      description: 'Array of items to display in the select',
    },
    children: {
      control: 'text',
      description: 'Label content to be rendered for the select',
    },
  },
  args: {
    onValueChange: fn(),
    onOpenChange: fn(),
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;
type RenderStory = Omit<Story, 'args'> & { args?: Partial<Story['args']> };

const frameworks: SelectItem[] = [
  { label: 'React', value: 'react' },
  { label: 'Vue', value: 'vue' },
  { label: 'Angular', value: 'angular' },
  { label: 'Svelte', value: 'svelte' },
  { label: 'Solid', value: 'solid' },
];

const countries: SelectItem[] = [
  { label: 'United States', value: 'us' },
  { label: 'Canada', value: 'ca' },
  { label: 'United Kingdom', value: 'uk' },
  { label: 'Germany', value: 'de' },
  { label: 'France', value: 'fr' },
  { label: 'Japan', value: 'jp' },
  { label: 'Australia', value: 'au' },
];

/**
 * Default select with a list of frameworks
 */
export const Default: Story = {
  args: {
    items: frameworks,
    children: 'Framework',
  },
};

/**
 * Select with open state
 */
export const Open: Story = {
  args: {
    items: frameworks,
    open: true,
    children: 'Framework',
  },
};

/**
 * Disabled select
 */
export const Disabled: Story = {
  args: {
    items: frameworks,
    disabled: true,
    children: 'Framework (disabled)',
  },
};

/**
 * Select with custom placeholder
 */
export const CustomPlaceholder: Story = {
  args: {
    items: frameworks,
    placeholder: 'Choose your framework...',
    children: 'Framework',
  },
};

/**
 * Select without label
 */
export const WithoutLabel: Story = {
  args: {
    items: frameworks,
    placeholder: 'Select a framework',
  },
};

/**
 * Select with required attribute
 */
export const Required: Story = {
  args: {
    items: frameworks,
    required: true,
    children: 'Framework (required)',
  },
};

/**
 * Select with name attribute for form submission
 */
export const WithName: Story = {
  args: {
    items: frameworks,
    name: 'framework',
    children: 'Framework',
  },
};

/**
 * Multiple selection mode
 */
export const Multiple: Story = {
  args: {
    items: frameworks,
    type: 'multiple',
    children: 'Select frameworks',
    placeholder: 'Select one or more frameworks',
  },
};

/**
 * Select with many items
 */
export const ManyItems: Story = {
  args: {
    items: [
      { label: 'React', value: 'react' },
      { label: 'Vue', value: 'vue' },
      { label: 'Angular', value: 'angular' },
      { label: 'Svelte', value: 'svelte' },
      { label: 'Solid', value: 'solid' },
      { label: 'Ember', value: 'ember' },
      { label: 'Preact', value: 'preact' },
      { label: 'Alpine', value: 'alpine' },
      { label: 'Lit', value: 'lit' },
      { label: 'Qwik', value: 'qwik' },
      { label: 'Astro', value: 'astro' },
      { label: 'Next.js', value: 'nextjs' },
      { label: 'Nuxt', value: 'nuxt' },
      { label: 'Remix', value: 'remix' },
      { label: 'SvelteKit', value: 'sveltekit' },
    ],
    children: 'Framework',
    placeholder: 'Select a framework',
  },
};

/**
 * Select with disabled items
 */
export const WithDisabledItems: Story = {
  args: {
    items: [
      { label: 'React', value: 'react' },
      { label: 'Vue', value: 'vue' },
      { label: 'Angular', value: 'angular', disabled: true },
      { label: 'Svelte', value: 'svelte' },
      { label: 'Solid', value: 'solid', disabled: true },
    ],
    children: 'Framework',
  },
};

/**
 * Controlled select with state management
 */
export const Controlled: RenderStory = {
  render: () => {
    const ControlledSelect = () => {
      const [value, setValue] = useState<string[]>([]);

      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Select
            items={frameworks}
            value={value}
            onValueChange={(details) => setValue(details.value)}
          >
            Framework
          </Select>
          <div
            style={{
              padding: '12px',
              backgroundColor: '#f3f4f6',
              borderRadius: '6px',
              fontSize: '14px',
            }}
          >
            <strong>Selected value:</strong>{' '}
            {value.length > 0 ? value.join(', ') : 'None'}
          </div>
          <button
            onClick={() => setValue(['react'])}
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
            Select React
          </button>
        </div>
      );
    };

    return <ControlledSelect />;
  },
};

/**
 * Select with change handler
 */
export const WithChangeHandler: RenderStory = {
  render: () => {
    const SelectWithHandler = () => {
      const [message, setMessage] = useState('');

      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Select
            items={frameworks}
            onValueChange={(details) => {
              const selected =
                details.value.length > 0 ? details.value.join(', ') : 'None';
              setMessage(`Selected: ${selected}`);
            }}
          >
            Framework
          </Select>
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

    return <SelectWithHandler />;
  },
};

/**
 * Select with open state handler
 */
export const WithOpenChangeHandler: RenderStory = {
  render: () => {
    const SelectWithOpenHandler = () => {
      const [message, setMessage] = useState('');

      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Select
            items={frameworks}
            onOpenChange={(details) => {
              setMessage(details.open ? 'Dropdown opened' : 'Dropdown closed');
            }}
          >
            Framework
          </Select>
          {message && (
            <div
              style={{
                padding: '12px',
                backgroundColor: '#fef3c7',
                color: '#92400e',
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

    return <SelectWithOpenHandler />;
  },
};

/**
 * Select in a form
 */
export const InForm: RenderStory = {
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
        minWidth: '400px',
      }}
    >
      <h3 style={{ margin: '0 0 8px 0', fontSize: '16px' }}>
        User Preferences
      </h3>
      <Select items={frameworks} name="framework" required>
        Preferred Framework
      </Select>
      <Select items={countries} name="country" required>
        Country
      </Select>
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
        Submit
      </button>
    </form>
  ),
};

/**
 * Multiple selects with different values
 */
export const MultipleSelects: RenderStory = {
  render: () => {
    const MultipleSelectsComponent = () => {
      const [framework, setFramework] = useState<string[]>([]);
      const [country, setCountry] = useState<string[]>([]);

      return (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            padding: '20px',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            minWidth: '400px',
          }}
        >
          <h3 style={{ margin: '0 0 8px 0', fontSize: '16px' }}>
            Multiple Independent Selects
          </h3>
          <Select
            items={frameworks}
            value={framework}
            onValueChange={(details) => setFramework(details.value)}
          >
            Framework
          </Select>
          <Select
            items={countries}
            value={country}
            onValueChange={(details) => setCountry(details.value)}
          >
            Country
          </Select>
          <div
            style={{
              padding: '12px',
              backgroundColor: '#f3f4f6',
              borderRadius: '6px',
              fontSize: '14px',
            }}
          >
            <div>
              <strong>Framework:</strong>{' '}
              {framework.length > 0 ? framework.join(', ') : 'None'}
            </div>
            <div>
              <strong>Country:</strong>{' '}
              {country.length > 0 ? country.join(', ') : 'None'}
            </div>
          </div>
        </div>
      );
    };

    return <MultipleSelectsComponent />;
  },
};
