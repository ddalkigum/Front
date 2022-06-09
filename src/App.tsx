import React from 'react';
import GlobalStyle from './GlobalStyle';
import './font.css';
import Router from './Router';
import AuthModal from './component/auth/AuthModal';
import { config } from './config';

const App: React.FC = () => {
  return (
    <>
      <GlobalStyle></GlobalStyle>
      <Router />
      <AuthModal />
    </>
  );
};

export default App;
