import styled from "styled-components";
import { useEffect, useRef, useState } from "react";

export type FillTextLoadingProps = {
  label?: string;
  cycleMs?: number;
};

const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 80px;
`;

const TextRoot = styled.span`
  position: relative;
  display: inline-block;
`;

const BaseText = styled.span`
  font-size: 28px;
  font-weight: 700;
  color: #d4d4d8;
  letter-spacing: 0.5px;
  white-space: nowrap;
  display: inline-block;
`;

const FillOverlay = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  display: flex;
  align-items: center;
  pointer-events: none;
`;

const FillClip = styled.span`
  overflow: hidden;
  height: 100%;
  display: flex;
  align-items: center;
`;

const FillText = styled.span`
  font-size: 28px;
  font-weight: 700;
  color: #18181b;
  letter-spacing: 0.5px;
  white-space: nowrap;
  display: inline-block;
`;

export const FillTextLoading = ({
  label = "Loading",
  cycleMs = 2200,
}: FillTextLoadingProps) => {
  const [progress, setProgress] = useState(0);
  const [fullWidth, setFullWidth] = useState(0);
  const baseRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const period = cycleMs * 2;

    const tick = (now: number) => {
      const elapsed = (now - start) % period;
      const linear =
        elapsed < cycleMs
          ? elapsed / cycleMs
          : 1 - (elapsed - cycleMs) / cycleMs;
      setProgress(easeInOutCubic(linear));
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [cycleMs]);

  useEffect(() => {
    const el = baseRef.current;
    if (!el) return;
    const update = () => setFullWidth(el.getBoundingClientRect().width);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [label]);

  return (
    <Wrapper>
      <TextRoot>
        <BaseText ref={baseRef}>{label}</BaseText>
        <FillOverlay aria-hidden="true">
          <FillClip style={{ width: fullWidth * progress }}>
            <FillText>{label}</FillText>
          </FillClip>
        </FillOverlay>
      </TextRoot>
    </Wrapper>
  );
};
