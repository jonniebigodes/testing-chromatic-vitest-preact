import styled from "styled-components";
import { useEffect, useState } from "react";

export type BasicAnimationProps = {
  tickMs?: number;
  widthMaxPx?: number;
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 160px;
`;

const Bar = styled.div`
  height: 80px;
  background-color: black;
  margin: 30px;
  transition: width 500ms cubic-bezier(0.5, 0.01, 0, 1);
`;

export const BasicAnimation = ({
  tickMs = 3000,
  widthMaxPx = 350,
}: BasicAnimationProps) => {
  const [width, setWidth] = useState(10);

  useEffect(() => {
    const id = setInterval(() => {
      setWidth(Math.random() * widthMaxPx);
    }, tickMs);
    return () => clearInterval(id);
  }, [tickMs, widthMaxPx]);

  return (
    <Wrapper>
      <Bar style={{ width }} />
    </Wrapper>
  );
};
