import styled from 'styled-components';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Accordion, { type AccordionItem } from '../../components/Accordion';
import { Meter } from '../../components/Meter';
import Divider from '../../components/Divider';
import Button from '../../components/Button';
import Pill from '../../components/Pill/Pill';

const NAV_LINKS = [
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Products', href: '/products' },
  { label: 'Profile', href: '/profile' },
  { label: 'Settings', href: '/settings' },
];

const FAQ: AccordionItem[] = [
  {
    title: 'What is this application?',
    content:
      'A full-featured demo app built with Preact, styled-components, and a rich component library.',
  },
  {
    title: 'How do I get started?',
    content:
      'Visit the Dashboard to view your metrics, or browse Products to explore the catalog.',
  },
  {
    title: 'How do I manage my account?',
    content:
      'Head to Profile to update your personal details, or Settings to adjust your preferences.',
  },
];

const Page = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Main = styled.main`
  flex: 1;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: ${({ theme }) => `${theme.spacing[12]} ${theme.spacing[6]}`};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[10]};
`;

const Hero = styled.section`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing[4]};
`;

const HeroTitle = styled.h1`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSize[36]};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.color.slate900};
`;

const HeroSubtitle = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSize[16]};
  color: ${({ theme }) => theme.color.slate600};
  max-width: 560px;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({ theme }) => theme.spacing[6]};
`;

const SectionTitle = styled.h2`
  margin: 0 0 ${({ theme }) => theme.spacing[4]};
  font-size: ${({ theme }) => theme.fontSize[20]};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  color: ${({ theme }) => theme.color.slate900};
`;

export function Home() {
  return (
    <Page>
      <Header title="Preact App" links={NAV_LINKS} isSticky />
      <Main>
        <Hero>
          <Pill variant="success">v1.0 — Now Live</Pill>
          <HeroTitle>Build better apps, faster</HeroTitle>
          <HeroSubtitle>
            A modern demo application built with Preact, styled-components, and a
            rich component library.
          </HeroSubtitle>
          <Button label="Get Started" size="large" />
        </Hero>
        <Divider />
        <section>
          <SectionTitle>Platform Status</SectionTitle>
          <StatsGrid>
            <Meter value={98} max={100} optimum={100}>Uptime</Meter>
            <Meter value={85} max={100} optimum={100}>Performance</Meter>
            <Meter value={92} max={100} optimum={100}>Satisfaction</Meter>
          </StatsGrid>
        </section>
        <Divider />
        <section>
          <SectionTitle>Frequently Asked Questions</SectionTitle>
          <Accordion items={FAQ} />
        </section>
      </Main>
      <Footer label="© 2025 Preact App. All rights reserved.">
        {['Privacy', 'Terms', 'Contact']}
      </Footer>
    </Page>
  );
}
