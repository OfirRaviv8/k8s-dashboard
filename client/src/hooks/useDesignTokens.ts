/**
 * useDesignTokens — Hook to access design tokens in components
 * Provides typed access to all SideWall design tokens
 */

import { designTokens } from '@/lib/design-tokens';

export function useDesignTokens() {
  return {
    colors: designTokens.colors,
    typography: designTokens.typography,
    spacing: designTokens.spacing,
    radius: designTokens.radius,
    shadows: designTokens.shadows,
    semantic: designTokens.semantic,
    transitions: designTokens.transitions,
  };
}

/**
 * Get CSS variable name for a design token
 * Example: getCSSVar('colors.navy.800') => 'var(--color-navy-800)'
 */
export function getCSSVar(path: string): string {
  const parts = path.split('.');
  if (parts[0] === 'colors') {
    const [, colorName, shade] = parts;
    return `var(--color-${colorName}-${shade})`;
  }
  if (parts[0] === 'spacing') {
    return `var(--spacing-${parts[1]})`;
  }
  if (parts[0] === 'radius') {
    return `var(--radius-${parts[1]})`;
  }
  if (parts[0] === 'shadows') {
    return `var(--shadow-${parts[1]})`;
  }
  return '';
}

/**
 * Get typography CSS properties as object
 * Example: getTypography('heading.lg') => { fontSize: '1.5rem', ... }
 */
export function getTypography(scale: 'display.lg' | 'display.md' | 'display.sm' | 'heading.lg' | 'heading.md' | 'heading.sm' | 'heading.xs' | 'body.lg' | 'body.md' | 'body.sm' | 'body.xs' | 'mono.lg' | 'mono.md' | 'mono.sm' | 'mono.xs' | 'label.md' | 'label.sm'): React.CSSProperties {
  const [category, size] = scale.split('.');
  const token = (designTokens.typography as any)[category]?.[size];

  if (!token) return {};

  return {
    fontSize: token.fontSize,
    lineHeight: token.lineHeight,
    fontWeight: token.fontWeight,
    letterSpacing: token.letterSpacing,
    ...(token.fontFamily && { fontFamily: token.fontFamily }),
  };
}

/**
 * Get semantic color token
 * Example: getSemanticColor('status.success') => '#00ba46'
 */
export function getSemanticColor(path: 'status.success' | 'status.warning' | 'status.danger' | 'status.info' | 'status.neutral' | 'text.primary' | 'text.secondary' | 'text.tertiary' | 'text.disabled' | 'text.inverse' | 'background.primary' | 'background.secondary' | 'background.tertiary' | 'background.overlay'): string {
  const [category, type] = path.split('.');
  return (designTokens.semantic as any)[category]?.[type] ?? '';
}
