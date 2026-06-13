import styled from 'styled-components';
import { useState } from 'preact/hooks';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Avatar } from '../../components/Avatar';
import { Form, Input, Label } from '../../components/Form';
import { Toggle } from '../../components/Toggle';
import Button from '../../components/Button';
import Divider from '../../components/Divider';

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Products', href: '/products' },
  { label: 'Settings', href: '/settings' },
];

const Page = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Main = styled.main`
  flex: 1;
  max-width: 720px;
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

const AvatarSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[4]};
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[1]};
`;

const UserName = styled.span`
  font-size: ${({ theme }) => theme.fontSize[20]};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  color: ${({ theme }) => theme.color.slate900};
`;

const UserEmail = styled.span`
  font-size: ${({ theme }) => theme.fontSize[14]};
  color: ${({ theme }) => theme.color.slate500};
`;

const SectionTitle = styled.h2`
  margin: 0 0 ${({ theme }) => theme.spacing[4]};
  font-size: ${({ theme }) => theme.fontSize[18]};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  color: ${({ theme }) => theme.color.slate900};
`;

const NotificationsGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[3]};
`;

export function Profile() {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [marketingEmails, setMarketingEmails] = useState(false);

  return (
    <Page>
      <Header title="Preact App" links={NAV_LINKS} isSticky />
      <Main>
        <PageTitle>Profile</PageTitle>
        <AvatarSection>
          <Avatar alt="Jane Doe" fallback="JD" />
          <UserInfo>
            <UserName>Jane Doe</UserName>
            <UserEmail>jane.doe@example.com</UserEmail>
          </UserInfo>
        </AvatarSection>
        <Divider />
        <section>
          <SectionTitle>Personal Information</SectionTitle>
          <Form onSubmit={(e) => e.preventDefault()}>
            <Label htmlFor="profile-name">Full Name</Label>
            <Input
              id="profile-name"
              defaultValue="Jane Doe"
              placeholder="Your full name"
            />
            <Label htmlFor="profile-email">Email Address</Label>
            <Input
              id="profile-email"
              type="email"
              defaultValue="jane.doe@example.com"
              placeholder="your@email.com"
            />
            <Label htmlFor="profile-bio">Bio</Label>
            <Input
              id="profile-bio"
              defaultValue="Frontend developer at Acme Corp."
              placeholder="Tell us about yourself"
            />
          </Form>
        </section>
        <Divider />
        <section>
          <SectionTitle>Notifications</SectionTitle>
          <NotificationsGroup>
            <Toggle
              pressed={emailNotifications}
              onPressedChange={setEmailNotifications}
            >
              Email notifications
            </Toggle>
            <Toggle
              pressed={marketingEmails}
              onPressedChange={setMarketingEmails}
            >
              Marketing emails
            </Toggle>
          </NotificationsGroup>
        </section>
        <Button label="Save Changes" size="large" />
      </Main>
      <Footer label="© 2025 Preact App. All rights reserved.">
        {['Privacy', 'Terms', 'Contact']}
      </Footer>
    </Page>
  );
}
