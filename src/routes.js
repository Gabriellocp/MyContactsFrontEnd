import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import NewContact from './pages/NewContact';
import { Container } from './pages/EditContact';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" Component={Home} />
      <Route path="/new" Component={NewContact} />
      <Route path="/edit/:id" Component={Container} />
    </Routes>
  );
}
