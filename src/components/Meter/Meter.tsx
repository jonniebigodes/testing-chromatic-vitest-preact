import styled, { useTheme } from 'styled-components';
import type { DefaultTheme } from 'styled-components';
import type { ReactNode } from 'react';

export interface MeterProps {
  min?: number;
  max?: number;
  value?: number;
  children?: ReactNode;
  optimum?: number;
  low?: number;
  high?: number;
}

const getMeterColor = (
  tokens: DefaultTheme,
  currentValue: number,
  min: number,
  max: number,
  optimum?: number,
  low?: number,
  high?: number,
): string => {
  const range = max - min;
  const lowThreshold = low ?? min + range * 0.33;
  const highThreshold = high ?? min + range * 0.66;
  const optimumValue = optimum ?? max;

  if (optimumValue >= lowThreshold && optimumValue <= highThreshold) {
    if (currentValue >= lowThreshold && currentValue <= highThreshold) {
      return tokens.color.green500;
    } else if (currentValue < lowThreshold || currentValue > highThreshold) {
      return tokens.color.yellow500;
    }
  } else if (optimumValue > highThreshold) {
    if (currentValue > highThreshold) {
      return tokens.color.green500;
    } else if (currentValue >= lowThreshold) {
      return tokens.color.yellow500;
    } else {
      return tokens.color.pink600;
    }
  } else {
    if (currentValue < lowThreshold) {
      return tokens.color.green500;
    } else if (currentValue <= highThreshold) {
      return tokens.color.yellow500;
    } else {
      return tokens.color.pink600;
    }
  }

  return tokens.color.blue500;
};

const Root = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[2]};
  width: 300px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
`;

const MeterLabel = styled.span`
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

const Track = styled.div`
  position: relative;
  width: 100%;
  height: ${({ theme }) => theme.spacing[3]};
  background-color: ${({ theme }) => theme.color.slate200};
  border-radius: 9999px;
  overflow: hidden;
`;

const Fill = styled.div<{ $percent: number; $color: string }>`
  position: absolute;
  top: 0;
  left: 0;
  width: ${({ $percent }) => `${$percent}%`};
  height: 100%;
  background-color: ${({ $color }) => $color};
  transition: all 0.3s ease;
  border-radius: 9999px;
`;

export default function Meter({
  min = 0,
  max = 100,
  value = 0,
  children,
  optimum,
  low,
  high,
}: MeterProps) {
  const theme = useTheme();

  const currentValue = value ?? min;
  const percentage = ((currentValue - min) / (max - min)) * 100;
  const clampedPercentage = Math.max(0, Math.min(100, percentage));
  const meterColor = getMeterColor(theme, currentValue, min, max, optimum, low, high);

  return (
    <Root
      role="meter"
      aria-valuenow={currentValue}
      aria-valuemin={min}
      aria-valuemax={max}
    >
      <Header>
        {children && <MeterLabel>{children}</MeterLabel>}
        <PercentText>{`${Math.round(clampedPercentage)}%`}</PercentText>
      </Header>
      <Track>
        <Fill data-part="range" $percent={clampedPercentage} $color={meterColor} />
      </Track>
    </Root>
  );
}
