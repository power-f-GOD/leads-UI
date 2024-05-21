import '@mui/material/styles';

declare module '@mui/material/styles' {
  interface ColorShades {
    P100: string;
    P200: string;
    P300: string;
    P400: string;
    P500: string;
    P600: string;
    P700: string;
    P800: string;
    P900: string;
    main: string;
  }

  interface Palette {
    white: ColorShades;
    screen: string;
  }

  interface PaletteColorOptions extends Partial<ColorShades> {
    light: string;
    main: string;
    dark: string;
    color?: string;
  }

  interface PaletteColor extends Partial<ColorShades> {
    light: string;
    main: string;
    dark: string;
    color?: string;
  }
}
