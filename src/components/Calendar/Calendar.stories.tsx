import type { Meta, StoryObj } from '@storybook/preact-vite';
import Calendar, { type DateValue } from './Calendar';
import { useState } from 'preact/hooks';
import { CalendarDate } from '@internationalized/date';

const meta: Meta<typeof Calendar> = {
  title: 'Components/Calendar',
  component: Calendar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['single', 'multiple'],
      description: 'The selection mode of the calendar',
    },
    value: {
      control: 'object',
      description: 'The controlled selected date(s)',
    },
    onValueChange: {
      action: 'valueChanged',
      description: 'Function called when the value changes',
    },
    placeholder: {
      control: 'object',
      description: 'The placeholder date',
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
    disabled: {
      control: 'boolean',
      description: 'Whether the calendar is disabled',
    },
    readOnly: {
      control: 'boolean',
      description: 'Whether the calendar is read-only',
    },
    disableDaysOutsideMonth: {
      control: 'boolean',
      description: 'Disable days outside the current month',
    },
    maxDays: {
      control: 'number',
      description: 'Maximum number of selectable days (multiple mode)',
    },
    monthFormat: {
      control: 'select',
      options: ['long', 'short'],
      description: 'Format of month display',
    },
    yearFormat: {
      control: 'select',
      options: ['numeric', '2-digit'],
      description: 'Format of year display',
    },
    children: {
      control: 'text',
      description: 'Custom content above calendar',
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
 * Default calendar with basic configuration.
 */
export const Default: Story = {
  args: {
    children: 'Select a date',
  },
};

/**
 * Calendar with custom min, max, and value.
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
 * Calendar with custom children content.
 */
export const CustomChildren: Story = {
  args: {
    children: 'Book an Appointment',
  },
};

/**
 * Calendar with multiple date selection.
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
 * Disabled calendar.
 */
export const Disabled: Story = {
  args: {
    children: 'Disabled Calendar',
    disabled: true,
    value: [new CalendarDate(2024, 1, 15)],
  },
};

/**
 * Read-only calendar.
 */
export const ReadOnly: Story = {
  args: {
    children: 'Read-only Calendar',
    readOnly: true,
    value: [new CalendarDate(2024, 1, 15)],
  },
};

/**
 * Calendar with week starting on Monday.
 */
export const WeekStartsMonday: Story = {
  args: {
    children: 'Week starts on Monday',
    weekStartsOn: 1,
  },
};

/**
 * Calendar with fixed 6 weeks.
 */
export const FixedWeeks: Story = {
  args: {
    children: 'Fixed 6 Weeks',
    fixedWeeks: true,
  },
};

/**
 * Calendar with narrow weekday format.
 */
export const NarrowWeekdays: Story = {
  args: {
    children: 'Narrow Weekday Format',
    weekdayFormat: 'narrow',
  },
};

/**
 * Calendar with long weekday format.
 */
export const LongWeekdays: Story = {
  args: {
    children: 'Long Weekday Format',
    weekdayFormat: 'long',
  },
};

/**
 * Calendar with disabled days outside month.
 */
export const DisableDaysOutsideMonth: Story = {
  args: {
    children: 'Days Outside Month Disabled',
    disableDaysOutsideMonth: true,
  },
};

/**
 * Calendar with maximum days limit (multiple mode).
 */
export const MaxDaysLimit: Story = {
  args: {
    children: 'Max 3 Days Selection',
    type: 'multiple',
    maxDays: 3,
  },
};

/**
 * Calendar with custom date disabling logic.
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
 * Controlled calendar with state management.
 */
export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState<DateValue[]>([
      new CalendarDate(2024, 1, 15),
    ]);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <Calendar
          value={value}
          onValueChange={(details) => setValue(details.value)}
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
 * Multiple dates controlled calendar.
 */
export const MultipleControlled: Story = {
  render: () => {
    const [value, setValue] = useState<DateValue[]>([]);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <Calendar
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
 * Booking calendar example.
 */
export const BookingCalendar: Story = {
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

        <Calendar
          value={value}
          onValueChange={(details) => setValue(details.value)}
          isDateUnavailable={isDateUnavailable}
          minValue={new CalendarDate(2024, 1, 1)}
          maxValue={new CalendarDate(2024, 1, 31)}
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
 * Event calendar with multiple dates.
 */
export const EventCalendar: Story = {
  render: () => {
    const [value, setValue] = useState<DateValue[]>([
      new CalendarDate(2024, 1, 5),
      new CalendarDate(2024, 1, 12),
      new CalendarDate(2024, 1, 19),
      new CalendarDate(2024, 1, 26),
    ]);

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          padding: '24px',
          backgroundColor: '#ffffff',
          border: '1px solid #e5e7eb',
          borderRadius: '12px',
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
            Team Meeting Days
          </h3>
          <p style={{ margin: '4px 0 0', fontSize: '14px', color: '#6b7280' }}>
            Every Friday in January
          </p>
        </div>

        <Calendar
          type="multiple"
          value={value}
          onValueChange={(details) => setValue(details.value)}
          maxDays={5}
          placeholder={new CalendarDate(2024, 1, 1)}
        />

        <div style={{ fontSize: '13px', color: '#6b7280' }}>
          {value.length} meeting{value.length !== 1 ? 's' : ''} scheduled
        </div>
      </div>
    );
  },
};

/**
 * Calendar with different locales.
 */
export const DifferentLocales: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
      <Calendar children="English (US)" locale="en-US" />
      <Calendar children="Español" locale="es-ES" />
      <Calendar children="Français" locale="fr-FR" />
      <Calendar children="Deutsch" locale="de-DE" />
    </div>
  ),
};

/**
 * Calendar with short month format.
 */
export const ShortMonthFormat: Story = {
  args: {
    children: 'Short Month Format',
    monthFormat: 'short',
  },
};

/**
 * Calendar with long month format.
 */
export const LongMonthFormat: Story = {
  args: {
    children: 'Long Month Format',
    monthFormat: 'long',
  },
};

/**
 * Birthday calendar example.
 */
export const BirthdayCalendar: Story = {
  render: () => {
    const [value, setValue] = useState<DateValue[]>([]);
    const currentYear = new Date().getFullYear();

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          padding: '24px',
          backgroundColor: '#fef3c7',
          borderRadius: '12px',
        }}
      >
        <div>
          <h3
            style={{
              margin: 0,
              fontSize: '18px',
              fontWeight: 600,
              color: '#92400e',
            }}
          >
            🎂 Select Your Birthday
          </h3>
          <p style={{ margin: '4px 0 0', fontSize: '14px', color: '#78350f' }}>
            We'll send you a special gift!
          </p>
        </div>

        <Calendar
          value={value}
          onValueChange={(details) => setValue(details.value)}
          maxValue={new CalendarDate(currentYear - 13, 12, 31)}
          placeholder={new CalendarDate(currentYear - 25, 1, 1)}
        />

        {value.length > 0 && (
          <div
            style={{
              padding: '12px',
              backgroundColor: '#fef9c3',
              color: '#713f12',
              borderRadius: '8px',
              fontSize: '14px',
              border: '1px solid #fde047',
            }}
          >
            Birthday: {value[0].year}-
            {value[0].month.toString().padStart(2, '0')}-
            {value[0].day.toString().padStart(2, '0')}
          </div>
        )}
      </div>
    );
  },
};

/**
 * Calendar variations showcase.
 */
export const Variations: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <Calendar children="Default" />
      <Calendar children="Fixed Weeks" fixedWeeks />
      <Calendar children="Week Starts Monday" weekStartsOn={1} />
      <Calendar children="Multiple Selection" type="multiple" maxDays={5} />
      <Calendar children="Narrow Weekdays" weekdayFormat="narrow" />
    </div>
  ),
};
