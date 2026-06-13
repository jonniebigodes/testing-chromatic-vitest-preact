import styled, { css } from 'styled-components';
import type { ChangeEvent, ReactNode } from 'react';
import { useState, useEffect } from 'preact/hooks';

export interface CheckboxProps {
  checked?: boolean;
  onCheckedChange?: (details: { checked: boolean | string }) => void;
  disabled?: boolean;
  required?: boolean;
  name?: string;
  value?: string;
  readOnly?: boolean;
  children?: ReactNode;
}

const CheckboxLabel = styled.label<{ $disabled: boolean }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
  opacity: ${({ $disabled }) => ($disabled ? 0.5 : 1)};
`;

const HiddenInput = styled.input`
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

const Box = styled.span<{ $checked: boolean }>`
  width: ${({ theme }) => theme.spacing[5]};
  height: ${({ theme }) => theme.spacing[5]};
  border: 2px solid;
  border-color: ${({ $checked, theme }) =>
    $checked ? theme.color.blue500 : theme.color.slate300};
  border-radius: ${({ theme }) => theme.spacing[1]};
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ $checked, theme }) =>
    $checked ? theme.color.blue500 : theme.color.white};
  transition: all 0.2s ease;
  flex-shrink: 0;
`;

const IconWrap = styled.span<{ $visible: boolean }>`
  width: ${({ theme }) => theme.spacing[3]};
  height: ${({ theme }) => theme.spacing[3]};
  display: flex;
  align-items: center;
  justify-content: center;
  visibility: ${({ $visible }) => ($visible ? 'visible' : 'hidden')};
`;

const ChildText = styled.span<{ $disabled: boolean }>`
  font-size: ${({ theme }) => theme.fontSize[14]};
  color: ${({ theme }) => theme.color.slate700};
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
  user-select: none;
`;

const Checkbox = ({
  checked,
  onCheckedChange,
  disabled = false,
  required = false,
  name,
  value = 'on',
  readOnly = false,
  children,
}: CheckboxProps) => {
  const [isChecked, setIsChecked] = useState(checked || false);

  useEffect(() => {
    if (checked !== undefined) setIsChecked(checked);
  }, [checked]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (readOnly) return;
    const next = event.target.checked;
    if (checked === undefined) setIsChecked(next);
    onCheckedChange?.({ checked: next });
  };

  return (
    <CheckboxLabel $disabled={disabled}>
      <HiddenInput
        type="checkbox"
        checked={isChecked}
        onChange={handleChange}
        disabled={disabled}
        required={required}
        name={name}
        value={value}
        readOnly={readOnly}
      />
      <Box aria-hidden="true" $checked={isChecked}>
        <IconWrap $visible={isChecked}>
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 3L4.5 8.5L2 6"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </IconWrap>
      </Box>
      {children && <ChildText $disabled={disabled}>{children}</ChildText>}
    </CheckboxLabel>
  );
};

export default Checkbox;
