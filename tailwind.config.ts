/**
 * Tailwind Config — Design Token Integration
 * References CSS variables from client/src/index.css
 * SideWall palette: Navy #0A1628, Teal #00BA46, Danger red, Warning amber
 */

import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./client/src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Navy palette
        navy: {
          50: 'var(--color-navy-50)',
          100: 'var(--color-navy-100)',
          200: 'var(--color-navy-200)',
          300: 'var(--color-navy-300)',
          400: 'var(--color-navy-400)',
          500: 'var(--color-navy-500)',
          600: 'var(--color-navy-600)',
          700: 'var(--color-navy-700)',
          800: 'var(--color-navy-800)',
          900: 'var(--color-navy-900)',
        },
        // Teal palette
        teal: {
          50: 'var(--color-teal-50)',
          100: 'var(--color-teal-100)',
          200: 'var(--color-teal-200)',
          300: 'var(--color-teal-300)',
          400: 'var(--color-teal-400)',
          500: 'var(--color-teal-500)',
          600: 'var(--color-teal-600)',
          700: 'var(--color-teal-700)',
          800: 'var(--color-teal-800)',
          900: 'var(--color-teal-900)',
        },
        // Danger palette
        danger: {
          50: 'var(--color-danger-50)',
          100: 'var(--color-danger-100)',
          200: 'var(--color-danger-200)',
          300: 'var(--color-danger-300)',
          400: 'var(--color-danger-400)',
          500: 'var(--color-danger-500)',
          600: 'var(--color-danger-600)',
          700: 'var(--color-danger-700)',
          800: 'var(--color-danger-800)',
          900: 'var(--color-danger-900)',
        },
        // Warning palette
        warning: {
          50: 'var(--color-warning-50)',
          100: 'var(--color-warning-100)',
          200: 'var(--color-warning-200)',
          300: 'var(--color-warning-300)',
          400: 'var(--color-warning-400)',
          500: 'var(--color-warning-500)',
          600: 'var(--color-warning-600)',
          700: 'var(--color-warning-700)',
          800: 'var(--color-warning-800)',
          900: 'var(--color-warning-900)',
        },
        // Success palette
        success: {
          50: 'var(--color-success-50)',
          100: 'var(--color-success-100)',
          200: 'var(--color-success-200)',
          300: 'var(--color-success-300)',
          400: 'var(--color-success-400)',
          500: 'var(--color-success-500)',
          600: 'var(--color-success-600)',
          700: 'var(--color-success-700)',
          800: 'var(--color-success-800)',
          900: 'var(--color-success-900)',
        },
        // Slate palette
        slate: {
          50: 'var(--color-slate-50)',
          100: 'var(--color-slate-100)',
          200: 'var(--color-slate-200)',
          300: 'var(--color-slate-300)',
          400: 'var(--color-slate-400)',
          500: 'var(--color-slate-500)',
          600: 'var(--color-slate-600)',
          700: 'var(--color-slate-700)',
          800: 'var(--color-slate-800)',
          900: 'var(--color-slate-900)',
        },
      },
      fontFamily: {
        display: "var(--font-family-display)",
        body: "var(--font-family-body)",
        mono: "var(--font-family-mono)",
      },
      fontSize: {
        'display-lg': ['var(--font-size-display-lg)', { lineHeight: 'var(--line-height-display)', letterSpacing: 'var(--letter-spacing-tight)' }],
        'display-md': ['var(--font-size-display-md)', { lineHeight: 'var(--line-height-display)', letterSpacing: 'var(--letter-spacing-tight)' }],
        'display-sm': ['var(--font-size-display-sm)', { lineHeight: 'var(--line-height-display)', letterSpacing: 'var(--letter-spacing-tight)' }],
        'heading-lg': ['var(--font-size-heading-lg)', { lineHeight: 'var(--line-height-heading)', letterSpacing: 'var(--letter-spacing-tight)' }],
        'heading-md': ['var(--font-size-heading-md)', { lineHeight: 'var(--line-height-heading)' }],
        'heading-sm': ['var(--font-size-heading-sm)', { lineHeight: 'var(--line-height-heading)' }],
        'heading-xs': ['var(--font-size-heading-xs)', { lineHeight: 'var(--line-height-heading)' }],
        'body-lg': ['var(--font-size-body-lg)', { lineHeight: 'var(--line-height-body)' }],
        'body-md': ['var(--font-size-body-md)', { lineHeight: 'var(--line-height-body)' }],
        'body-sm': ['var(--font-size-body-sm)', { lineHeight: 'var(--line-height-body)' }],
        'body-xs': ['var(--font-size-body-xs)', { lineHeight: 'var(--line-height-body)' }],
        'mono-lg': ['var(--font-size-mono-lg)', { lineHeight: 'var(--line-height-mono)', fontFamily: 'var(--font-family-mono)' }],
        'mono-md': ['var(--font-size-mono-md)', { lineHeight: 'var(--line-height-mono)', fontFamily: 'var(--font-family-mono)' }],
        'mono-sm': ['var(--font-size-mono-sm)', { lineHeight: 'var(--line-height-mono)', fontFamily: 'var(--font-family-mono)' }],
        'mono-xs': ['var(--font-size-mono-xs)', { lineHeight: 'var(--line-height-mono)', fontFamily: 'var(--font-family-mono)' }],
        'label-md': ['var(--font-size-label-md)', { lineHeight: '1.4', letterSpacing: 'var(--letter-spacing-wide)' }],
        'label-sm': ['var(--font-size-label-sm)', { lineHeight: '1.4', letterSpacing: 'var(--letter-spacing-wider)' }],
      },
      spacing: {
        0: 'var(--spacing-0)',
        1: 'var(--spacing-1)',
        2: 'var(--spacing-2)',
        3: 'var(--spacing-3)',
        4: 'var(--spacing-4)',
        5: 'var(--spacing-5)',
        6: 'var(--spacing-6)',
        7: 'var(--spacing-7)',
        8: 'var(--spacing-8)',
        9: 'var(--spacing-9)',
        10: 'var(--spacing-10)',
        12: 'var(--spacing-12)',
        16: 'var(--spacing-16)',
        20: 'var(--spacing-20)',
        24: 'var(--spacing-24)',
      },
      borderRadius: {
        none: 'var(--radius-none)',
        xs: 'var(--radius-xs)',
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
        full: 'var(--radius-full)',
      },
      boxShadow: {
        none: 'var(--shadow-none)',
        xs: 'var(--shadow-xs)',
        sm: 'var(--shadow-sm)',
        md: 'var(--shadow-md)',
        lg: 'var(--shadow-lg)',
        xl: 'var(--shadow-xl)',
      },
      transitionDuration: {
        fast: 'var(--transition-fast)',
        base: 'var(--transition-base)',
        slow: 'var(--transition-slow)',
      },
    },
  },
  plugins: [],
};

export default config;
