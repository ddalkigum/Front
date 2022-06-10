import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Detail from './routes/Detail';
import Home from './routes/Home';
import Signup from './routes/Signup';
import Write from './routes/Write';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/write" element={<Write />} />
        <Route path="/:nickname/:title" element={<Detail />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
