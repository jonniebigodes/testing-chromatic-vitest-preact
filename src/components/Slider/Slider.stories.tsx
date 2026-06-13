import type { Meta, StoryObj } from '@storybook/preact-vite';
import { fn } from 'storybook/test';
import { useState } from 'preact/hooks';
import Slider from './Slider';

const meta = {
  title: 'Components/Slider',
  component: Slider,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'object',
      description: 'The current value of the slider as an array',
    },
    onValueChange: {
      description: 'Event handler called when the slider value changes',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the slider is disabled',
    },
    min: {
      control: 'number',
      description: 'The minimum value of the slider',
    },
    max: {
      control: 'number',
      description: 'The maximum value of the slider',
    },
    step: {
      control: 'number',
      description: 'The increment step of the slider',
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: "The slider's orientation",
    },
    children: {
      control: 'text',
      description: 'Label content to be rendered for the slider',
    },
  },
  args: {
    onValueChange: fn(),
  },
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default slider with standard range (0-100)
 */
export const Default: Story = {
  args: {
    value: [50],
  },
};

/**
 * Slider with a label
 */
export const WithLabel: Story = {
  args: {
    value: [50],
    children: 'Volume',
  },
};

/**
 * Disabled slider
 */
export const Disabled: Story = {
  args: {
    value: [50],
    disabled: true,
    children: 'Disabled slider',
  },
};

/**
 * Slider with custom min and max values
 */
export const CustomRange: Story = {
  args: {
    value: [0],
    min: -50,
    max: 50,
    children: 'Temperature (°C)',
  },
};

/**
 * Slider with custom step value
 */
export const CustomStep: Story = {
  args: {
    value: [0],
    min: 0,
    max: 100,
    step: 10,
    children: 'Brightness (10% increments)',
  },
};

/**
 * Horizontal slider (default orientation)
 */
export const Horizontal: Story = {
  args: {
    value: [50],
    orientation: 'horizontal',
    children: 'Horizontal slider',
  },
};

/**
 * Vertical slider
 */
export const Vertical: Story = {
  args: {
    value: [50],
    orientation: 'vertical',
    children: 'Volume',
  },
};

/**
 * Slider starting at minimum value
 */
export const MinValue: Story = {
  args: {
    value: [0],
    min: 0,
    max: 100,
    children: 'Progress',
  },
};

/**
 * Slider starting at maximum value
 */
export const MaxValue: Story = {
  args: {
    value: [100],
    min: 0,
    max: 100,
    children: 'Completion',
  },
};

/**
 * Controlled slider with state management
 */
export const Controlled: Story = {
  render: () => {
    const ControlledSlider = () => {
      const [value, setValue] = useState([50]);

      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Slider
            value={value}
            onValueChange={(details) => setValue(details.value)}
          >
            Controlled slider
          </Slider>
          <div
            style={{
              padding: '12px',
              backgroundColor: '#f3f4f6',
              borderRadius: '6px',
              fontSize: '14px',
            }}
          >
            <strong>Current value:</strong> {value[0]}
          </div>
          <button
            onClick={() => setValue([0])}
            style={{
              padding: '8px 16px',
              backgroundColor: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500',
            }}
          >
            Reset to 0
          </button>
        </div>
      );
    };

    return <ControlledSlider />;
  },
};

/**
 * Slider with change handler
 */
export const WithChangeHandler: Story = {
  render: () => {
    const SliderWithHandler = () => {
      const [message, setMessage] = useState('');

      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Slider
            value={[50]}
            onValueChange={(details) => {
              setMessage(`Value changed to: ${details.value[0]}`);
            }}
          >
            Adjust volume
          </Slider>
          {message && (
            <div
              style={{
                padding: '12px',
                backgroundColor: '#e0f2fe',
                color: '#0c4a6e',
                borderRadius: '4px',
                fontSize: '14px',
              }}
            >
              {message}
            </div>
          )}
        </div>
      );
    };

    return <SliderWithHandler />;
  },
};

/**
 * Multiple sliders for different settings
 */
export const MultipleSliders: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        padding: '20px',
        border: '1px solid #e5e7eb',
        borderRadius: '8px',
        minWidth: '400px',
      }}
    >
      <h3 style={{ margin: '0 0 8px 0', fontSize: '16px' }}>Audio Settings</h3>
      <Slider value={[70]} min={0} max={100}>
        Master Volume
      </Slider>
      <Slider value={[50]} min={0} max={100}>
        Music
      </Slider>
      <Slider value={[80]} min={0} max={100}>
        Sound Effects
      </Slider>
      <Slider value={[30]} min={0} max={100} disabled>
        Voice (unavailable)
      </Slider>
    </div>
  ),
};

/**
 * Slider with small range
 */
export const SmallRange: Story = {
  args: {
    value: [5],
    min: 0,
    max: 10,
    step: 1,
    children: 'Rating (0-10)',
  },
};

/**
 * Slider with decimal steps
 */
export const DecimalStep: Story = {
  args: {
    value: [2.5],
    min: 0,
    max: 5,
    step: 0.5,
    children: 'Price multiplier',
  },
};

/**
 * Vertical sliders side by side
 */
export const VerticalGroup: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: '24px',
        padding: '20px',
        border: '1px solid #e5e7eb',
        borderRadius: '8px',
      }}
    >
      <Slider value={[30]} orientation="vertical">
        Bass
      </Slider>
      <Slider value={[50]} orientation="vertical">
        Mid
      </Slider>
      <Slider value={[70]} orientation="vertical">
        Treble
      </Slider>
    </div>
  ),
};

/**
 * Temperature control example
 */
export const TemperatureControl: Story = {
  render: () => {
    const TempControl = () => {
      const [temp, setTemp] = useState([20]);

      const getTempColor = (value: number) => {
        if (value < 10) return '#3b82f6'; // Cold - Blue
        if (value < 25) return '#22c55e'; // Comfortable - Green
        return '#ef4444'; // Hot - Red
      };

      return (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            padding: '24px',
            border: '2px solid #e5e7eb',
            borderRadius: '8px',
            minWidth: '400px',
          }}
        >
          <h3 style={{ margin: 0, fontSize: '18px' }}>Thermostat</h3>
          <div
            style={{
              fontSize: '48px',
              fontWeight: 'bold',
              textAlign: 'center',
              color: getTempColor(temp[0]),
            }}
          >
            {temp[0]}°C
          </div>
          <Slider
            value={temp}
            onValueChange={(details) => setTemp(details.value)}
            min={10}
            max={30}
            step={0.5}
          >
            Target Temperature
          </Slider>
          <div
            style={{
              fontSize: '14px',
              color: '#6b7280',
              textAlign: 'center',
            }}
          >
            {temp[0] < 10 && 'Too cold'}
            {temp[0] >= 10 && temp[0] < 25 && 'Comfortable range'}
            {temp[0] >= 25 && 'Too hot'}
          </div>
        </div>
      );
    };

    return <TempControl />;
  },
};
