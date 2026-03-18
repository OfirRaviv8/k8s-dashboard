# Design Token System — K8s Dashboard

## Overview

The K8s Dashboard uses a comprehensive **SideWall Design Token System** that centralizes all design decisions as CSS variables and TypeScript constants. This ensures consistency across the entire application and makes it easy to maintain and update the visual design.

## Color Palette

### Primary Colors
- **Navy**: `#0A1628` — Primary background color
- **Teal**: `#00BA46` — Primary accent and interactive elements
- **Danger Red**: `#DC2626` — Error and critical states
- **Warning Amber**: `#FBBF24` — Warning and caution states

### Color Palettes
Each color has a full 10-shade palette (50–900) for flexibility:

```css
/* Navy palette */
--color-navy-50: #f0f4f9;
--color-navy-800: #0a1628; /* Primary */

/* Teal palette */
--color-teal-50: #f0fdf9;
--color-teal-700: #00ba46; /* Primary */

/* Danger palette */
--color-danger-600: #dc2626; /* Primary */

/* Warning palette */
--color-warning-400: #fbbf24; /* Primary */

/* Success palette */
--color-success-600: #16a34a;

/* Slate palette */
--color-slate-500: #64748b;
```

### Semantic Colors
Semantic tokens map colors to their purpose:

```css
--color-status-success: #00ba46;
--color-status-warning: #fbbf24;
--color-status-danger: #dc2626;
--color-status-info: #3b82f6;

--color-text-primary: #e2e8f0;
--color-text-secondary: #94a3b8;
--color-text-tertiary: #64748b;

--color-bg-primary: #0a1628;
--color-bg-secondary: #1a2332;
--color-bg-tertiary: #2a3a52;
```

## Typography

### Font Families
- **Display/Body**: `Space Grotesk` — Modern, geometric sans-serif for UI
- **Mono**: `JetBrains Mono` — Technical monospace for data and code

### Typography Scales

#### Display (Headlines)
```css
--font-size-display-lg: 3rem;      /* 48px */
--font-size-display-md: 2.25rem;   /* 36px */
--font-size-display-sm: 1.875rem;  /* 30px */
```

#### Heading (Section Titles)
```css
--font-size-heading-lg: 1.5rem;    /* 24px */
--font-size-heading-md: 1.25rem;   /* 20px */
--font-size-heading-sm: 1rem;      /* 16px */
--font-size-heading-xs: 0.875rem;  /* 14px */
```

#### Body (Regular Text)
```css
--font-size-body-lg: 1.125rem;     /* 18px */
--font-size-body-md: 1rem;         /* 16px */
--font-size-body-sm: 0.875rem;     /* 14px */
--font-size-body-xs: 0.75rem;      /* 12px */
```

#### Mono (Data & Code)
```css
--font-size-mono-lg: 1rem;         /* 16px */
--font-size-mono-md: 0.875rem;     /* 14px */
--font-size-mono-sm: 0.75rem;      /* 12px */
--font-size-mono-xs: 0.625rem;     /* 10px */
```

#### Label (Form Labels & Badges)
```css
--font-size-label-md: 0.875rem;    /* 14px */
--font-size-label-sm: 0.75rem;     /* 12px */
```

### Font Weights
```css
--font-weight-regular: 400;
--font-weight-medium: 500;
--font-weight-semibold: 600;
--font-weight-bold: 700;
```

### Line Heights
```css
--line-height-display: 1.2;
--line-height-heading: 1.4;
--line-height-body: 1.6;
--line-height-mono: 1.5;
```

### Letter Spacing
```css
--letter-spacing-tight: -0.02em;
--letter-spacing-normal: 0;
--letter-spacing-wide: 0.01em;
--letter-spacing-wider: 0.02em;
```

## Spacing

Base unit: **4px**

```css
--spacing-1: 0.25rem;   /* 4px */
--spacing-2: 0.5rem;    /* 8px */
--spacing-3: 0.75rem;   /* 12px */
--spacing-4: 1rem;      /* 16px */
--spacing-5: 1.25rem;   /* 20px */
--spacing-6: 1.5rem;    /* 24px */
--spacing-7: 1.75rem;   /* 28px */
--spacing-8: 2rem;      /* 32px */
--spacing-9: 2.25rem;   /* 36px */
--spacing-10: 2.5rem;   /* 40px */
--spacing-12: 3rem;     /* 48px */
--spacing-16: 4rem;     /* 64px */
--spacing-20: 5rem;     /* 80px */
--spacing-24: 6rem;     /* 96px */
```

## Border Radius

```css
--radius-none: 0;
--radius-xs: 0.25rem;   /* 4px */
--radius-sm: 0.375rem;  /* 6px */
--radius-md: 0.5rem;    /* 8px */
--radius-lg: 0.75rem;   /* 12px */
--radius-xl: 1rem;      /* 16px */
--radius-full: 9999px;
```

## Shadows

```css
--shadow-xs: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
--shadow-sm: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
--shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
```

## Transitions

```css
--transition-fast: 100ms ease-in-out;
--transition-base: 150ms ease-in-out;
--transition-slow: 300ms ease-in-out;
```

## Component States

```css
--state-hover: rgba(255, 255, 255, 0.08);
--state-active: rgba(0, 186, 70, 0.15);
--state-disabled: rgba(255, 255, 255, 0.04);
--state-focus: rgba(0, 186, 70, 0.3);
```

## Usage

### In CSS
```css
/* Using CSS variables directly */
.my-component {
  background-color: var(--color-navy-800);
  color: var(--color-text-primary);
  padding: var(--spacing-4);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-md);
  transition: all var(--transition-base);
}
```

### In Tailwind CSS
```jsx
// Using Tailwind utilities that reference design tokens
<div className="bg-navy-800 text-slate-100 p-4 rounded-md shadow-md">
  Content
</div>
```

### In React Components
```tsx
import { useDesignTokens, getTypography, getSemanticColor } from '@/hooks/useDesignTokens';

export function MyComponent() {
  const tokens = useDesignTokens();
  const headingStyle = getTypography('heading.lg');
  const successColor = getSemanticColor('status.success');

  return (
    <div style={{ ...headingStyle, color: successColor }}>
      Styled with design tokens
    </div>
  );
}
```

### In TypeScript
```tsx
import { designTokens } from '@/lib/design-tokens';

const primaryColor = designTokens.colors.teal[700];
const spacing = designTokens.spacing[4];
const radius = designTokens.radius.md;
```

## Files

- **`client/src/index.css`** — CSS variables and base styles
- **`client/src/lib/design-tokens.ts`** — TypeScript token definitions
- **`tailwind.config.ts`** — Tailwind configuration referencing tokens
- **`client/src/hooks/useDesignTokens.ts`** — React hook for token access

## Updating Design Tokens

To update any design token:

1. Update the value in `client/src/lib/design-tokens.ts`
2. Update the corresponding CSS variable in `client/src/index.css`
3. Update `tailwind.config.ts` if adding new token groups
4. The changes will automatically propagate to all components

## Best Practices

1. **Always use design tokens** — Never hardcode colors, spacing, or typography
2. **Use semantic tokens** — Prefer `--color-status-success` over `--color-teal-700`
3. **Maintain consistency** — Use the same spacing scale throughout
4. **Respect the palette** — Stick to defined colors and sizes
5. **Document custom values** — If you need something not in the system, add it to the tokens first

## Status Badge Colors

- **Running**: Emerald (`#16a34a`)
- **Pending**: Amber (`#fbbf24`)
- **Failed**: Red (`#dc2626`)
- **Unknown**: Slate (`#64748b`)

## Category Badge Colors

- **RBAC**: Purple
- **Network**: Blue
- **Image**: Teal
- **Config**: Amber
- **Secrets**: Red
- **Runtime**: Orange
