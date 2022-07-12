import React from 'react';
import './theme.css';
import './font.css';
import styled, { ThemeProvider } from 'styled-components';
import { useRecoilState } from 'recoil';
import GlobalStyle from './GlobalStyle';
import Router from './Router';
import AuthModal from './component/modal/AuthModal';
import { currentTheme } from './style/theme';
import { themeModeHandler } from './atom';

const App: React.FC = () => {
  const [isDark, setTheme] = useRecoilState(themeModeHandler);

  const theme = currentTheme[isDark ? 'dark' : 'light'];

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
