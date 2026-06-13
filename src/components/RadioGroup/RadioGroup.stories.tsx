import type { Meta, StoryObj } from '@storybook/preact-vite';
import { fn } from 'storybook/test';
import { useState } from 'preact/hooks';
import RadioGroup, { type RadioOption } from './RadioGroup';

const meta = {
  title: 'Components/RadioGroup',
  component: RadioGroup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    onValueChange: {
      description: 'Event handler called when the selected value changes',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the radio group is disabled',
    },
    required: {
      control: 'boolean',
      description: 'Whether the radio group is required',
    },
    name: {
      control: 'text',
      description: 'The name attribute for form submission',
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: "The radio group's orientation",
    },
    readOnly: {
      control: 'boolean',
      description: 'Whether the radio group is read-only',
    },
    children: {
      control: 'text',
      description: 'Label content to be rendered for the radio group',
    },
    value: {
      control: 'text',
      description: 'The controlled value of the radio group',
    },
    defaultValue: {
      control: 'text',
      description: 'The default value when uncontrolled',
    },
    options: {
      control: 'object',
      description: 'Array of radio options',
    },
  },
  args: {
    onValueChange: fn(),
  },
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;
type RenderStory = Omit<Story, 'args'> & { args?: Partial<Story['args']> };

const frameworks: RadioOption[] = [
  { label: 'React', value: 'react' },
  { label: 'Vue', value: 'vue' },
  { label: 'Angular', value: 'angular' },
  { label: 'Svelte', value: 'svelte' },
];

const sizes: RadioOption[] = [
  { label: 'Small', value: 's' },
  { label: 'Medium', value: 'm' },
  { label: 'Large', value: 'l' },
  { label: 'Extra Large', value: 'xl' },
];

const colors: RadioOption[] = [
  { label: 'Red', value: 'red' },
  { label: 'Blue', value: 'blue' },
  { label: 'Green', value: 'green' },
  { label: 'Yellow', value: 'yellow' },
];

/**
 * Default radio group with vertical layout
 */
export const Default: Story = {
  args: {
    options: frameworks,
  },
};

/**
 * Radio group with a label
 */
export const WithLabel: Story = {
  args: {
    options: frameworks,
    children: 'Select a framework',
  },
};

/**
 * Disabled radio group
 */
export const Disabled: Story = {
  args: {
    options: frameworks,
    disabled: true,
    defaultValue: 'react',
    children: 'Disabled radio group',
  },
};

/**
 * Read-only radio group
 */
export const ReadOnly: Story = {
  args: {
    options: frameworks,
    readOnly: true,
    defaultValue: 'vue',
    children: 'Read-only selection',
  },
};

/**
 * Required radio group
 */
export const Required: Story = {
  args: {
    options: frameworks,
    required: true,
    children: 'Required selection',
  },
};

/**
 * Radio group with name attribute
 */
export const WithName: Story = {
  args: {
    options: frameworks,
    name: 'framework',
    children: 'Framework preference',
  },
};

/**
 * Horizontal orientation
 */
export const Horizontal: Story = {
  args: {
    options: sizes,
    orientation: 'horizontal',
    children: 'Select size',
  },
};

/**
 * Vertical orientation (default)
 */
export const Vertical: Story = {
  args: {
    options: frameworks,
    orientation: 'vertical',
    children: 'Select framework',
  },
};

/**
 * Radio group with disabled items
 */
export const WithDisabledItems: Story = {
  args: {
    options: [
      { label: 'React', value: 'react' },
      { label: 'Vue', value: 'vue' },
      { label: 'Angular', value: 'angular', disabled: true },
      { label: 'Svelte', value: 'svelte' },
      { label: 'Solid', value: 'solid', disabled: true },
    ],
    children: 'Select framework',
  },
};

/**
 * Radio group with pre-selected value
 */
export const WithDefaultValue: Story = {
  args: {
    options: frameworks,
    defaultValue: 'react',
    children: 'Framework preference',
  },
};

/**
 * Radio group with many options
 */
export const ManyOptions: Story = {
  args: {
    options: [
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
    ],
    children: 'Select framework',
  },
};

/**
 * Radio group with change handler
 */
export const WithChangeHandler: RenderStory = {
  render: () => {
    const RadioWithHandler = () => {
      const [message, setMessage] = useState('');

      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <RadioGroup
            options={frameworks}
            onValueChange={(details) => {
              if (details.value) {
                setMessage(`You selected: ${details.value}`);
              }
            }}
          >
            Select a framework
          </RadioGroup>
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

    return <RadioWithHandler />;
  },
};

/**
 * Radio group in a form
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
      <RadioGroup options={frameworks} name="framework" required>
        Preferred Framework (required)
      </RadioGroup>
      <RadioGroup options={sizes} name="size" required>
        T-Shirt Size (required)
      </RadioGroup>
      <RadioGroup options={colors} name="color">
        Favorite Color (optional)
      </RadioGroup>
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
 * Multiple radio groups
 */
export const MultipleGroups: RenderStory = {
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
      <h3 style={{ margin: '0 0 8px 0', fontSize: '16px' }}>Configuration</h3>
      <RadioGroup options={frameworks} defaultValue="react">
        Framework
      </RadioGroup>
      <RadioGroup options={sizes} defaultValue="m">
        Size
      </RadioGroup>
      <RadioGroup options={colors} defaultValue="blue">
        Color
      </RadioGroup>
    </div>
  ),
};

/**
 * Horizontal radio groups
 */
export const HorizontalGroups: RenderStory = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        padding: '20px',
        border: '1px solid #e5e7eb',
        borderRadius: '8px',
        minWidth: '500px',
      }}
    >
      <h3 style={{ margin: '0 0 8px 0', fontSize: '16px' }}>Quick Selection</h3>
      <RadioGroup options={sizes} orientation="horizontal">
        Size
      </RadioGroup>
      <RadioGroup
        options={[
          { label: 'Yes', value: 'yes' },
          { label: 'No', value: 'no' },
          { label: 'Maybe', value: 'maybe' },
        ]}
        orientation="horizontal"
      >
        Subscribe to newsletter?
      </RadioGroup>
    </div>
  ),
};

/**
 * Survey example
 */
export const Survey: RenderStory = {
  render: () => {
    const SurveyForm = () => {
      const [answers, setAnswers] = useState<Record<string, string>>({});

      const questions = [
        {
          id: 'satisfaction',
          label: 'How satisfied are you with our product?',
          options: [
            { label: 'Very Satisfied', value: '5' },
            { label: 'Satisfied', value: '4' },
            { label: 'Neutral', value: '3' },
            { label: 'Dissatisfied', value: '2' },
            { label: 'Very Dissatisfied', value: '1' },
          ],
        },
        {
          id: 'recommend',
          label: 'Would you recommend us to a friend?',
          options: [
            { label: 'Definitely', value: 'definitely' },
            { label: 'Probably', value: 'probably' },
            { label: 'Not Sure', value: 'not-sure' },
            { label: 'Probably Not', value: 'probably-not' },
            { label: 'Definitely Not', value: 'definitely-not' },
          ],
        },
      ];

      return (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            padding: '20px',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            minWidth: '500px',
          }}
        >
          <h3 style={{ margin: '0 0 8px 0', fontSize: '18px' }}>
            Customer Survey
          </h3>
          {questions.map((question) => (
            <RadioGroup
              key={question.id}
              options={question.options}
              value={answers[question.id]}
              onValueChange={(details) => {
                if (details.value) {
                  setAnswers({ ...answers, [question.id]: details.value });
                }
              }}
            >
              {question.label}
            </RadioGroup>
          ))}
          <div
            style={{
              padding: '12px',
              backgroundColor: '#f3f4f6',
              borderRadius: '6px',
              fontSize: '14px',
            }}
          >
            <strong>Answers:</strong>
            <pre style={{ margin: '8px 0 0 0', fontSize: '12px' }}>
              {JSON.stringify(answers, null, 2)}
            </pre>
          </div>
        </div>
      );
    };

    return <SurveyForm />;
  },
};
