import styled from 'styled-components';

export interface HeaderLink {
  label: string;
  href: string;
}

export interface HeaderProps {
  title?: string;
  links?: HeaderLink[];
  isSticky?: boolean;
  inverted?: boolean;
  logo?: string;
  fullWidth?: boolean;
  onLinkClick?: (link: HeaderLink) => void;
}

const StyledHeader = styled.header<{ $isSticky: boolean; $inverted: boolean }>`
  position: ${({ $isSticky }) => ($isSticky ? 'sticky' : 'relative')};
  top: ${({ $isSticky }) => ($isSticky ? '0' : undefined)};
  z-index: 100;
  width: 100%;
  background-color: ${({ $inverted, theme }) =>
    $inverted ? theme.color.slate900 : theme.color.white};
  border-bottom: 1px solid
    ${({ $inverted, theme }) =>
      $inverted ? theme.color.slate800 : theme.color.slate200};
`;

const Inner = styled.div<{ $fullWidth: boolean }>`
  margin: ${({ $fullWidth }) => ($fullWidth ? '0' : '0 auto')};
  max-width: ${({ $fullWidth }) => ($fullWidth ? '100%' : '1200px')};
  padding: ${({ theme }) => `${theme.spacing[3]} ${theme.spacing[4]}`};
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing[4]};
`;

const Brand = styled.div<{ $inverted: boolean }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
  color: ${({ $inverted, theme }) =>
    $inverted ? theme.color.white : theme.color.slate900};
`;

const Logo = styled.img`
  width: ${({ theme }) => theme.spacing[6]};
  height: ${({ theme }) => theme.spacing[6]};
  border-radius: ${({ theme }) => theme.spacing[2]};
`;

const Title = styled.h1<{ $inverted: boolean }>`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSize[18]};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  color: ${({ $inverted, theme }) =>
    $inverted ? theme.color.white : theme.color.slate900};
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[4]};
`;

const NavLink = styled.a<{ $inverted: boolean }>`
  color: ${({ $inverted, theme }) =>
    $inverted ? theme.color.blue200 : theme.color.blue600};
  text-decoration: none;
  font-size: ${({ theme }) => theme.fontSize[14]};
  transition: color 0.2s ease;
  &:hover {
    color: ${({ $inverted, theme }) =>
      $inverted ? theme.color.blue100 : theme.color.blue600};
  }
`;

const Header = ({
  title = 'Application',
  links = [],
  isSticky = false,
  inverted = false,
  logo,
  fullWidth = false,
  onLinkClick,
}: HeaderProps) => (
  <StyledHeader $isSticky={isSticky} $inverted={inverted}>
    <Inner $fullWidth={fullWidth}>
      <Brand $inverted={inverted}>
        {logo && <Logo src={logo} alt="Logo" />}
        <Title $inverted={inverted}>{title}</Title>
      </Brand>
      {links && links.length > 0 && (
        <Nav>
          {links.map((l, i) => (
            <NavLink
              key={`${l.label}-${i}`}
              href={l.href}
              $inverted={inverted}
              onClick={() => onLinkClick?.(l)}
            >
              {l.label}
            </NavLink>
          ))}
        </Nav>
      )}
    </Inner>
  </StyledHeader>
);

export default Header;
