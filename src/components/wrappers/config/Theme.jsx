import React, { useContext, createContext, useState } from 'react';
import { MantineProvider } from '@mantine/core';

const ThemeProvider = createContext();

const useTheme = () => {
  return useContext(ThemeProvider);
};

export function Theme({ children }) {
  const [theme, setTheme] = React.useState({
    colorScheme: 'dark',
    fontFamily: 'Poppins, sans-serif',
    fontFamilyMonospace: 'Poppins, Courier, monospace',
    headings: { fontFamily: 'Poppins, sans-serif' },
    background: '#147885',
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

  const updateTheme = (key, value) => {
    setTheme({ ...theme, [key]: value });
  };

  const value = {
    theme,
    updateTheme,
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
