import type { Meta, StoryObj } from '@storybook/preact-vite';
import DatePicker, { type DateValue } from './DatePicker';
import { useState } from 'preact/hooks';
import { CalendarDate } from '@internationalized/date';

const meta: Meta<typeof DatePicker> = {
  title: 'Components/DatePicker',
  component: DatePicker,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['single', 'multiple'],
      description: 'The selection mode of the date picker',
    },
    value: {
      control: 'object',
      description: 'The controlled selected date(s)',
    },
    onValueChange: {
      action: 'valueChanged',
      description: 'Function called when the value changes',
    },
    open: {
      control: 'boolean',
      description: 'Whether the date picker is open',
    },
    onOpenChange: {
      action: 'openChanged',
      description: 'Function called when the open state changes',
    },
    placeholder: {
      control: 'object',
      description: 'The placeholder date',
    },
    isDateUnavailable: {
      description: 'Function that determines if a date should be unavailable',
    },
    isDateDisabled: {
      description: 'Function that determines if a date should be disabled',
    },
    required: {
      control: 'boolean',
      description: 'Whether the date picker is required',
    },
    onInvalid: {
      action: 'invalid',
      description: 'Function called when the date picker becomes invalid',
    },
    errorMessageId: {
      control: 'text',
      description: 'The id of the error message element for accessibility',
    },
    disableDaysOutsideMonth: {
      control: 'boolean',
      description: 'Disable days outside the current month',
    },
    closeOnDateSelect: {
      control: 'boolean',
      description: 'Close the date picker when a date is selected',
    },
    preventDeselect: {
      control: 'boolean',
      description: 'Prevent deselecting a date',
    },
    weekStartsOn: {
      control: 'select',
      options: [0, 1, 2, 3, 4, 5, 6],
      description: 'The first day of the week',
    },
    weekdayFormat: {
      control: 'select',
      options: ['narrow', 'short', 'long'],
      description: 'The format of the week days',
    },
    calendarLabel: {
      control: 'text',
      description: 'The accessible label for the calendar',
    },
    fixedWeeks: {
      control: 'boolean',
      description: 'Whether to show fixed 6 weeks',
    },
    minValue: {
      control: 'object',
      description: 'Minimum selectable date',
    },
    maxValue: {
      control: 'object',
      description: 'Maximum selectable date',
    },
    locale: {
      control: 'text',
      description: 'Locale for date formatting',
    },
    numberOfMonths: {
      control: 'number',
      description: 'Number of months to display',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the date picker is disabled',
    },
    readOnly: {
      control: 'boolean',
      description: 'Whether the date picker is read-only',
    },
    hideTimeZone: {
      control: 'boolean',
      description: 'Hide the time zone segment',
    },
    monthFormat: {
      control: 'select',
      options: ['short', 'long', 'narrow', 'numeric', '2-digit'],
      description: 'Format of month display',
    },
    yearFormat: {
      control: 'select',
      options: ['numeric', '2-digit'],
      description: 'Format of year display',
    },
    children: {
      control: 'text',
      description: 'Custom label content',
    },
    name: {
      control: 'text',
      description: 'Name attribute for form submission',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default date picker with basic configuration.
 */
export const Default: Story = {
  args: {
    children: 'Select a date',
  },
};

/**
 * Date picker with custom min, max, and value.
 */
export const WithMinMaxValue: Story = {
  args: {
    children: 'Choose a date in range',
    value: [new CalendarDate(2024, 6, 15)],
    minValue: new CalendarDate(2024, 6, 1),
    maxValue: new CalendarDate(2024, 6, 30),
  },
};

/**
 * Date picker with custom children content.
 */
export const CustomChildren: Story = {
  args: {
    children: 'Book an Appointment',
  },
};

/**
 * Date picker with multiple date selection.
 */
export const MultipleSelection: Story = {
  args: {
    children: 'Select multiple dates',
    type: 'multiple',
    value: [
      new CalendarDate(2024, 1, 15),
      new CalendarDate(2024, 1, 20),
      new CalendarDate(2024, 1, 25),
    ],
  },
};

/**
 * Date picker that closes on date selection.
 */
export const CloseOnSelect: Story = {
  args: {
    children: 'Close on select',
    closeOnDateSelect: true,
  },
};

/**
 * Required date picker.
 */
export const Required: Story = {
  args: {
    children: 'Required Date *',
    required: true,
  },
};

/**
 * Disabled date picker.
 */
export const Disabled: Story = {
  args: {
    children: 'Disabled Date Picker',
    disabled: true,
    value: [new CalendarDate(2024, 1, 15)],
  },
};

/**
 * Read-only date picker.
 */
export const ReadOnly: Story = {
  args: {
    children: 'Read-only Date Picker',
    readOnly: true,
    value: [new CalendarDate(2024, 1, 15)],
  },
};

/**
 * Date picker with week starting on Monday.
 */
export const WeekStartsMonday: Story = {
  args: {
    children: 'Week starts on Monday',
    weekStartsOn: 1,
  },
};

/**
 * Date picker with fixed 6 weeks.
 */
export const FixedWeeks: Story = {
  args: {
    children: 'Fixed 6 Weeks',
    fixedWeeks: true,
  },
};

/**
 * Date picker with narrow weekday format.
 */
export const NarrowWeekdays: Story = {
  args: {
    children: 'Narrow Weekday Format',
    weekdayFormat: 'narrow',
  },
};

/**
 * Date picker with long weekday format.
 */
export const LongWeekdays: Story = {
  args: {
    children: 'Long Weekday Format',
    weekdayFormat: 'long',
  },
};

/**
 * Date picker with disabled days outside month.
 */
export const DisableDaysOutsideMonth: Story = {
  args: {
    children: 'Days Outside Month Disabled',
    disableDaysOutsideMonth: true,
  },
};

/**
 * Date picker with multiple months displayed.
 */
export const MultipleMonths: Story = {
  args: {
    children: 'Multiple Months',
    numberOfMonths: 2,
  },
};

/**
 * Date picker with custom date disabling logic.
 */
export const CustomDisabledDates: Story = {
  args: {
    children: 'Weekends Disabled',
    isDateDisabled: (date: DateValue) => {
      // Disable weekends (Saturday and Sunday)
      const d = new Date(date.year, date.month - 1, date.day);
      return d.getDay() === 0 || d.getDay() === 6;
    },
  },
};

/**
 * Date picker that prevents deselecting dates.
 */
export const PreventDeselect: Story = {
  args: {
    children: 'Prevent Deselect',
    preventDeselect: true,
    value: [new CalendarDate(2024, 1, 15)],
  },
};

/**
 * Controlled date picker with state management.
 */
export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState<DateValue[]>([
      new CalendarDate(2024, 1, 15),
    ]);
    const [open, setOpen] = useState(false);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <DatePicker
          value={value}
          onValueChange={(details) => setValue(details.value)}
          open={open}
          onOpenChange={(details) => setOpen(details.open)}
          children="Select a date"
        />
        <div
          style={{
            fontSize: '14px',
            color: '#6b7280',
            padding: '12px',
            backgroundColor: '#f3f4f6',
            borderRadius: '8px',
          }}
        >
          Selected:{' '}
          {value.length > 0
            ? `${value[0].year}-${value[0].month.toString().padStart(2, '0')}-${value[0].day.toString().padStart(2, '0')}`
            : 'None'}
          <br />
          Open: {open ? 'Yes' : 'No'}
        </div>
        <button
          onClick={() => setValue([new CalendarDate(2024, 1, 1)])}
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
          Set to January 1, 2024
        </button>
      </div>
    );
  },
};

/**
 * Multiple dates controlled date picker.
 */
export const MultipleControlled: Story = {
  render: () => {
    const [value, setValue] = useState<DateValue[]>([]);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <DatePicker
          type="multiple"
          value={value}
          onValueChange={(details) => setValue(details.value)}
          children="Select multiple dates"
        />
        <div
          style={{
            fontSize: '14px',
            color: '#6b7280',
            padding: '12px',
            backgroundColor: '#f3f4f6',
            borderRadius: '8px',
          }}
        >
          Selected dates ({value.length}):
          {value.length > 0 ? (
            <ul style={{ margin: '8px 0 0', paddingLeft: '20px' }}>
              {value.map((date, idx) => (
                <li key={idx}>
                  {date.year}-{date.month.toString().padStart(2, '0')}-
                  {date.day.toString().padStart(2, '0')}
                </li>
              ))}
            </ul>
          ) : (
            ' None'
          )}
        </div>
      </div>
    );
  },
};

/**
 * Booking date picker example.
 */
export const BookingDatePicker: Story = {
  render: () => {
    const [value, setValue] = useState<DateValue[]>([]);
    const [unavailableDates] = useState<DateValue[]>([
      new CalendarDate(2024, 1, 10),
      new CalendarDate(2024, 1, 11),
      new CalendarDate(2024, 1, 24),
    ]);

    const isDateUnavailable = (date: DateValue) => {
      return unavailableDates.some(
        (d) =>
          d.year === date.year && d.month === date.month && d.day === date.day
      );
    };

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          padding: '24px',
          backgroundColor: '#f9fafb',
          borderRadius: '12px',
          maxWidth: '400px',
        }}
      >
        <div>
          <h3
            style={{
              margin: 0,
              fontSize: '18px',
              fontWeight: 600,
              color: '#111827',
            }}
          >
            Book Your Appointment
          </h3>
          <p style={{ margin: '4px 0 0', fontSize: '14px', color: '#6b7280' }}>
            Select an available date
          </p>
        </div>

        <DatePicker
          value={value}
          onValueChange={(details) => setValue(details.value)}
          isDateUnavailable={isDateUnavailable}
          minValue={new CalendarDate(2024, 1, 1)}
          maxValue={new CalendarDate(2024, 1, 31)}
          closeOnDateSelect
          children="Appointment Date"
        />

        {value.length > 0 && (
          <div
            style={{
              padding: '12px',
              backgroundColor: '#d1fae5',
              color: '#065f46',
              borderRadius: '8px',
              fontSize: '14px',
            }}
          >
            ✓ Appointment booked for: {value[0].year}-
            {value[0].month.toString().padStart(2, '0')}-
            {value[0].day.toString().padStart(2, '0')}
          </div>
        )}
      </div>
    );
  },
};

/**
 * Form integration example with validation.
 */
export const FormIntegration: Story = {
  render: () => {
    const [value, setValue] = useState<DateValue[]>([]);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (value.length === 0) {
        setErrorMessage('Please select a date');
      } else {
        setErrorMessage('');

        console.log(
          `Form submitted with date: ${value[0].year}-${value[0].month}-${value[0].day}`
        );
      }
    };

    return (
      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          padding: '24px',
          backgroundColor: '#ffffff',
          border: '1px solid #e5e7eb',
          borderRadius: '12px',
          maxWidth: '400px',
        }}
      >
        <DatePicker
          value={value}
          onValueChange={(details) => {
            setValue(details.value);
            if (details.value.length > 0) {
              setErrorMessage('');
            }
          }}
          required
          name="appointmentDate"
          errorMessageId={errorMessage ? 'date-error' : undefined}
          children="Select Date *"
        />

        {errorMessage && (
          <div
            id="date-error"
            style={{
              padding: '8px 12px',
              backgroundColor: '#fef2f2',
              color: '#dc2626',
              borderRadius: '6px',
              fontSize: '14px',
              border: '1px solid #fecaca',
            }}
          >
            {errorMessage}
          </div>
        )}

        <button
          type="submit"
          style={{
            padding: '10px 16px',
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
      </form>
    );
  },
};

/**
 * Date picker with different locales.
 */
export const DifferentLocales: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
      <DatePicker children="English (US)" locale="en-US" />
      <DatePicker children="Español" locale="es-ES" />
      <DatePicker children="Français" locale="fr-FR" />
      <DatePicker children="Deutsch" locale="de-DE" />
    </div>
  ),
};

/**
 * Date picker variations showcase.
 */
export const Variations: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <DatePicker children="Default" />
      <DatePicker children="Fixed Weeks" fixedWeeks />
      <DatePicker children="Week Starts Monday" weekStartsOn={1} />
      <DatePicker children="Multiple Selection" type="multiple" />
      <DatePicker children="Close on Select" closeOnDateSelect />
      <DatePicker children="Narrow Weekdays" weekdayFormat="narrow" />
    </div>
  ),
};
