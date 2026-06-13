import type { Meta, StoryObj } from '@storybook/preact-vite';
import Meter from './Meter';

const meta: Meta<typeof Meter> = {
  title: 'Components/Meter',
  component: Meter,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    min: {
      control: 'number',
      description: 'The minimum value of the meter',
    },
    max: {
      control: 'number',
      description: 'The maximum value of the meter',
    },
    value: {
      control: 'number',
      description: 'The current value of the meter',
    },
    children: {
      control: 'text',
      description: 'Custom label content to render',
    },
    optimum: {
      control: 'number',
      description: 'The optimum value for the meter',
    },
    low: {
      control: 'number',
      description: 'Low threshold value',
    },
    high: {
      control: 'number',
      description: 'High threshold value',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default meter with 50% value.
 */
export const Default: Story = {
  args: {
    value: 50,
    min: 0,
    max: 100,
    children: 'Usage',
  },
};

/**
 * Meter with custom min, max, and value.
 */
export const CustomRange: Story = {
  args: {
    value: 150,
    min: 0,
    max: 200,
    children: 'Storage Usage',
  },
};

/**
 * Meter with custom children content.
 */
export const CustomChildren: Story = {
  args: {
    value: 75,
    min: 0,
    max: 100,
    children: 'Server Load',
  },
};

/**
 * Low value meter (shows in green when optimum is low).
 */
export const LowValue: Story = {
  args: {
    value: 25,
    min: 0,
    max: 100,
    optimum: 20,
    low: 30,
    high: 70,
    children: 'Temperature',
  },
};

/**
 * Medium value meter (shows in amber).
 */
export const MediumValue: Story = {
  args: {
    value: 50,
    min: 0,
    max: 100,
    optimum: 100,
    low: 33,
    high: 66,
    children: 'Battery Level',
  },
};

/**
 * High value meter (shows in green when optimum is high).
 */
export const HighValue: Story = {
  args: {
    value: 85,
    min: 0,
    max: 100,
    optimum: 100,
    low: 33,
    high: 66,
    children: 'Download Speed',
  },
};

/**
 * Critical value meter (shows in red).
 */
export const CriticalValue: Story = {
  args: {
    value: 95,
    min: 0,
    max: 100,
    optimum: 20,
    low: 30,
    high: 70,
    children: 'CPU Temperature',
  },
};

/**
 * Disk usage example.
 */
export const DiskUsage: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        width: '400px',
      }}
    >
      <Meter
        value={45}
        min={0}
        max={100}
        optimum={0}
        low={50}
        high={80}
        children="C: Drive"
      />
      <Meter
        value={72}
        min={0}
        max={100}
        optimum={0}
        low={50}
        high={80}
        children="D: Drive"
      />
      <Meter
        value={88}
        min={0}
        max={100}
        optimum={0}
        low={50}
        high={80}
        children="E: Drive"
      />
    </div>
  ),
};

/**
 * Battery levels for multiple devices.
 */
export const BatteryLevels: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        width: '400px',
      }}
    >
      <Meter
        value={95}
        min={0}
        max={100}
        optimum={100}
        low={20}
        high={50}
        children="Phone"
      />
      <Meter
        value={68}
        min={0}
        max={100}
        optimum={100}
        low={20}
        high={50}
        children="Laptop"
      />
      <Meter
        value={42}
        min={0}
        max={100}
        optimum={100}
        low={20}
        high={50}
        children="Tablet"
      />
      <Meter
        value={15}
        min={0}
        max={100}
        optimum={100}
        low={20}
        high={50}
        children="Watch"
      />
    </div>
  ),
};

/**
 * Network bandwidth usage.
 */
export const NetworkUsage: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        width: '400px',
      }}
    >
      <Meter
        value={320}
        min={0}
        max={1000}
        optimum={1000}
        children="Download Speed (Mbps)"
      />
      <Meter
        value={89}
        min={0}
        max={100}
        optimum={1000}
        children="Upload Speed (Mbps)"
      />
      <Meter
        value={45}
        min={0}
        max={100}
        optimum={0}
        low={40}
        high={75}
        children="Network Load %"
      />
    </div>
  ),
};

/**
 * System resources monitoring.
 */
export const SystemResources: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        width: '500px',
        padding: '24px',
        backgroundColor: '#f9fafb',
        borderRadius: '12px',
      }}
    >
      <h3
        style={{
          margin: 0,
          fontSize: '18px',
          fontWeight: 600,
          color: '#111827',
        }}
      >
        System Monitor
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <Meter
          value={65}
          min={0}
          max={100}
          optimum={0}
          low={50}
          high={80}
          children="CPU Usage"
        />
        <Meter
          value={78}
          min={0}
          max={100}
          optimum={0}
          low={60}
          high={85}
          children="Memory Usage"
        />
        <Meter
          value={42}
          min={0}
          max={100}
          optimum={0}
          low={70}
          high={90}
          children="Disk I/O"
        />
        <Meter
          value={28}
          min={0}
          max={100}
          optimum={50}
          low={30}
          high={70}
          children="Temperature"
        />
      </div>
    </div>
  ),
};

/**
 * Temperature ranges with different optimum values.
 */
export const TemperatureRanges: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        width: '400px',
      }}
    >
      <Meter
        value={18}
        min={0}
        max={50}
        optimum={20}
        low={15}
        high={30}
        children="Refrigerator (°C)"
      />
      <Meter
        value={22}
        min={0}
        max={40}
        optimum={22}
        low={18}
        high={26}
        children="Room Temp (°C)"
      />
      <Meter
        value={65}
        min={0}
        max={100}
        optimum={70}
        low={60}
        high={80}
        children="Water Heater (°C)"
      />
      <Meter
        value={180}
        min={0}
        max={250}
        optimum={180}
        low={150}
        high={200}
        children="Oven (°C)"
      />
    </div>
  ),
};

/**
 * Memory usage by application.
 */
export const MemoryUsage: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        width: '450px',
        padding: '20px',
        border: '1px solid #e5e7eb',
        borderRadius: '8px',
      }}
    >
      <h4
        style={{
          margin: 0,
          fontSize: '16px',
          fontWeight: 600,
          color: '#111827',
        }}
      >
        Application Memory Usage
      </h4>
      <Meter
        value={2.4}
        min={0}
        max={8}
        optimum={0}
        low={4}
        high={6}
        children="Chrome (GB)"
      />
      <Meter
        value={1.8}
        min={0}
        max={8}
        optimum={0}
        low={4}
        high={6}
        children="VS Code (GB)"
      />
      <Meter
        value={0.5}
        min={0}
        max={8}
        optimum={0}
        low={4}
        high={6}
        children="Terminal (GB)"
      />
      <Meter
        value={0.3}
        min={0}
        max={8}
        optimum={0}
        low={4}
        high={6}
        children="Spotify (GB)"
      />
      <div
        style={{
          marginTop: '8px',
          padding: '12px',
          backgroundColor: '#f3f4f6',
          borderRadius: '6px',
        }}
      >
        <strong>Total: 5.0 GB / 8 GB</strong>
      </div>
    </div>
  ),
};

/**
 * Score meters with percentage display.
 */
export const ScoreMeters: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        width: '400px',
      }}
    >
      <Meter
        value={92}
        min={0}
        max={100}
        optimum={100}
        low={60}
        high={80}
        children="Performance Score"
      />
      <Meter
        value={78}
        min={0}
        max={100}
        optimum={100}
        low={60}
        high={80}
        children="Accessibility Score"
      />
      <Meter
        value={85}
        min={0}
        max={100}
        optimum={100}
        low={60}
        high={80}
        children="Best Practices Score"
      />
      <Meter
        value={95}
        min={0}
        max={100}
        optimum={100}
        low={60}
        high={80}
        children="SEO Score"
      />
    </div>
  ),
};

/**
 * Minimal meter without label.
 */
export const MinimalNoLabel: Story = {
  args: {
    value: 60,
    min: 0,
    max: 100,
  },
};

/**
 * Full range meter at 100%.
 */
export const FullRange: Story = {
  args: {
    value: 100,
    min: 0,
    max: 100,
    children: 'Complete',
  },
};

/**
 * Empty meter at 0%.
 */
export const EmptyRange: Story = {
  args: {
    value: 0,
    min: 0,
    max: 100,
    children: 'Not Started',
  },
};
