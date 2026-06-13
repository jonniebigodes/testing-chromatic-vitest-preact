import styled, { css } from 'styled-components';
import { useId, useState } from 'preact/hooks';
import type { ReactNode } from 'react';

export interface CollapsibleProps {
  open?: boolean;
  onOpenChange?: (details: { open: boolean }) => void;
  disabled?: boolean;
  label?: ReactNode;
  children?: ReactNode;
}

const Root = styled.div`
  width: 100%;
  border: 1px solid ${({ theme }) => theme.color.slate200};
  border-radius: ${({ theme }) => theme.spacing[2]};
  overflow: hidden;
`;

const Trigger = styled.button<{ $disabled: boolean }>`
  width: 100%;
  padding: ${({ theme }) => `${theme.spacing[3]} ${theme.spacing[4]}`};
  background-color: ${({ $disabled, theme }) =>
    $disabled ? theme.color.slate50 : theme.color.white};
  border: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
  font-size: ${({ theme }) => theme.fontSize[14]};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ $disabled, theme }) =>
    $disabled ? theme.color.slate400 : theme.color.slate700};
  transition: background-color 0.2s ease;
  text-align: left;
  ${({ $disabled, theme }) =>
    !$disabled &&
    css`
      &:hover {
        background-color: ${theme.color.slate50};
      }
    `}
`;

const IconWrap = styled.span`
  display: flex;
  align-items: center;
  transition: transform 0.2s ease;
`;

const ChevronSvg = styled.svg<{ $open: boolean }>`
  transform: ${({ $open }) => ($open ? 'rotate(90deg)' : 'rotate(0deg)')};
  transition: transform 0.2s ease;
`;

const Content = styled.div`
  padding: ${({ theme }) => theme.spacing[4]};
  background-color: ${({ theme }) => theme.color.white};
  border-top: 1px solid ${({ theme }) => theme.color.slate200};
  font-size: ${({ theme }) => theme.fontSize[14]};
  color: ${({ theme }) => theme.color.slate500};
  line-height: 1.5;
`;

const Collapsible = ({
  open,
  onOpenChange,
  disabled = false,
  label = 'Toggle',
  children,
}: CollapsibleProps) => {
  const contentId = useId();
  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled = open !== undefined;
  const isOpen = isControlled ? open : internalOpen;

  const toggle = () => {
    if (disabled) return;
    const next = !isOpen;
    if (!isControlled) setInternalOpen(next);
    onOpenChange?.({ open: next });
  };

  return (
    <Root>
      <Trigger
        type="button"
        onClick={toggle}
        disabled={disabled}
        aria-expanded={isOpen}
        aria-controls={contentId}
        $disabled={disabled}
      >
        <span>{label}</span>
        <IconWrap>
          <ChevronSvg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            $open={!!isOpen}
          >
            <path
              d="M6 4L10 8L6 12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </ChevronSvg>
        </IconWrap>
      </Trigger>
      {isOpen && (
        <Content id={contentId} role="region">
          {children}
        </Content>
      )}
    </Root>
  );
};

export default Collapsible;
