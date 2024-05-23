/** @jsxImportSource @emotion/react */

'use client';

import { ThemeProvider } from '@emotion/react';
import StylesProvider from '@mui/styles/StylesProvider';
import { Inter } from 'next/font/google';
import { useEffect } from 'react';
import { Provider as ReduxProvider } from 'react-redux';

import type { ReactNode } from 'react';

import { AppSnackbar } from 'src/components/AppSnackbar';
import { Stack } from 'src/components/shared/Stack';
import { Text } from 'src/components/shared/Text';
import { appEnv } from 'src/constants/env';
import { store } from 'src/store/main';
import 'src/styles/index.scss';
import { theme } from 'src/utils/theme';

import RootStyleRegistry from './__emotion';

const inter = Inter({ subsets: ['latin'], weight: '400' });

const Layout = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    // Fix server-client hydration errors logged in browser console
    appEnv.isBrowser = true;

    // // Hack: Doing this to fix issues with class styles not applying due to element being prepended before MUI styles
    // const tailwindStylesEtAl = document.querySelector(
    //   'link[data-precedence="next.js"]'
    // );

    // if (tailwindStylesEtAl) {
    //   tailwindStylesEtAl.parentNode?.appendChild(tailwindStylesEtAl);
    // }
  }, []);

  if (globalThis.window) appEnv.isBrowser__aggressive = true;

  return (
    <html lang="en">
      <body
        className={`${inter.className} text-black/90 dark:bg-black/85 dark:text-white/90`}>
        <Stack
          as="header"
          className="Root z-30 p-5 pb-3 pt-5 mb-5 sticky top-0 max-w-6xl mx-auto flex-row items-center justify-between gap-2 bg-white/80 backdrop-blur-sm border-b border-0 border-solid border-gray-200 dark:border-white/5 dark:bg-transparent md:py-5 lg:mb-10">
          <Stack className="flex-row items-center">
            <Text as="h1" className="text-xl inline md:text-2xl">
              Leads
            </Text>
          </Stack>
        </Stack>
        {children}
        {appEnv.isBrowser__aggressive && <AppSnackbar />}
      </body>
    </html>
  );
};

const RootLayout = (props: { children: ReactNode }) => {
  return (
    <ReduxProvider store={store}>
      <ThemeProvider theme={theme}>
        <StylesProvider injectFirst>
          <RootStyleRegistry>
            <ReduxProvider store={store}>
              <Layout {...props} />
            </ReduxProvider>
          </RootStyleRegistry>
        </StylesProvider>
      </ThemeProvider>
    </ReduxProvider>
  );
};
export default RootLayout;
