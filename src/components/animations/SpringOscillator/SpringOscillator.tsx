import styled from "styled-components";
import { useEffect, useState } from "react";

export type SpringOscillatorProps = {
  spanPx?: number;
};

type SpringConfig = {
  target: number;
  damping: number;
  stiffness: number;
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 120px;
`;

const Track = styled.div`
  width: 240px;
  height: 44px;
  border-radius: 999px;
  background-color: #e2e8f0;
  display: flex;
  align-items: center;
  padding: 0 10px;
  box-sizing: border-box;
`;

const Ball = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 999px;
  background-color: #16a34a;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.12);
`;

export const SpringOscillator = ({ spanPx = 56 }: SpringOscillatorProps) => {
  const [x, setX] = useState(0);

  useEffect(() => {
    const sequence: SpringConfig[] = [
      { target: spanPx, damping: 8, stiffness: 140 },
      { target: -spanPx, damping: 8, stiffness: 140 },
      { target: 0, damping: 12, stiffness: 180 },
    ];

    let raf = 0;
    let position = 0;
    let velocity = 0;
    let stepIndex = 0;
    let lastTime = performance.now();

    const tick = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 1 / 30);
      lastTime = now;

      const cfg = sequence[stepIndex];
      const force =
        -cfg.stiffness * (position - cfg.target) - cfg.damping * velocity;
      velocity += force * dt;
      position += velocity * dt;

      const settled =
        Math.abs(position - cfg.target) < 0.5 && Math.abs(velocity) < 0.5;
      if (settled) {
        position = cfg.target;
        velocity = 0;
        stepIndex = (stepIndex + 1) % sequence.length;
      }

      setX(position);
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [spanPx]);

  return (
    <Wrapper>
      <Track>
        <Ball style={{ transform: `translateX(${x}px)` }} />
      </Track>
    </Wrapper>
  );
};
