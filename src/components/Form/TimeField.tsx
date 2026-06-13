import styled from 'styled-components';
import { useRef } from 'preact/hooks';
import type { ReactNode, ChangeEvent } from 'react';

export interface TimeValue {
  hour: number;
  minute: number;
  second?: number;
}

export interface TimeFieldProps {
  value?: string;
  onValueChange?: (details: { value: string; valueAsTime: TimeValue }) => void;
  placeholder?: string;
  required?: boolean;
  onInvalid?: () => void;
  errorMessageId?: string;
  hourCycle?: 12 | 24;
  hideTimeZone?: boolean;
  minValue?: string;
  maxValue?: string;
  disabled?: boolean;
  readOnly?: boolean;
  children?: ReactNode;
  name?: string;
  allowSeconds?: boolean;
}

function parseTimeString(timeString: string): TimeValue {
  const parts = timeString.split(':');
  return {
    hour: parseInt(parts[0] || '0', 10),
    minute: parseInt(parts[1] || '0', 10),
    second: parts[2] ? parseInt(parts[2], 10) : undefined,
  };
}

const Root = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[2]};
`;

const FieldLabel = styled.label`
  font-size: ${({ theme }) => theme.fontSize[14]};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ theme }) => theme.color.slate700};
`;

const Required = styled.span`
  color: ${({ theme }) => theme.color.pink600};
  margin-left: ${({ theme }) => theme.spacing[1]};
`;

const InputRow = styled.div<{ $disabled: boolean }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
  padding: ${({ theme }) => `${theme.spacing[2]} ${theme.spacing[3]}`};
  border: 2px solid ${({ theme }) => theme.color.slate300};
  border-radius: ${({ theme }) => theme.spacing[2]};
  background-color: ${({ $disabled, theme }) =>
    $disabled ? theme.color.slate100 : theme.color.white};
  transition: all 0.2s ease;
`;

const TimeInput = styled.input<{ $disabled: boolean }>`
  flex: 1;
  border: none;
  outline: none;
  font-size: ${({ theme }) => theme.fontSize[14]};
  font-family: inherit;
  color: ${({ $disabled, theme }) =>
    $disabled ? theme.color.slate400 : theme.color.slate800};
  background-color: transparent;
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'text')};
`;

const ClearButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${({ theme }) => theme.spacing[5]};
  height: ${({ theme }) => theme.spacing[5]};
  border: none;
  background: transparent;
  cursor: pointer;
  color: ${({ theme }) => theme.color.slate500};
  font-size: ${({ theme }) => theme.fontSize[18]};
  padding: 0;
  line-height: 1;
`;

export default function TimeField({
  value,
  onValueChange,
  placeholder,
  required = false,
  onInvalid,
  errorMessageId,
  minValue,
  maxValue,
  disabled = false,
  readOnly = false,
  children,
  name,
  allowSeconds = false,
}: TimeFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (onValueChange) {
      onValueChange({ value: newValue, valueAsTime: parseTimeString(newValue) });
    }
  };

  const handleClear = () => {
    if (inputRef.current) {
      inputRef.current.value = '';
      if (onValueChange) {
        onValueChange({ value: '', valueAsTime: { hour: 0, minute: 0 } });
      }
    }
  };

  return (
    <Root>
      {children && (
        <FieldLabel>
          {children}
          {required && <Required>*</Required>}
        </FieldLabel>
      )}
      <InputRow $disabled={disabled}>
        <TimeInput
          ref={inputRef}
          type="time"
          value={value}
          onChange={handleChange}
          name={name}
          required={required}
          disabled={disabled}
          readOnly={readOnly}
          min={minValue}
          max={maxValue}
          step={allowSeconds ? 1 : undefined}
          placeholder={placeholder}
          aria-describedby={errorMessageId}
          onInvalid={onInvalid}
          $disabled={disabled}
        />
        {value && !disabled && !readOnly && (
          <ClearButton type="button" onClick={handleClear} aria-label="Clear time">
            ×
          </ClearButton>
        )}
      </InputRow>
    </Root>
  );
}
