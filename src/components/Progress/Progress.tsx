import styled from 'styled-components';
import type { ReactNode } from 'react';

export interface ProgressProps {
  min?: number;
  max?: number;
  value?: number;
  disabled?: boolean;
  readonly?: boolean;
  orientation?: 'horizontal' | 'vertical';
  children?: ReactNode;
}

const Root = styled.div<{ $vertical: boolean; $disabled: boolean }>`
  display: flex;
  flex-direction: ${({ $vertical }) => ($vertical ? 'row' : 'column')};
  gap: ${({ theme }) => theme.spacing[2]};
  width: ${({ $vertical }) => ($vertical ? 'fit-content' : '300px')};
  opacity: ${({ $disabled }) => ($disabled ? 0.5 : 1)};
  pointer-events: ${({ $disabled }) => ($disabled ? 'none' : 'auto')};
`;

const LabelRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
`;

const LabelText = styled.span`
  font-size: ${({ theme }) => theme.fontSize[14]};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ theme }) => theme.color.slate700};
`;

const PercentText = styled.span`
  font-size: ${({ theme }) => theme.fontSize[12]};
  color: ${({ theme }) => theme.color.slate500};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  min-width: 45px;
  text-align: right;
`;

const Track = styled.div<{ $vertical: boolean }>`
  position: relative;
  width: ${({ $vertical, theme }) => ($vertical ? theme.spacing[2] : '100%')};
  height: ${({ $vertical }) => ($vertical ? '200px' : '')};
  ${({ $vertical, theme }) => !$vertical && `height: ${theme.spacing[2]};`}
  background-color: ${({ theme }) => theme.color.slate200};
  border-radius: 9999px;
  overflow: hidden;
`;

const Fill = styled.div<{
  $vertical: boolean;
  $percentage: number;
  $readonly: boolean;
}>`
  position: absolute;
  top: ${({ $vertical }) => ($vertical ? 'auto' : '0')};
  bottom: ${({ $vertical }) => ($vertical ? '0' : 'auto')};
  left: 0;
  width: ${({ $vertical, $percentage }) =>
    $vertical ? '100%' : `${$percentage}%`};
  height: ${({ $vertical, $percentage }) =>
    $vertical ? `${$percentage}%` : '100%'};
  background-color: ${({ $readonly, theme }) =>
    $readonly ? theme.color.slate400 : theme.color.blue500};
  transition: all 0.3s ease;
  border-radius: 9999px;
`;

export default function Progress({
  min = 0,
  max = 100,
  value,
  disabled = false,
  readonly = false,
  orientation = 'horizontal',
  children,
}: ProgressProps) {
  const isVertical = orientation === 'vertical';
  const currentValue = value ?? min;
  const percentage = ((currentValue - min) / (max - min)) * 100;
  const clampedPercentage = Math.max(0, Math.min(100, percentage));

  return (
    <Root
      role="progressbar"
      aria-valuenow={currentValue}
      aria-valuemin={min}
      aria-valuemax={max}
      aria-orientation={orientation}
      aria-disabled={disabled || undefined}
      aria-readonly={readonly || undefined}
      $vertical={isVertical}
      $disabled={disabled || readonly}
    >
      <LabelRow>
        <LabelText>{children || 'Loading...'}</LabelText>
        <PercentText>{`${Math.round(clampedPercentage)}%`}</PercentText>
      </LabelRow>
      <Track $vertical={isVertical}>
        <Fill
          $vertical={isVertical}
          $percentage={clampedPercentage}
          $readonly={readonly}
        />
      </Track>
    </Root>
  );
}
