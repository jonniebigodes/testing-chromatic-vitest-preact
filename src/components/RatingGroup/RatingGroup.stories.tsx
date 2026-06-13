import type { Meta, StoryObj } from '@storybook/preact-vite';
import { fn } from 'storybook/test';
import { useState } from 'preact/hooks';
import RatingGroup from './RatingGroup';

const meta = {
  title: 'Components/RatingGroup',
  component: RatingGroup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    onValueChange: {
      description: 'Event handler called when the rating value changes',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the rating group is disabled',
    },
    required: {
      control: 'boolean',
      description: 'Whether the rating group is required',
    },
    name: {
      control: 'text',
      description: 'The name attribute for form submission',
    },
    min: {
      control: 'number',
      description: 'The minimum value of the rating',
    },
    max: {
      control: 'number',
      description: 'The maximum value of the rating',
    },
    readOnly: {
      control: 'boolean',
      description: 'Whether the rating group is read-only',
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: "The rating group's orientation",
    },
    children: {
      control: 'text',
      description: 'Label content to be rendered for the rating group',
    },
    value: {
      control: 'number',
      description: 'The controlled value of the rating',
    },
    defaultValue: {
      control: 'number',
      description: 'The default value when uncontrolled',
    },
  },
  args: {
    onValueChange: fn(),
  },
} satisfies Meta<typeof RatingGroup>;

export default meta;
type Story = StoryObj<typeof meta>;
type RenderStory = Omit<Story, 'args'> & { args?: Partial<Story['args']> };

/**
 * Default rating group with 5 stars
 */
export const Default: Story = {
  args: {
    defaultValue: 0,
  },
};

/**
 * Rating group with a label
 */
export const WithLabel: Story = {
  args: {
    defaultValue: 3,
    children: 'Rate this product',
  },
};

/**
 * Disabled rating group
 */
export const Disabled: Story = {
  args: {
    disabled: true,
    defaultValue: 3,
    children: 'Disabled rating',
  },
};

/**
 * Read-only rating group
 */
export const ReadOnly: Story = {
  args: {
    readOnly: true,
    defaultValue: 4,
    children: 'Read-only rating',
  },
};

/**
 * Required rating group
 */
export const Required: Story = {
  args: {
    required: true,
    children: 'Required rating',
  },
};

/**
 * Rating group with name attribute
 */
export const WithName: Story = {
  args: {
    name: 'product-rating',
    defaultValue: 3,
    children: 'Product rating',
  },
};

/**
 * Rating group with custom max value
 */
export const CustomMax: Story = {
  args: {
    max: 10,
    defaultValue: 7,
    children: 'Rate out of 10',
  },
};

/**
 * Rating group with custom min and max
 */
export const CustomRange: Story = {
  args: {
    min: 1,
    max: 3,
    defaultValue: 2,
    children: 'Rate from 1 to 3',
  },
};

/**
 * Vertical orientation
 */
export const Vertical: Story = {
  args: {
    orientation: 'vertical',
    defaultValue: 3,
    children: 'Vertical rating',
  },
};

/**
 * Rating starting at 5 stars
 */
export const FullRating: Story = {
  args: {
    defaultValue: 5,
    children: '5-star rating',
  },
};

/**
 * Rating starting at 0 stars
 */
export const EmptyRating: Story = {
  args: {
    defaultValue: 0,
    children: 'Not yet rated',
  },
};

/**
 * Controlled rating with state management
 */
export const Controlled: RenderStory = {
  render: () => {
    const ControlledRating = () => {
      const [value, setValue] = useState(3);

      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <RatingGroup
            value={value}
            onValueChange={(details) => setValue(details.value)}
          >
            Controlled rating
          </RatingGroup>
          <div
            style={{
              padding: '12px',
              backgroundColor: '#f3f4f6',
              borderRadius: '6px',
              fontSize: '14px',
            }}
          >
            <strong>Current rating:</strong> {value} / 5
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={() => setValue(0)}
              style={{
                padding: '8px 16px',
                backgroundColor: '#ef4444',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500',
              }}
            >
              Clear
            </button>
            <button
              onClick={() => setValue(5)}
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
              Set to 5
            </button>
          </div>
        </div>
      );
    };

    return <ControlledRating />;
  },
};

/**
 * Rating with change handler
 */
export const WithChangeHandler: RenderStory = {
  render: () => {
    const RatingWithHandler = () => {
      const [message, setMessage] = useState('');

      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <RatingGroup
            onValueChange={(details) => {
              setMessage(
                `You rated: ${details.value} star${details.value !== 1 ? 's' : ''}`
              );
            }}
          >
            Rate this item
          </RatingGroup>
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

    return <RatingWithHandler />;
  },
};

/**
 * Rating in a form
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
      <h3 style={{ margin: '0 0 8px 0', fontSize: '16px' }}>Product Review</h3>
      <RatingGroup name="quality" required>
        Quality (required)
      </RatingGroup>
      <RatingGroup name="value" required>
        Value for money (required)
      </RatingGroup>
      <RatingGroup name="design">Design (optional)</RatingGroup>
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
        Submit Review
      </button>
    </form>
  ),
};

/**
 * Multiple rating groups
 */
export const MultipleRatings: RenderStory = {
  render: () => (
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
        Rate Your Experience
      </h3>
      <RatingGroup defaultValue={4}>Overall Experience</RatingGroup>
      <RatingGroup defaultValue={5}>Customer Service</RatingGroup>
      <RatingGroup defaultValue={3}>Product Quality</RatingGroup>
      <RatingGroup defaultValue={4}>Delivery Speed</RatingGroup>
    </div>
  ),
};

/**
 * Product ratings showcase
 */
export const ProductShowcase: RenderStory = {
  render: () => {
    const products = [
      { name: 'Wireless Headphones', rating: 5 },
      { name: 'Laptop Stand', rating: 4 },
      { name: 'USB-C Hub', rating: 3 },
      { name: 'Mechanical Keyboard', rating: 5 },
    ];

    return (
      <div
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
          Product Ratings
        </h3>
        {products.map((product) => (
          <div
            key={product.name}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              padding: '12px',
              backgroundColor: '#f9fafb',
              borderRadius: '6px',
            }}
          >
            <span
              style={{
                flex: 1,
                fontSize: '14px',
                fontWeight: '500',
                color: '#374151',
              }}
            >
              {product.name}
            </span>
            <RatingGroup defaultValue={product.rating} readOnly />
          </div>
        ))}
      </div>
    );
  },
};

/**
 * Vertical ratings side by side
 */
export const VerticalComparison: RenderStory = {
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: '32px',
        padding: '20px',
        border: '1px solid #e5e7eb',
        borderRadius: '8px',
      }}
    >
      <RatingGroup orientation="vertical" defaultValue={4}>
        Product A
      </RatingGroup>
      <RatingGroup orientation="vertical" defaultValue={3}>
        Product B
      </RatingGroup>
      <RatingGroup orientation="vertical" defaultValue={5}>
        Product C
      </RatingGroup>
    </div>
  ),
};
