import { createTheme } from '@mui/material/styles';

import type { PaletteOptions, ThemeOptions } from '@mui/material/styles';

interface RGBA {
  r: number;
  g: number;
  b: number;
  a: number;
}

const primary: RGBA = { r: 0, g: 0, b: 0, a: 1 };

export const returnThemeOptionsObject = (
  colors: Record<keyof Pick<PaletteOptions, 'primary'>, RGBA>
): ThemeOptions => {
  const { primary } = colors;

  return {
    palette: {
      primary: {
        P100: `rgba(${primary.r}, ${primary.g}, ${primary.b}, 0.1)`,
        P200: `rgba(${primary.r}, ${primary.g}, ${primary.b}, 0.2)`,
        P300: `rgba(${primary.r}, ${primary.g}, ${primary.b}, 0.3)`,
        P400: `rgba(${primary.r}, ${primary.g}, ${primary.b}, 0.4)`,
        P500: `rgba(${primary.r}, ${primary.g}, ${primary.b}, 0.5)`,
        P600: `rgba(${primary.r}, ${primary.g}, ${primary.b}, 0.6)`,
        P700: `rgba(${primary.r}, ${primary.g}, ${primary.b}, 0.7)`,
        P800: `rgba(${primary.r}, ${primary.g}, ${primary.b}, 0.8)`,
        P900: `rgba(${primary.r}, ${primary.g}, ${primary.b}, 0.9)`,
        light: `rgba(${primary.r}, ${primary.g}, ${primary.b}, 0.6)`,
        main: `rgba(${primary.r}, ${primary.g}, ${primary.b}, 1)`,
        dark: `rgba(${primary.r}, ${primary.g}, ${primary.b}, 0.8)`
      }
    }
  };
};

export const theme = createTheme(
  returnThemeOptionsObject({
    primary
  })
);
