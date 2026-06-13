import styled from 'styled-components';

export interface DividerProps {
  color?: string;
  inverted?: boolean;
}

const Wrapper = styled.div<{ $inverted: boolean }>`
  display: flex;
  align-items: center;
  width: 100%;
  background-color: ${({ $inverted, theme }) => $inverted ? theme.color.slate800 : 'transparent'};
  padding: ${({ $inverted, theme }) => $inverted ? `${theme.spacing[4]} 0` : '0'};
`;

const Rule = styled.hr<{ $color?: string; $inverted: boolean }>`
  width: 100%;
  height: 1px;
  background-color: ${({ $color, $inverted, theme }) =>
    $inverted ? theme.color.white : $color ?? theme.color.slate300};
  border: none;
  margin: ${({ theme }) => `${theme.spacing[4]} 0`};
`;

const Divider = ({ color: customColor, inverted = false }: DividerProps) => (
  <Wrapper $inverted={inverted}>
    <Rule $color={customColor} $inverted={inverted} />
  </Wrapper>
);

export default Divider;
