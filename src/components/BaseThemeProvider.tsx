import React from 'react';
import theme from '@/theme';
import { CssBaseline } from '@material-ui/core';
import {
  MuiThemeProvider,
  StylesProvider,
  jssPreset,
} from '@material-ui/core/styles';
import { ThemeProvider } from 'styled-components';
import { create } from 'jss';
import rtl from 'jss-rtl';
interface BaseThemeProviderProps {
  children: React.ReactNode;
}

const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

function BaseThemeProvider({ children }: BaseThemeProviderProps) {
  return (
    <StylesProvider  jss={jss}>
      <MuiThemeProvider theme={theme}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </MuiThemeProvider>
    </StylesProvider>
  );
}

export default BaseThemeProvider;
