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
  const { primary: prim } = colors;

  return {
    palette: {
      primary: {
        P100: `rgba(${prim.r}, ${prim.g}, ${prim.b}, 0.1)`,
        P200: `rgba(${prim.r}, ${prim.g}, ${prim.b}, 0.2)`,
        P300: `rgba(${prim.r}, ${prim.g}, ${prim.b}, 0.3)`,
        P400: `rgba(${prim.r}, ${prim.g}, ${prim.b}, 0.4)`,
        P500: `rgba(${prim.r}, ${prim.g}, ${prim.b}, 0.5)`,
        P600: `rgba(${prim.r}, ${prim.g}, ${prim.b}, 0.6)`,
        P700: `rgba(${prim.r}, ${prim.g}, ${prim.b}, 0.7)`,
        P800: `rgba(${prim.r}, ${prim.g}, ${prim.b}, 0.8)`,
        P900: `rgba(${prim.r}, ${prim.g}, ${prim.b}, 0.9)`,
        light: `rgba(${prim.r}, ${prim.g}, ${prim.b}, 0.6)`,
        main: `rgba(${prim.r}, ${prim.g}, ${prim.b}, 1)`,
        dark: `rgba(${prim.r}, ${prim.g}, ${prim.b}, 0.8)`
      }
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            '&.Mui-disabled': {
              opacity: '0.5'
            }
          }
        }
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            '&.Mui-disabled': {
              opacity: '0.5'
            }
          }
        }
      },
      MuiMenu: {
        styleOverrides: {
          paper: {
            marginLeft: '1.125rem',
            marginTop: '-0.75rem',
            borderRadius: '0.75rem',
            padding: '0.5rem',
            boxShadow: '0 0.25rem 0.75rem 0 rgba(0, 0, 0, 0.1)'
          },
          list: {
            padding: '0',
            '.MuiMenuItem-root': {
              fontSize: '0.75rem',
              padding: '0.25rem 0.5rem',
              borderRadius: '0.5rem',
              minHeight: 'unset'
            }
          }
        }
      }
    }
  };
};

export const theme = createTheme(
  returnThemeOptionsObject({
    primary
  })
);
