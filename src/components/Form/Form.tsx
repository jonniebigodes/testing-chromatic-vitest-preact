import styled, { useTheme } from 'styled-components';
import type { ReactNode, FormHTMLAttributes } from 'react';

export interface FormProps
  extends Omit<FormHTMLAttributes<HTMLFormElement>, 'children'> {
  inverted?: boolean;
  gap?: string | number;
  children: ReactNode;
}

const StyledForm = styled.form<{ $inverted: boolean; $gap: string }>`
  display: flex;
  flex-direction: column;
  gap: ${({ $gap }) => $gap};
  padding: ${({ theme }) => theme.spacing[6]};
  background-color: ${({ $inverted, theme }) =>
    $inverted ? theme.color.slate800 : theme.color.white};
  border: 1px solid
    ${({ $inverted, theme }) =>
      $inverted ? theme.color.slate700 : theme.color.slate200};
  border-radius: ${({ theme }) => theme.spacing[2]};
  min-width: 300px;
`;

const Form = ({
  inverted = false,
  gap,
  children,
  ...rest
}: FormProps) => {
  const t = useTheme();
  const resolvedGap = gap ?? t.spacing[4];
  const gapStr =
    typeof resolvedGap === 'number' ? `${resolvedGap}px` : resolvedGap;

  return (
    <StyledForm $inverted={inverted} $gap={gapStr} {...rest}>
      {children}
    </StyledForm>
  );
};

export default Form;
