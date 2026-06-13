import styled, { css } from 'styled-components';
import { useCallback, useEffect, useRef, useState } from 'preact/hooks';
import type { KeyboardEvent } from 'react';

export interface ComboboxProps {
  type?: 'single' | 'multiple';
  value?: string[];
  onValueChange?: (details: { value: string[] }) => void;
  open?: boolean;
  onOpenChange?: (details: { open: boolean }) => void;
  disabled?: boolean;
  placeholder?: string;
  name?: string;
  required?: boolean;
  items?: string[];
  label?: string;
}

const Root = styled.div`
  width: 100%;
  position: relative;
`;

const ComboLabel = styled.label`
  display: block;
  font-size: ${({ theme }) => theme.fontSize[14]};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ theme }) => theme.color.slate700};
  margin-bottom: ${({ theme }) => theme.spacing[2]};
`;

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
`;

const ComboInput = styled.input<{ $disabled: boolean }>`
  width: 100%;
  padding: ${({ theme }) =>
    `${theme.spacing[2]} ${theme.spacing[20]} ${theme.spacing[2]} ${theme.spacing[3]}`};
  background-color: ${({ $disabled, theme }) =>
    $disabled ? theme.color.slate50 : theme.color.white};
  color: ${({ $disabled, theme }) =>
    $disabled ? theme.color.slate400 : theme.color.slate800};
  border: 1px solid ${({ theme }) => theme.color.slate300};
  border-radius: ${({ theme }) => theme.spacing[2]};
  font-size: ${({ theme }) => theme.fontSize[14]};
  outline: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
  ${({ $disabled, theme }) =>
    !$disabled &&
    css`
      &:focus {
        border-color: ${theme.color.blue500};
        box-shadow: 0 0 0 3px ${theme.color.blueTr10};
      }
    `}
`;

const IconButtons = styled.div`
  position: absolute;
  right: ${({ theme }) => theme.spacing[2]};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[1]};
`;

const IconButton = styled.button<{ $disabled: boolean }>`
  padding: ${({ theme }) => theme.spacing[1]};
  background-color: transparent;
  border: none;
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
  color: ${({ theme }) => theme.color.slate500};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.spacing[1]};
  transition: background-color 0.2s;
  ${({ $disabled, theme }) =>
    !$disabled &&
    css`
      &:hover {
        background-color: ${theme.color.slate100};
      }
    `}
`;

const DropdownPositioner = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1000;
`;

const ListBox = styled.ul`
  list-style: none;
  margin: 0;
  background-color: ${({ theme }) => theme.color.white};
  border: 1px solid ${({ theme }) => theme.color.slate200};
  border-radius: ${({ theme }) => theme.spacing[2]};
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  margin-top: ${({ theme }) => theme.spacing[1]};
  max-height: 300px;
  overflow-y: auto;
  min-width: 200px;
  padding: 0;
`;

const ListItem = styled.li<{ $highlighted: boolean }>`
  padding: ${({ theme }) => `${theme.spacing[2]} ${theme.spacing[3]}`};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: ${({ theme }) => theme.fontSize[14]};
  color: ${({ theme }) => theme.color.slate700};
  transition: background-color 0.15s;
  background-color: ${({ $highlighted, theme }) =>
    $highlighted ? theme.color.slate100 : 'transparent'};
  &:hover {
    background-color: ${({ theme }) => theme.color.slate100};
  }
`;

const SelectedMark = styled.span`
  color: ${({ theme }) => theme.color.blue500};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
`;

const EmptyItem = styled.li`
  padding: ${({ theme }) => theme.spacing[5]};
  text-align: center;
  color: ${({ theme }) => theme.color.slate400};
  font-size: ${({ theme }) => theme.fontSize[14]};
  list-style: none;
`;

const Combobox = ({
  type = 'single',
  value,
  onValueChange,
  open,
  onOpenChange,
  disabled = false,
  placeholder = 'Select an option',
  name,
  required = false,
  items = [],
  label,
}: ComboboxProps) => {
  const isMultiple = type === 'multiple';
  const rootRef = useRef<HTMLDivElement>(null);

  const isOpenControlled = open !== undefined;
  const [internalOpen, setInternalOpen] = useState(false);
  const isOpen = isOpenControlled ? open : internalOpen;

  const isValueControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState<string[]>([]);
  const selectedValue = isValueControlled ? value : internalValue;

  const [inputValue, setInputValue] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

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
    if (!isMultiple && selectedValue.length > 0) setInputValue(selectedValue[0]);
  }, [isMultiple, selectedValue]);

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

  const filteredItems = items.filter((item) =>
    item.toLowerCase().includes(inputValue.toLowerCase())
  );

  const handleSelect = (item: string) => {
    if (isMultiple) {
      const next = selectedValue.includes(item)
        ? selectedValue.filter((v) => v !== item)
        : [...selectedValue, item];
      setValue(next);
      setInputValue('');
    } else {
      setValue([item]);
      setInputValue(item);
      setOpen(false);
    }
    setHighlightedIndex(-1);
  };

  const handleClear = () => {
    setValue([]);
    setInputValue('');
    setHighlightedIndex(-1);
  };

  const handleInputChange = (next: string) => {
    setInputValue(next);
    setHighlightedIndex(-1);
    if (!isOpen) setOpen(true);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      setOpen(false);
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      if (!isOpen) { setOpen(true); return; }
      setHighlightedIndex((prev) =>
        prev < filteredItems.length - 1 ? prev + 1 : prev
      );
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : 0));
    } else if (event.key === 'Enter') {
      if (isOpen && highlightedIndex >= 0 && filteredItems[highlightedIndex]) {
        event.preventDefault();
        handleSelect(filteredItems[highlightedIndex]);
      }
    }
  };

  const listboxId = name ? `${name}-listbox` : undefined;

  return (
    <Root ref={rootRef}>
      {label && <ComboLabel>{label}</ComboLabel>}
      <InputWrapper>
        <ComboInput
          type="text"
          role="combobox"
          aria-autocomplete="list"
          aria-expanded={isOpen}
          aria-controls={listboxId}
          name={name}
          required={required}
          disabled={disabled}
          placeholder={placeholder}
          value={inputValue}
          onChange={(event) => handleInputChange(event.currentTarget.value)}
          onFocus={() => !disabled && setOpen(true)}
          onKeyDown={handleKeyDown}
          $disabled={disabled}
        />
        <IconButtons>
          <IconButton type="button" aria-label="Clear" disabled={disabled} onClick={handleClear} $disabled={disabled}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </IconButton>
          <IconButton type="button" aria-label="Toggle" disabled={disabled} onClick={() => !disabled && setOpen(!isOpen)} $disabled={disabled}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </IconButton>
        </IconButtons>
      </InputWrapper>
      {isOpen && (
        <DropdownPositioner>
          <ListBox id={listboxId} role="listbox">
            {filteredItems.length > 0 ? (
              filteredItems.map((item, index) => {
                const isSelected = selectedValue.includes(item);
                return (
                  <ListItem
                    key={item}
                    role="option"
                    aria-selected={isSelected}
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={() => handleSelect(item)}
                    $highlighted={index === highlightedIndex}
                  >
                    <span>{item}</span>
                    {isSelected && <SelectedMark>✓</SelectedMark>}
                  </ListItem>
                );
              })
            ) : (
              <EmptyItem>No results found</EmptyItem>
            )}
          </ListBox>
        </DropdownPositioner>
      )}
    </Root>
  );
};

export default Combobox;
