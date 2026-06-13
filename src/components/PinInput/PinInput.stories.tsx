import type { Meta, StoryObj } from '@storybook/preact-vite';
import PinInput from './PinInput';
import { useState } from 'preact/hooks';

const meta: Meta<typeof PinInput> = {
  title: 'Components/Form/PinInput',
  component: PinInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'object',
      description: 'The controlled value of the pin input',
    },
    onValueChange: {
      action: 'valueChanged',
      description: 'Function called on input change',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the inputs are disabled',
    },
    maxLength: {
      control: 'number',
      description: 'The number of input fields to render',
    },
    required: {
      control: 'boolean',
      description: 'Whether the pin input is required',
    },
    name: {
      control: 'text',
      description: 'The name of the input element for form submission',
    },
    type: {
      control: 'select',
      options: ['numeric', 'alphanumeric', 'alphabetic'],
      description: 'The type of value the pin-input should allow',
    },
    mask: {
      control: 'boolean',
      description: 'If true, the input value will be masked',
    },
    placeholder: {
      control: 'text',
      description: 'The placeholder text for the inputs',
    },
    otp: {
      control: 'boolean',
      description: 'If true, enables OTP autocomplete',
    },
    children: {
      control: 'text',
      description: 'Custom label content',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default pin input with 4 numeric fields.
 */
export const Default: Story = {
  args: {
    children: 'Enter PIN',
    maxLength: 4,
  },
};

/**
 * Pin input in disabled state.
 */
export const Disabled: Story = {
  args: {
    children: 'Disabled PIN',
    maxLength: 4,
    disabled: true,
  },
};

/**
 * Pin input with required attribute.
 */
export const Required: Story = {
  args: {
    children: 'Required PIN',
    maxLength: 4,
    required: true,
  },
};

/**
 * Pin input with name attribute for form submission.
 */
export const WithName: Story = {
  args: {
    children: 'PIN with Name',
    maxLength: 4,
    name: 'verification-code',
  },
};

/**
 * Pin input with custom label content.
 */
export const CustomChildren: Story = {
  args: {
    children: 'Enter your security code',
    maxLength: 6,
  },
};

/**
 * Pin input with 6 fields for longer codes.
 */
export const SixDigits: Story = {
  args: {
    children: '6-Digit Code',
    maxLength: 6,
  },
};

/**
 * Pin input with masked values (password-style).
 */
export const Masked: Story = {
  args: {
    children: 'Secret PIN',
    maxLength: 4,
    mask: true,
  },
};

/**
 * Pin input allowing alphanumeric values.
 */
export const Alphanumeric: Story = {
  args: {
    children: 'Alphanumeric Code',
    maxLength: 5,
    type: 'alphanumeric',
  },
};

/**
 * Pin input allowing only alphabetic values.
 */
export const Alphabetic: Story = {
  args: {
    children: 'Letter Code',
    maxLength: 4,
    type: 'alphabetic',
  },
};

/**
 * Pin input with custom placeholder.
 */
export const CustomPlaceholder: Story = {
  args: {
    children: 'Enter Code',
    maxLength: 4,
    placeholder: '0',
  },
};

/**
 * Pin input in OTP mode with autocomplete.
 */
export const OTPMode: Story = {
  args: {
    children: 'One-Time Password',
    maxLength: 6,
    otp: true,
  },
};

/**
 * Controlled pin input with state management.
 */
export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>([]);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <PinInput
          value={value}
          onValueChange={(details) => setValue(details.value)}
          maxLength={4}
          children="Controlled PIN"
        />
        <div style={{ fontSize: '14px', color: '#6b7280' }}>
          Current value: {value.join('') || '(empty)'}
        </div>
        <button
          onClick={() => setValue([])}
          style={{
            padding: '8px 16px',
            backgroundColor: '#ef4444',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px',
          }}
        >
          Clear
        </button>
      </div>
    );
  },
};

/**
 * Pin input with completion handler.
 */
export const WithCompletion: Story = {
  render: () => {
    const [isComplete, setIsComplete] = useState(false);
    const [pin, setPin] = useState('');

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <PinInput
          maxLength={4}
          onValueChange={(details) => {
            setPin(details.valueAsString);
            setIsComplete(details.valueAsString.length === 4);
          }}
          children="Enter 4-Digit PIN"
        />
        {isComplete && (
          <div
            style={{
              padding: '12px',
              backgroundColor: '#d1fae5',
              color: '#065f46',
              borderRadius: '6px',
              fontSize: '14px',
              fontWeight: 500,
            }}
          >
            ✓ PIN Complete: {pin}
          </div>
        )}
      </div>
    );
  },
};

/**
 * Form submission example with pin input.
 */
export const FormSubmission: Story = {
  render: () => {
    const [submittedValue, setSubmittedValue] = useState('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const pinValue = formData.get('security-pin') as string;
      setSubmittedValue(pinValue);
    };

    return (
      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          padding: '24px',
          border: '1px solid #e5e7eb',
          borderRadius: '8px',
        }}
      >
        <PinInput
          name="security-pin"
          maxLength={4}
          required
          children="Security PIN"
        />
        <button
          type="submit"
          style={{
            padding: '10px 20px',
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: 500,
          }}
        >
          Submit
        </button>
        {submittedValue && (
          <div
            style={{
              padding: '12px',
              backgroundColor: '#f3f4f6',
              borderRadius: '6px',
              fontSize: '14px',
            }}
          >
            Submitted PIN: <strong>{submittedValue}</strong>
          </div>
        )}
      </form>
    );
  },
};

/**
 * Two-factor authentication example.
 */
export const TwoFactorAuth: Story = {
  render: () => {
    const [code, setCode] = useState('');
    const [isVerifying, setIsVerifying] = useState(false);
    const [isVerified, setIsVerified] = useState(false);

    const handleVerify = () => {
      if (code.length === 6) {
        setIsVerifying(true);
        setTimeout(() => {
          setIsVerifying(false);
          setIsVerified(true);
        }, 1500);
      }
    };

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          padding: '32px',
          backgroundColor: '#f9fafb',
          borderRadius: '12px',
          maxWidth: '400px',
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <h3
            style={{
              margin: 0,
              fontSize: '20px',
              fontWeight: 600,
              color: '#111827',
            }}
          >
            Two-Factor Authentication
          </h3>
          <p style={{ margin: '8px 0 0', fontSize: '14px', color: '#6b7280' }}>
            Enter the 6-digit code sent to your device
          </p>
        </div>

        <PinInput
          maxLength={6}
          onValueChange={(details) => setCode(details.valueAsString)}
          disabled={isVerified}
          otp
        />

        <button
          onClick={handleVerify}
          disabled={code.length !== 6 || isVerifying || isVerified}
          style={{
            padding: '12px',
            backgroundColor: isVerified
              ? '#10b981'
              : code.length === 6
                ? '#3b82f6'
                : '#9ca3af',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor:
              code.length === 6 && !isVerifying && !isVerified
                ? 'pointer'
                : 'not-allowed',
            fontSize: '15px',
            fontWeight: 600,
          }}
        >
          {isVerified
            ? '✓ Verified'
            : isVerifying
              ? 'Verifying...'
              : 'Verify Code'}
        </button>

        {isVerified && (
          <div
            style={{
              padding: '12px',
              backgroundColor: '#d1fae5',
              color: '#065f46',
              borderRadius: '8px',
              fontSize: '14px',
              textAlign: 'center',
              fontWeight: 500,
            }}
          >
            Authentication successful!
          </div>
        )}
      </div>
    );
  },
};

/**
 * Multiple pin inputs with different configurations.
 */
export const Variations: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '32px',
        padding: '16px',
      }}
    >
      <div>
        <PinInput maxLength={4} children="4-Digit PIN" type="numeric" />
      </div>
      <div>
        <PinInput maxLength={6} children="6-Digit OTP" type="numeric" otp />
      </div>
      <div>
        <PinInput maxLength={4} children="Masked PIN" type="numeric" mask />
      </div>
      <div>
        <PinInput maxLength={5} children="Alphanumeric" type="alphanumeric" />
      </div>
      <div>
        <PinInput maxLength={4} children="Disabled" type="numeric" disabled />
      </div>
    </div>
  ),
};
