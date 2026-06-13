import styled, { keyframes } from "styled-components";

export type LoadingPulseDotsProps = {
  dotCount?: number;
  cycleMs?: number;
  color?: string;
};

const pulseAnimation = keyframes`
  0% {
    opacity: 0.35;
    transform: scale(0.65);
  }
  50% {
    opacity: 1;
    transform: scale(1.25);
  }
  100% {
    opacity: 0.35;
    transform: scale(0.65);
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 10px;
  min-height: 80px;
`;

const Dot = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 999px;
  animation-name: ${pulseAnimation};
  animation-iteration-count: infinite;
  animation-timing-function: linear;
`;

export const LoadingPulseDots = ({
  dotCount = 5,
  cycleMs = 1400,
  color = "#6366f1",
}: LoadingPulseDotsProps) => {
  const dots = Array.from({ length: dotCount }, (_, i) => i);

  return (
    <Wrapper>
      {dots.map((i) => (
        <Dot
          key={i}
          style={{
            backgroundColor: color,
            animationDuration: `${cycleMs}ms`,
            animationDelay: `${-(i / dotCount) * cycleMs}ms`,
          }}
        />
      ))}
    </Wrapper>
  );
};
