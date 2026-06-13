import type { Meta, StoryObj } from '@storybook/preact-vite';
import TimeField from './TimeField';
import { useState } from 'preact/hooks';

const meta: Meta<typeof TimeField> = {
  title: 'Components/Form/TimeField',
  component: TimeField,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'text',
      description: 'The controlled value of the time field',
    },
    onValueChange: {
      action: 'valueChanged',
      description: 'Function called when the value changes',
    },
    placeholder: {
      control: 'text',
      description: 'The placeholder text',
    },
    required: {
      control: 'boolean',
      description: 'Whether the time field is required',
    },
    onInvalid: {
      action: 'invalid',
      description: 'Function called when invalid',
    },
    errorMessageId: {
      control: 'text',
      description: 'ID of error message element',
    },
    hourCycle: {
      control: 'select',
      options: [12, 24],
      description: 'Hour cycle format',
    },
    hideTimeZone: {
      control: 'boolean',
      description: 'Whether to hide the time zone',
    },
    minValue: {
      control: 'text',
      description: 'Minimum time value',
    },
    maxValue: {
      control: 'text',
      description: 'Maximum time value',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the time field is disabled',
    },
    readOnly: {
      control: 'boolean',
      description: 'Whether the time field is read-only',
    },
    children: {
      control: 'text',
      description: 'Custom label content',
    },
    name: {
      control: 'text',
      description: 'Name attribute for form submission',
    },
    allowSeconds: {
      control: 'boolean',
      description: 'Whether to show seconds',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default time field with basic configuration.
 */
export const Default: Story = {
  args: {
    children: 'Select Time',
    placeholder: 'Enter time',
  },
};

/**
 * Time field with custom min, max, and value.
 */
export const WithMinMaxValue: Story = {
  args: {
    children: 'Meeting Time',
    value: '14:30',
    minValue: '09:00',
    maxValue: '18:00',
  },
};

/**
 * Time field with custom children content.
 */
export const CustomChildren: Story = {
  args: {
    children: 'Appointment Start Time',
    placeholder: 'Select your preferred time',
  },
};

/**
 * Required time field.
 */
export const Required: Story = {
  args: {
    children: 'Required Time',
    required: true,
  },
};

/**
 * Disabled time field.
 */
export const Disabled: Story = {
  args: {
    children: 'Disabled Time',
    value: '10:30',
    disabled: true,
  },
};

/**
 * Read-only time field.
 */
export const ReadOnly: Story = {
  args: {
    children: 'Read-only Time',
    value: '15:45',
    readOnly: true,
  },
};

/**
 * Time field with 12-hour format.
 */
export const TwelveHourFormat: Story = {
  args: {
    children: '12-Hour Format',
    hourCycle: 12,
    value: '14:30',
  },
};

/**
 * Time field with 24-hour format.
 */
export const TwentyFourHourFormat: Story = {
  args: {
    children: '24-Hour Format',
    hourCycle: 24,
    value: '14:30',
  },
};

/**
 * Time field with seconds enabled.
 */
export const WithSeconds: Story = {
  args: {
    children: 'Time with Seconds',
    allowSeconds: true,
    value: '10:30:45',
  },
};

/**
 * Time field with name attribute for form submission.
 */
export const WithName: Story = {
  args: {
    children: 'Meeting Time',
    name: 'meeting-time',
  },
};

/**
 * Controlled time field with state management.
 */
export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState('09:00');

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          minWidth: '300px',
        }}
      >
        <TimeField
          value={value}
          onValueChange={(details) => setValue(details.value)}
          children="Select Time"
        />
        <div style={{ fontSize: '14px', color: '#6b7280' }}>
          Current time: {value || '(empty)'}
        </div>
        <button
          onClick={() => setValue('12:00')}
          style={{
            padding: '8px 16px',
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px',
          }}
        >
          Set to 12:00
        </button>
      </div>
    );
  },
};

/**
 * Time field with validation.
 */
export const WithValidation: Story = {
  render: () => {
    const [value, setValue] = useState('');
    const [error, setError] = useState('');

    const handleChange = (details: {
      value: string;
      valueAsTime: { hour: number; minute: number; second?: number };
    }) => {
      setValue(details.value);

      // Validate: time must be between 9 AM and 5 PM
      if (details.valueAsTime.hour < 9 || details.valueAsTime.hour >= 17) {
        setError('Time must be between 9:00 AM and 5:00 PM');
      } else {
        setError('');
      }
    };

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          minWidth: '300px',
        }}
      >
        <TimeField
          value={value}
          onValueChange={handleChange}
          minValue="09:00"
          maxValue="17:00"
          children="Business Hours"
          required
          errorMessageId="time-error"
        />
        {error && (
          <div
            id="time-error"
            style={{
              padding: '8px 12px',
              backgroundColor: '#fee2e2',
              color: '#991b1b',
              borderRadius: '6px',
              fontSize: '13px',
            }}
          >
            {error}
          </div>
        )}
      </div>
    );
  },
};

/**
 * Form submission example with time field.
 */
export const FormSubmission: Story = {
  render: () => {
    const [submittedTime, setSubmittedTime] = useState('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const time = formData.get('appointment-time') as string;
      setSubmittedTime(time);
    };

    return (
      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          padding: '24px',
          border: '1px solid #e5e7eb',
          borderRadius: '8px',
          minWidth: '350px',
        }}
      >
        <TimeField
          name="appointment-time"
          required
          children="Appointment Time"
          minValue="08:00"
          maxValue="20:00"
        />
        <button
          type="submit"
          style={{
            padding: '10px 20px',
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: 500,
          }}
        >
          Submit
        </button>
        {submittedTime && (
          <div
            style={{
              padding: '12px',
              backgroundColor: '#f3f4f6',
              borderRadius: '6px',
              fontSize: '14px',
            }}
          >
            Submitted time: <strong>{submittedTime}</strong>
          </div>
        )}
      </form>
    );
  },
};

/**
 * Multiple time fields for scheduling.
 */
export const ScheduleForm: Story = {
  render: () => {
    const [startTime, setStartTime] = useState('09:00');
    const [endTime, setEndTime] = useState('17:00');

    const calculateDuration = () => {
      const [startHour, startMin] = startTime.split(':').map(Number);
      const [endHour, endMin] = endTime.split(':').map(Number);
      const hours = Math.abs(endHour - startHour);
      const minutes = Math.abs(endMin - startMin);
      return { hours, minutes };
    };

    const duration = calculateDuration();

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          padding: '24px',
          backgroundColor: '#f9fafb',
          borderRadius: '12px',
          minWidth: '400px',
        }}
      >
        <h3
          style={{
            margin: 0,
            fontSize: '18px',
            fontWeight: 600,
            color: '#111827',
          }}
        >
          Schedule Your Day
        </h3>

        <TimeField
          value={startTime}
          onValueChange={(details) => setStartTime(details.value)}
          children="Start Time"
          minValue="00:00"
          maxValue="23:59"
        />

        <TimeField
          value={endTime}
          onValueChange={(details) => setEndTime(details.value)}
          children="End Time"
          minValue="00:00"
          maxValue="23:59"
        />

        <div
          style={{
            padding: '12px',
            backgroundColor: '#dbeafe',
            color: '#1e40af',
            borderRadius: '8px',
            fontSize: '14px',
          }}
        >
          Duration: {duration.hours} hours {duration.minutes} minutes
        </div>
      </div>
    );
  },
};

/**
 * Time fields with different configurations.
 */
export const Variations: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        minWidth: '350px',
      }}
    >
      <TimeField children="Default" />
      <TimeField children="With Seconds" allowSeconds />
      <TimeField children="12-Hour Format" hourCycle={12} />
      <TimeField children="Required" required />
      <TimeField children="Disabled" disabled value="10:30" />
      <TimeField children="Read-only" readOnly value="15:45" />
    </div>
  ),
};

/**
 * Business hours time picker.
 */
export const BusinessHours: Story = {
  render: () => {
    const [openTime, setOpenTime] = useState('09:00');
    const [closeTime, setCloseTime] = useState('17:30');

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          padding: '32px',
          backgroundColor: '#ffffff',
          border: '1px solid #e5e7eb',
          borderRadius: '12px',
          minWidth: '400px',
        }}
      >
        <div>
          <h3
            style={{
              margin: 0,
              fontSize: '20px',
              fontWeight: 600,
              color: '#111827',
            }}
          >
            Business Hours
          </h3>
          <p style={{ margin: '4px 0 0', fontSize: '14px', color: '#6b7280' }}>
            Set your operating hours
          </p>
        </div>

        <TimeField
          value={openTime}
          onValueChange={(details) => setOpenTime(details.value)}
          children="Opening Time"
          minValue="06:00"
          maxValue="12:00"
        />

        <TimeField
          value={closeTime}
          onValueChange={(details) => setCloseTime(details.value)}
          children="Closing Time"
          minValue="12:00"
          maxValue="23:59"
        />

        <div
          style={{
            padding: '16px',
            backgroundColor: '#f0fdf4',
            border: '1px solid #86efac',
            borderRadius: '8px',
          }}
        >
          <div
            style={{
              fontSize: '14px',
              fontWeight: 600,
              color: '#166534',
              marginBottom: '4px',
            }}
          >
            Summary
          </div>
          <div style={{ fontSize: '13px', color: '#15803d' }}>
            Open: {openTime}
            <br />
            Close: {closeTime}
          </div>
        </div>
      </div>
    );
  },
};
