import styled, { css } from 'styled-components';
import type { InputHTMLAttributes } from 'react';

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'placeholder'> {
  inverted?: boolean;
  placeholder?: string;
  type?: string;
}

const StyledInput = styled.input<{ $inverted: boolean }>`
  display: block;
  width: 100%;
  padding: ${({ theme }) => `${theme.spacing[2]} ${theme.spacing[3]}`};
  background-color: ${({ $inverted, theme }) =>
    $inverted ? theme.color.slate800 : theme.color.white};
  color: ${({ $inverted, theme }) =>
    $inverted ? theme.color.white : theme.color.slate800};
  border: 1px solid
    ${({ $inverted, theme }) =>
      $inverted ? theme.color.slate700 : theme.color.slate300};
  border-radius: ${({ theme }) => theme.spacing[2]};
  font-size: ${({ theme }) => theme.fontSize[14]};
  outline: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
  &:focus {
    border-color: ${({ $inverted, theme }) =>
      $inverted ? theme.color.blue400 : theme.color.blue500};
    box-shadow: 0 0 0 3px
      ${({ $inverted, theme }) =>
        $inverted ? theme.color.blueTr50 : theme.color.blueTr10};
  }
`;

const Input = ({
  inverted = false,
  placeholder = '',
  type = 'text',
  ...rest
}: InputProps) => (
  <StyledInput
    type={type}
    placeholder={placeholder}
    $inverted={inverted}
    {...rest}
  />
);

export default Input;
