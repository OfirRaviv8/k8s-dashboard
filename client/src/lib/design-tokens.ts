/**
 * Design Token System — "SideWall" Palette
 * 
 * Comprehensive design tokens for K8s Dashboard:
 * - Color palette: Navy, Teal, Danger red, Warning amber
 * - Typography: Display, Heading, Body, Mono scales
 * - Spacing: 4px base unit system
 * - Semantic tokens for UI states
 */

export const designTokens = {
  // ─── Color Palette ────────────────────────────────────────────────────────

  colors: {
    // Primary palette — Navy + Teal
    navy: {
      50: '#f0f4f9',
      100: '#d9e2f0',
      200: '#b3c5e1',
      300: '#8ca8d2',
      400: '#668bc3',
      500: '#406eb4',
      600: '#2a52a5',
      700: '#1a3896',
      800: '#0a1628', // ← Primary Navy (SideWall)
      900: '#050b14',
    },
    teal: {
      50: '#f0fdf9',
      100: '#d9fef1',
      200: '#b3fce3',
      300: '#8cfad5',
      400: '#66f8c7',
      500: '#40f6b9',
      600: '#1af4ab',
      700: '#00ba46', // ← Primary Teal (SideWall)
      800: '#008a35',
      900: '#005a24',
    },
    // Semantic colors
    danger: {
      50: '#fef2f2',
      100: '#fee2e2',
      200: '#fecaca',
      300: '#fca5a5',
      400: '#f87171',
      500: '#ef4444',
      600: '#dc2626',
      700: '#b91c1c',
      800: '#991b1b',
      900: '#7f1d1d',
    },
    warning: {
      50: '#fffbeb',
      100: '#fef3c7',
      200: '#fde68a',
      300: '#fcd34d',
      400: '#fbbf24',
      500: '#f59e0b',
      600: '#d97706',
      700: '#b45309',
      800: '#92400e',
      900: '#78350f',
    },
    success: {
      50: '#f0fdf4',
      100: '#dcfce7',
      200: '#bbf7d0',
      300: '#86efac',
      400: '#4ade80',
      500: '#22c55e',
      600: '#16a34a',
      700: '#15803d',
      800: '#166534',
      900: '#145231',
    },
    slate: {
      50: '#f8fafc',
      100: '#f1f5f9',
      200: '#e2e8f0',
      300: '#cbd5e1',
      400: '#94a3b8',
      500: '#64748b',
      600: '#475569',
      700: '#334155',
      800: '#1e293b',
      900: '#0f172a',
    },
  },

  // ─── Typography ───────────────────────────────────────────────────────────

  typography: {
    // Display: large, bold headlines
    display: {
      lg: {
        fontSize: '3rem', // 48px
        lineHeight: '1.2',
        fontWeight: '700',
        letterSpacing: '-0.02em',
      },
      md: {
        fontSize: '2.25rem', // 36px
        lineHeight: '1.2',
        fontWeight: '700',
        letterSpacing: '-0.02em',
      },
      sm: {
        fontSize: '1.875rem', // 30px
        lineHeight: '1.2',
        fontWeight: '700',
        letterSpacing: '-0.01em',
      },
    },

    // Heading: section titles
    heading: {
      lg: {
        fontSize: '1.5rem', // 24px
        lineHeight: '1.3',
        fontWeight: '600',
        letterSpacing: '-0.01em',
      },
      md: {
        fontSize: '1.25rem', // 20px
        lineHeight: '1.4',
        fontWeight: '600',
        letterSpacing: '0',
      },
      sm: {
        fontSize: '1rem', // 16px
        lineHeight: '1.4',
        fontWeight: '600',
        letterSpacing: '0',
      },
      xs: {
        fontSize: '0.875rem', // 14px
        lineHeight: '1.4',
        fontWeight: '600',
        letterSpacing: '0.01em',
      },
    },

    // Body: regular text
    body: {
      lg: {
        fontSize: '1.125rem', // 18px
        lineHeight: '1.6',
        fontWeight: '400',
        letterSpacing: '0',
      },
      md: {
        fontSize: '1rem', // 16px
        lineHeight: '1.6',
        fontWeight: '400',
        letterSpacing: '0',
      },
      sm: {
        fontSize: '0.875rem', // 14px
        lineHeight: '1.5',
        fontWeight: '400',
        letterSpacing: '0',
      },
      xs: {
        fontSize: '0.75rem', // 12px
        lineHeight: '1.5',
        fontWeight: '400',
        letterSpacing: '0.01em',
      },
    },

    // Mono: code, data values
    mono: {
      lg: {
        fontSize: '1rem', // 16px
        lineHeight: '1.5',
        fontWeight: '500',
        letterSpacing: '0',
        fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
      },
      md: {
        fontSize: '0.875rem', // 14px
        lineHeight: '1.5',
        fontWeight: '400',
        letterSpacing: '0',
        fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
      },
      sm: {
        fontSize: '0.75rem', // 12px
        lineHeight: '1.4',
        fontWeight: '400',
        letterSpacing: '0',
        fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
      },
      xs: {
        fontSize: '0.625rem', // 10px
        lineHeight: '1.4',
        fontWeight: '400',
        letterSpacing: '0',
        fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
      },
    },

    // Label: form labels, badges
    label: {
      md: {
        fontSize: '0.875rem', // 14px
        lineHeight: '1.4',
        fontWeight: '500',
        letterSpacing: '0.01em',
      },
      sm: {
        fontSize: '0.75rem', // 12px
        lineHeight: '1.4',
        fontWeight: '500',
        letterSpacing: '0.02em',
      },
    },
  },

  // ─── Spacing ──────────────────────────────────────────────────────────────
  // Base unit: 4px

  spacing: {
    0: '0',
    1: '0.25rem', // 4px
    2: '0.5rem', // 8px
    3: '0.75rem', // 12px
    4: '1rem', // 16px
    5: '1.25rem', // 20px
    6: '1.5rem', // 24px
    7: '1.75rem', // 28px
    8: '2rem', // 32px
    9: '2.25rem', // 36px
    10: '2.5rem', // 40px
    12: '3rem', // 48px
    16: '4rem', // 64px
    20: '5rem', // 80px
    24: '6rem', // 96px
  },

  // ─── Border Radius ────────────────────────────────────────────────────────

  radius: {
    none: '0',
    xs: '0.25rem', // 4px
    sm: '0.375rem', // 6px
    md: '0.5rem', // 8px
    lg: '0.75rem', // 12px
    xl: '1rem', // 16px
    full: '9999px',
  },

  // ─── Shadows ──────────────────────────────────────────────────────────────

  shadows: {
    none: 'none',
    xs: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    sm: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  },

  // ─── Semantic Tokens ──────────────────────────────────────────────────────

  semantic: {
    // Status colors
    status: {
      success: '#00ba46', // Teal
      warning: '#fbbf24', // Amber
      danger: '#dc2626', // Red
      info: '#3b82f6', // Blue
      neutral: '#64748b', // Slate
    },

    // Component states
    states: {
      hover: 'rgba(255, 255, 255, 0.08)',
      active: 'rgba(0, 186, 70, 0.15)',
      disabled: 'rgba(255, 255, 255, 0.04)',
      focus: 'rgba(0, 186, 70, 0.3)',
    },

    // Text hierarchy
    text: {
      primary: '#e2e8f0', // Bright slate for primary text
      secondary: '#94a3b8', // Medium slate for secondary
      tertiary: '#64748b', // Muted slate for tertiary
      disabled: '#475569', // Dim slate for disabled
      inverse: '#0a1628', // Navy for inverse (on light bg)
    },

    // Backgrounds
    background: {
      primary: '#0a1628', // Navy
      secondary: '#1a2332', // Slightly lighter navy
      tertiary: '#2a3a52', // Even lighter navy
      overlay: 'rgba(10, 22, 40, 0.8)',
    },
  },

  // ─── Transitions ──────────────────────────────────────────────────────────

  transitions: {
    fast: '100ms ease-in-out',
    base: '150ms ease-in-out',
    slow: '300ms ease-in-out',
  },
};

// Export individual token groups for convenience
export const colors = designTokens.colors;
export const typography = designTokens.typography;
export const spacing = designTokens.spacing;
export const radius = designTokens.radius;
export const shadows = designTokens.shadows;
export const semantic = designTokens.semantic;
