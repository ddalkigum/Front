import React from 'react';
import GlobalStyle from './GlobalStyle';
import './theme.css';
import './font.css';
import Router from './Router';
import AuthModal from './component/modal/AuthModal';

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
