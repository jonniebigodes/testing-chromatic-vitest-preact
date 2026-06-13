import type { Meta, StoryObj } from '@storybook/preact-vite';
import AspectRatio from './AspectRatio';

const meta = {
  title: 'Components/AspectRatio',
  component: AspectRatio,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    ratio: {
      control: { type: 'number', min: 0.1, max: 5, step: 0.1 },
      description: 'The aspect ratio of the container (e.g., 16/9, 4/3, 1)',
    },
    children: {
      control: false,
      description: 'Content to be rendered inside the aspect ratio container',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: '600px', maxWidth: '100%' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof AspectRatio>;

export default meta;
type Story = StoryObj<typeof meta>;
/* type RenderStory = Omit<Story, 'args'> & { args?: Partial<Story['args']> }; */ // Intesting concept

/**
 * Default AspectRatio with a 16:9 ratio and an image
 */
export const Default: Story = {
  render: (args) => (
    <AspectRatio {...args}>
      <img
        src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4"
        alt="Landscape"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      />
    </AspectRatio>
  ),
  args: {
    ratio: 16 / 9,
  },
};

/**
 * AspectRatio with 16:9 ratio (widescreen)
 */
export const Ratio16x9: Story = {
  render: (args) => (
    <AspectRatio {...args}>
      <div
        style={{
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '24px',
          fontWeight: 'bold',
        }}
      >
        16:9
      </div>
    </AspectRatio>
  ),
  args: {
    ratio: 16 / 9,
  },
};

/**
 * AspectRatio with 4:3 ratio (classic TV)
 */
export const Ratio4x3: Story = {
  render: (args) => (
    <AspectRatio {...args}>
      <div
        style={{
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '24px',
          fontWeight: 'bold',
        }}
      >
        4:3
      </div>
    </AspectRatio>
  ),
  args: {
    ratio: 4 / 3,
  },
};

/**
 * AspectRatio with 1:1 ratio (square)
 */
export const Ratio1x1: Story = {
  render: (args) => (
    <AspectRatio {...args}>
      <div
        style={{
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '24px',
          fontWeight: 'bold',
        }}
      >
        1:1
      </div>
    </AspectRatio>
  ),
  args: {
    ratio: 1,
  },
};

/**
 * AspectRatio with 21:9 ratio (ultra-wide)
 */
export const Ratio21x9: Story = {
  render: (args) => (
    <AspectRatio {...args}>
      <div
        style={{
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '24px',
          fontWeight: 'bold',
        }}
      >
        21:9
      </div>
    </AspectRatio>
  ),
  args: {
    ratio: 21 / 9,
  },
};

/**
 * AspectRatio with 9:16 ratio (vertical/portrait)
 */
export const Ratio9x16: Story = {
  render: (args) => (
    <AspectRatio {...args}>
      <div
        style={{
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#333',
          fontSize: '24px',
          fontWeight: 'bold',
        }}
      >
        9:16
      </div>
    </AspectRatio>
  ),
  args: {
    ratio: 9 / 16,
  },
};

/**
 * AspectRatio with an image that fills the container
 */
export const WithImage: Story = {
  render: (args) => (
    <AspectRatio {...args}>
      <img
        src="https://images.unsplash.com/photo-1469474968028-56623f02e42e"
        alt="Nature"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      />
    </AspectRatio>
  ),
  args: {
    ratio: 16 / 9,
  },
};

/**
 * AspectRatio with an image that contains (letterboxed)
 */
export const WithImageContain: Story = {
  render: (args) => (
    <AspectRatio {...args}>
      <img
        src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4"
        alt="Landscape"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          background: '#f0f0f0',
        }}
      />
    </AspectRatio>
  ),
  args: {
    ratio: 16 / 9,
  },
};

/**
 * AspectRatio with text content
 */
export const WithText: Story = {
  render: (args) => (
    <AspectRatio {...args}>
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#1f2937',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          padding: '20px',
          textAlign: 'center',
        }}
      >
        <h2 style={{ margin: '0 0 16px 0', fontSize: '28px' }}>
          Aspect Ratio Container
        </h2>
        <p style={{ margin: 0, fontSize: '16px', opacity: 0.8 }}>
          This content maintains a 16:9 aspect ratio regardless of the container
          width.
        </p>
      </div>
    </AspectRatio>
  ),
  args: {
    ratio: 16 / 9,
  },
};

/**
 * AspectRatio with video element
 */
export const WithVideo: Story = {
  render: (args) => (
    <AspectRatio {...args}>
      <video
        controls
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
        poster="https://images.unsplash.com/photo-1517694712202-14dd9538aa97"
      >
        <source
          src="https://www.w3schools.com/html/mov_bbb.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
    </AspectRatio>
  ),
  args: {
    ratio: 16 / 9,
  },
};

/**
 * Responsive AspectRatio that works at different container sizes
 */
export const Responsive: Story = {
  render: (args) => (
    <AspectRatio {...args}>
      <div
        style={{
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: 'clamp(16px, 4vw, 24px)',
          fontWeight: 'bold',
          padding: '20px',
          textAlign: 'center',
        }}
      >
        Resize the window to see the responsive behavior
      </div>
    </AspectRatio>
  ),
  args: {
    ratio: 16 / 9,
  },
  decorators: [
    (Story) => (
      <div style={{ width: '100%', maxWidth: '800px' }}>
        <Story />
      </div>
    ),
  ],
};

/**
 * Multiple AspectRatios in a grid layout
 */
export const MultipleRatios: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '16px',
        width: '100%',
        maxWidth: '800px',
      }}
    >
      <AspectRatio ratio={1}>
        <div
          style={{
            width: '100%',
            height: '100%',
            background: '#ef4444',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 'bold',
          }}
        >
          1:1
        </div>
      </AspectRatio>
      <AspectRatio ratio={4 / 3}>
        <div
          style={{
            width: '100%',
            height: '100%',
            background: '#f59e0b',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 'bold',
          }}
        >
          4:3
        </div>
      </AspectRatio>
      <AspectRatio ratio={16 / 9}>
        <div
          style={{
            width: '100%',
            height: '100%',
            background: '#10b981',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 'bold',
          }}
        >
          16:9
        </div>
      </AspectRatio>
      <AspectRatio ratio={21 / 9}>
        <div
          style={{
            width: '100%',
            height: '100%',
            background: '#3b82f6',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 'bold',
          }}
        >
          21:9
        </div>
      </AspectRatio>
    </div>
  ),
};
