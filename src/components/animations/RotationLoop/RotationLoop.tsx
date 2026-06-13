import styled, { keyframes } from "styled-components";

export type RotationLoopProps = {
  durationMs?: number;
};

const spinAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 140px;
`;

const Spinner = styled.div`
  width: 88px;
  height: 88px;
  border-radius: 16px;
  background-color: #0ea5e9;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  padding-top: 10px;
  box-sizing: border-box;
  animation-name: ${spinAnimation};
  animation-iteration-count: infinite;
  animation-timing-function: linear;
`;

const Dot = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 999px;
  background-color: #f8fafc;
`;

export const RotationLoop = ({ durationMs = 3200 }: RotationLoopProps) => {
  return (
    <Wrapper>
      <Spinner style={{ animationDuration: `${durationMs}ms` }}>
        <Dot />
      </Spinner>
    </Wrapper>
  );
};
