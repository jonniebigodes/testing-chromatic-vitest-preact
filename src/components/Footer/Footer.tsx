import styled, { css } from "styled-components";

export interface FooterProps {
  color?: string;
  label?: string;
  children?: string[];
  inverted?: boolean;
  onLinkClick?: (link: string) => void;
}

const StyledFooter = styled.footer<{ $inverted: boolean }>`
  width: 100%;
  background-color: ${({ $inverted, theme }) =>
    $inverted ? theme.color.white : theme.color.yellow400};
  border-top: 1px solid
    ${({ $inverted, theme }) =>
      $inverted ? theme.color.slate200 : theme.color.slate700};
  padding: ${({ theme }) => `${theme.spacing[6]} ${theme.spacing[8]}`};
  margin-top: auto;
`;

const Inner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[4]};
`;

const Nav = styled.nav`
  display: flex;
  gap: ${({ theme }) => theme.spacing[6]};
  flex-wrap: wrap;
  justify-content: center;
`;

const FooterLink = styled.a<{ $inverted: boolean }>`
  color: ${({ $inverted, theme }) =>
    $inverted ? theme.color.blue500 : theme.color.blue200};
  text-decoration: none;
  font-size: ${({ theme }) => theme.fontSize[14]};
  cursor: pointer;
  transition: color 0.2s ease;
  &:hover {
    color: ${({ $inverted, theme }) =>
      $inverted ? theme.color.blue600 : theme.color.blue50};
    text-decoration: underline;
  }
`;

const CopyText = styled.p<{ $inverted: boolean }>`
  color: ${({ $inverted, theme }) =>
    $inverted ? theme.color.slate800 : theme.color.white};
  font-size: ${({ theme }) => theme.fontSize[14]};
  text-align: center;
  margin: 0;
`;

const Footer = ({
  label = "© 2025 Company Name. All rights reserved.",
  children = [],
  inverted = false,
  onLinkClick,
}: FooterProps) => (
  <StyledFooter $inverted={inverted}>
    <Inner>
      {children && children.length > 0 && (
        <Nav>
          {children.map((link, index) => (
            <FooterLink
              key={index}
              $inverted={inverted}
              onClick={() => onLinkClick?.(link)}
            >
              {link}
            </FooterLink>
          ))}
        </Nav>
      )}
      <CopyText $inverted={inverted}>{label}</CopyText>
    </Inner>
  </StyledFooter>
);

export default Footer;
