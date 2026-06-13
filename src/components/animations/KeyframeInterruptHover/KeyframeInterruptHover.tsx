import styled, { keyframes } from "styled-components";
import { useEffect, useState } from "react";

export type KeyframeInterruptHoverProps = {
  keyframeCycleMs?: number;
  interruptCycleMs?: number;
};

const enterAnimation = keyframes`
  0% {
    opacity: 0.65;
    transform: translateY(0) scale(1);
  }
  35% {
    opacity: 1;
    transform: translateY(-12px) scale(1.06);
  }
  100% {
    opacity: 0.65;
    transform: translateY(0) scale(1);
  }
`;

const Wrapper = styled.div`
  min-height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 8px 0;
`;

const SectionLabel = styled.span`
  font-size: 12px;
  font-weight: 600;
  color: #52525b;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  margin-bottom: 8px;
`;

const AnimatedCard = styled.div`
  width: 160px;
  padding: 16px 12px;
  border-radius: 12px;
  background-color: #e4e4e7;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  animation: ${enterAnimation} 900ms ease-in-out;
`;

const CardText = styled.span`
  font-size: 16px;
  font-weight: 700;
  color: #18181b;
`;

const InterruptLabel = styled(SectionLabel)`
  margin-top: 20px;
`;

const BarTrack = styled.div`
  width: 220px;
  height: 14px;
  border-radius: 999px;
  background-color: #e4e4e7;
  overflow: hidden;
  display: flex;
  align-items: center;
`;

const BarFill = styled.div<{ $width: number }>`
  height: 100%;
  border-radius: 999px;
  background-color: #7c3aed;
  transition: width 420ms linear;
  width: ${({ $width }) => $width}px;
`;

export const KeyframeInterruptHover = ({
  keyframeCycleMs = 1600,
  interruptCycleMs = 550,
}: KeyframeInterruptHoverProps) => {
  const [enterKey, setEnterKey] = useState(0);
  const [barWidth, setBarWidth] = useState(48);

  useEffect(() => {
    const id = setInterval(() => {
      setEnterKey((k) => k + 1);
    }, keyframeCycleMs);
    return () => clearInterval(id);
  }, [keyframeCycleMs]);

  useEffect(() => {
    const id = setInterval(() => {
      setBarWidth(56 + Math.random() * 140);
    }, interruptCycleMs);
    return () => clearInterval(id);
  }, [interruptCycleMs]);

  return (
    <Wrapper>
      <SectionLabel>Keyframe (remount)</SectionLabel>
      <AnimatedCard key={enterKey}>
        <CardText>Hover-like</CardText>
      </AnimatedCard>

      <InterruptLabel>Interruptible timing</InterruptLabel>
      <BarTrack>
        <BarFill $width={barWidth} />
      </BarTrack>
    </Wrapper>
  );
};
