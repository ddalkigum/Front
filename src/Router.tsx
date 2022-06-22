import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NotFound from './component/error/NotFound';
import Detail from './routes/Detail';
import Home from './routes/Home';
import Notification from './routes/Notification';
import Profile from './routes/Profile';
import Setting from './routes/Setting';
import Signin from './routes/Signin';
import Signup from './routes/Signup';
import Write from './routes/Write';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/write" element={<Write />} />
        <Route path="/setting" element={<Setting />} />
        <Route path="/notification" element={<Notification />} />
        <Route path="/@:nickname/:title" element={<Detail />} />
        <Route path="/@:nickname" element={<Profile />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
