import styled from 'styled-components';
import type { ReactNode } from 'react';

export interface AspectRatioProps {
  ratio: number;
  children?: ReactNode;
}

const Outer = styled.div<{ $ratio: number }>`
  position: relative;
  width: 100%;
  padding-bottom: ${({ $ratio }) => `${(1 / $ratio) * 100}%`};
  overflow: hidden;
`;

const Inner = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AspectRatio = ({ ratio, children }: AspectRatioProps) => {
  return (
    <Outer $ratio={ratio}>
      <Inner>{children}</Inner>
    </Outer>
  );
};

export default AspectRatio;
