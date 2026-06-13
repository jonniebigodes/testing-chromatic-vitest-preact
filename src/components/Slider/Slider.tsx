import styled, { css } from 'styled-components';
import { useCallback, useRef } from 'preact/hooks';
import type { KeyboardEvent, PointerEvent, ReactNode } from 'react';

export interface SliderProps {
  value?: number[];
  onValueChange?: (details: { value: number[] }) => void;
  disabled?: boolean;
  min?: number;
  max?: number;
  step?: number;
  orientation?: 'horizontal' | 'vertical';
  children?: ReactNode;
}

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

const Root = styled.div<{ $vertical: boolean; $disabled: boolean }>`
  display: flex;
  flex-direction: ${({ $vertical }) => ($vertical ? 'row' : 'column')};
  gap: ${({ $vertical, theme }) => ($vertical ? theme.spacing[4] : theme.spacing[2])};
  width: ${({ $vertical }) => ($vertical ? 'auto' : '300px')};
  height: ${({ $vertical }) => ($vertical ? '300px' : 'auto')};
  opacity: ${({ $disabled }) => ($disabled ? 0.5 : 1)};
`;

const SliderLabel = styled.label`
  font-size: ${({ theme }) => theme.fontSize[14]};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ theme }) => theme.color.slate700};
  user-select: none;
`;

const ValueDisplay = styled.span`
  font-size: ${({ theme }) => theme.fontSize[14]};
  color: ${({ theme }) => theme.color.slate500};
  user-select: none;
`;

const TrackWrapper = styled.div<{ $disabled: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  flex-grow: 1;
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
`;

const Track = styled.div<{ $vertical: boolean }>`
  position: relative;
  flex-grow: 1;
  background-color: ${({ theme }) => theme.color.slate200};
  border-radius: ${({ theme }) => theme.spacing[1]};
  width: ${({ $vertical, theme }) => ($vertical ? theme.spacing[2] : '100%')};
  height: ${({ $vertical, theme }) => ($vertical ? '100%' : theme.spacing[2])};
`;

const Fill = styled.div<{
  $vertical: boolean;
  $percent: number;
  $disabled: boolean;
}>`
  position: absolute;
  background-color: ${({ $disabled, theme }) =>
    $disabled ? theme.color.slate400 : theme.color.blue500};
  border-radius: ${({ theme }) => theme.spacing[1]};
  width: ${({ $vertical, $percent }) => ($vertical ? '100%' : `${$percent}%`)};
  height: ${({ $vertical, $percent }) => ($vertical ? `${$percent}%` : '100%')};
  ${({ $vertical }) =>
    $vertical
      ? css`bottom: 0; left: 0;`
      : css`top: 0; left: 0;`}
`;

const Thumb = styled.div<{ $disabled: boolean }>`
  position: absolute;
  width: ${({ theme }) => theme.spacing[5]};
  height: ${({ theme }) => theme.spacing[5]};
  background-color: ${({ theme }) => theme.color.white};
  border: 2px solid;
  border-color: ${({ $disabled, theme }) =>
    $disabled ? theme.color.slate400 : theme.color.blue500};
  border-radius: 50%;
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'grab')};
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: transform 0.1s ease;
  outline: none;
  transform: translate(-50%, -50%);
  &:active {
    cursor: grabbing;
    transform: translate(-50%, -50%) scale(1.1);
  }
  &:focus-visible {
    box-shadow: ${({ theme }) =>
      `0 0 0 3px ${theme.color.blueTr10}, 0 1px 3px rgba(0, 0, 0, 0.1)`};
  }
`;

const Slider = ({
  value,
  onValueChange,
  disabled = false,
  min = 0,
  max = 100,
  step = 1,
  orientation = 'horizontal',
  children,
}: SliderProps) => {
  const isVertical = orientation === 'vertical';
  const trackRef = useRef<HTMLDivElement>(null);

  const currentValue = value?.[0] ?? min;
  const range = max - min || 1;
  const percent = clamp(((currentValue - min) / range) * 100, 0, 100);

  const snapToStep = useCallback(
    (raw: number) => {
      const steps = Math.round((raw - min) / step);
      const snapped = min + steps * step;
      return clamp(Number(snapped.toFixed(10)), min, max);
    },
    [min, max, step],
  );

  const commit = useCallback(
    (next: number) => {
      if (next === currentValue) return;
      onValueChange?.({ value: [next] });
    },
    [currentValue, onValueChange],
  );

  const valueFromPointer = useCallback(
    (clientX: number, clientY: number) => {
      const track = trackRef.current;
      if (!track) return currentValue;
      const rect = track.getBoundingClientRect();
      const ratio = isVertical
        ? 1 - (clientY - rect.top) / (rect.height || 1)
        : (clientX - rect.left) / (rect.width || 1);
      return snapToStep(min + clamp(ratio, 0, 1) * range);
    },
    [currentValue, isVertical, min, range, snapToStep],
  );

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (disabled) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    commit(valueFromPointer(event.clientX, event.clientY));
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (disabled || !event.currentTarget.hasPointerCapture(event.pointerId)) return;
    commit(valueFromPointer(event.clientX, event.clientY));
  };

  const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (disabled) return;
    let next = currentValue;
    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowUp':
        next = clamp(currentValue + step, min, max);
        break;
      case 'ArrowLeft':
      case 'ArrowDown':
        next = clamp(currentValue - step, min, max);
        break;
      case 'Home':
        next = min;
        break;
      case 'End':
        next = max;
        break;
      default:
        return;
    }
    event.preventDefault();
    commit(snapToStep(next));
  };

  const thumbStyle = isVertical
    ? { left: '50%', top: `${100 - percent}%` }
    : { top: '50%', left: `${percent}%` };

  return (
    <Root $vertical={isVertical} $disabled={disabled}>
      {children && <SliderLabel>{children}</SliderLabel>}
      <ValueDisplay>{currentValue}</ValueDisplay>
      <TrackWrapper
        $disabled={disabled}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      >
        <Track ref={trackRef} $vertical={isVertical}>
          <Fill $vertical={isVertical} $percent={percent} $disabled={disabled} />
        </Track>
        <Thumb
          role="slider"
          tabIndex={disabled ? -1 : 0}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={currentValue}
          aria-orientation={orientation}
          aria-disabled={disabled || undefined}
          onKeyDown={handleKeyDown}
          $disabled={disabled}
          style={thumbStyle}
        />
      </TrackWrapper>
    </Root>
  );
};

export default Slider;
