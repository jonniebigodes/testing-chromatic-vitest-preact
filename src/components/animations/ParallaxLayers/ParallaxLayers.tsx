import styled from "styled-components";
import { useEffect, useState } from "react";

export type ParallaxLayersProps = {
  axis?: "horizontal" | "vertical";
  durationMs?: number;
};

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 160px;
`;

const Scene = styled.div<{ $horizontal: boolean }>`
  overflow: hidden;
  border-radius: 14px;
  background-color: #f4f4f5;
  position: relative;
  width: ${({ $horizontal }) => ($horizontal ? "260px" : "140px")};
  height: ${({ $horizontal }) => ($horizontal ? "110px" : "200px")};
`;

const Layer = styled.div<{
  $widthPct: string;
  $heightPct: string;
  $leftPct: string;
  $topPct: string;
  $color: string;
}>`
  position: absolute;
  border-radius: 10px;
  width: ${({ $widthPct }) => $widthPct};
  height: ${({ $heightPct }) => $heightPct};
  left: ${({ $leftPct }) => $leftPct};
  top: ${({ $topPct }) => $topPct};
  background-color: ${({ $color }) => $color};
`;

export const ParallaxLayers = ({
  axis = "horizontal",
  durationMs = 5000,
}: ParallaxLayersProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const period = durationMs * 2;

    const tick = (now: number) => {
      const elapsed = (now - start) % period;
      const p =
        elapsed < durationMs
          ? elapsed / durationMs
          : 1 - (elapsed - durationMs) / durationMs;
      setProgress(p);
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [durationMs]);

  const horizontal = axis === "horizontal";
  const backRange = horizontal ? [-26, 26] : [-18, 18];
  const midRange = horizontal ? [-44, 44] : [-32, 32];
  const frontRange = horizontal ? [-62, 62] : [-46, 46];

  const translate = (range: number[]) => {
    const v = lerp(range[0], range[1], progress);
    return horizontal ? `translateX(${v}px)` : `translateY(${v}px)`;
  };

  return (
    <Wrapper>
      <Scene $horizontal={horizontal}>
        <Layer
          $widthPct="78%"
          $heightPct="62%"
          $leftPct="11%"
          $topPct="19%"
          $color="#93c5fd"
          style={{ transform: translate(backRange) }}
        />
        <Layer
          $widthPct="58%"
          $heightPct="48%"
          $leftPct="21%"
          $topPct="26%"
          $color="#60a5fa"
          style={{ transform: translate(midRange) }}
        />
        <Layer
          $widthPct="40%"
          $heightPct="34%"
          $leftPct="30%"
          $topPct="33%"
          $color="#1d4ed8"
          style={{ transform: translate(frontRange) }}
        />
      </Scene>
    </Wrapper>
  );
};
