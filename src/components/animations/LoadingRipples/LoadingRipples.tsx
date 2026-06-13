import styled, { keyframes } from "styled-components";

export type LoadingRipplesProps = {
  ringCount?: number;
  cycleMs?: number;
  color?: string;
};

const pulseAnimation = keyframes`
  0% {
    opacity: 0.55;
    transform: scale(0.2);
  }
  85% {
    opacity: 0.12;
    transform: scale(2.07);
  }
  100% {
    opacity: 0;
    transform: scale(2.4);
  }
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 140px;
`;

const Inner = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Ring = styled.div`
  position: absolute;
  width: 72px;
  height: 72px;
  border-radius: 999px;
  border-width: 2px;
  border-style: solid;
  box-sizing: border-box;
  animation-name: ${pulseAnimation};
  animation-iteration-count: infinite;
  animation-timing-function: linear;
`;

export const LoadingRipples = ({
  ringCount = 3,
  cycleMs = 2400,
  color = "#3b82f6",
}: LoadingRipplesProps) => {
  const rings = Array.from({ length: ringCount }, (_, i) => i);

  return (
    <Wrapper>
      <Inner>
        {rings.map((i) => (
          <Ring
            key={i}
            style={{
              borderColor: color,
              animationDuration: `${cycleMs}ms`,
              animationDelay: `${-(i / ringCount) * cycleMs}ms`,
            }}
          />
        ))}
      </Inner>
    </Wrapper>
  );
};
