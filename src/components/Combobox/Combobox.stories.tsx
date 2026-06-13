import type { Meta, StoryObj } from '@storybook/preact-vite';
import { fn } from 'storybook/test';
import { useState } from 'preact/hooks';
import Combobox from './Combobox';

const meta = {
  title: 'Components/Combobox',
  component: Combobox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['single', 'multiple'],
      description: 'Type of combobox - single or multiple selection',
    },
    value: {
      control: 'object',
      description: 'The controlled value of the combobox',
    },
    onValueChange: {
      description: 'Callback invoked when the value changes',
    },
    open: {
      control: 'boolean',
      description: 'The controlled open state of the combobox',
    },
    onOpenChange: {
      description: 'Callback invoked when the open state changes',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the combobox is disabled',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text for the input',
    },
    name: {
      control: 'text',
      description: 'Name attribute for form submission',
    },
    required: {
      control: 'boolean',
      description: 'Whether the combobox is required',
    },
    items: {
      control: 'object',
      description: 'Array of items for the combobox',
    },
    label: {
      control: 'text',
      description: 'Label for the combobox',
    },
  },
  args: {
    onValueChange: fn(),
    onOpenChange: fn(),
  },
  decorators: [
    (Story) => (
      <div style={{ width: '400px', maxWidth: '100%' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Combobox>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default combobox with basic items
 */
export const Default: Story = {
  args: {
    label: 'Select a framework',
    placeholder: 'Choose a framework...',
    items: ['React', 'Vue', 'Svelte', 'Angular', 'Solid'],
  },
};

/**
 * Combobox with many items
 */
export const WithManyItems: Story = {
  args: {
    label: 'Select a country',
    placeholder: 'Search countries...',
    items: [
      'United States',
      'United Kingdom',
      'Canada',
      'Australia',
      'Germany',
      'France',
      'Italy',
      'Spain',
      'Netherlands',
      'Belgium',
      'Switzerland',
      'Sweden',
      'Norway',
      'Denmark',
      'Finland',
      'Poland',
      'Portugal',
      'Austria',
      'Ireland',
      'Greece',
    ],
  },
};

/**
 * Combobox in open state
 */
export const Open: Story = {
  args: {
    label: 'Select a framework',
    placeholder: 'Choose a framework...',
    items: ['React', 'Vue', 'Svelte', 'Angular', 'Solid'],
    open: true,
  },
};

/**
 * Disabled combobox
 */
export const Disabled: Story = {
  args: {
    label: 'Select a framework',
    placeholder: 'This combobox is disabled',
    items: ['React', 'Vue', 'Svelte', 'Angular', 'Solid'],
    disabled: true,
  },
};

/**
 * Required combobox
 */
export const Required: Story = {
  args: {
    label: 'Select a framework (required)',
    placeholder: 'Choose a framework...',
    items: ['React', 'Vue', 'Svelte', 'Angular', 'Solid'],
    required: true,
    name: 'framework',
  },
};

/**
 * Combobox with name attribute for form submission
 */
export const WithFormName: Story = {
  args: {
    label: 'Favorite programming language',
    placeholder: 'Select...',
    items: ['JavaScript', 'TypeScript', 'Python', 'Java', 'C#', 'Go', 'Rust'],
    name: 'programming-language',
  },
};

/**
 * Multiple selection combobox
 */
export const Multiple: Story = {
  args: {
    label: 'Select frameworks (multiple)',
    placeholder: 'Choose frameworks...',
    items: ['React', 'Vue', 'Svelte', 'Angular', 'Solid', 'Preact', 'Lit'],
    type: 'multiple',
  },
};

/**
 * Combobox without label
 */
export const WithoutLabel: Story = {
  args: {
    placeholder: 'Search...',
    items: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
  },
};

/**
 * Combobox with onValueChange handler
 */
export const WithChangeHandler: Story = {
  render: () => {
    const ComboboxWithHandler = () => {
      const [message, setMessage] = useState('');
      const items = ['React', 'Vue', 'Svelte', 'Angular', 'Solid'];

      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Combobox
            label="Select a framework"
            placeholder="Choose a framework..."
            items={items}
            onValueChange={(details) => {
              setMessage(
                `Selected: ${details.value.length > 0 ? details.value.join(', ') : 'None'}`
              );
            }}
          />
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

    return <ComboboxWithHandler />;
  },
};

/**
 * Combobox with onOpenChange handler
 */
export const WithOpenChangeHandler: Story = {
  render: () => {
    const ComboboxWithOpenHandler = () => {
      const [isOpen, setIsOpen] = useState(false);
      const items = ['React', 'Vue', 'Svelte', 'Angular', 'Solid'];

      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Combobox
            label="Select a framework"
            placeholder="Choose a framework..."
            items={items}
            open={isOpen}
            onOpenChange={(details) => setIsOpen(details.open)}
          />
          <div
            style={{
              padding: '12px',
              backgroundColor: '#f3f4f6',
              borderRadius: '6px',
              fontSize: '14px',
            }}
          >
            <strong>Dropdown state:</strong> {isOpen ? 'Open' : 'Closed'}
          </div>
        </div>
      );
    };

    return <ComboboxWithOpenHandler />;
  },
};

/**
 * Multiple comboboxes in a form
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
      }}
    >
      <h3 style={{ margin: '0 0 8px 0', fontSize: '16px' }}>
        Developer Survey
      </h3>
      <Combobox
        label="Primary Framework"
        placeholder="Select framework..."
        items={['React', 'Vue', 'Svelte', 'Angular', 'Solid']}
        name="framework"
        required
      />
      <Combobox
        label="Experience Level"
        placeholder="Select level..."
        items={['Beginner', 'Intermediate', 'Advanced', 'Expert']}
        name="experience"
        required
      />
      <Combobox
        label="Favorite Tool"
        placeholder="Select tool..."
        items={['VSCode', 'WebStorm', 'Sublime', 'Vim', 'Emacs']}
        name="tool"
      />
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
        Submit Survey
      </button>
    </form>
  ),
};

/**
 * Combobox with custom styling via wrapper
 */
export const CustomWidth: Story = {
  render: () => (
    <div style={{ width: '600px' }}>
      <Combobox
        label="Select a framework"
        placeholder="Choose a framework..."
        items={['React', 'Vue', 'Svelte', 'Angular', 'Solid']}
      />
    </div>
  ),
};

/**
 * Small combobox
 */
export const SmallWidth: Story = {
  render: () => (
    <div style={{ width: '200px' }}>
      <Combobox
        label="Size"
        placeholder="Select..."
        items={['XS', 'S', 'M', 'L', 'XL', 'XXL']}
      />
    </div>
  ),
};

/**
 * Categories combobox
 */
export const Categories: Story = {
  args: {
    label: 'Select a category',
    placeholder: 'Choose a category...',
    items: [
      'Technology',
      'Science',
      'Health',
      'Business',
      'Entertainment',
      'Sports',
      'Politics',
      'Education',
      'Travel',
      'Food',
    ],
  },
};

/**
 * Programming languages combobox
 */
export const ProgrammingLanguages: Story = {
  args: {
    label: 'Favorite programming language',
    placeholder: 'Select a language...',
    items: [
      'JavaScript',
      'TypeScript',
      'Python',
      'Java',
      'C#',
      'C++',
      'Go',
      'Rust',
      'Ruby',
      'PHP',
      'Swift',
      'Kotlin',
    ],
  },
};
