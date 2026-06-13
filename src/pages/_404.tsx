import styled from 'styled-components';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Button from '../components/Button';

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Products', href: '/products' },
];

const Page = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Main = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing[6]};
  padding: ${({ theme }) => theme.spacing[12]};
  text-align: center;
`;

const ErrorCode = styled.span`
  font-size: ${({ theme }) => theme.fontSize[60]};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.color.blue500};
  line-height: 1;
`;

const Title = styled.h1`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSize[30]};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  color: ${({ theme }) => theme.color.slate900};
`;

const Description = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSize[16]};
  color: ${({ theme }) => theme.color.slate600};
  max-width: 440px;
`;

export function NotFound() {
  return (
    <Page>
      <Header title="Preact App" links={NAV_LINKS} />
      <Main>
        <ErrorCode>404</ErrorCode>
        <Title>Page not found</Title>
        <Description>
          The page you are looking for doesn&apos;t exist or has been moved.
        </Description>
        <Button
          label="Back to Home"
          onClick={() => {
            window.location.href = '/';
          }}
        />
      </Main>
      <Footer label="© 2025 Preact App. All rights reserved." />
    </Page>
  );
}
