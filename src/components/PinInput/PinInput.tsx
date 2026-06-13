import styled, { css } from 'styled-components';
import { useRef, useState } from 'preact/hooks';
import type { ChangeEvent, ClipboardEvent, KeyboardEvent, ReactNode } from 'react';

export interface PinInputProps {
  value?: string[];
  onValueChange?: (details: { value: string[]; valueAsString: string }) => void;
  disabled?: boolean;
  maxLength?: number;
  children?: ReactNode;
  required?: boolean;
  name?: string;
  type?: 'numeric' | 'alphanumeric' | 'alphabetic';
  mask?: boolean;
  placeholder?: string;
  otp?: boolean;
}

const sanitize = (
  raw: string,
  type: 'numeric' | 'alphanumeric' | 'alphabetic',
) => {
  switch (type) {
    case 'numeric':
      return raw.replace(/[^0-9]/g, '');
    case 'alphabetic':
      return raw.replace(/[^a-zA-Z]/g, '');
    default:
      return raw.replace(/[^a-zA-Z0-9]/g, '');
  }
};

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

const InputRow = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[2]};
`;

const PinCell = styled.input<{ $disabled: boolean }>`
  width: ${({ theme }) => theme.spacing[12]};
  height: ${({ theme }) => theme.spacing[12]};
  text-align: center;
  font-size: ${({ theme }) => theme.fontSize[18]};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  border: 2px solid ${({ theme }) => theme.color.slate300};
  border-radius: ${({ theme }) => theme.spacing[2]};
  outline: none;
  transition: all 0.2s ease;
  background-color: ${({ $disabled, theme }) =>
    $disabled ? theme.color.slate100 : theme.color.white};
  color: ${({ $disabled, theme }) =>
    $disabled ? theme.color.slate400 : theme.color.slate800};
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'text')};
  ${({ $disabled, theme }) =>
    !$disabled &&
    css`
      &:focus {
        border-color: ${theme.color.blue500};
        box-shadow: 0 0 0 3px ${theme.color.blueTr10};
      }
    `}
`;

export default function PinInput({
  value,
  onValueChange,
  disabled = false,
  maxLength = 4,
  children,
  required = false,
  name,
  type = 'numeric',
  mask = false,
  placeholder = '○',
  otp = false,
}: PinInputProps) {
  const buildValues = (source?: string[]) =>
    Array.from({ length: maxLength }, (_, i) => source?.[i] ?? '');

  const [internal, setInternal] = useState<string[]>(() => buildValues(value));
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  const values = value !== undefined ? buildValues(value) : internal;

  const emit = (next: string[]) => {
    if (value === undefined) setInternal(next);
    const trimmed = next.filter((char) => char !== '');
    onValueChange?.({ value: trimmed, valueAsString: next.join('') });
  };

  const focusInput = (index: number) => {
    const target = inputRefs.current[index];
    if (target) { target.focus(); target.select(); }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>, index: number) => {
    const char = sanitize(event.currentTarget.value, type).slice(-1);
    const next = [...values];
    next[index] = char;
    emit(next);
    if (char && index < maxLength - 1) focusInput(index + 1);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (event.key === 'Backspace') {
      if (!values[index] && index > 0) {
        event.preventDefault();
        const next = [...values];
        next[index - 1] = '';
        emit(next);
        focusInput(index - 1);
      }
    } else if (event.key === 'ArrowLeft' && index > 0) {
      event.preventDefault();
      focusInput(index - 1);
    } else if (event.key === 'ArrowRight' && index < maxLength - 1) {
      event.preventDefault();
      focusInput(index + 1);
    }
  };

  const handlePaste = (event: ClipboardEvent<HTMLInputElement>, index: number) => {
    event.preventDefault();
    const pasted = sanitize(event.clipboardData?.getData('text') ?? '', type);
    if (!pasted) return;
    const next = [...values];
    let cursor = index;
    for (const char of pasted) {
      if (cursor >= maxLength) break;
      next[cursor] = char;
      cursor += 1;
    }
    emit(next);
    focusInput(Math.min(cursor, maxLength - 1));
  };

  return (
    <Root>
      {children && <FieldLabel>{children}</FieldLabel>}
      <InputRow>
        {Array.from({ length: maxLength }, (_, index) => (
          <PinCell
            key={index}
            ref={(el) => { inputRefs.current[index] = el; }}
            value={values[index] ?? ''}
            onChange={(event) => handleChange(event, index)}
            onKeyDown={(event) => handleKeyDown(event, index)}
            onPaste={(event) => handlePaste(event, index)}
            disabled={disabled}
            required={required}
            placeholder={placeholder}
            type={mask ? 'password' : 'text'}
            inputMode={type === 'numeric' ? 'numeric' : 'text'}
            autoComplete={otp ? 'one-time-code' : 'off'}
            aria-label={`Digit ${index + 1}`}
            maxLength={1}
            $disabled={disabled}
          />
        ))}
      </InputRow>
      <input type="hidden" name={name} value={values.join('')} />
    </Root>
  );
}
