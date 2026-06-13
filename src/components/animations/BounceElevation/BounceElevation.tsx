import styled from "styled-components";
import { useEffect, useState } from "react";

export type BounceElevationProps = {
  liftPx?: number;
  cycleMs?: number;
};

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

const easeBounceOut = (t: number) => {
  const n1 = 7.5625;
  const d1 = 2.75;
  if (t < 1 / d1) return n1 * t * t;
  if (t < 2 / d1) {
    const u = t - 1.5 / d1;
    return n1 * u * u + 0.75;
  }
  if (t < 2.5 / d1) {
    const u = t - 2.25 / d1;
    return n1 * u * u + 0.9375;
  }
  const u = t - 2.625 / d1;
  return n1 * u * u + 0.984375;
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  min-height: 160px;
  padding-bottom: 12px;
  position: relative;
`;

const Shadow = styled.div`
  position: absolute;
  bottom: 18px;
  width: 100px;
  height: 16px;
  border-radius: 999px;
  background-color: #020617;
  transform-origin: center;
`;

const Ball = styled.div`
  width: 92px;
  height: 92px;
  border-radius: 18px;
  background-color: #f97316;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Inner = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background-color: #fff7ed;
`;

export const BounceElevation = ({
  liftPx = 36,
  cycleMs = 1400,
}: BounceElevationProps) => {
  const [y, setY] = useState(0);

  useEffect(() => {
    const liftDuration = cycleMs * 0.42;
    const fallDuration = cycleMs * 0.58;
    let raf = 0;
    let start = performance.now();

    const tick = (now: number) => {
      const elapsed = (now - start) % cycleMs;
      let nextY: number;
      if (elapsed < liftDuration) {
        nextY = -liftPx * easeOutCubic(elapsed / liftDuration);
      } else {
        const b = easeBounceOut((elapsed - liftDuration) / fallDuration);
        nextY = -liftPx + liftPx * b;
      }
      setY(nextY);
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      start = performance.now();
    };
  }, [cycleMs, liftPx]);

  const ratio = -y / liftPx;
  const shadowOpacity = 0.18 + ratio * 0.22;
  const shadowScaleX = 0.85 + ratio * 0.18;

  return (
    <Wrapper>
      <Shadow
        style={{
          opacity: shadowOpacity,
          transform: `scaleX(${shadowScaleX})`,
        }}
      />
      <Ball style={{ transform: `translateY(${y}px)` }}>
        <Inner />
      </Ball>
    </Wrapper>
  );
};
