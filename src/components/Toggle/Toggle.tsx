import styled, { css } from 'styled-components';
import type { ReactNode } from 'react';

export interface ToggleProps {
  onPressedChange?: (pressed: boolean) => void;
  pressed?: boolean;
  disabled?: boolean;
  required?: boolean;
  name?: string;
  children?: ReactNode;
}

const Wrapper = styled.div`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[3]};
`;

const Track = styled.button<{ $pressed: boolean; $disabled: boolean }>`
  position: relative;
  width: ${({ theme }) => theme.spacing[10]};
  height: ${({ theme }) => theme.spacing[6]};
  background-color: ${({ $pressed, theme }) =>
    $pressed ? theme.color.blue500 : theme.color.slate300};
  border-radius: ${({ theme }) => theme.spacing[3]};
  border: none;
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
  opacity: ${({ $disabled }) => ($disabled ? 0.5 : 1)};
  transition: background-color 0.2s ease;
  outline: none;
  flex-shrink: 0;
  ${({ $disabled, theme }) =>
    !$disabled &&
    css`
      &:focus-visible {
        box-shadow: 0 0 0 3px ${theme.color.blueTr10};
      }
    `}
`;

const Dot = styled.div<{ $pressed: boolean }>`
  position: absolute;
  top: ${({ theme }) => theme.spacing[0.5]};
  left: ${({ $pressed }) => ($pressed ? '22px' : '')};
  ${({ $pressed, theme }) => !$pressed && `left: ${theme.spacing[0.5]};`}
  width: ${({ theme }) => theme.spacing[5]};
  height: ${({ theme }) => theme.spacing[5]};
  background-color: ${({ theme }) => theme.color.white};
  border-radius: 50%;
  transition: transform 0.2s ease;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const Label = styled.span<{ $disabled: boolean }>`
  font-size: ${({ theme }) => theme.fontSize[14]};
  color: ${({ $disabled, theme }) =>
    $disabled ? theme.color.slate400 : theme.color.slate700};
  user-select: none;
`;

const Toggle = ({
  onPressedChange,
  pressed,
  disabled = false,
  name,
  children,
}: ToggleProps) => (
  <Wrapper>
    <Track
      type="button"
      aria-pressed={!!pressed}
      disabled={disabled}
      name={name}
      onClick={() => onPressedChange?.(!pressed)}
      $pressed={!!pressed}
      $disabled={disabled}
    >
      <Dot $pressed={!!pressed} />
    </Track>
    {children && <Label $disabled={disabled}>{children}</Label>}
  </Wrapper>
);

export default Toggle;
