import React, { useContext, createContext, useState } from 'react';
import { MantineProvider } from '@mantine/core';

const ThemeProvider = createContext();

const useTheme = () => {
  return useContext(ThemeProvider);
};

export function Theme({ children }) {
  const [theme, setTheme] = React.useState({
    colorScheme: 'light',
    fontFamily: 'Inconsolata',
    fontFamilyMonospace: 'Inconsolata',
    fontSizes: {
      xs: 10,
      sm: 12,
      md: 14,
      lg: 16,
      xl: 20,
    },
    headings: {
      fontFamily: 'Inconsolata',
    },
    colors: {
      'ocean-blue': [
        '#7AD1DD',
        '#5FCCDB',
        '#44CADC',
        '#2AC9DE',
        '#1AC2D9',
        '#11B7CD',
        '#09ADC3',
        '#0E99AC',
        '#128797',
        '#147885',
      ],
    },
  });

  const changeFont = (value) => {
    setTheme({
      ...theme,
      fontFamily: value,
      headings: { fontFamily: value },
      fontFamilyMonospace: value,
    });
  };

  const updateTheme = (key, value) => {
    setTheme({ ...theme, [key]: value });
  };

  const changeHeadingSize = (key, value) => {
    setTheme({
      ...theme,
      headings: { ...theme.headings, sizes: { ...theme.headings.sizes, [key]: value } },
    });
  };

  const changeFontSize = (key, value) => {
    setTheme({
      ...theme,
      fontSizes: { ...theme.fontSizes, [key]: value },
    });
  };

  const value = {
    theme,
    updateTheme,
    changeFont,
    changeHeadingSize,
    changeFontSize,
  };

  return (
    <ThemeProvider.Provider value={value}>
      <MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
        {children}
      </MantineProvider>
    </ThemeProvider.Provider>
  );
}

export default useTheme;
