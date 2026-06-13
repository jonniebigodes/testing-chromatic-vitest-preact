import styled from 'styled-components';
import type { ReactNode } from 'react';

export interface ToolbarProps {
  orientation?: 'horizontal' | 'vertical';
  children?: ReactNode;
}

const StyledToolbar = styled.div<{ $horizontal: boolean }>`
  display: flex;
  flex-direction: ${({ $horizontal }) => ($horizontal ? 'row' : 'column')};
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
  padding: ${({ theme }) => theme.spacing[2]};
  background-color: ${({ theme }) => theme.color.slate50};
  border: 1px solid ${({ theme }) => theme.color.slate200};
  border-radius: ${({ theme }) => theme.spacing[2]};
  width: ${({ $horizontal }) => ($horizontal ? 'auto' : 'fit-content')};
`;

const Toolbar = ({ orientation = 'horizontal', children }: ToolbarProps) => (
  <StyledToolbar
    role="toolbar"
    aria-orientation={orientation}
    $horizontal={orientation === 'horizontal'}
  >
    {children}
  </StyledToolbar>
);

export default Toolbar;
