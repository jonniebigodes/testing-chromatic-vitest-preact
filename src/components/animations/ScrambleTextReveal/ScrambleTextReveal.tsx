import styled, { keyframes } from "styled-components";
import { useEffect, useMemo, useState } from "react";

const CHARSET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

function randomChar() {
  return CHARSET[Math.floor(Math.random() * CHARSET.length)] ?? "X";
}

export type ScrambleTextRevealProps = {
  words?: string[];
  wordHoldMs?: number;
  scrambleTickMs?: number;
};

const blinkAnimation = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.35;
  }
  100% {
    opacity: 1;
  }
`;

const Wrapper = styled.div`
  min-height: 72px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 12px;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  gap: 6px;
`;

const Word = styled.span`
  font-size: 26px;
  font-weight: 700;
  color: #171717;
  letter-spacing: 0.5px;
  font-family: monospace;
`;

const Cursor = styled.span`
  width: 3px;
  height: 28px;
  background-color: #2563eb;
  border-radius: 1px;
  animation: ${blinkAnimation} 800ms ease-in-out infinite;
`;

export const ScrambleTextReveal = ({
  words: wordsProp,
  wordHoldMs = 2200,
  scrambleTickMs = 45,
}: ScrambleTextRevealProps) => {
  const words = useMemo(
    () => wordsProp ?? ["Hello", "Storybook", "Reanimated"],
    [wordsProp],
  );

  const [display, setDisplay] = useState(words[0] ?? "");

  useEffect(() => {
    let wordIndex = 0;
    let scrambleTimer: ReturnType<typeof setInterval> | undefined;

    const advanceWord = () => {
      const next = words[(wordIndex + 1) % words.length] ?? "";
      wordIndex += 1;
      let step = 0;
      const steps = Math.max(next.length * 2, 14);

      if (scrambleTimer) {
        clearInterval(scrambleTimer);
      }

      scrambleTimer = setInterval(() => {
        step += 1;
        if (step >= steps) {
          if (scrambleTimer) {
            clearInterval(scrambleTimer);
            scrambleTimer = undefined;
          }
          setDisplay(next);
          return;
        }
        const revealCount = Math.min(
          Math.floor((step / steps) * next.length),
          next.length,
        );
        const chars = next.split("");
        const scrambled = chars.map((ch, i) => {
          if (i < revealCount) return ch;
          if (ch === " ") return " ";
          return randomChar();
        });
        setDisplay(scrambled.join(""));
      }, scrambleTickMs);
    };

    const cycle = setInterval(advanceWord, wordHoldMs);
    return () => {
      clearInterval(cycle);
      if (scrambleTimer) {
        clearInterval(scrambleTimer);
      }
    };
  }, [scrambleTickMs, wordHoldMs, words]);

  return (
    <Wrapper>
      <Row>
        <Word>{display}</Word>
        <Cursor aria-hidden="true" />
      </Row>
    </Wrapper>
  );
};
