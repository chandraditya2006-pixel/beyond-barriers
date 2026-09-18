import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { AppProvider } from './context/AppContext';
import Layout from './components/Layout';
import ToastContainer from './components/ToastContainer';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import SupportPassport from './pages/SupportPassport';
import Recommendations from './pages/Recommendations';
import Opportunities from './pages/Opportunities';
import Career from './pages/Career';
import Progress from './pages/Progress';

import Teacher from './pages/Teacher';

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <ToastContainer />

        <Routes>
          {/* Student login */}
          <Route path="/login" element={<Login />} />

          {/* Student application */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="passport" element={<SupportPassport />} />
            <Route path="recommendations" element={<Recommendations />} />
            <Route path="opportunities" element={<Opportunities />} />
            <Route path="career" element={<Career />} />
            <Route path="progress" element={<Progress />} />
          </Route>

          {/* Teacher module */}
          <Route path="/teacher" element={<Teacher />} />

          {/* Unknown route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;