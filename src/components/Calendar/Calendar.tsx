import styled, { css } from 'styled-components';
import { useState } from 'preact/hooks';
import type { ReactNode } from 'react';
import {
  CalendarDate,
  getLocalTimeZone,
  today,
} from '@internationalized/date';
import type { DateValue } from '@internationalized/date';

export type { DateValue };

export interface CalendarProps {
  type?: 'single' | 'multiple';
  value?: DateValue[];
  onValueChange?: (details: {
    value: DateValue[];
    valueAsString: string[];
  }) => void;
  placeholder?: DateValue;
  weekStartsOn?: number;
  weekdayFormat?: 'narrow' | 'short' | 'long';
  calendarLabel?: string;
  fixedWeeks?: boolean;
  isDateDisabled?: (date: DateValue) => boolean;
  isDateUnavailable?: (date: DateValue, locale: string) => boolean;
  minValue?: DateValue;
  maxValue?: DateValue;
  locale?: string;
  disabled?: boolean;
  readOnly?: boolean;
  disableDaysOutsideMonth?: boolean;
  maxDays?: number;
  monthFormat?: 'short' | 'long';
  yearFormat?: 'numeric' | '2-digit';
  children?: ReactNode;
  name?: string;
}

const CalendarRoot = styled.div`
  display: inline-block;
  padding: ${({ theme }) => theme.spacing[4]};
  border: 1px solid ${({ theme }) => theme.color.slate200};
  border-radius: ${({ theme }) => theme.spacing[3]};
  background-color: ${({ theme }) => theme.color.white};
`;

const CalendarHeading = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing[3]};
  font-size: ${({ theme }) => theme.fontSize[16]};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  color: ${({ theme }) => theme.color.slate900};
`;

const ViewControl = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing[4]};
  gap: ${({ theme }) => theme.spacing[2]};
`;

const ArrowTrigger = styled.button<{ $disabled: boolean }>`
  padding: ${({ theme }) => theme.spacing[2]};
  border: none;
  background: transparent;
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
  font-size: ${({ theme }) => theme.fontSize[16]};
  color: ${({ $disabled, theme }) =>
    $disabled ? theme.color.slate400 : theme.color.blue500};
  border-radius: ${({ theme }) => theme.spacing[2]};
  transition: background-color 0.2s;
`;

const ViewTrigger = styled.button<{ $notInteractive: boolean }>`
  flex: 1;
  padding: ${({ theme }) => `${theme.spacing[2]} ${theme.spacing[3]}`};
  border: none;
  background: transparent;
  cursor: ${({ $notInteractive }) => ($notInteractive ? 'default' : 'pointer')};
  font-size: ${({ theme }) => theme.fontSize[14]};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  color: ${({ theme }) => theme.color.slate900};
  border-radius: ${({ theme }) => theme.spacing[2]};
  transition: background-color 0.2s;
`;

const CalendarTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: ${({ theme }) => theme.spacing[1]};
`;

const WeekdayTh = styled.th`
  padding: ${({ theme }) => theme.spacing[2]};
  font-size: ${({ theme }) => theme.fontSize[12]};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  color: ${({ theme }) => theme.color.slate500};
  text-align: center;
  text-transform: uppercase;
`;

const DayTd = styled.td`
  padding: 0;
`;

const DayButton = styled.button<{
  $selected: boolean;
  $disabled: boolean;
  $outsideMonth: boolean;
  $notClickable: boolean;
}>`
  width: ${({ theme }) => theme.spacing[10]};
  height: ${({ theme }) => theme.spacing[10]};
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: ${({ theme }) => theme.spacing[2]};
  font-size: ${({ theme }) => theme.fontSize[14]};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  transition: all 0.2s;
  cursor: ${({ $notClickable }) => ($notClickable ? 'not-allowed' : 'pointer')};
  background: ${({ $selected }) => ($selected ? 'inherit' : 'transparent')};
  background-color: ${({ $selected, theme }) =>
    $selected ? theme.color.blue500 : 'transparent'};
  color: ${({ $selected, $disabled, $outsideMonth, theme }) =>
    $selected
      ? theme.color.white
      : $disabled
        ? theme.color.slate300
        : $outsideMonth
          ? theme.color.slate400
          : theme.color.slate700};
  ${({ $disabled, $selected, theme }) =>
    !$disabled &&
    !$selected &&
    css`
      &:hover {
        background-color: ${theme.color.slate100};
      }
    `}
`;

const toComparable = (date: DateValue | undefined) =>
  date ? date.year * 10000 + date.month * 100 + date.day : null;

const sameDay = (a: DateValue, b: DateValue) =>
  a.year === b.year && a.month === b.month && a.day === b.day;

export default function Calendar({
  type = 'single',
  value,
  onValueChange,
  placeholder,
  weekStartsOn = 0,
  weekdayFormat = 'short',
  fixedWeeks = false,
  isDateDisabled,
  isDateUnavailable,
  minValue,
  maxValue,
  locale = 'en-US',
  disabled = false,
  readOnly = false,
  disableDaysOutsideMonth = false,
  maxDays,
  monthFormat = 'long',
  children,
  name,
}: CalendarProps) {
  const initialFocus =
    (value && value[0]) ?? placeholder ?? today(getLocalTimeZone());
  const [focused, setFocused] = useState(
    new CalendarDate(initialFocus.year, initialFocus.month, 1),
  );

  const minComparable = toComparable(minValue);
  const maxComparable = toComparable(maxValue);

  const weekdayLabels = Array.from({ length: 7 }, (_, i) => {
    const dow = (weekStartsOn + i) % 7;
    const reference = new Date(2024, 0, 7 + dow);
    return new Intl.DateTimeFormat(locale, { weekday: weekdayFormat }).format(reference);
  });

  const headerLabel = new Intl.DateTimeFormat(locale, {
    month: monthFormat,
    year: 'numeric',
  }).format(new Date(focused.year, focused.month - 1, 1));

  const firstWeekdayOfMonth = new Date(focused.year, focused.month - 1, 1).getDay();
  const leadingDays = (firstWeekdayOfMonth - weekStartsOn + 7) % 7;
  const daysInMonth = new Date(focused.year, focused.month, 0).getDate();
  const firstVisible = focused.subtract({ days: leadingDays });
  const weekCount = fixedWeeks
    ? 6
    : Math.ceil((leadingDays + daysInMonth) / 7);

  const weeks: CalendarDate[][] = Array.from({ length: weekCount }, (_, w) =>
    Array.from({ length: 7 }, (_, d) => firstVisible.add({ days: w * 7 + d })),
  );

  const isSelected = (day: DateValue) => !!value?.some((v) => sameDay(v, day));

  const changeMonth = (delta: number) => {
    if (disabled) return;
    setFocused(focused.add({ months: delta }));
  };

  const selectDay = (day: CalendarDate, outsideMonth: boolean) => {
    if (disabled || readOnly) return;
    if (outsideMonth && disableDaysOutsideMonth) return;

    let nextValue: DateValue[];
    if (type === 'multiple') {
      const exists = value?.some((v) => sameDay(v, day));
      nextValue = exists
        ? (value ?? []).filter((v) => !sameDay(v, day))
        : [...(value ?? []), day];
      if (maxDays && nextValue.length > maxDays) return;
    } else {
      nextValue = [day];
    }

    onValueChange?.({
      value: nextValue,
      valueAsString: nextValue.map((v) => v.toString()),
    });
  };

  return (
    <CalendarRoot>
      {children && <CalendarHeading>{children}</CalendarHeading>}

      <ViewControl>
        <ArrowTrigger
          type="button"
          aria-label="Previous month"
          $disabled={disabled}
          disabled={disabled}
          onClick={() => changeMonth(-1)}
        >
          ←
        </ArrowTrigger>

        <ViewTrigger
          type="button"
          $notInteractive={disabled || readOnly}
          disabled={disabled || readOnly}
        >
          {headerLabel}
        </ViewTrigger>

        <ArrowTrigger
          type="button"
          aria-label="Next month"
          $disabled={disabled}
          disabled={disabled}
          onClick={() => changeMonth(1)}
        >
          →
        </ArrowTrigger>
      </ViewControl>

      <CalendarTable role="grid">
        <thead>
          <tr>
            {weekdayLabels.map((weekDay, id) => (
              <WeekdayTh key={id} scope="col">
                {weekDay}
              </WeekdayTh>
            ))}
          </tr>
        </thead>

        <tbody>
          {weeks.map((week, weekId) => (
            <tr key={weekId}>
              {week.map((day, dayId) => {
                const outsideMonth = day.month !== focused.month;
                const comparable = toComparable(day)!;
                const outOfRange =
                  (minComparable !== null && comparable < minComparable) ||
                  (maxComparable !== null && comparable > maxComparable);
                const isDayDisabled =
                  (isDateDisabled ? isDateDisabled(day) : false) ||
                  (isDateUnavailable ? isDateUnavailable(day, locale) : false) ||
                  outOfRange ||
                  (outsideMonth && disableDaysOutsideMonth);
                const selected = isSelected(day);
                const notClickable = disabled || readOnly || isDayDisabled;

                return (
                  <DayTd key={dayId}>
                    <DayButton
                      type="button"
                      aria-selected={selected}
                      aria-disabled={isDayDisabled || undefined}
                      disabled={notClickable}
                      onClick={() => selectDay(day, outsideMonth)}
                      $selected={selected}
                      $disabled={isDayDisabled}
                      $outsideMonth={outsideMonth}
                      $notClickable={notClickable}
                    >
                      {day.day}
                    </DayButton>
                  </DayTd>
                );
              })}
            </tr>
          ))}
        </tbody>
      </CalendarTable>

      {name && (
        <input
          type="hidden"
          name={name}
          value={value?.map((v) => v.toString()).join(',') ?? ''}
        />
      )}
    </CalendarRoot>
  );
}
