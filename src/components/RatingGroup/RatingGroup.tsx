import styled, { css } from 'styled-components';
import { useState } from 'preact/hooks';
import type { ReactNode } from 'react';

export interface RatingGroupProps {
  onValueChange?: (details: { value: number }) => void;
  disabled?: boolean;
  required?: boolean;
  name?: string;
  min?: number;
  max?: number;
  readOnly?: boolean;
  orientation?: 'horizontal' | 'vertical';
  children?: ReactNode;
  value?: number;
  defaultValue?: number;
}

const StarIcon = ({ filled }: { filled: boolean }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill={filled ? 'currentColor' : 'none'}
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ display: 'block' }}
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const Root = styled.div<{ $vertical: boolean }>`
  display: flex;
  flex-direction: ${({ $vertical }) => ($vertical ? 'row' : 'column')};
  gap: ${({ $vertical, theme }) =>
    $vertical ? theme.spacing[4] : theme.spacing[2]};
  align-items: ${({ $vertical }) => ($vertical ? 'center' : 'flex-start')};
`;

const GroupLabel = styled.span`
  font-size: ${({ theme }) => theme.fontSize[14]};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ theme }) => theme.color.slate700};
  user-select: none;
`;

const StarsRow = styled.div<{ $vertical: boolean }>`
  display: flex;
  flex-direction: ${({ $vertical }) => ($vertical ? 'column' : 'row')};
  gap: ${({ theme }) => theme.spacing[1]};
`;

const StarSpan = styled.span<{ $interactive: boolean; $disabled: boolean }>`
  cursor: ${({ $interactive }) => ($interactive ? 'pointer' : 'default')};
  color: ${({ theme }) => theme.color.yellow500};
  opacity: ${({ $disabled }) => ($disabled ? 0.5 : 1)};
  transition: transform 0.15s ease, opacity 0.15s ease;
  outline: none;
  ${({ $interactive }) =>
    $interactive &&
    css`
      &:hover {
        transform: scale(1.1);
      }
      &:focus-visible {
        transform: scale(1.1);
        filter: drop-shadow(0 0 4px rgba(251, 191, 36, 0.4));
      }
    `}
`;

const RatingGroup = ({
  onValueChange,
  disabled = false,
  required = false,
  name,
  min = 1,
  max = 5,
  readOnly = false,
  orientation = 'horizontal',
  children,
  value,
  defaultValue,
}: RatingGroupProps) => {
  const isVertical = orientation === 'vertical';
  const count = max - min + 1;
  const interactive = !disabled && !readOnly;

  const [internalValue, setInternalValue] = useState(defaultValue ?? 0);
  const [hovered, setHovered] = useState<number | null>(null);
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;
  const highlightValue = hovered ?? currentValue;

  const selectValue = (ratingValue: number) => {
    if (!interactive) return;
    if (!isControlled) setInternalValue(ratingValue);
    onValueChange?.({ value: ratingValue });
  };

  return (
    <Root role="radiogroup" $vertical={isVertical}>
      {children && <GroupLabel>{children}</GroupLabel>}
      <StarsRow $vertical={isVertical}>
        {Array.from({ length: count }, (_, i) => {
          const ratingValue = min + i;
          const highlighted = ratingValue <= highlightValue;

          return (
            <StarSpan
              key={ratingValue}
              role="radio"
              aria-checked={currentValue === ratingValue}
              aria-label={`${ratingValue}`}
              tabIndex={interactive ? 0 : -1}
              onClick={() => selectValue(ratingValue)}
              onMouseEnter={() => interactive && setHovered(ratingValue)}
              onMouseLeave={() => interactive && setHovered(null)}
              onKeyDown={(event) => {
                if (interactive && (event.key === 'Enter' || event.key === ' ')) {
                  event.preventDefault();
                  selectValue(ratingValue);
                }
              }}
              $interactive={interactive}
              $disabled={disabled}
            >
              <StarIcon filled={highlighted} />
            </StarSpan>
          );
        })}
        {name && (
          <input type="hidden" name={name} value={currentValue} required={required} />
        )}
      </StarsRow>
    </Root>
  );
};

export default RatingGroup;
