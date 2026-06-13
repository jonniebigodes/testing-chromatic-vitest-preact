import styled from 'styled-components';
import { useState } from 'preact/hooks';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Form, Input, Label } from '../../components/Form';
import { Toggle } from '../../components/Toggle';
import { RadioGroup, type RadioOption } from '../../components/RadioGroup';
import { Slider } from '../../components/Slider';
import Button from '../../components/Button';
import Divider from '../../components/Divider';

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Products', href: '/products' },
  { label: 'Profile', href: '/profile' },
];

const THEME_OPTIONS: RadioOption[] = [
  { label: 'Light', value: 'light' },
  { label: 'Dark', value: 'dark' },
  { label: 'System', value: 'system' },
];

const LANGUAGE_OPTIONS: RadioOption[] = [
  { label: 'English', value: 'en' },
  { label: 'Portuguese', value: 'pt' },
  { label: 'Spanish', value: 'es' },
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

const SectionTitle = styled.h2`
  margin: 0 0 ${({ theme }) => theme.spacing[4]};
  font-size: ${({ theme }) => theme.fontSize[18]};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  color: ${({ theme }) => theme.color.slate900};
`;

const ToggleGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[3]};
`;

const AppearanceGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[6]};
`;

const SliderLabel = styled.span`
  font-size: ${({ theme }) => theme.fontSize[14]};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ theme }) => theme.color.slate700};
`;

export function Settings() {
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);
  const [securityAlerts, setSecurityAlerts] = useState(true);
  const [selectedTheme, setSelectedTheme] = useState('system');
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [fontSize, setFontSize] = useState([16]);

  return (
    <Page>
      <Header title="Preact App" links={NAV_LINKS} isSticky />
      <Main>
        <PageTitle>Settings</PageTitle>
        <section>
          <SectionTitle>Account</SectionTitle>
          <Form onSubmit={(e) => e.preventDefault()}>
            <Label htmlFor="settings-username">Username</Label>
            <Input
              id="settings-username"
              defaultValue="janedoe"
              placeholder="Enter username"
            />
            <Label htmlFor="settings-current-password">Current Password</Label>
            <Input
              id="settings-current-password"
              type="password"
              placeholder="Enter current password"
            />
            <Label htmlFor="settings-new-password">New Password</Label>
            <Input
              id="settings-new-password"
              type="password"
              placeholder="Enter new password"
            />
          </Form>
        </section>
        <Divider />
        <section>
          <SectionTitle>Notifications</SectionTitle>
          <ToggleGroup>
            <Toggle pressed={emailAlerts} onPressedChange={setEmailAlerts}>
              Email alerts
            </Toggle>
            <Toggle
              pressed={pushNotifications}
              onPressedChange={setPushNotifications}
            >
              Push notifications
            </Toggle>
            <Toggle pressed={securityAlerts} onPressedChange={setSecurityAlerts}>
              Security alerts
            </Toggle>
          </ToggleGroup>
        </section>
        <Divider />
        <section>
          <SectionTitle>Appearance</SectionTitle>
          <AppearanceGroup>
            <RadioGroup
              options={THEME_OPTIONS}
              value={selectedTheme}
              name="theme"
              onValueChange={(details) =>
                setSelectedTheme(details.value ?? 'system')
              }
            >
              Theme
            </RadioGroup>
            <RadioGroup
              options={LANGUAGE_OPTIONS}
              value={selectedLanguage}
              name="language"
              onValueChange={(details) =>
                setSelectedLanguage(details.value ?? 'en')
              }
            >
              Language
            </RadioGroup>
            <div>
              <SliderLabel>Font Size: {fontSize[0]}px</SliderLabel>
              <Slider
                value={fontSize}
                min={12}
                max={24}
                step={1}
                onValueChange={(details) => setFontSize(details.value)}
              />
            </div>
          </AppearanceGroup>
        </section>
        <Divider />
        <Button label="Save Settings" size="large" />
      </Main>
      <Footer label="© 2025 Preact App. All rights reserved.">
        {['Privacy', 'Terms', 'Contact']}
      </Footer>
    </Page>
  );
}
