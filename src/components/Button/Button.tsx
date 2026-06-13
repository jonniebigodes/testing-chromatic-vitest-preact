import styled, { css } from 'styled-components';

export interface ButtonProps {
  backgroundColor?: string;
  size?: 'small' | 'medium' | 'large';
  label: string;
  onClick?: () => void;
}

const StyledButton = styled.button<{
  $backgroundColor?: string;
  $size: 'small' | 'medium' | 'large';
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ $backgroundColor, theme }) =>
    $backgroundColor ?? theme.color.blue500};
  color: ${({ theme }) => theme.color.white};
  border: none;
  border-radius: ${({ theme }) => theme.spacing[2]};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  cursor: pointer;
  transition: all 0.2s ease;
  outline: none;

  padding: ${({ $size, theme }) =>
    $size === 'small'
      ? `${theme.spacing[1]} ${theme.spacing[3]}`
      : $size === 'large'
        ? `${theme.spacing[3]} ${theme.spacing[5]}`
        : `${theme.spacing[2]} ${theme.spacing[4]}`};
  font-size: ${({ $size, theme }) =>
    $size === 'small'
      ? theme.fontSize[12]
      : $size === 'large'
        ? theme.fontSize[16]
        : theme.fontSize[14]};
  height: ${({ $size, theme }) =>
    $size === 'small'
      ? theme.spacing[6]
      : $size === 'large'
        ? theme.spacing[10]
        : theme.spacing[8]};

  &:hover {
    opacity: 0.9;
    transform: translateY(-2px);
  }
`;

const Button = ({
  backgroundColor,
  size = 'medium',
  label,
  onClick,
}: ButtonProps) => {
  return (
    <StyledButton
      type="button"
      onClick={onClick}
      $backgroundColor={backgroundColor}
      $size={size}
    >
      {label}
    </StyledButton>
  );
};

export default Button;
