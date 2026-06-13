import type { Meta, StoryObj } from '@storybook/preact-vite';
import Progress from './Progress';
import { useState } from 'preact/hooks';

const meta: Meta<typeof Progress> = {
  title: 'Components/Progress',
  component: Progress,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    min: {
      control: 'number',
      description: 'The minimum value of the progress bar',
    },
    max: {
      control: 'number',
      description: 'The maximum value of the progress bar',
    },
    value: {
      control: 'number',
      description: 'The current value of the progress bar',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the progress bar is disabled',
    },
    readonly: {
      control: 'boolean',
      description: 'Whether the progress bar is read-only',
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'The orientation of the progress bar',
    },
    children: {
      control: 'text',
      description: 'Custom content to render',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default progress bar with 50% completion.
 */
export const Default: Story = {
  args: {
    value: 50,
    min: 0,
    max: 100,
  },
};

/**
 * Progress bar with custom range (0-200) at 75 value.
 */
export const CustomRange: Story = {
  args: {
    value: 75,
    min: 0,
    max: 200,
    children: 'Custom Range Progress',
  },
};

/**
 * Progress bar in disabled state.
 */
export const Disabled: Story = {
  args: {
    value: 60,
    disabled: true,
    children: 'Disabled Progress',
  },
};

/**
 * Progress bar in read-only state with different color.
 */
export const ReadOnly: Story = {
  args: {
    value: 75,
    readonly: true,
    children: 'Read-only Progress',
  },
};

/**
 * Progress bar with vertical orientation.
 */
export const Vertical: Story = {
  args: {
    value: 65,
    orientation: 'vertical',
    children: 'Vertical Progress',
  },
};

/**
 * Progress bar showing 0% completion.
 */
export const ZeroProgress: Story = {
  args: {
    value: 0,
    children: 'Not Started',
  },
};

/**
 * Progress bar showing 100% completion.
 */
export const Complete: Story = {
  args: {
    value: 100,
    children: 'Complete!',
  },
};

/**
 * Progress bar with custom children content.
 */
export const CustomChildren: Story = {
  args: {
    value: 45,
    children: 'Uploading files...',
  },
};

/**
 * Controlled progress bar with dynamic value.
 */
export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState(0);

    const startProgress = () => {
      setValue(0);
      const interval = setInterval(() => {
        setValue((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 5;
        });
      }, 200);
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <Progress value={value} children="Loading..." />
        <button
          onClick={startProgress}
          style={{
            padding: '8px 16px',
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
          }}
        >
          Start Progress
        </button>
      </div>
    );
  },
};

/**
 * Multiple progress bars with different values.
 */
export const MultipleProgress: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        width: '400px',
      }}
    >
      <Progress value={25} children="Task 1" />
      <Progress value={50} children="Task 2" />
      <Progress value={75} children="Task 3" />
      <Progress value={100} children="Task 4" />
    </div>
  ),
};

/**
 * Vertical progress bars in a group.
 */
export const VerticalGroup: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
      <Progress value={30} orientation="vertical" children="CPU" />
      <Progress value={60} orientation="vertical" children="Memory" />
      <Progress value={85} orientation="vertical" children="Disk" />
      <Progress value={45} orientation="vertical" children="Network" />
    </div>
  ),
};

/**
 * Download progress with percentage display.
 */
export const Download: Story = {
  render: () => {
    const [progress, setProgress] = useState(0);
    const [isDownloading, setIsDownloading] = useState(false);

    const startDownload = () => {
      setIsDownloading(true);
      setProgress(0);

      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsDownloading(false);
            return 100;
          }
          return prev + 2;
        });
      }, 100);
    };

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          width: '400px',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <span style={{ fontSize: '14px', fontWeight: 500 }}>
            {isDownloading
              ? 'Downloading...'
              : progress === 100
                ? 'Download complete!'
                : 'Ready to download'}
          </span>
        </div>
        <Progress value={progress} children="" />
        <button
          onClick={startDownload}
          disabled={isDownloading}
          style={{
            padding: '8px 16px',
            backgroundColor: isDownloading ? '#9ca3af' : '#10b981',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: isDownloading ? 'not-allowed' : 'pointer',
          }}
        >
          {isDownloading
            ? `Downloading... ${Math.round(progress)}%`
            : 'Start Download'}
        </button>
      </div>
    );
  },
};

/**
 * Progress with different states in a dashboard.
 */
export const Dashboard: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        width: '500px',
        padding: '24px',
        backgroundColor: '#f9fafb',
        borderRadius: '8px',
      }}
    >
      <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 600 }}>
        Project Progress
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div>
          <Progress value={100} children="Requirements Gathering" />
        </div>
        <div>
          <Progress value={100} children="Design Phase" />
        </div>
        <div>
          <Progress value={65} children="Development" />
        </div>
        <div>
          <Progress value={30} children="Testing" />
        </div>
        <div>
          <Progress value={0} children="Deployment" />
        </div>
      </div>
    </div>
  ),
};

/**
 * Progress with min value other than 0.
 */
export const CustomMinMax: Story = {
  args: {
    value: 150,
    min: 100,
    max: 200,
    children: 'Custom Min/Max (100-200)',
  },
};
