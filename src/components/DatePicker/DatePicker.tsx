import styled, { css } from 'styled-components';
import { useEffect, useId, useRef, useState } from 'preact/hooks';
import type { ReactNode } from 'react';
import {
  CalendarDate,
  getLocalTimeZone,
  today,
} from '@internationalized/date';
import type { DateValue } from '@internationalized/date';

export type { DateValue };

export interface DatePickerProps {
  type?: 'single' | 'multiple';
  value?: DateValue[];
  onValueChange?: (details: {
    value: DateValue[];
    valueAsString: string[];
  }) => void;
  open?: boolean;
  onOpenChange?: (details: { open: boolean }) => void;
  placeholder?: DateValue;
  isDateUnavailable?: (date: DateValue, locale: string) => boolean;
  isDateDisabled?: (date: DateValue) => boolean;
  required?: boolean;
  onInvalid?: (details: { reason: string }) => void;
  errorMessageId?: string;
  disableDaysOutsideMonth?: boolean;
  closeOnDateSelect?: boolean;
  preventDeselect?: boolean;
  weekStartsOn?: number;
  weekdayFormat?: 'narrow' | 'short' | 'long';
  calendarLabel?: string;
  fixedWeeks?: boolean;
  minValue?: DateValue;
  maxValue?: DateValue;
  locale?: string;
  numberOfMonths?: number;
  disabled?: boolean;
  readOnly?: boolean;
  hideTimeZone?: boolean;
  monthFormat?:
    | 'short'
    | 'long'
    | 'narrow'
    | 'numeric'
    | '2-digit'
    | ((month: number) => string);
  yearFormat?: 'numeric' | '2-digit' | ((year: number) => string);
  children?: ReactNode;
  name?: string;
}

const Root = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[2]};
  width: 100%;
  max-width: 320px;
  position: relative;
`;

const PickerLabel = styled.span`
  font-size: ${({ theme }) => theme.fontSize[14]};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ theme }) => theme.color.slate700};
  margin-bottom: ${({ theme }) => theme.spacing[1]};
`;

const InputRow = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[1]};
  align-items: center;
  position: relative;
`;

const DateInput = styled.input<{ $disabled: boolean; $readOnly: boolean }>`
  flex: 1;
  padding: ${({ theme }) => `${theme.spacing[2]} ${theme.spacing[3]}`};
  font-size: ${({ theme }) => theme.fontSize[14]};
  border: 1px solid ${({ theme }) => theme.color.slate300};
  border-radius: 6px;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
  background-color: ${({ $disabled, theme }) =>
    $disabled ? theme.color.slate100 : theme.color.white};
  cursor: ${({ $disabled, $readOnly }) =>
    $disabled ? 'not-allowed' : $readOnly ? 'default' : 'text'};
  ${({ $disabled, $readOnly, theme }) =>
    !$disabled &&
    !$readOnly &&
    css`
      &:focus {
        border-color: ${theme.color.blue500};
        box-shadow: 0 0 0 3px ${theme.color.blueTr10};
      }
    `}
`;

const CalendarToggle = styled.button<{ $disabled: boolean }>`
  padding: ${({ theme }) => `${theme.spacing[2]} ${theme.spacing[3]}`};
  font-size: ${({ theme }) => theme.fontSize[14]};
  border: 1px solid ${({ theme }) => theme.color.slate300};
  border-radius: 6px;
  background-color: ${({ $disabled, theme }) =>
    $disabled ? theme.color.slate100 : theme.color.white};
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
  transition: background-color 0.2s, border-color 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  ${({ $disabled, theme }) =>
    !$disabled &&
    css`
      &:hover {
        background-color: ${theme.color.slate50};
        border-color: ${theme.color.slate400};
      }
    `}
`;

const ClearButton = styled.button<{ $disabled: boolean }>`
  padding: 6px 10px;
  font-size: ${({ theme }) => theme.fontSize[12]};
  border: 1px solid ${({ theme }) => theme.color.slate300};
  border-radius: 6px;
  background-color: ${({ $disabled, theme }) =>
    $disabled ? theme.color.slate100 : theme.color.white};
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
  transition: background-color 0.2s, border-color 0.2s, color 0.2s;
  color: ${({ theme }) => theme.color.slate500};
  ${({ $disabled, theme }) =>
    !$disabled &&
    css`
      &:hover {
        background-color: ${theme.color.pink50};
        border-color: ${theme.color.pink600};
        color: ${theme.color.pink600};
      }
    `}
`;

const Popover = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: ${({ theme }) => theme.spacing[1]};
  background-color: ${({ theme }) => theme.color.white};
  border: 1px solid ${({ theme }) => theme.color.slate200};
  border-radius: ${({ theme }) => theme.spacing[3]};
  box-shadow: ${({ theme }) =>
    `0 10px 15px -3px ${theme.color.blackTr10}, 0 4px 6px -2px ${theme.color.blackTr05}`};
  padding: ${({ theme }) => theme.spacing[4]};
  z-index: 1000;
  min-width: 280px;
`;

const ViewControl = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing[3]};
`;

const NavArrow = styled.button`
  padding: ${({ theme }) => `6px ${theme.spacing[3]}`};
  font-size: ${({ theme }) => theme.fontSize[14]};
  border: 1px solid ${({ theme }) => theme.color.slate300};
  border-radius: 6px;
  background-color: ${({ theme }) => theme.color.white};
  cursor: pointer;
  transition: background-color 0.2s;
  &:hover {
    background-color: ${({ theme }) => theme.color.slate100};
  }
`;

const ViewTrigger = styled.button`
  padding: ${({ theme }) => `6px ${theme.spacing[3]}`};
  font-size: ${({ theme }) => theme.fontSize[14]};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  border: none;
  background: none;
  cursor: pointer;
  color: ${({ theme }) => theme.color.slate900};
`;

const CalendarTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const WeekdayTh = styled.th`
  padding: ${({ theme }) => theme.spacing[2]};
  font-size: ${({ theme }) => theme.fontSize[12]};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  color: ${({ theme }) => theme.color.slate500};
  text-align: center;
`;

const DayTd = styled.td<{ $halfSpacing: string }>`
  padding: ${({ $halfSpacing }) => $halfSpacing};
`;

const DayButton = styled.button<{
  $selected: boolean;
  $disabled: boolean;
  $outsideMonth: boolean;
}>`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ theme }) => theme.fontSize[14]};
  border: none;
  border-radius: 6px;
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
  background-color: ${({ $selected, theme }) =>
    $selected ? theme.color.blue500 : 'transparent'};
  color: ${({ $selected, $outsideMonth, theme }) =>
    $selected
      ? theme.color.white
      : $outsideMonth
        ? theme.color.slate400
        : theme.color.slate700};
  transition: background-color 0.2s, color 0.2s;
  opacity: ${({ $disabled }) => ($disabled ? 0.4 : 1)};
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

const DatePicker = ({
  type = 'single',
  value,
  onValueChange,
  open,
  onOpenChange,
  placeholder,
  isDateUnavailable,
  isDateDisabled,
  required = false,
  errorMessageId,
  disableDaysOutsideMonth = false,
  closeOnDateSelect = false,
  weekStartsOn = 0,
  weekdayFormat = 'short',
  fixedWeeks = false,
  minValue,
  maxValue,
  locale = 'en-US',
  disabled = false,
  readOnly = false,
  monthFormat = 'long',
  children,
  name,
}: DatePickerProps) => {
  const labelId = useId();
  const rootRef = useRef<HTMLDivElement>(null);

  const [internalOpen, setInternalOpen] = useState(false);
  const isOpenControlled = open !== undefined;
  const isOpen = isOpenControlled ? open : internalOpen;

  const initialFocus =
    (value && value[0]) ?? placeholder ?? today(getLocalTimeZone());
  const [focused, setFocused] = useState(
    new CalendarDate(initialFocus.year, initialFocus.month, 1),
  );

  const setOpen = (next: boolean) => {
    if (!isOpenControlled) setInternalOpen(next);
    onOpenChange?.({ open: next });
  };

  useEffect(() => {
    if (!isOpen) return;
    const handlePointerDown = (event: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const minComparable = toComparable(minValue);
  const maxComparable = toComparable(maxValue);

  const monthLabelFormat: 'short' | 'long' | 'narrow' | 'numeric' | '2-digit' =
    typeof monthFormat === 'function' ? 'long' : monthFormat;

  const weekdayLabels = Array.from({ length: 7 }, (_, i) => {
    const dow = (weekStartsOn + i) % 7;
    const reference = new Date(2024, 0, 7 + dow);
    return new Intl.DateTimeFormat(locale, { weekday: weekdayFormat }).format(reference);
  });

  const headerLabel = new Intl.DateTimeFormat(locale, {
    month: monthLabelFormat,
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

  const formatInputDate = (d: DateValue) =>
    new Intl.DateTimeFormat(locale).format(new Date(d.year, d.month - 1, d.day));
  const inputValue = value?.map(formatInputDate).join(', ') ?? '';

  const emit = (next: DateValue[]) =>
    onValueChange?.({
      value: next,
      valueAsString: next.map((v) => v.toString()),
    });

  const selectDay = (day: CalendarDate, outsideMonth: boolean) => {
    if (disabled || readOnly) return;
    if (outsideMonth && disableDaysOutsideMonth) return;

    if (type === 'multiple') {
      const exists = value?.some((v) => sameDay(v, day));
      emit(
        exists
          ? (value ?? []).filter((v) => !sameDay(v, day))
          : [...(value ?? []), day],
      );
    } else {
      emit([day]);
    }

    if (closeOnDateSelect) setOpen(false);
  };

  return (
    <Root ref={rootRef}>
      {children && (
        <PickerLabel id={labelId}>{children}</PickerLabel>
      )}

      <InputRow>
        <DateInput
          type="text"
          readOnly
          value={inputValue}
          aria-describedby={errorMessageId}
          aria-labelledby={children ? labelId : undefined}
          required={required}
          disabled={disabled}
          $disabled={disabled}
          $readOnly={readOnly}
        />

        <CalendarToggle
          type="button"
          aria-label="📅"
          aria-haspopup="dialog"
          aria-expanded={isOpen}
          disabled={disabled}
          onClick={() => setOpen(!isOpen)}
          $disabled={disabled}
        >
          📅
        </CalendarToggle>

        <ClearButton
          type="button"
          disabled={disabled}
          onClick={() => !disabled && emit([])}
          $disabled={disabled}
        >
          Clear
        </ClearButton>
      </InputRow>

      {isOpen && (
        <Popover role="dialog">
          <ViewControl>
            <NavArrow
              type="button"
              aria-label="Previous month"
              onClick={() => setFocused(focused.subtract({ months: 1 }))}
            >
              ←
            </NavArrow>
            <ViewTrigger type="button">{headerLabel}</ViewTrigger>
            <NavArrow
              type="button"
              aria-label="Next month"
              onClick={() => setFocused(focused.add({ months: 1 }))}
            >
              →
            </NavArrow>
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
                      (disableDaysOutsideMonth && outsideMonth);
                    const selected = !!value?.some((v) => sameDay(v, day));

                    return (
                      <DayTd key={dayId} $halfSpacing="2px">
                        <DayButton
                          type="button"
                          aria-selected={selected}
                          aria-disabled={isDayDisabled || undefined}
                          disabled={disabled || readOnly || isDayDisabled}
                          onClick={() => selectDay(day, outsideMonth)}
                          $selected={selected}
                          $disabled={isDayDisabled}
                          $outsideMonth={outsideMonth}
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
        </Popover>
      )}

      {name && <input type="hidden" name={name} value={inputValue} />}
    </Root>
  );
};

export default DatePicker;
