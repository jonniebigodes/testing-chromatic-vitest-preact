import styled, { css } from 'styled-components';
import { useCallback, useEffect, useRef, useState } from 'preact/hooks';
import type { KeyboardEvent, ReactNode } from 'react';

export interface SelectItem {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface SelectProps {
  type?: 'single' | 'multiple';
  value?: string[];
  onValueChange?: (details: { value: string[] }) => void;
  open?: boolean;
  onOpenChange?: (details: { open: boolean }) => void;
  disabled?: boolean;
  placeholder?: string;
  name?: string;
  required?: boolean;
  items: SelectItem[];
  children?: ReactNode;
}

const Root = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[2]};
  width: 300px;
  position: relative;
`;

const SelectLabel = styled.span`
  font-size: ${({ theme }) => theme.fontSize[14]};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ theme }) => theme.color.slate700};
  user-select: none;
`;

const TriggerButton = styled.button<{ $disabled: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: ${({ theme }) => `${theme.spacing[2]} ${theme.spacing[3]}`};
  background-color: ${({ theme }) => theme.color.white};
  border: 1px solid ${({ theme }) => theme.color.slate300};
  border-radius: ${({ theme }) => theme.spacing[2]};
  font-size: ${({ theme }) => theme.fontSize[14]};
  color: ${({ theme }) => theme.color.slate700};
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
  opacity: ${({ $disabled }) => ($disabled ? 0.5 : 1)};
  outline: none;
  transition: all 0.2s ease;
  ${({ $disabled, theme }) =>
    !$disabled &&
    css`
      &:hover {
        border-color: ${theme.color.slate400};
      }
      &:focus-visible {
        border-color: ${theme.color.blue500};
        box-shadow: 0 0 0 3px ${theme.color.blueTr10};
      }
    `}
`;

const TriggerText = styled.span<{ $empty: boolean }>`
  flex: 1;
  text-align: left;
  color: ${({ $empty, theme }) => ($empty ? theme.color.slate400 : 'inherit')};
`;

const TriggerIcon = styled.span`
  display: flex;
  align-items: center;
  margin-left: ${({ theme }) => theme.spacing[2]};
`;

const DropdownPositioner = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  z-index: 50;
  margin-top: ${({ theme }) => theme.spacing[1]};
`;

const ListBox = styled.ul`
  list-style: none;
  margin: 0;
  background-color: ${({ theme }) => theme.color.white};
  border: 1px solid ${({ theme }) => theme.color.slate200};
  border-radius: ${({ theme }) => theme.spacing[2]};
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  max-height: 300px;
  overflow-y: auto;
  padding: ${({ theme }) => theme.spacing[1]};
`;

const ListItem = styled.li<{ $disabled: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => `${theme.spacing[2]} ${theme.spacing[3]}`};
  font-size: ${({ theme }) => theme.fontSize[14]};
  color: ${({ $disabled, theme }) =>
    $disabled ? theme.color.slate400 : theme.color.slate700};
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
  border-radius: ${({ theme }) => theme.spacing[1]};
  outline: none;
  transition: background-color 0.15s ease;
  ${({ $disabled, theme }) =>
    !$disabled &&
    css`
      &:hover {
        background-color: ${theme.color.slate100};
      }
      &[data-highlighted] {
        background-color: ${theme.color.slate100};
      }
    `}
`;

const CheckMark = styled.span`
  margin-left: ${({ theme }) => theme.spacing[2]};
  color: ${({ theme }) => theme.color.blue500};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
`;

const HiddenSelect = styled.select`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`;

const Select = ({
  type = 'single',
  value,
  onValueChange,
  open,
  onOpenChange,
  disabled = false,
  placeholder = 'Select an option',
  name,
  required = false,
  items,
  children,
}: SelectProps) => {
  const isMultiple = type === 'multiple';
  const rootRef = useRef<HTMLDivElement>(null);

  const isOpenControlled = open !== undefined;
  const [internalOpen, setInternalOpen] = useState(false);
  const isOpen = isOpenControlled ? open : internalOpen;

  const isValueControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState<string[]>([]);
  const selectedValue = isValueControlled ? value : internalValue;

  const setOpen = useCallback(
    (next: boolean) => {
      if (!isOpenControlled) setInternalOpen(next);
      onOpenChange?.({ open: next });
    },
    [isOpenControlled, onOpenChange]
  );

  const setValue = useCallback(
    (next: string[]) => {
      if (!isValueControlled) setInternalValue(next);
      onValueChange?.({ value: next });
    },
    [isValueControlled, onValueChange]
  );

  useEffect(() => {
    if (!isOpen) return;
    const handleClick = (event: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [isOpen, setOpen]);

  const selectedItems = items.filter((item) => selectedValue.includes(item.value));
  const valueText = selectedItems.length > 0
    ? selectedItems.map((item) => item.label).join(', ')
    : '';

  const handleSelect = (item: SelectItem) => {
    if (item.disabled) return;
    if (isMultiple) {
      const next = selectedValue.includes(item.value)
        ? selectedValue.filter((v) => v !== item.value)
        : [...selectedValue, item.value];
      setValue(next);
    } else {
      setValue([item.value]);
      setOpen(false);
    }
  };

  const handleTriggerKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'Escape') {
      setOpen(false);
    } else if (
      (event.key === 'Enter' || event.key === ' ' || event.key === 'ArrowDown') &&
      !isOpen
    ) {
      event.preventDefault();
      setOpen(true);
    }
  };

  const listboxId = name ? `${name}-listbox` : undefined;

  return (
    <Root ref={rootRef}>
      {children && <SelectLabel>{children}</SelectLabel>}
      <div>
        <TriggerButton
          type="button"
          disabled={disabled}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-controls={listboxId}
          onClick={() => !disabled && setOpen(!isOpen)}
          onKeyDown={handleTriggerKeyDown}
          $disabled={disabled}
        >
          <TriggerText $empty={!valueText}>{valueText || placeholder}</TriggerText>
          <TriggerIcon>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </TriggerIcon>
        </TriggerButton>
      </div>
      {isOpen && (
        <DropdownPositioner>
          <ListBox id={listboxId} role="listbox" aria-multiselectable={isMultiple || undefined}>
            {items.map((item) => {
              const isSelected = selectedValue.includes(item.value);
              return (
                <ListItem
                  key={item.value}
                  role="option"
                  aria-selected={isSelected}
                  aria-disabled={item.disabled || undefined}
                  onClick={() => handleSelect(item)}
                  $disabled={!!item.disabled}
                >
                  <span>{item.label}</span>
                  {isSelected && <CheckMark>✓</CheckMark>}
                </ListItem>
              );
            })}
          </ListBox>
        </DropdownPositioner>
      )}
      <HiddenSelect
        name={name}
        required={required}
        disabled={disabled}
        multiple={isMultiple}
        aria-hidden="true"
        tabIndex={-1}
        onChange={() => {}}
      >
        {!isMultiple && <option value="" selected={selectedValue.length === 0} />}
        {items.map((item) => (
          <option
            key={item.value}
            value={item.value}
            selected={selectedValue.includes(item.value)}
          >
            {item.label}
          </option>
        ))}
      </HiddenSelect>
    </Root>
  );
};

export default Select;
