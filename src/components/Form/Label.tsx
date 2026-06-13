import styled from 'styled-components';
import type { ReactNode } from 'react';

export interface LabelProps {
  htmlFor?: string;
  inverted?: boolean;
  children: ReactNode;
}

const StyledLabel = styled.label<{ $inverted: boolean; $linked: boolean }>`
  display: inline-block;
  font-size: ${({ theme }) => theme.fontSize[14]};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ $inverted, theme }) =>
    $inverted ? theme.color.white : theme.color.slate700};
  background-color: ${({ $inverted, theme }) =>
    $inverted ? theme.color.slate800 : 'transparent'};
  padding: ${({ $inverted, theme }) =>
    $inverted ? `${theme.spacing[1]} ${theme.spacing[2]}` : '0'};
  border-radius: ${({ $inverted, theme }) =>
    $inverted ? theme.spacing[1] : '0'};
  margin-bottom: ${({ theme }) => theme.spacing[2]};
  cursor: ${({ $linked }) => ($linked ? 'pointer' : 'default')};
  transition: color 0.2s ease;
`;

const Label = ({ htmlFor, inverted = false, children }: LabelProps) => (
  <StyledLabel
    htmlFor={htmlFor}
    $inverted={inverted}
    $linked={!!htmlFor}
  >
    {children}
  </StyledLabel>
);

export default Label;
