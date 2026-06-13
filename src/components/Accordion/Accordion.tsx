import styled, { css } from 'styled-components';
import { useId, useState } from 'preact/hooks';

export interface AccordionItem {
  title: string;
  content: string;
}

export interface AccordionProps {
  inverted?: boolean;
  items: AccordionItem[];
}

const Root = styled.div<{ $inverted: boolean }>`
  width: 100%;
  background-color: ${({ $inverted, theme }) =>
    $inverted ? theme.color.slate900 : theme.color.white};
  color: ${({ $inverted, theme }) =>
    $inverted ? theme.color.white : theme.color.slate900};
  border-radius: ${({ theme }) => theme.spacing[2]};
  overflow: hidden;
  border: 1px solid
    ${({ $inverted, theme }) =>
      $inverted ? theme.color.slate700 : theme.color.slate200};
`;

const Item = styled.div<{ $inverted: boolean }>`
  border-bottom: 1px solid
    ${({ $inverted, theme }) =>
      $inverted ? theme.color.slate700 : theme.color.slate200};
`;

const TriggerButton = styled.button<{ $inverted: boolean }>`
  width: 100%;
  padding: ${({ theme }) => `${theme.spacing[4]} ${theme.spacing[5]}`};
  background-color: ${({ $inverted, theme }) =>
    $inverted ? theme.color.slate900 : theme.color.white};
  color: ${({ $inverted, theme }) =>
    $inverted ? theme.color.white : theme.color.slate900};
  border: none;
  text-align: left;
  font-size: ${({ theme }) => theme.fontSize[16]};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: background-color 0.2s ease;
  &:hover {
    background-color: ${({ $inverted, theme }) =>
      $inverted ? theme.color.slate800 : theme.color.slate50};
  }
`;

const Chevron = styled.span<{ $open: boolean }>`
  transition: transform 0.2s ease;
  transform: ${({ $open }) => ($open ? 'rotate(180deg)' : 'rotate(0deg)')};
  font-size: ${({ theme }) => theme.fontSize[12]};
`;

const ContentPanel = styled.div<{ $inverted: boolean }>`
  padding: ${({ theme }) => `${theme.spacing[4]} ${theme.spacing[5]}`};
  font-size: ${({ theme }) => theme.fontSize[14]};
  line-height: ${({ theme }) => theme.lineHeight[24]};
  background-color: ${({ $inverted, theme }) =>
    $inverted ? theme.color.slate900 : theme.color.white};
  color: ${({ $inverted, theme }) =>
    $inverted ? theme.color.white : theme.color.slate900};
`;

export default function AccordionComponent({
  inverted = false,
  items,
}: AccordionProps) {
  const baseId = useId();
  const [openItems, setOpenItems] = useState<string[]>(
    items.length > 0 ? ['item-0'] : [],
  );

  const toggleItem = (value: string) => {
    setOpenItems((prev) =>
      prev.includes(value)
        ? prev.filter((v) => v !== value)
        : [...prev, value],
    );
  };

  return (
    <Root $inverted={inverted}>
      {items.map((item, index) => {
        const value = `item-${index}`;
        const isOpen = openItems.includes(value);
        const triggerId = `${baseId}-trigger-${index}`;
        const contentId = `${baseId}-content-${index}`;

        return (
          <Item key={index} $inverted={inverted}>
            <TriggerButton
              type="button"
              id={triggerId}
              aria-expanded={isOpen}
              aria-controls={contentId}
              onClick={() => toggleItem(value)}
              $inverted={inverted}
            >
              <span>{item.title}</span>
              <Chevron $open={isOpen}>▼</Chevron>
            </TriggerButton>
            {isOpen && (
              <ContentPanel
                id={contentId}
                role="region"
                aria-labelledby={triggerId}
                $inverted={inverted}
              >
                {item.content}
              </ContentPanel>
            )}
          </Item>
        );
      })}
    </Root>
  );
}
