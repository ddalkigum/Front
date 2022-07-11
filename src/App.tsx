import React from 'react';
import './theme.css';
import './font.css';
import styled, { ThemeProvider } from 'styled-components';
import { useRecoilState, useRecoilValue } from 'recoil';
import GlobalStyle from './GlobalStyle';
import Router from './Router';
import AuthModal from './component/modal/AuthModal';
import { currentTheme, ThemePalette } from './style/theme';
import { themeModeHandler } from './atom';

const App: React.FC = () => {
  const localStorageTheme = localStorage.getItem('theme');
  const [isDark, setDarkMode] = useRecoilState(themeModeHandler);
  let theme;

  if (localStorageTheme) {
    theme = currentTheme[localStorageTheme];
    setDarkMode(localStorageTheme === 'dark' ? true : false);
  } else {
    theme = isDark ? currentTheme.dark : currentTheme.light;
  }

  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Router />
        <AuthModal />
      </ThemeProvider>
    </>
  );
};

export default App;
