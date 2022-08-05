import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Login from './Login';
import Join from './Join';

export default function index() {
  return (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/join' element={<Join />} />
    </Routes>
  );
}
