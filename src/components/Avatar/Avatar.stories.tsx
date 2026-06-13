import type { Meta, StoryObj } from "@storybook/preact-vite";
import { fn } from "storybook/test";
import { Avatar } from "./Avatar";

const meta = {
  title: "Components/Avatar",
  component: Avatar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    src: {
      control: "text",
      description: "The source URL of the avatar image",
    },
    alt: {
      control: "text",
      description: "Alternative text for the avatar image",
    },
    fallback: {
      control: "text",
      description: "Fallback text to display (typically initials)",
    },
    onStatusChange: {
      description: "Callback when image status changes",
    },
  },
  args: {
    onStatusChange: fn(),
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default avatar with a valid image URL
 */
export const Default: Story = {
  args: {
    src: "https://i.pravatar.cc/300",
    alt: "John Doe",
    fallback: "JD",
  },
};

/**
 * Avatar with initials fallback when image fails to load
 */
export const WithFallback: Story = {
  args: {
    src: "https://invalid-url-that-will-fail.com/avatar.jpg",
    alt: "Jane Smith",
    fallback: "JS",
  },
};

/**
 * Avatar with single letter fallback
 */
export const SingleLetter: Story = {
  args: {
    /* src: 'https://i.pravatar.cc/300?img=1', */
    alt: "Alice",
    fallback: "A",
  },
};

/**
 * Avatar with three letter initials
 */
export const ThreeLetters: Story = {
  args: {
    /* src: "https://i.pravatar.cc/300?img=2", */
    alt: "Bob Anderson Brown",
    fallback: "BAB",
  },
};

/**
 * Avatar with custom styling via rootProps
 */
export const CustomStyled: Story = {
  args: {
    src: "https://i.pravatar.cc/300?img=3",
    alt: "Sarah Johnson",
    fallback: "SJ",
    rootProps: {
      style: {
        width: "100px",
        height: "100px",
        borderRadius: "50%",
        border: "3px solid #4F46E5",
        overflow: "hidden",
      },
    },
  },
};

/**
 * Avatar with status change callback
 */
export const WithStatusCallback: Story = {
  args: {
    src: "https://i.pravatar.cc/300?img=4",
    alt: "Michael Chen",
    fallback: "MC",
    /* onStatusChange: (details) => {
      console.log("Avatar status changed:", details.status);
    }, */
  },
};

/**
 * Small avatar example
 */
export const Small: Story = {
  args: {
    src: "https://i.pravatar.cc/300?img=5",
    alt: "Emma Wilson",
    fallback: "EW",
    rootProps: {
      style: {
        width: "32px",
        height: "32px",
        borderRadius: "50%",
        overflow: "hidden",
        fontSize: "12px",
      },
    },
  },
};

/**
 * Large avatar example
 */
export const Large: Story = {
  args: {
    src: "https://i.pravatar.cc/300?img=6",
    alt: "David Miller",
    fallback: "DM",
    rootProps: {
      style: {
        width: "150px",
        height: "150px",
        borderRadius: "50%",
        overflow: "hidden",
        fontSize: "48px",
      },
    },
  },
};

export const AvatarGroup: Story = {
  args: {
    alt: "Avatar Group",
    fallback: "AG",
  },
  decorators: [
    (Story) => (
      <div style={{ display: "flex", gap: "8px", flexDirection: "column" }}>
        <h1> Built with Ark UI </h1>
        <Story />
      </div>
    ),
  ],
  render: (args) => (
    <div style={{ display: "flex", gap: "8px" }}>
      <Avatar {...args} />
      <Avatar {...args} />
      <Avatar {...args} />
    </div>
  ),
};

export const OverlappingAvatars: Story = {
  args: {
    alt: "Overlapping Avatar",
    fallback: "OA",
  },
  decorators: [
    (Story) => (
      <div style={{ display: "flex", flexDirection: "column" }}>
        <h1> Overlapping Avatars built with Ark UI </h1>
        <Story />
      </div>
    ),
  ],
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateRows: "repeat(4, 50px)",
        gridAutoFlow: "column",
        gap: "0px",
      }}
    >
      <Avatar
        alt="User 1"
        fallback="U1"
        rootProps={{
          style: {
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            border: "2px solid red",
            overflow: "hidden",
            boxSizing: "border-box",
          },
        }}
      />
      <Avatar
        alt="User 2"
        fallback="U2"
        rootProps={{
          style: {
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            border: "2px solid pink",
            overflow: "hidden",
            boxSizing: "border-box",
          },
        }}
      />
      <Avatar
        alt="User 3"
        fallback="U3"
        rootProps={{
          style: {
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            border: "2px solid blue",
            overflow: "hidden",
            boxSizing: "border-box",
          },
        }}
      />
      <Avatar
        alt="User 4"
        fallback="U4"
        rootProps={{
          style: {
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            border: "2px solid magenta",
            overflow: "hidden",
            boxSizing: "border-box",
          },
        }}
      />
      <Avatar
        alt="User 5"
        fallback="U5"
        rootProps={{
          style: {
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            border: "2px solid green",
            overflow: "hidden",
            boxSizing: "border-box",
          },
        }}
      />
      <Avatar
        alt="User 6"
        fallback="U6"
        rootProps={{
          style: {
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            border: "2px solid #22c55e",
            overflow: "hidden",
            boxSizing: "border-box",
          },
        }}
      />
      <Avatar
        alt="User 7"
        fallback="U7"
        rootProps={{
          style: {
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            border: "2px solid #a855f7",
            overflow: "hidden",
            boxSizing: "border-box",
          },
        }}
      />
      <Avatar
        alt="User 8"
        fallback="U8"
        rootProps={{
          style: {
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            border: "2px solid #06b6d4",
            overflow: "hidden",
            boxSizing: "border-box",
          },
        }}
      />
      <Avatar
        alt="User 9"
        fallback="U9"
        rootProps={{
          style: {
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            border: "2px solid #f59e0b",
            overflow: "hidden",
            boxSizing: "border-box",
          },
        }}
      />
      <Avatar
        alt="User 10"
        fallback="U10"
        rootProps={{
          style: {
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            border: "2px solid black",
            overflow: "hidden",
            boxSizing: "border-box",
          },
        }}
      />
      <Avatar
        alt="User 11"
        fallback="U11"
        rootProps={{
          style: {
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            border: "2px solid purple",
            overflow: "hidden",
            boxSizing: "border-box",
          },
        }}
      />
      <Avatar
        alt="User 12"
        fallback="U12"
        rootProps={{
          style: {
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            border: "2px solid cyan",
            overflow: "hidden",
            boxSizing: "border-box",
          },
        }}
      />
    </div>
  ),
};
