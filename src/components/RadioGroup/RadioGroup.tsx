import styled, { css } from 'styled-components';
import { useId, useState } from 'preact/hooks';
import type { ReactNode } from 'react';

export interface RadioOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface RadioGroupProps {
  onValueChange?: (details: { value: string | null }) => void;
  disabled?: boolean;
  required?: boolean;
  name?: string;
  orientation?: 'horizontal' | 'vertical';
  readOnly?: boolean;
  children?: ReactNode;
  value?: string;
  defaultValue?: string;
  options: RadioOption[];
}

const Root = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[3]};
`;

const GroupLabel = styled.span`
  font-size: ${({ theme }) => theme.fontSize[14]};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ theme }) => theme.color.slate700};
  user-select: none;
`;

const Required = styled.span`
  color: ${({ theme }) => theme.color.pink600};
  margin-left: ${({ theme }) => theme.spacing[1]};
`;

const OptionsRow = styled.div<{ $horizontal: boolean }>`
  display: flex;
  flex-direction: ${({ $horizontal }) => ($horizontal ? 'row' : 'column')};
  gap: ${({ $horizontal, theme }) =>
    $horizontal ? theme.spacing[4] : theme.spacing[3]};
  flex-wrap: wrap;
`;

const OptionLabel = styled.label<{ $disabled: boolean; $readonly: boolean }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
  cursor: ${({ $disabled, $readonly }) =>
    $disabled || $readonly ? 'not-allowed' : 'pointer'};
  opacity: ${({ $disabled }) => ($disabled ? 0.5 : 1)};
  user-select: none;
`;

const HiddenRadio = styled.input`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
  border: 0;
`;

const RadioDot = styled.span<{ $checked: boolean }>`
  position: relative;
  width: ${({ theme }) => theme.spacing[5]};
  height: ${({ theme }) => theme.spacing[5]};
  border-radius: 50%;
  border: 2px solid;
  border-color: ${({ theme }) => theme.color.slate300};
  background-color: ${({ theme }) => theme.color.white};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  flex-shrink: 0;
  &:hover:not([data-disabled]) {
    border-color: ${({ theme }) => theme.color.blue500};
  }
  ${({ $checked, theme }) =>
    $checked &&
    css`
      border-color: ${theme.color.blue500};
      &::after {
        content: '';
        position: absolute;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background-color: ${theme.color.blue500};
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    `}
`;

const OptionText = styled.span<{ $disabled: boolean; $optionDisabled: boolean }>`
  font-size: ${({ theme }) => theme.fontSize[14]};
  color: ${({ $disabled, $optionDisabled, theme }) =>
    $disabled || $optionDisabled ? theme.color.slate400 : theme.color.slate700};
`;

const RadioGroup = ({
  onValueChange,
  disabled = false,
  required = false,
  name,
  orientation = 'vertical',
  readOnly = false,
  children,
  value,
  defaultValue,
  options,
}: RadioGroupProps) => {
  const generatedName = useId();
  const groupName = name ?? generatedName;
  const [internalValue, setInternalValue] = useState<string | null>(
    defaultValue ?? null,
  );
  const isControlled = value !== undefined;
  const selectedValue = isControlled ? value : internalValue;

  const selectOption = (option: RadioOption) => {
    if (disabled || readOnly || option.disabled) return;
    if (!isControlled) setInternalValue(option.value);
    onValueChange?.({ value: option.value });
  };

  return (
    <Root role="radiogroup" aria-orientation={orientation}>
      {children && (
        <GroupLabel>
          {children}
          {required && <Required>*</Required>}
        </GroupLabel>
      )}
      <OptionsRow $horizontal={orientation === 'horizontal'}>
        {options.map((option) => {
          const isItemDisabled = disabled || option.disabled || false;
          const checked = selectedValue === option.value;

          return (
            <OptionLabel
              key={option.value}
              $disabled={isItemDisabled}
              $readonly={readOnly}
            >
              <HiddenRadio
                type="radio"
                name={groupName}
                value={option.value}
                checked={checked}
                disabled={isItemDisabled}
                required={required}
                onChange={() => selectOption(option)}
              />
              <RadioDot
                aria-hidden="true"
                data-state={checked ? 'checked' : 'unchecked'}
                data-disabled={isItemDisabled || undefined}
                $checked={checked}
              />
              <OptionText
                $disabled={disabled}
                $optionDisabled={!!option.disabled}
              >
                {option.label}
              </OptionText>
            </OptionLabel>
          );
        })}
      </OptionsRow>
    </Root>
  );
};

export default RadioGroup;
