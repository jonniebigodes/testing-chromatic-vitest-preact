import styled, { css } from 'styled-components';
import type { ReactNode } from 'react';

type Variant = 'default' | 'inverted' | 'warning' | 'success';
type Size = 'small' | 'medium' | 'large';

export interface PillProps {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

const StyledPill = styled.span<{
  $variant: Variant;
  $size: Size;
  $disabled: boolean;
  $interactive: boolean;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  transition: all 0.2s ease;
  outline: none;
  user-select: none;
  white-space: nowrap;
  cursor: ${({ $disabled, $interactive }) =>
    $disabled ? 'not-allowed' : $interactive ? 'pointer' : 'default'};

  padding: ${({ $size, theme }) =>
    $size === 'small'
      ? `${theme.spacing[1]} ${theme.spacing[2]}`
      : $size === 'large'
        ? `${theme.spacing[2]} ${theme.spacing[4]}`
        : `${theme.spacing[2]} ${theme.spacing[3]}`};
  font-size: ${({ $size, theme }) =>
    $size === 'small'
      ? theme.fontSize[11]
      : $size === 'large'
        ? theme.fontSize[16]
        : theme.fontSize[14]};
  height: ${({ $size, theme }) =>
    $size === 'small'
      ? theme.spacing[5]
      : $size === 'large'
        ? theme.spacing[8]
        : theme.spacing[6]};
  border-radius: ${({ $size, theme }) =>
    $size === 'large' ? theme.spacing[4] : theme.spacing[3]};

  background-color: ${({ $disabled, $variant, theme }) =>
    $disabled
      ? theme.color.slate200
      : $variant === 'inverted'
        ? theme.color.white
        : $variant === 'warning'
          ? theme.color.yellow500
          : $variant === 'success'
            ? theme.color.green500
            : theme.color.blue500};
  color: ${({ $disabled, $variant, theme }) =>
    $disabled
      ? theme.color.slate400
      : $variant === 'inverted'
        ? theme.color.blue500
        : theme.color.white};
  border: ${({ $disabled, $variant, theme }) =>
    !$disabled && $variant === 'inverted'
      ? `1px solid ${theme.color.blue500}`
      : 'none'};

  ${({ $interactive }) =>
    $interactive &&
    css`
      &:hover {
        opacity: 0.85;
        transform: translateY(-1px);
      }
    `}
`;

const Pill = ({
  variant = 'default',
  size = 'medium',
  children,
  onClick,
  disabled = false,
}: PillProps) => {
  const isInteractive = !disabled && !!onClick;

  return (
    <StyledPill
      onClick={disabled ? undefined : onClick}
      $variant={variant}
      $size={size}
      $disabled={disabled}
      $interactive={isInteractive}
    >
      {children}
    </StyledPill>
  );
};

export default Pill;
