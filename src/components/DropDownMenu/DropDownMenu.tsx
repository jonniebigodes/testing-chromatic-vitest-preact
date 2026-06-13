import styled, { useTheme } from 'styled-components';
import { useEffect, useRef, useState } from 'preact/hooks';

export interface DropDownMenuProps {
  color?: string;
  label: string;
  children: string[];
  inverted?: boolean;
  onSelect?: (item: string) => void;
}

const Root = styled.div`
  position: relative;
  display: inline-block;
`;

const TriggerButton = styled.button<{ $bgColor: string }>`
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ $bgColor }) => $bgColor};
  color: ${({ theme }) => theme.color.white};
  border: none;
  border-radius: ${({ theme }) => theme.spacing[2]};
  padding: ${({ theme }) => `${theme.spacing[2]} ${theme.spacing[4]}`};
  font-size: ${({ theme }) => theme.fontSize[14]};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 150px;
  &:hover {
    opacity: 0.9;
  }
`;

const ChevronSpan = styled.span`
  margin-left: ${({ theme }) => theme.spacing[2]};
  font-size: ${({ theme }) => theme.fontSize[12]};
`;

const DropdownPositioner = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: ${({ theme }) => theme.spacing[1]};
`;

const Menu = styled.div<{ $inverted: boolean }>`
  background-color: ${({ $inverted, theme }) =>
    $inverted ? theme.color.slate700 : theme.color.white};
  border: 1px solid
    ${({ $inverted, theme }) =>
      $inverted ? theme.color.slate600 : theme.color.slate300};
  border-radius: ${({ theme }) => theme.spacing[2]};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  padding: ${({ theme }) => `${theme.spacing[2]} 0`};
  min-width: 150px;
  max-height: 300px;
  overflow-y: auto;
  overflow-x: hidden;
  z-index: 50;
`;

const MenuItem = styled.button<{ $inverted: boolean }>`
  padding: ${({ theme }) => `${theme.spacing[2]} ${theme.spacing[4]}`};
  cursor: pointer;
  color: ${({ $inverted, theme }) =>
    $inverted ? theme.color.white : theme.color.slate800};
  background-color: transparent;
  border: none;
  display: block;
  width: 100%;
  text-align: left;
  transition: background-color 0.15s;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  &:hover {
    background-color: ${({ $inverted, theme }) =>
      $inverted ? theme.color.slate600 : theme.color.slate100};
  }
`;

const DropDownMenu = ({
  color: customColor,
  label,
  children,
  inverted = false,
  onSelect,
}: DropDownMenuProps) => {
  const t = useTheme();
  const buttonBg = inverted ? t.color.slate800 : customColor ?? t.color.blue500;

  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handlePointerDown = (event: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open]);

  return (
    <Root ref={rootRef}>
      <TriggerButton
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
        $bgColor={buttonBg}
      >
        {label}
        <ChevronSpan>▼</ChevronSpan>
      </TriggerButton>
      {open && (
        <DropdownPositioner>
          <Menu role="menu" $inverted={inverted}>
            {children.map((item, index) => (
              <MenuItem
                key={index}
                type="button"
                role="menuitem"
                onClick={() => {
                  onSelect?.(item);
                  setOpen(false);
                }}
                $inverted={inverted}
              >
                {item}
              </MenuItem>
            ))}
          </Menu>
        </DropdownPositioner>
      )}
    </Root>
  );
};

export default DropDownMenu;
