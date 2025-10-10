export const Colors = {
  light: {
    // Primary colors (đồng bộ với website)
    primary: "hsl(142, 76%, 36%)", // --primary
    primaryForeground: "hsl(210, 40%, 98%)",

    // Background colors
    background: "hsl(0, 0%, 100%)",
    foreground: "hsl(222, 84%, 5%)",

    // Card colors
    card: "hsl(0, 0%, 100%)",
    cardForeground: "hsl(222, 84%, 5%)",

    // Muted colors
    muted: "hsl(210, 40%, 94%)",
    mutedForeground: "hsl(215, 16%, 47%)",

    // Secondary colors
    secondary: "hsl(210, 40%, 94%)",
    secondaryForeground: "hsl(222, 84%, 5%)",

    // Accent colors
    accent: "hsl(210, 40%, 94%)",
    accentForeground: "hsl(222, 84%, 5%)",

    // Border & Input
    border: "hsl(214, 32%, 91%)",
    input: "hsl(214, 32%, 91%)",
    ring: "hsl(142, 76%, 36%)",

    // Destructive
    destructive: "hsl(0, 84%, 60%)",
    destructiveForeground: "hsl(210, 40%, 98%)",

    // Success
    success: "hsl(142, 76%, 36%)",
    successForeground: "hsl(210, 40%, 98%)",

    // Warning
    warning: "hsl(38, 92%, 50%)",
    warningForeground: "hsl(210, 40%, 98%)",
  },
  dark: {
    // Primary colors
    primary: "hsl(142, 71%, 45%)",
    primaryForeground: "hsl(145, 80%, 10%)",

    // Background colors
    background: "hsl(222, 84%, 5%)",
    foreground: "hsl(210, 40%, 98%)",

    // Card colors
    card: "hsl(222, 84%, 5%)",
    cardForeground: "hsl(210, 40%, 98%)",

    // Muted colors
    muted: "hsl(217, 33%, 18%)",
    mutedForeground: "hsl(215, 20%, 65%)",

    // Secondary colors
    secondary: "hsl(217, 33%, 18%)",
    secondaryForeground: "hsl(210, 40%, 98%)",

    // Accent colors
    accent: "hsl(217, 33%, 18%)",
    accentForeground: "hsl(210, 40%, 98%)",

    // Border & Input
    border: "hsl(217, 33%, 18%)",
    input: "hsl(217, 33%, 18%)",
    ring: "hsl(142, 71%, 45%)",

    // Destructive
    destructive: "hsl(0, 63%, 31%)",
    destructiveForeground: "hsl(210, 40%, 98%)",

    // Success
    success: "hsl(142, 71%, 45%)",
    successForeground: "hsl(145, 80%, 10%)",

    // Warning
    warning: "hsl(38, 92%, 50%)",
    warningForeground: "hsl(222, 84%, 5%)",
  },
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,
};

export const BorderRadius = {
  none: 0,
  sm: 4,
  md: 6,
  lg: 8,
  xl: 12,
  xxl: 16,
  full: 9999,
};

export const FontSize = {
  xs: 12,
  sm: 14,
  base: 16,
  lg: 18,
  xl: 20,
  "2xl": 24,
  "3xl": 30,
  "4xl": 36,
  "5xl": 48,
  "6xl": 60,
};

export const FontWeight = {
  normal: "400" as const,
  medium: "500" as const,
  semibold: "600" as const,
  bold: "700" as const,
};

export const LineHeight = {
  tight: 1.25,
  snug: 1.375,
  normal: 1.5,
  relaxed: 1.625,
  loose: 2,
};

// Helper functions
export const hslToRgb = (hsl: string): string => {
  // Simple HSL to RGB conversion for React Native
  const match = hsl.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/);
  if (!match) return hsl;

  const h = parseInt(match[1]) / 360;
  const s = parseInt(match[2]) / 100;
  const l = parseInt(match[3]) / 100;

  const hue2rgb = (p: number, q: number, t: number) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };

  let r, g, b;
  if (s === 0) {
    r = g = b = l;
  } else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return `rgb(${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(
    b * 255
  )})`;
};

// Convert all HSL colors to RGB for React Native
export const RgbColors = Object.fromEntries(
  Object.entries(Colors).map(([theme, colors]) => [
    theme,
    Object.fromEntries(
      Object.entries(colors).map(([key, value]) => [key, hslToRgb(value)])
    ),
  ])
) as typeof Colors;
