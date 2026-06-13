import styled from 'styled-components';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Avatar } from '../../components/Avatar';
import Pill from '../../components/Pill/Pill';
import { Progress } from '../../components/Progress';
import { Meter } from '../../components/Meter';
import Divider from '../../components/Divider';
import Accordion, { type AccordionItem } from '../../components/Accordion';

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products' },
  { label: 'Profile', href: '/profile' },
  { label: 'Settings', href: '/settings' },
];

const UPDATES: AccordionItem[] = [
  {
    title: 'System Update v1.2.0',
    content:
      'Improved performance across all modules, reducing load times by 30%.',
  },
  {
    title: 'New Feature: Export Reports',
    content: 'You can now export dashboard reports to CSV and PDF formats.',
  },
  {
    title: 'Security Patch Applied',
    content:
      'A critical security patch has been applied. Please review your API keys.',
  },
];

type StatusVariant = 'success' | 'warning' | 'default';

const ACTIVITY: {
  id: number;
  name: string;
  initials: string;
  action: string;
  time: string;
  status: StatusVariant;
}[] = [
  {
    id: 1,
    name: 'Alice Johnson',
    initials: 'AJ',
    action: 'Completed onboarding',
    time: '2 min ago',
    status: 'success',
  },
  {
    id: 2,
    name: 'Bob Smith',
    initials: 'BS',
    action: 'Submitted a report',
    time: '15 min ago',
    status: 'default',
  },
  {
    id: 3,
    name: 'Carol White',
    initials: 'CW',
    action: 'Raised an issue',
    time: '1 hr ago',
    status: 'warning',
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
  padding: ${({ theme }) => `${theme.spacing[8]} ${theme.spacing[6]}`};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[8]};
`;

const PageTitle = styled.h1`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSize[30]};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.color.slate900};
`;

const SectionTitle = styled.h2`
  margin: 0 0 ${({ theme }) => theme.spacing[4]};
  font-size: ${({ theme }) => theme.fontSize[18]};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  color: ${({ theme }) => theme.color.slate900};
`;

const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: ${({ theme }) => theme.spacing[4]};
`;

const ActivityList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[4]};
`;

const ActivityRow = styled.article`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[3]};
`;

const ActivityInfo = styled.div`
  flex: 1;
`;

const ActivityName = styled.span`
  display: block;
  font-size: ${({ theme }) => theme.fontSize[14]};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ theme }) => theme.color.slate900};
`;

const ActivityAction = styled.span`
  display: block;
  font-size: ${({ theme }) => theme.fontSize[12]};
  color: ${({ theme }) => theme.color.slate500};
`;

const ActivityTime = styled.time`
  font-size: ${({ theme }) => theme.fontSize[12]};
  color: ${({ theme }) => theme.color.slate400};
`;

export function Dashboard() {
  return (
    <Page>
      <Header title="Preact App" links={NAV_LINKS} isSticky />
      <Main>
        <PageTitle>Dashboard</PageTitle>
        <section>
          <SectionTitle>Key Metrics</SectionTitle>
          <MetricsGrid>
            <Progress value={72} max={100}>Monthly Revenue</Progress>
            <Progress value={48} max={100}>User Retention</Progress>
            <Progress value={91} max={100}>System Health</Progress>
            <Progress value={65} max={100}>Task Completion</Progress>
          </MetricsGrid>
        </section>
        <Divider />
        <section>
          <SectionTitle>Resource Usage</SectionTitle>
          <MetricsGrid>
            <Meter value={62} max={100} high={80} optimum={100}>CPU Usage</Meter>
            <Meter value={45} max={100} high={80} optimum={100}>Memory Usage</Meter>
          </MetricsGrid>
        </section>
        <Divider />
        <section>
          <SectionTitle>Recent Activity</SectionTitle>
          <ActivityList>
            {ACTIVITY.map((item) => (
              <ActivityRow key={item.id}>
                <Avatar alt={item.name} fallback={item.initials} />
                <ActivityInfo>
                  <ActivityName>{item.name}</ActivityName>
                  <ActivityAction>{item.action}</ActivityAction>
                </ActivityInfo>
                <Pill variant={item.status}>{item.status}</Pill>
                <ActivityTime>{item.time}</ActivityTime>
              </ActivityRow>
            ))}
          </ActivityList>
        </section>
        <Divider />
        <section>
          <SectionTitle>Recent Updates</SectionTitle>
          <Accordion items={UPDATES} />
        </section>
      </Main>
      <Footer label="© 2025 Preact App. All rights reserved.">
        {['Privacy', 'Terms', 'Contact']}
      </Footer>
    </Page>
  );
}
